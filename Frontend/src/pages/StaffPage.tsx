import React, { useState } from 'react';
import { ShieldCheck, Plus, UserPlus, Lock, CheckCircle2, XCircle } from 'lucide-react';
import { User } from '../types';

export const StaffPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'staff' | 'matrix'>('staff');

  const [staffList] = useState<User[]>([
    {
      id: 'usr-1',
      name: 'Dr. Ubaid Bangash',
      email: 'owner@alshifapharmacy.com',
      role: 'PHARMACY_OWNER',
      designation: 'Managing Pharmacist & Owner',
      phone: '+92 300 1234567',
    },
    {
      id: 'usr-2',
      name: 'Sana Tariq',
      email: 'sana.pharmacist@alshifapharmacy.com',
      role: 'PHARMACIST',
      designation: 'Licensed Dispensing Pharmacist',
      phone: '+92 301 2233445',
    },
    {
      id: 'usr-3',
      name: 'Asim Raza',
      email: 'asim.cashier@alshifapharmacy.com',
      role: 'CASHIER',
      designation: 'Counter POS Cashier',
      phone: '+92 333 9988776',
    },
  ]);

  // Granular Permissions Matrix definition (SRS Section 6.11.2)
  const modules = [
    { name: 'POS & Counter Sales', owner: true, pharmacist: true, cashier: true },
    { name: 'Medicine Catalog & Pricing', owner: true, pharmacist: true, cashier: false },
    { name: 'Goods Received (GRN) & Batches', owner: true, pharmacist: true, cashier: false },
    { name: 'Supplier Management & Ledger', owner: true, pharmacist: false, cashier: false },
    { name: 'Stock Adjustment & Write-offs', owner: true, pharmacist: false, cashier: false },
    { name: 'Financial Reports & P&L', owner: true, pharmacist: false, cashier: false },
    { name: 'Discount Overrides (> 10%)', owner: true, pharmacist: true, cashier: false },
    { name: 'Void / Cancel Invoice', owner: true, pharmacist: false, cashier: false },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('staff')}
            className={activeTab === 'staff' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem' }}
          >
            <UserPlus size={16} /> Staff Members
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={activeTab === 'matrix' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem' }}
          >
            <ShieldCheck size={16} /> Granular RBAC Permissions Matrix
          </button>
        </div>

        <button className="btn-primary" style={{ fontSize: '0.85rem' }}>
          <Plus size={16} /> Invite New Staff Member
        </button>
      </div>

      {/* Staff View */}
      {activeTab === 'staff' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Email Address</th>
                <th>Role & Access Tier</th>
                <th>Designation</th>
                <th>Contact</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>{s.name}</td>
                  <td>{s.email}</td>
                  <td>
                    <span className={s.role === 'PHARMACY_OWNER' ? 'badge badge-purple' : s.role === 'PHARMACIST' ? 'badge badge-emerald' : 'badge badge-blue'}>
                      {s.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{s.designation}</td>
                  <td style={{ fontSize: '0.85rem' }}>{s.phone}</td>
                  <td>
                    <span className="badge badge-emerald">ACTIVE</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* RBAC Matrix View */}
      {activeTab === 'matrix' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Role-Based Access Control (RBAC) Enforcement</h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Granular capabilities per role. All actions are authorized at the backend API layer.
            </p>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Module / Capability</th>
                <th style={{ textAlign: 'center' }}>Pharmacy Owner</th>
                <th style={{ textAlign: 'center' }}>Pharmacist</th>
                <th style={{ textAlign: 'center' }}>Counter Cashier</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((m, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{m.name}</td>
                  <td style={{ textAlign: 'center' }}>
                    {m.owner ? <CheckCircle2 size={18} color="#10b981" style={{ margin: '0 auto' }} /> : <XCircle size={18} color="#64748b" style={{ margin: '0 auto' }} />}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {m.pharmacist ? <CheckCircle2 size={18} color="#10b981" style={{ margin: '0 auto' }} /> : <XCircle size={18} color="#64748b" style={{ margin: '0 auto' }} />}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {m.cashier ? <CheckCircle2 size={18} color="#10b981" style={{ margin: '0 auto' }} /> : <XCircle size={18} color="#64748b" style={{ margin: '0 auto' }} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
