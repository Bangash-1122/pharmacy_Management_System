import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  CheckCircle2,
  X,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

interface CustomerItem {
  id: string;
  code: string;
  name: string;
  fatherName: string;
  phone: string;
  email: string;
  area: string;
  city: string;
  address: string;
  balance: number;
  status: 'Active' | 'Inactive';
}

export const CustomersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [customers, setCustomers] = useState<CustomerItem[]>([
    {
      id: 'cust-1',
      code: 'CUS-001',
      name: 'Walk-in Customer',
      fatherName: '—',
      phone: '0300-0000000',
      email: 'walkin@hwk-hospital.pk',
      area: 'Hospital Counter',
      city: 'Mardan',
      address: 'General OPD Counter',
      balance: 0,
      status: 'Active',
    },
    {
      id: 'cust-2',
      code: 'CUS-002',
      name: 'Mr. Syed Zubair Shah',
      fatherName: 'Syed Waris Khan',
      phone: '0333-9123456',
      email: 'zubair@hwk-hospital.pk',
      area: 'Cantt',
      city: 'Mardan',
      address: 'House 14, Sector B',
      balance: 0,
      status: 'Active',
    },
    {
      id: 'cust-3',
      code: 'CUS-012',
      name: 'W/O Syed Muddasser Shah',
      fatherName: 'Syed Muddasser Shah',
      phone: '0308-5726836',
      email: 'muddasser@example.com',
      area: 'Dora Road',
      city: 'Mardan',
      address: 'Street 4, Near Grid Station',
      balance: 140,
      status: 'Active',
    },
  ]);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Customers &amp; Patients</h1>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
            Registered clinic patients, retail accounts, and receivables
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search customer, code, mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.35rem 0.6rem 0.35rem 2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.78rem', outline: 'none' }}
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: '#047857',
              color: '#ffffff',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Plus size={15} /> Add customer
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="white-panel" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <table className="custom-table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
              <th style={{ width: '90px' }}>CODE</th>
              <th>CUSTOMER NAME</th>
              <th>FATHER / SPOUSE</th>
              <th>MOBILE</th>
              <th>LOCATION / CITY</th>
              <th style={{ textAlign: 'right' }}>OUTSTANDING</th>
              <th style={{ textAlign: 'center' }}>STATUS</th>
              <th style={{ width: '35px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#047857' }}>{c.code}</td>
                <td>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.8rem' }}>{c.name}</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{c.email}</div>
                </td>
                <td style={{ color: '#64748b', fontSize: '0.78rem' }}>{c.fatherName}</td>
                <td style={{ color: '#334155', fontSize: '0.78rem' }}>{c.phone}</td>
                <td style={{ color: '#475569', fontSize: '0.78rem' }}>{c.city} ({c.area})</td>
                <td style={{ textAlign: 'right', fontWeight: 700, color: c.balance > 0 ? '#e11d48' : '#047857' }}>
                  PKR {c.balance.toFixed(2)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className="badge badge-emerald">• {c.status}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <MoreVertical size={14} color="#94a3b8" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal matching PDF Page 13 */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="white-panel" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '580px', padding: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#047857', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={16} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Add customer</h3>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748b' }}>Create a customer for sales invoices and account tracking.</p>
                </div>
              </div>
              <button onClick={() => setShowAddModal(false)} className="btn-secondary" style={{ padding: '0.2rem 0.5rem' }}>
                <X size={14} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const newCust: CustomerItem = {
                  id: `cust-${Date.now()}`,
                  code: (fd.get('code') as string) || `CUS-013`,
                  name: fd.get('name') as string,
                  fatherName: (fd.get('fatherName') as string) || '—',
                  phone: fd.get('phone') as string,
                  email: (fd.get('email') as string) || '',
                  area: (fd.get('area') as string) || 'Mardan',
                  city: (fd.get('city') as string) || 'Mardan',
                  address: (fd.get('address') as string) || '',
                  balance: 0,
                  status: 'Active',
                };
                setCustomers([newCust, ...customers]);
                setShowAddModal(false);
                alert(`Customer ${newCust.name} created successfully.`);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
            >
              {/* Basic Information */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>Basic information</div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: '0.6rem' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Customer code *</label>
                    <input name="code" defaultValue="CUS-013" className="form-input form-input-sm" required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Customer name *</label>
                    <input name="name" placeholder="Full name" className="form-input form-input-sm" required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Father / W/O</label>
                    <input name="fatherName" placeholder="Father or husband name" className="form-input form-input-sm" />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>Contact information</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Phone (PK +92) *</label>
                    <input name="phone" placeholder="+92 300 1234567" className="form-input form-input-sm" required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Email</label>
                    <input name="email" type="email" placeholder="customer@example.com" className="form-input form-input-sm" />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>Location</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Area</label>
                    <input name="area" placeholder="Local area" className="form-input form-input-sm" />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#64748b' }}>City</label>
                    <input name="city" defaultValue="Mardan" className="form-input form-input-sm" />
                  </div>
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Address</label>
                  <input name="address" placeholder="Street address" className="form-input form-input-sm" />
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#334155', cursor: 'pointer' }}>
                <input type="checkbox" name="isActive" defaultChecked style={{ accentColor: '#047857' }} />
                <span>Customer is active (visible on New Sale)</span>
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <CheckCircle2 size={15} /> Create customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
