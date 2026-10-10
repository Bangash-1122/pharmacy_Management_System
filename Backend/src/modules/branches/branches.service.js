const Branch = require('../../models/Branch');
const BranchTransfer = require('../../models/BranchTransfer');
const Medicine = require('../../models/Medicine');
const MedicineBatch = require('../../models/MedicineBatch');

class BranchesService {
  static async listBranches(tenantId) {
    return Branch.find({ tenantId, active: true }).populate('managerId');
  }

  static async createBranch(tenantId, data) {
    return Branch.create({ ...data, tenantId });
  }

  static async updateBranch(tenantId, id, data) {
    const branch = await Branch.findOneAndUpdate({ _id: id, tenantId }, data, { new: true });
    if (!branch) {
      const error = new Error('Branch not found.');
      error.statusCode = 404;
      throw error;
    }
    return branch;
  }

  static async createTransfer(tenantId, userId, data) {
    const source = await Branch.findOne({ _id: data.sourceBranchId, tenantId });
    const target = await Branch.findOne({ _id: data.targetBranchId, tenantId });
    if (!source || !target) {
      const error = new Error('Invalid source or target branch.');
      error.statusCode = 404;
      throw error;
    }

    const transferItems = [];
    for (const item of data.items) {
      const batch = await MedicineBatch.findOne({ _id: item.batchId, tenantId });
      const med = await Medicine.findOne({ _id: item.medicineId, tenantId });
      if (!batch || !med || batch.quantity < item.quantity) {
        const error = new Error(`Insufficient quantity in batch for ${med?.name || 'item'}`);
        error.statusCode = 400;
        throw error;
      }

      transferItems.push({
        medicineId: med._id,
        medicineName: med.name,
        batchId: batch._id,
        batchNo: batch.batchNo,
        quantity: item.quantity,
      });

      // Deduct from source batch
      batch.quantity -= item.quantity;
      await batch.save();
    }

    const transferNumber = `TRF-${Date.now().toString().slice(-6)}`;
    const transfer = await BranchTransfer.create({
      tenantId,
      transferNumber,
      sourceBranchId: source._id,
      sourceBranchName: source.name,
      targetBranchId: target._id,
      targetBranchName: target.name,
      items: transferItems,
      requestedBy: userId,
      status: 'dispatched',
      dispatchedAt: new Date(),
      notes: data.notes || '',
    });

    return transfer;
  }

  static async receiveTransfer(tenantId, transferId, userId) {
    const transfer = await BranchTransfer.findOne({ _id: transferId, tenantId, status: 'dispatched' });
    if (!transfer) {
      const error = new Error('Dispatched transfer not found.');
      error.statusCode = 404;
      throw error;
    }

    for (const item of transfer.items) {
      const originalBatch = await MedicineBatch.findById(item.batchId);
      if (originalBatch) {
        // Create or increment target branch batch
        let targetBatch = await MedicineBatch.findOne({
          tenantId,
          branchId: transfer.targetBranchId,
          medicineId: item.medicineId,
          batchNo: originalBatch.batchNo,
        });

        if (targetBatch) {
          targetBatch.quantity += item.quantity;
          await targetBatch.save();
        } else {
          await MedicineBatch.create({
            tenantId,
            branchId: transfer.targetBranchId,
            medicineId: item.medicineId,
            batchNo: originalBatch.batchNo,
            expiryDate: originalBatch.expiryDate,
            quantity: item.quantity,
            purchasePrice: originalBatch.purchasePrice,
            salePrice: originalBatch.salePrice,
          });
        }
      }
    }

    transfer.status = 'received';
    transfer.receivedBy = userId;
    transfer.receivedAt = new Date();
    await transfer.save();

    return transfer;
  }

  static async listTransfers(tenantId) {
    return BranchTransfer.find({ tenantId }).sort({ createdAt: -1 });
  }
}

module.exports = BranchesService;
