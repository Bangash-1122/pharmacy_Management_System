import React, { useState } from 'react';
import { Building2, Plus, ArrowRightLeft, MapPin, Phone, CheckCircle } from 'lucide-react';
import { Branch } from '../types';

export const BranchesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'branches' | 'transfers'>('branches');
  const [showTransferModal, setShowTransferModal] = useState(false);

  const [branches] = useState<Branch[]>([
    {
      id: 'b-1',
      name: 'Al-Shifa Main Pharmacy',
      code: 'HQ-01',
      address: 'Blue Area, Jinnah Avenue',
      city: 'Islamabad',
      phone: '+92 300 1234567',
      isMain: true,
    },
    {
      id: 'b-2',
      name: 'Al-Shifa F-10 Branch',
      code: 'BR-02',
      address: 'F-10 Markaz',
      city: 'Islamabad',
      phone: '+92 301 9876543',
      isMain: false,
    },
  ]);

  const [transfers] = useState([
    {
      id: 'trf-1',
      transferNumber: 'TRF-00912',
      source: 'Al-Shifa Main Pharmacy',
      target: 'Al-Shifa F-10 Branch',
      medicine: 'Augmentin 625mg',
      quantity: 20,
      status: 'received',
      date: '2026-10-06',
    },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('branches')}
            className={activeTab === 'branches' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem' }}
          >
            <Building2 size={16} /> Branch Locations
          </button>
          <button
            onClick={() => setActiveTab('transfers')}
            className={activeTab === 'transfers' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem' }}
          >
            <ArrowRightLeft size={16} /> Inter-Branch Stock Transfers
          </button>
        </div>

        <button onClick={() => setShowTransferModal(true)} className="btn-primary" style={{ fontSize: '0.85rem' }}>
          <Plus size={16} /> Requisition Stock Transfer
        </button>
      </div>

      {/* Branch Locations View */}
      {activeTab === 'branches' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {branches.map((b) => (
            <div key={b.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{b.name}</h3>
                {b.isMain && <span className="badge badge-purple">Headquarters</span>}
              </div>

              <div style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={14} color="#38bdf8" /> {b.address}, {b.city}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={14} color="#34d399" /> {b.phone}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #334155', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span>Branch Code: <strong style={{ color: '#38bdf8' }}>{b.code}</strong></span>
                <span className="badge badge-emerald">Operational</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Transfers View */}
      {activeTab === 'transfers' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Transfer Number</th>
                <th>Source Branch</th>
                <th>Destination Branch</th>
                <th>Medicine & Quantity</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: 700 }}>{t.transferNumber}</td>
                  <td>{t.source}</td>
                  <td style={{ fontWeight: 600 }}>{t.target}</td>
                  <td>
                    {t.medicine} (<strong>{t.quantity} Units</strong>)
                  </td>
                  <td>{t.date}</td>
                  <td>
                    <span className="badge badge-emerald">RECEIVED</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stock Transfer Modal */}
      {showTransferModal && (
        <div className="modal-backdrop">
          <div className="glass-panel" style={{ width: '480px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Requisition Stock Transfer</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Stock transfer dispatched between branches.');
                setShowTransferModal(false);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
            >
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Source Branch</label>
                <select className="form-input">
                  <option>Al-Shifa Main Pharmacy (HQ-01)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Target Destination Branch</label>
                <select className="form-input">
                  <option>Al-Shifa F-10 Branch (BR-02)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Medicine</label>
                <select className="form-input">
                  <option>Panadol Extra 500mg</option>
                  <option>Augmentin 625mg</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Transfer Quantity</label>
                <input type="number" required defaultValue={10} className="form-input" />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowTransferModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Dispatch Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
