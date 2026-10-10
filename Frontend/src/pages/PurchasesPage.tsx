import React, { useState } from 'react';
import {
  Truck,
  Plus,
  FileCheck,
  AlertCircle,
  PackagePlus,
  Clock,
  CheckCircle,
  Search,
} from 'lucide-react';

export const PurchasesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'grn' | 'orders' | 'suggestions'>('grn');
  const [showGRNModal, setShowGRNModal] = useState(false);

  // GRN State
  const [grnList] = useState([
    {
      id: 'grn-1',
      grnNumber: 'GRN-00102',
      supplierName: 'Ali Medical Distributors',
      supplierInvoiceNo: 'INV-AL-9921',
      date: '2026-10-08',
      totalAmount: 45000,
      paidAmount: 30000,
      balanceAmount: 15000,
      itemsCount: 3,
    },
    {
      id: 'grn-2',
      grnNumber: 'GRN-00101',
      supplierName: 'GSK Direct Logistics',
      supplierInvoiceNo: 'GSK-88219',
      date: '2026-10-02',
      totalAmount: 85000,
      paidAmount: 85000,
      balanceAmount: 0,
      itemsCount: 5,
    },
  ]);

  const [grnForm, setGrnForm] = useState({
    supplierName: 'Ali Medical Distributors',
    invoiceNo: '',
    medicineName: 'Panadol Extra 500mg',
    batchNo: '',
    expiryDate: '',
    quantityReceived: 100,
    purchasePrice: 450,
    salePrice: 550,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Tabs & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('grn')}
            className={activeTab === 'grn' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem' }}
          >
            <FileCheck size={16} /> Goods Received Notes (GRN)
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={activeTab === 'suggestions' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem' }}
          >
            <AlertCircle size={16} color="#f59e0b" /> Low-Stock Auto PO Suggestions
          </button>
        </div>

        <button onClick={() => setShowGRNModal(true)} className="btn-success" style={{ fontSize: '0.85rem' }}>
          <PackagePlus size={16} /> Receive New Stock (GRN)
        </button>
      </div>

      {/* GRN List View */}
      {activeTab === 'grn' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Goods Received History</h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>All confirmed stock receipts and batch updates</p>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>GRN Number</th>
                <th>Supplier</th>
                <th>Supplier Invoice #</th>
                <th>Received Date</th>
                <th>Total Value</th>
                <th>Paid Amount</th>
                <th>Balance Due</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {grnList.map((g) => (
                <tr key={g.id}>
                  <td style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: 700 }}>{g.grnNumber}</td>
                  <td style={{ fontWeight: 600 }}>{g.supplierName}</td>
                  <td style={{ color: '#94a3b8' }}>{g.supplierInvoiceNo}</td>
                  <td>{g.date}</td>
                  <td style={{ fontWeight: 700 }}>Rs. {g.totalAmount.toLocaleString()}</td>
                  <td style={{ color: '#34d399' }}>Rs. {g.paidAmount.toLocaleString()}</td>
                  <td style={{ color: g.balanceAmount > 0 ? '#fb7185' : '#94a3b8', fontWeight: 600 }}>
                    Rs. {g.balanceAmount.toLocaleString()}
                  </td>
                  <td>
                    <span className="badge badge-emerald">CONFIRMED</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Low Stock Auto PO Suggestions */}
      {activeTab === 'suggestions' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={18} /> Automated Low-Stock Reorder Advisor
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Medicines that have fallen below minimum safety stock threshold. Generate instant PO with 1-click.
            </p>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Current Stock</th>
                <th>Min Safety Level</th>
                <th>Suggested Reorder Qty</th>
                <th>Est. Purchase Cost</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Augmentin 625mg', current: 15, min: 20, suggest: 60, cost: 16800 },
                { name: 'Hydryllin Syrup 120ml', current: 8, min: 10, suggest: 40, cost: 4400 },
              ].map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{item.name}</td>
                  <td>
                    <span className="badge badge-rose">{item.current} Units</span>
                  </td>
                  <td>{item.min} Units</td>
                  <td style={{ fontWeight: 700, color: '#38bdf8' }}>{item.suggest} Units</td>
                  <td>Rs. {item.cost.toLocaleString()}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => alert(`Generated Purchase Order for ${item.name} (${item.suggest} units)`)}
                      className="btn-primary"
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}
                    >
                      Generate PO
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New GRN Stock Receiving Modal */}
      {showGRNModal && (
        <div className="modal-backdrop">
          <div className="glass-panel" style={{ width: '600px', maxWidth: '95vw', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem' }}>Receive Goods Received Note (GRN)</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
              Receive supplier delivery, generate new batch, and automatically increment stock ledger.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Stock received and batch added to FEFO inventory!');
                setShowGRNModal(false);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Supplier</label>
                  <select
                    className="form-input"
                    value={grnForm.supplierName}
                    onChange={(e) => setGrnForm({ ...grnForm, supplierName: e.target.value })}
                  >
                    <option value="Ali Medical Distributors">Ali Medical Distributors</option>
                    <option value="GSK Direct Logistics">GSK Direct Logistics</option>
                    <option value="Prime Pharma">Prime Pharma</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Supplier Invoice #</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. INV-9092"
                    className="form-input"
                    value={grnForm.invoiceNo}
                    onChange={(e) => setGrnForm({ ...grnForm, invoiceNo: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Medicine</label>
                  <select
                    className="form-input"
                    value={grnForm.medicineName}
                    onChange={(e) => setGrnForm({ ...grnForm, medicineName: e.target.value })}
                  >
                    <option value="Panadol Extra 500mg">Panadol Extra 500mg</option>
                    <option value="Augmentin 625mg">Augmentin 625mg</option>
                    <option value="Brufen 400mg">Brufen 400mg</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Batch Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. B-2026-X9"
                    className="form-input"
                    value={grnForm.batchNo}
                    onChange={(e) => setGrnForm({ ...grnForm, batchNo: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Expiry Date</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={grnForm.expiryDate}
                    onChange={(e) => setGrnForm({ ...grnForm, expiryDate: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Qty Received</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={grnForm.quantityReceived || ''}
                    onChange={(e) => setGrnForm({ ...grnForm, quantityReceived: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Purchase Cost</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={grnForm.purchasePrice || ''}
                    onChange={(e) => setGrnForm({ ...grnForm, purchasePrice: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowGRNModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-success" style={{ flex: 2, justifyContent: 'center' }}>
                  Confirm GRN & Update Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
