const Medicine = require('../../models/Medicine');
const MedicineBatch = require('../../models/MedicineBatch');
const { generateEAN13 } = require('../../utils/barcode.util');

class MedicineService {
  static async listMedicines(tenantId, query = {}) {
    const filter = { tenantId, active: true };

    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { genericName: { $regex: query.search, $options: 'i' } },
        { barcodes: { $in: [query.search] } },
      ];
    }

    if (query.categoryId) filter.categoryId = query.categoryId;
    if (query.brandId) filter.brandId = query.brandId;
    if (query.prescriptionRequired !== undefined) filter.prescriptionRequired = query.prescriptionRequired === 'true';
    if (query.narcoticFlag !== undefined) filter.narcoticFlag = query.narcoticFlag === 'true';

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const medicines = await Medicine.find(filter)
      .populate('categoryId brandId alternativeMedicineIds')
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Medicine.countDocuments(filter);

    // Attach active stock count & lowest batch expiry to each medicine
    const medicineIds = medicines.map((m) => m._id);
    const batches = await MedicineBatch.find({
      tenantId,
      medicineId: { $in: medicineIds },
      active: true,
      quantity: { $gt: 0 },
    }).sort({ expiryDate: 1 });

    const batchMap = {};
    batches.forEach((b) => {
      if (!batchMap[b.medicineId]) {
        batchMap[b.medicineId] = { totalStock: 0, nearestExpiry: b.expiryDate, batches: [] };
      }
      batchMap[b.medicineId].totalStock += b.quantity;
      batchMap[b.medicineId].batches.push(b);
    });

    const enriched = medicines.map((m) => ({
      ...m,
      currentStock: batchMap[m._id]?.totalStock || 0,
      nearestExpiry: batchMap[m._id]?.nearestExpiry || null,
      availableBatchesCount: batchMap[m._id]?.batches.length || 0,
    }));

    return {
      medicines: enriched,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async getMedicineById(tenantId, id) {
    const medicine = await Medicine.findOne({ _id: id, tenantId, active: true })
      .populate('categoryId brandId alternativeMedicineIds');
    if (!medicine) {
      const error = new Error('Medicine not found.');
      error.statusCode = 404;
      throw error;
    }

    const batches = await MedicineBatch.find({
      tenantId,
      medicineId: id,
      active: true,
      quantity: { $gt: 0 },
    }).sort({ expiryDate: 1 }); // FEFO sort

    return {
      medicine,
      batches,
    };
  }

  static async findByBarcode(tenantId, barcode) {
    const medicine = await Medicine.findOne({
      tenantId,
      active: true,
      barcodes: barcode,
    }).populate('categoryId brandId');

    if (!medicine) {
      const error = new Error(`No medicine found with barcode: ${barcode}`);
      error.statusCode = 404;
      throw error;
    }

    const batches = await MedicineBatch.find({
      tenantId,
      medicineId: medicine._id,
      active: true,
      quantity: { $gt: 0 },
    }).sort({ expiryDate: 1 });

    return { medicine, batches };
  }

  static async createMedicine(tenantId, data) {
    // If no barcodes provided, auto-generate standard EAN-13
    const barcodes = data.barcodes && data.barcodes.length ? data.barcodes : [generateEAN13('890')];
    return Medicine.create({
      ...data,
      barcodes,
      tenantId,
    });
  }

  static async updateMedicine(tenantId, id, data) {
    const medicine = await Medicine.findOneAndUpdate({ _id: id, tenantId }, data, { new: true });
    if (!medicine) {
      const error = new Error('Medicine not found.');
      error.statusCode = 404;
      throw error;
    }
    return medicine;
  }

  static async deleteMedicine(tenantId, id) {
    const medicine = await Medicine.findOneAndUpdate({ _id: id, tenantId }, { active: false }, { new: true });
    if (!medicine) {
      const error = new Error('Medicine not found.');
      error.statusCode = 404;
      throw error;
    }
    return medicine;
  }

  static async bulkUpdate(tenantId, medicineIds, updates) {
    return Medicine.updateMany({ _id: { $in: medicineIds }, tenantId }, { $set: updates });
  }
}

module.exports = MedicineService;
