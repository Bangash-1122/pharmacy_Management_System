import React, { useState } from 'react';
import {
  Package,
  AlertTriangle,
  Clock,
  CheckCircle,
  Sliders,
  DollarSign,
  Search,
  Filter,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { MedicineBatch } from '../types';

export const InventoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'radar' | 'batches' | 'adjust' | 'audit'>('radar');
  const [expiryFilter, setExpiryFilter] = useState<'all' | '7' | '30' | '60' | '90'>('30');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample Batches
  const [batches] = useState<MedicineBatch[]>([
    {
      id: 'b-1',
      medicineId: 'med-1',
      medicineName: 'Panadol Extra 500mg',
      batchNo: 'B-2026-A2',
      lotNo: 'L-991',
      expiryDate: '2026-10-29', // Near Expiry (< 30 days)
      quantity: 30,
      purchasePrice: 450,
      salePrice: 550,
      supplierName: 'Ali Medical Distributors',
    },
    {
      id: 'b-2',
      medicineId: 'med-1',
      medicineName: 'Panadol Extra 500mg',
      batchNo: 'B-2026-A1',
      lotNo: 'L-992',
      expiryDate: '2027-04-15',
      quantity: 50,
      purchasePrice: 450,
      salePrice: 550,
      supplierName: 'Ali Medical Distributors',
    },
    {
      id: 'b-3',
      medicineId: 'med-4',
      medicineName: 'Hydryllin Syrup 120ml',
      batchNo: 'HYD-044',
      expiryDate: '2026-12-05', // < 60 days
      quantity: 32,
      purchasePrice: 110,
      salePrice: 145,
      supplierName: 'Prime Pharma Logistics',
    },
    {
      id: 'b-4',
      medicineId: 'med-2',
      medicineName: 'Augmentin 625mg',
      batchNo: 'AUG-991',
      expiryDate: '2027-08-15',
      quantity: 45,
      purchasePrice: 280,
      salePrice: 350,
      supplierName: 'GSK Direct',
    },
  ]);

  // Adjustment Modal State
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustData, setAdjustData] = useState({
    medicineName: 'Panadol Extra 500mg',
    batchNo: 'B-2026-A2',
    adjustmentType: 'Physical count correction',
    quantityDelta: 0,
    reason: '',
  });

  const totalStockUnits = batches.reduce((acc, b) => acc + b.quantity, 0);
  const totalPurchaseValue = batches.reduce((acc, b) => acc + b.quantity * b.purchasePrice, 0);
  const totalSaleValue = batches.reduce((acc, b) => acc + b.quantity * b.salePrice, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Inventory Valuation Header Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Stock Units</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.25rem' }}>
            {totalStockUnits.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.25rem' }}>Across active batches</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Stock Value (Purchase Cost)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '0.25rem' }}>
            Rs. {totalPurchaseValue.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>FIFO Inventory asset</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Stock Value (Retail Sales)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', marginTop: '0.25rem' }}>
            Rs. {totalSaleValue.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '0.25rem' }}>
            Potential Profit: Rs. {(totalSaleValue - totalPurchaseValue).toLocaleString()}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Near-Expiry Alerts (&lt; 60 Days)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fb7185', marginTop: '0.25rem' }}>
            2 Batches
          </div>
          <div style={{ fontSize: '0.75rem', color: '#fb7185', marginTop: '0.25rem' }}>Action required in FEFO radar</div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('radar')}
          className={activeTab === 'radar' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
        >
          <Clock size={16} /> Expiry Radar (FEFO Alert System)
        </button>
        <button
          onClick={() => setActiveTab('batches')}
          className={activeTab === 'batches' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
        >
          <Package size={16} /> All Active Stock Batches
        </button>
        <button
          onClick={() => setShowAdjustModal(true)}
          className="btn-secondary"
          style={{ fontSize: '0.85rem', marginLeft: 'auto' }}
        >
          <Sliders size={16} /> Manual Stock Adjustment
        </button>
      </div>

      {/* Expiry Radar View */}
      {activeTab === 'radar' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} color="#f59e0b" /> FEFO Expiry Radar
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Monitor medicines approaching expiry to accelerate POS sales or initiate supplier returns
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['all', '7', '30', '60', '90'] as const).map((days) => (
                <button
                  key={days}
                  onClick={() => setExpiryFilter(days)}
                  style={{
                    background: expiryFilter === days ? '#0284c7' : '#1e293b',
                    color: expiryFilter === days ? 'white' : '#94a3b8',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {days === 'all' ? 'All Expiring' : `< ${days} Days`}
                </button>
              ))}
            </div>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Batch # / Lot</th>
                <th>Expiry Date</th>
                <th>Current Units</th>
                <th>Purchase Cost</th>
                <th>Supplier</th>
                <th style={{ textAlign: 'right' }}>Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch.id}>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>{batch.medicineName}</td>
                  <td>
                    <span style={{ fontFamily: 'monospace', color: '#38bdf8' }}>{batch.batchNo}</span>
                  </td>
                  <td>
                    <span className="badge badge-rose">
                      {batch.expiryDate}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{batch.quantity}</td>
                  <td>Rs. {batch.purchasePrice}</td>
                  <td style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{batch.supplierName}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}>
                      Initiate Supplier Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Batches View */}
      {activeTab === 'batches' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Batch Number</th>
                <th>Expiry</th>
                <th>Quantity</th>
                <th>Purchase Price</th>
                <th>Sale Price</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 600 }}>{b.medicineName}</td>
                  <td style={{ fontFamily: 'monospace', color: '#38bdf8' }}>{b.batchNo}</td>
                  <td>{b.expiryDate}</td>
                  <td style={{ fontWeight: 700 }}>{b.quantity}</td>
                  <td>Rs. {b.purchasePrice}</td>
                  <td>Rs. {b.salePrice}</td>
                  <td style={{ fontWeight: 700, color: '#34d399' }}>Rs. {(b.quantity * b.salePrice).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Manual Stock Adjustment Modal */}
      {showAdjustModal && (
        <div className="modal-backdrop">
          <div className="glass-panel" style={{ width: '450px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Manual Stock Adjustment</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1rem' }}>
              Adjust stock for physical audit corrections, damages, samples, or theft write-offs.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Stock adjustment recorded and audit log entry created.');
                setShowAdjustModal(false);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
            >
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Medicine</label>
                <input type="text" disabled value={adjustData.medicineName} className="form-input" style={{ opacity: 0.7 }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Batch Number</label>
                <input type="text" disabled value={adjustData.batchNo} className="form-input" style={{ opacity: 0.7 }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Adjustment Reason Type</label>
                <select
                  className="form-input"
                  value={adjustData.adjustmentType}
                  onChange={(e) => setAdjustData({ ...adjustData, adjustmentType: e.target.value })}
                >
                  <option value="Physical count correction">Physical count correction</option>
                  <option value="Damage write-off">Damage write-off</option>
                  <option value="Theft loss">Theft loss</option>
                  <option value="Sample">Sample / Doctor Demonstration</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Quantity Delta (+/- units)</label>
                <input
                  type="number"
                  required
                  placeholder="+5 or -3"
                  className="form-input"
                  value={adjustData.quantityDelta || ''}
                  onChange={(e) => setAdjustData({ ...adjustData, quantityDelta: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Remarks / Reason Details</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Mandatory reason for audit trail..."
                  className="form-input"
                  value={adjustData.reason}
                  onChange={(e) => setAdjustData({ ...adjustData, reason: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowAdjustModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Post Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
