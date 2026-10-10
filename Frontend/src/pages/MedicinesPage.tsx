import React, { useState } from 'react';
import {
  Pill,
  Plus,
  Search,
  MoreVertical,
  CheckCircle2,
  X,
  FileText,
  Sliders,
  DollarSign,
  Package,
} from 'lucide-react';

interface ProductItem {
  id: string;
  pCode: string;
  name: string;
  category: string;
  unit: string;
  boxShelf: string;
  purchasePrice: number;
  salePrice: number;
  reorder: number;
  status: 'Active' | 'Inactive';
}

export const MedicinesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [products, setProducts] = useState<ProductItem[]>([
    { id: '1', pCode: 'ITM-0001', name: 'OT Charges', category: '—', unit: 'piece', boxShelf: '—', purchasePrice: 60000, salePrice: 60000, reorder: 0, status: 'Active' },
    { id: '2', pCode: 'ITM-0002', name: 'OT Medicine Charges', category: '—', unit: 'piece', boxShelf: '—', purchasePrice: 0, salePrice: 45000, reorder: 0, status: 'Active' },
    { id: '3', pCode: 'ITM-0003', name: 'Surgeon Fee', category: '—', unit: 'piece', boxShelf: '—', purchasePrice: 0, salePrice: 70000, reorder: 0, status: 'Active' },
    { id: '4', pCode: 'ITM-0004', name: 'Radiology Department Charges', category: '—', unit: 'piece', boxShelf: '—', purchasePrice: 0, salePrice: 15000, reorder: 0, status: 'Active' },
    { id: '5', pCode: 'ITM-0005', name: 'Laboratory Charges', category: '—', unit: 'piece', boxShelf: '—', purchasePrice: 0, salePrice: 18700, reorder: 0, status: 'Active' },
    { id: '6', pCode: 'ITM-0006', name: 'Laparoscopic Colorectal/Bowel Resection', category: '—', unit: 'piece', boxShelf: '—', purchasePrice: 0, salePrice: 150000, reorder: 0, status: 'Active' },
    { id: '7', pCode: 'ITM-0007', name: 'Cardiac Consultation', category: '—', unit: 'piece', boxShelf: '—', purchasePrice: 4000, salePrice: 4000, reorder: 0, status: 'Active' },
    { id: '8', pCode: 'ITM-0008', name: 'Orthopedic Consultation', category: '—', unit: 'piece', boxShelf: '—', purchasePrice: 3000, salePrice: 3000, reorder: 0, status: 'Active' },
    { id: '9', pCode: 'ITM-0009', name: 'Crespin Gel + Injection', category: '—', unit: 'piece', boxShelf: '—', purchasePrice: 45000, salePrice: 45000, reorder: 0, status: 'Active' },
    { id: '10', pCode: 'ITM-0010', name: 'Physiotherapist Consultation', category: '—', unit: 'piece', boxShelf: '—', purchasePrice: 2000, salePrice: 2000, reorder: 0, status: 'Active' },
    { id: '11', pCode: 'ITM-0011', name: 'Anesthesia Charges', category: '—', unit: 'piece', boxShelf: '—', purchasePrice: 7000, salePrice: 7000, reorder: 0, status: 'Active' },
    { id: '12', pCode: '1', name: 'Lingab 75mg Capsules', category: 'Tablets', unit: 'capsule', boxShelf: '—', purchasePrice: 465.12, salePrice: 680, reorder: 10, status: 'Active' },
    { id: '13', pCode: '2', name: 'Betnilan 0.5 Tab', category: 'Tablets', unit: 'tablet', boxShelf: '—', purchasePrice: 826.78, salePrice: 967, reorder: 10, status: 'Active' },
    { id: '14', pCode: '3', name: 'Cetralex 50mg Tablet', category: 'Tablets', unit: 'tablet', boxShelf: '—', purchasePrice: 927.5, salePrice: 1356, reorder: 10, status: 'Active' },
    { id: '15', pCode: '4', name: 'Vodyson 20mg Tablet', category: 'Tablets', unit: 'tablet', boxShelf: '108', purchasePrice: 586.53, salePrice: 686, reorder: 10, status: 'Active' },
  ]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.pCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header from PDF Page 12 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Products</h1>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
            Medicine and item catalog (Total: 2,090)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search name, PCODE, box..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.35rem 0.6rem 0.35rem 2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.78rem', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}>
            <span style={{ color: '#64748b' }}>Sort: P.Code / SKU</span>
            <span style={{ background: '#f1f5f9', color: '#047857', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 700, border: '1px solid #cbd5e1' }}>
              ↑ ASC
            </span>
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
            <Plus size={15} /> Add product
          </button>
        </div>
      </div>

      {/* Catalog Table from PDF Page 12 */}
      <div className="white-panel" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <table className="custom-table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
              <th style={{ width: '110px' }}>P.CODE / SKU ↑ ASC</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>UNIT</th>
              <th>BOX / SHELF</th>
              <th style={{ textAlign: 'right' }}>PURCHASE</th>
              <th style={{ textAlign: 'right' }}>SALE</th>
              <th style={{ textAlign: 'center' }}>REORDER</th>
              <th style={{ textAlign: 'center' }}>STATUS</th>
              <th style={{ width: '35px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#047857', fontSize: '0.78rem' }}>
                  {item.pCode}
                </td>
                <td style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.8rem' }}>{item.name}</td>
                <td style={{ color: '#64748b', fontSize: '0.75rem' }}>{item.category}</td>
                <td style={{ color: '#64748b', fontSize: '0.75rem' }}>{item.unit}</td>
                <td style={{ color: '#64748b', fontSize: '0.75rem' }}>{item.boxShelf}</td>
                <td style={{ textAlign: 'right', color: '#475569', fontSize: '0.78rem' }}>
                  {item.purchasePrice.toLocaleString()}
                </td>
                <td style={{ textAlign: 'right', fontWeight: 700, color: '#0f172a', fontSize: '0.78rem' }}>
                  {item.salePrice.toLocaleString()}
                </td>
                <td style={{ textAlign: 'center', color: '#64748b', fontSize: '0.75rem' }}>{item.reorder}</td>
                <td style={{ textAlign: 'center' }}>
                  <span className="badge badge-emerald">• {item.status}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <MoreVertical size={14} color="#94a3b8" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ padding: '0.55rem 0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', background: '#ffffff', fontSize: '0.72rem', color: '#64748b' }}>
          <div>Showing 1 to 15 of 2090 entries</div>
          <div style={{ display: 'flex', gap: '2px' }}>
            <span style={{ padding: '0.2rem 0.45rem', background: '#047857', color: '#ffffff', borderRadius: '3px', fontWeight: 700 }}>1</span>
            <span style={{ padding: '0.2rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}>2</span>
            <span style={{ padding: '0.2rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}>3</span>
            <span style={{ padding: '0.2rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}>Next →</span>
          </div>
        </div>
      </div>

      {/* Add New Medicine / Product Modal matching PDF Page 11 */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="white-panel" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '900px', padding: '1.5rem', maxHeight: '92vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Add New Medicine / Product</h3>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Configure product identification, packing conversions, automated trade margins, and inventory controls.</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('New product created successfully in catalog and formulary!');
                    setShowAddModal(false);
                  }}
                  className="btn-primary"
                  style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem' }}
                >
                  <CheckCircle2 size={14} /> Create Product
                </button>
              </div>
            </div>

            {/* 2-Column Form Layout from PDF Page 11 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.25rem' }}>
              {/* Left Column: Nomenclature & Pricing & Packing */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* 1. Nomenclature */}
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Product Identification &amp; Nomenclature</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: '#64748b' }}>Product Trade Name *</label>
                      <input placeholder="e.g. Panadol Extra 500mg, Augmentin 625mg, Disprin" className="form-input form-input-sm" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#64748b' }}>Generic Formula Name</label>
                        <input placeholder="e.g. Paracetamol + Caffeine" className="form-input form-input-sm" />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#64748b' }}>Salt / Active Composition</label>
                        <input placeholder="e.g. Acetaminophen 500mg" className="form-input form-input-sm" />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#64748b' }}>Category</label>
                        <select className="form-input form-input-sm" style={{ background: '#ffffff' }}>
                          <option>-- Select Category --</option>
                          <option>Tablets</option>
                          <option>Syrups &amp; Suspensions</option>
                          <option>Injections</option>
                          <option>Surgical Supplies</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#64748b' }}>Dosage Form / Product Type</label>
                        <input placeholder="Tablet, Syrup, Capsule, Inj" className="form-input form-input-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Commercial Pricing & Margins from PDF Page 11 */}
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a' }}>Commercial Pricing &amp; Retail Margins</div>
                    <div style={{ display: 'flex', gap: '0.3rem', fontSize: '0.65rem' }}>
                      <span style={{ background: '#ecfdf5', color: '#047857', padding: '0.1rem 0.3rem', borderRadius: '3px', fontWeight: 700 }}>Auto Margin Linking</span>
                      <span style={{ background: '#f1f5f9', color: '#475569', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>TP-15%</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: '#047857', fontWeight: 700 }}>SALE / RETAIL PRICE (RP) *</label>
                      <input type="number" defaultValue={0} className="form-input form-input-sm" style={{ fontWeight: 800 }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>PURCHASE / TRADE PRICE (TP) *</label>
                      <input type="number" defaultValue={0} className="form-input form-input-sm" style={{ fontWeight: 800 }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginTop: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.68rem', color: '#64748b' }}>Wholesale T.P.</label>
                      <input type="number" defaultValue={0} className="form-input form-input-sm" />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.68rem', color: '#64748b' }}>Printed R.P. on Pack</label>
                      <input type="number" defaultValue={0} className="form-input form-input-sm" />
                    </div>
                  </div>
                </div>

                {/* 3. Packing & Units Conversion */}
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Packing &amp; Units Conversion</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.68rem', color: '#64748b' }}>Pieces per Pack *</label>
                      <input type="number" defaultValue={10} className="form-input form-input-sm" />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.68rem', color: '#64748b' }}>Pack Unit Name</label>
                      <input defaultValue="PACK" className="form-input form-input-sm" />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.68rem', color: '#64748b' }}>Rack / Shelf / Box</label>
                      <input placeholder="e.g. Shelf A-4, Box 12" className="form-input form-input-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Codes, Barcodes, Inventory & Expiry */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Codes &amp; Barcode Scanning</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: '#64748b' }}>Product Code (SKU)</label>
                      <input defaultValue="ITM-2091" className="form-input form-input-sm" />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: '#64748b' }}>Barcode / EAN</label>
                      <input defaultValue="8900000002091" className="form-input form-input-sm" />
                    </div>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Inventory &amp; Expiry Controls</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: '#64748b' }}>Reorder Alert Level (Loose pieces)</label>
                      <input type="number" defaultValue={10} className="form-input form-input-sm" />
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#334155', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked style={{ accentColor: '#047857' }} />
                      <span>Track Product Expiry Dates</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#334155', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked style={{ accentColor: '#047857' }} />
                      <span>Active Product (Available for billing)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.7rem', color: '#64748b' }}>Clinical Indication &amp; Notes</label>
                  <textarea rows={2} placeholder="e.g. Pain relief, fever, bacterial infections" className="form-input form-input-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
