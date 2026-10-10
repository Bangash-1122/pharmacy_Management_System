import React, { useState } from 'react';
import {
  Truck,
  Plus,
  Search,
  ArrowUpDown,
  Building2,
  Phone,
  Mail,
  FileText,
  X,
  MoreVertical,
  CheckCircle2,
} from 'lucide-react';

interface SupplierItem {
  id: string;
  code: string;
  name: string;
  contactPerson: string;
  city: string;
  phone: string;
  email: string;
  address: string;
  balance: string;
  status: 'Active' | 'Inactive';
  created: string;
}

export const SuppliersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [suppliers, setSuppliers] = useState<SupplierItem[]>([
    {
      id: 'sup-1',
      code: 'SUP-002',
      name: 'Karachi Median Company',
      contactPerson: 'Bilal Khan',
      city: 'Mardan',
      phone: '+92 345 8899001',
      email: 'karachi.med@mardan.pk',
      address: 'Main Bazar, Mardan',
      balance: 'Clear',
      status: 'Active',
      created: '06-09-2026 03:24 PM',
    },
    {
      id: 'sup-2',
      code: 'SUP-001',
      name: 'Mardan Medical Supplies',
      contactPerson: 'Ahmed Khan',
      city: 'Mardan',
      phone: '+92 317 9998881',
      email: 'mardan.med@gmail.com',
      address: 'Hospital Road, Mardan',
      balance: 'Clear',
      status: 'Active',
      created: '22-08-2026 09:05 AM',
    },
    {
      id: 'sup-3',
      code: 'SUP-005',
      name: 'Misal Enterprizer',
      contactPerson: 'Jibran',
      city: 'Mardan',
      phone: '+92 333 4455667',
      email: 'misal.dist@yahoo.com',
      address: 'Shahdhand Road, Mardan',
      balance: 'Clear',
      status: 'Active',
      created: '06-09-2026 03:04 PM',
    },
  ]);

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header from PDF Page 10 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Suppliers</h1>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
            Wholesale and distributor contacts
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.35rem 0.6rem 0.35rem 2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.78rem', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}>
            <span style={{ color: '#64748b' }}>Sort: Name</span>
            <span style={{ background: '#f1f5f9', color: '#047857', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 700, border: '1px solid #cbd5e1' }}>
              ↑ ASC
            </span>
          </div>

          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
            Accounts report
          </button>

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
            <Plus size={15} /> Add supplier
          </button>
        </div>
      </div>

      {/* Table from PDF Page 10 */}
      <div className="white-panel" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <table className="custom-table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
              <th style={{ width: '100px' }}>CODE</th>
              <th>NAME ↑ ASC</th>
              <th>CONTACT</th>
              <th>CITY</th>
              <th style={{ textAlign: 'center' }}>BALANCE</th>
              <th style={{ textAlign: 'center' }}>STATUS</th>
              <th>CREATED</th>
              <th style={{ width: '40px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#047857' }}>{s.code}</td>
                <td>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.82rem' }}>{s.name}</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{s.phone}</div>
                </td>
                <td style={{ color: '#334155', fontSize: '0.78rem' }}>{s.contactPerson}</td>
                <td style={{ color: '#475569', fontSize: '0.78rem' }}>{s.city}</td>
                <td style={{ textAlign: 'center' }}>
                  <span style={{ background: '#f8fafc', color: '#64748b', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600, border: '1px solid #e2e8f0' }}>
                    {s.balance}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className="badge badge-emerald">• {s.status}</span>
                </td>
                <td style={{ color: '#64748b', fontSize: '0.72rem' }}>{s.created}</td>
                <td style={{ textAlign: 'center' }}>
                  <MoreVertical size={14} color="#94a3b8" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ padding: '0.55rem 0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', background: '#ffffff', fontSize: '0.72rem', color: '#64748b' }}>
          <div>Showing 1 to {filtered.length} of {filtered.length} entries</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span>Show: 15 per page</span>
          </div>
        </div>
      </div>

      {/* Add Supplier Modal from PDF Page 9 */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="white-panel" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '580px', padding: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#047857', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={16} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Add supplier</h3>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748b' }}>Create a supplier for purchase invoices and stock receiving.</p>
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
                const newSup: SupplierItem = {
                  id: `sup-${Date.now()}`,
                  code: (fd.get('code') as string) || `SUP-00${suppliers.length + 1}`,
                  name: fd.get('name') as string,
                  contactPerson: fd.get('contactPerson') as string,
                  city: fd.get('city') as string,
                  phone: fd.get('phone') as string,
                  email: fd.get('email') as string,
                  address: fd.get('address') as string,
                  balance: 'Clear',
                  status: 'Active',
                  created: 'Just now',
                };
                setSuppliers([newSup, ...suppliers]);
                setShowAddModal(false);
                alert(`Supplier ${newSup.name} created successfully.`);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
            >
              {/* Basic Information */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>Basic information</div>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '0.6rem' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Supplier code *</label>
                    <input name="code" defaultValue={`SUP-00${suppliers.length + 3}`} className="form-input form-input-sm" required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Supplier name *</label>
                    <input name="name" placeholder="e.g. Ferozsons Laboratories" className="form-input form-input-sm" required />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>Contact information</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Contact person</label>
                    <input name="contactPerson" placeholder="Full name" className="form-input form-input-sm" />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Phone *</label>
                    <input name="phone" placeholder="+92 300 1234567" className="form-input form-input-sm" required />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginTop: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Email</label>
                    <input name="email" type="email" placeholder="supplier@example.com" className="form-input form-input-sm" />
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

              {/* Notes */}
              <div>
                <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Notes</label>
                <textarea name="notes" placeholder="Optional notes about this supplier" rows={2} className="form-input form-input-sm" />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#334155', cursor: 'pointer' }}>
                <input type="checkbox" name="isActive" defaultChecked style={{ accentColor: '#047857' }} />
                <span>Supplier is active</span>
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <CheckCircle2 size={15} /> Create supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
