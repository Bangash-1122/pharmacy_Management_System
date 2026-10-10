const app = require('./app');
const env = require('./config/env');
const { connectDB } = require('./config/db');
const User = require('./models/User');
const Tenant = require('./models/Tenant');
const Branch = require('./models/Branch');
const Category = require('./models/Category');
const Brand = require('./models/Brand');
const Medicine = require('./models/Medicine');
const MedicineBatch = require('./models/MedicineBatch');
const Supplier = require('./models/Supplier');
const Customer = require('./models/Customer');
const { ROLES, SUBSCRIPTION_PLANS, SUBSCRIPTION_STATUS } = require('./config/constants');
const { generateEAN13 } = require('./utils/barcode.util');

// Auto Seed initial Super Admin and demo data
async function seedInitialData() {
  try {
    const superAdminEmail = 'admin@pharmacymanagement.com';
    let superAdmin = await User.findOne({ email: superAdminEmail });

    if (!superAdmin) {
      console.log('[Seed] Creating default Super Admin account...');
      superAdmin = await User.create({
        name: 'Muhammad Wasim',
        email: superAdminEmail,
        password: 'AdminPassword@2026',
        role: ROLES.SUPER_ADMIN,
        designation: 'Platform Administrator & System Owner',
        permissions: [{ module: '*', action: '*' }],
      });
      console.log(`[Seed] Super Admin created: ${superAdminEmail} / AdminPassword@2026`);
    }

    // Seed Demo Pharmacy Tenant if none exists
    const tenantCount = await Tenant.countDocuments();
    if (tenantCount === 0) {
      console.log('[Seed] Seeding initial Demo Pharmacy...');
      const demoTenant = await Tenant.create({
        name: 'Al-Shifa Healthcare Pharmacy',
        slug: 'al-shifa-healthcare',
        email: 'owner@alshifapharmacy.com',
        phone: '+92 300 1234567',
        pharmacyType: 'Retail Pharmacy & Clinic',
        city: 'Islamabad',
        address: 'Blue Area, Jinnah Avenue, Islamabad',
        planId: SUBSCRIPTION_PLANS.PREMIUM.id,
        subscriptionStatus: SUBSCRIPTION_STATUS.ACTIVE,
      });

      const mainBranch = await Branch.create({
        tenantId: demoTenant._id,
        name: 'Al-Shifa - Main Branch',
        code: 'HQ-01',
        address: 'Blue Area, Islamabad',
        city: 'Islamabad',
        phone: '+92 300 1234567',
        isMain: true,
      });

      const demoOwner = await User.create({
        tenantId: demoTenant._id,
        branchId: mainBranch._id,
        name: 'Dr. Ubaid Bangash',
        email: 'owner@alshifapharmacy.com',
        phone: '+92 300 1234567',
        password: 'PharmacyPassword@2026',
        role: ROLES.PHARMACY_OWNER,
        designation: 'Managing Pharmacist & Owner',
        permissions: [{ module: '*', action: '*' }],
      });

      mainBranch.managerId = demoOwner._id;
      await mainBranch.save();

      // Seed categories
      const cat1 = await Category.create({ tenantId: demoTenant._id, name: 'Analgesics & Antipyretics', color: '#3b82f6', icon: 'pill' });
      const cat2 = await Category.create({ tenantId: demoTenant._id, name: 'Antibiotics', color: '#10b981', icon: 'shield' });
      const cat3 = await Category.create({ tenantId: demoTenant._id, name: 'Cardiovascular', color: '#ef4444', icon: 'heart' });
      const cat4 = await Category.create({ tenantId: demoTenant._id, name: 'Vitamins & Supplements', color: '#f59e0b', icon: 'sun' });

      // Seed brands
      const brand1 = await Brand.create({ tenantId: demoTenant._id, name: 'GSK Pakistan', country: 'Pakistan' });
      const brand2 = await Brand.create({ tenantId: demoTenant._id, name: 'Abbott Laboratories', country: 'USA' });
      const brand3 = await Brand.create({ tenantId: demoTenant._id, name: 'Getz Pharma', country: 'Pakistan' });

      // Seed Suppliers
      const sup1 = await Supplier.create({
        tenantId: demoTenant._id,
        name: 'Ali Medical Distributors',
        companyName: 'Ali Med Ltd.',
        phone: '+92 321 9876543',
        email: 'sales@alimedical.com',
        balance: 15000,
        creditDays: 30,
      });

      // Seed Customers
      const cust1 = await Customer.create({
        tenantId: demoTenant._id,
        name: 'Zahid Ahmed',
        phone: '03015551234',
        email: 'zahid@example.com',
        customerType: 'regular',
        loyaltyPoints: 120,
        loyaltyTier: 'Silver',
        balance: 500,
      });

      // Seed sample medicines and batches with FEFO dates
      const med1 = await Medicine.create({
        tenantId: demoTenant._id,
        name: 'Panadol Extra 500mg',
        genericName: 'Paracetamol + Caffeine',
        categoryId: cat1._id,
        brandId: brand1._id,
        brandName: 'GSK Pakistan',
        unitOfMeasure: 'Tablet',
        packingSize: '1 Box = 20 Strips (200 Tabs)',
        unitsPerPack: 200,
        purchasePrice: 450,
        salePrice: 550,
        mrp: 550,
        minStockLevel: 20,
        reorderQuantity: 100,
        rackLocation: 'A-01',
        barcodes: [generateEAN13('890')],
        totalStock: 80,
      });

      await MedicineBatch.create({
        tenantId: demoTenant._id,
        branchId: mainBranch._id,
        medicineId: med1._id,
        batchNo: 'B-2026-A1',
        expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months away
        quantity: 50,
        purchasePrice: 450,
        salePrice: 550,
        supplierId: sup1._id,
      });

      await MedicineBatch.create({
        tenantId: demoTenant._id,
        branchId: mainBranch._id,
        medicineId: med1._id,
        batchNo: 'B-2026-A2',
        expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days away (Near Expiry)
        quantity: 30,
        purchasePrice: 450,
        salePrice: 550,
        supplierId: sup1._id,
      });

      const med2 = await Medicine.create({
        tenantId: demoTenant._id,
        name: 'Augmentin 625mg',
        genericName: 'Amoxicillin + Clavulanic Acid',
        categoryId: cat2._id,
        brandId: brand1._id,
        brandName: 'GSK Pakistan',
        unitOfMeasure: 'Tablet',
        packingSize: '1 Strip = 6 Tablets',
        unitsPerPack: 6,
        purchasePrice: 280,
        salePrice: 350,
        mrp: 350,
        minStockLevel: 15,
        reorderQuantity: 60,
        rackLocation: 'B-04',
        prescriptionRequired: true,
        barcodes: [generateEAN13('890')],
        totalStock: 45,
      });

      await MedicineBatch.create({
        tenantId: demoTenant._id,
        branchId: mainBranch._id,
        medicineId: med2._id,
        batchNo: 'AUG-991',
        expiryDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
        quantity: 45,
        purchasePrice: 280,
        salePrice: 350,
        supplierId: sup1._id,
      });

      console.log('[Seed] Demo data successfully initialized!');
    }
  } catch (err) {
    console.error('[Seed Error]', err.message);
  }
}

const startServer = async () => {
  await connectDB();
  await seedInitialData();

  const server = app.listen(env.PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 Pharmacy Management System API v3.0 is running!`);
    console.log(`📡 URL: http://localhost:${env.PORT}`);
    console.log(`🩺 Health check: http://localhost:${env.PORT}/api/v1/health`);
    console.log(`⚙️  Environment: ${env.NODE_ENV}`);
    console.log(`=======================================================`);
  });

  // Graceful shutdown
  const gracefulShutdown = (signal) => {
    console.log(`[System] Received ${signal}. Closing server gracefully...`);
    server.close(() => {
      console.log('[System] HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

startServer();
