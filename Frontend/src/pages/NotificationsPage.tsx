import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  CreditCard,
  BedDouble,
  Search,
  Plus,
  Sliders,
  Package,
  Calendar,
} from 'lucide-react';

interface NotificationsPageProps {
  onNewPurchase?: () => void;
  onFullInventory?: () => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  onNewPurchase,
  onFullInventory,
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'credit' | 'admissions'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');

  const depletedItems = [
    { name: 'Galaxy 20mg Capsule', category: 'Tablets', sku: '1915', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 750.00' },
    { name: 'Mep 40mg Capsule', category: 'Tablets', sku: '775', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 455.00' },
    { name: 'Levoma 50mg Tablet', category: 'Tablets', sku: '1295', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 480.00' },
    { name: 'Syringe 10cc', category: 'Surgical', sku: '1190', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 30.00' },
    { name: 'Comfarta 10mg Tablet', category: 'Tablets', sku: '1692', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 435.00' },
    { name: 'Qusel 25mg Tablet', category: 'Tablets', sku: '373', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 673.00' },
    { name: 'Tanzo 4.5mg Injection', category: 'Injections', sku: '491', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 1,231.00' },
    { name: 'Zeegap 75 Tablets', category: 'Tablets', sku: '1069', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 1,101.00' },
    { name: 'Arthosim Tablet', category: 'Tablets', sku: '1697', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 1,239.00' },
    { name: 'Sensival 25Mg Tablet', category: 'Injections', sku: '1794', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 198.00' },
    { name: 'Genbrol 650+50mg Tablet', category: 'Tablets', sku: '286', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 240.00' },
    { name: 'Panadol Night', category: 'Tablets', sku: '279', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 230.40' },
    { name: 'Redrine Tablet', category: 'Tablets', sku: '1526', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 850.00' },
    { name: 'Daycef 250mg Tablet', category: 'Tablets', sku: '665', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 760.00' },
    { name: 'Acocia 100mg Tablet', category: 'Tablets', sku: '932', status: '0.00 (OUT OF STOCK)', reorder: 10, price: 'Rs. 740.00' },
  ];

  const filteredItems = depletedItems.filter((i) =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.sku.includes(searchQuery)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header from PDF Page 6 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
        <div>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#e11d48', letterSpacing: '0.04em' }}>
            OPERATIONS • ATTENTION CENTER
          </div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0' }}>
            Notifications &amp; Alerts
          </h1>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
            Live operational alerts across stock depletion, credit sales &amp; hospital admissions.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={onFullInventory} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
            Full Inventory
          </button>
          <button
            onClick={onNewPurchase}
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
            <Plus size={15} /> + New Purchase (Stock In)
          </button>
        </div>
      </div>

      {/* 4 KPI Cards from PDF Page 6 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#e11d48' }}>OUT OF STOCK</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
              2,058 <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e11d48' }}>Zero Units</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Products requiring emergency replenishment</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#fff1f2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={18} />
          </div>
        </div>

        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#b45309' }}>LOW STOCK WARNING</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
              5 <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#b45309' }}>Near Threshold</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Stock on hand below reorder quantity</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#fffbeb', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={18} />
          </div>
        </div>

        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0284c7' }}>CREDIT SALES (60D)</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
              0 <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0284c7' }}>Rs. 0</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Credit transactions pending patient settlement</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CreditCard size={18} />
          </div>
        </div>

        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0d9488' }}>ACTIVE ADMISSIONS</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
              0 <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0d9488' }}>Stable Wards</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Currently admitted in VIP &amp; indoor rooms</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#f0fdfa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BedDouble size={18} />
          </div>
        </div>
      </div>

      {/* Tabs Row from PDF Page 6 */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('inventory')}
          style={{
            background: activeTab === 'inventory' ? '#ffffff' : 'transparent',
            border: activeTab === 'inventory' ? '1px solid #cbd5e1' : 'none',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: activeTab === 'inventory' ? '#0f172a' : '#64748b',
            cursor: 'pointer',
          }}
        >
          Inventory Depletion <span style={{ background: '#e11d48', color: '#ffffff', fontSize: '0.62rem', padding: '0.05rem 0.35rem', borderRadius: '9999px', marginLeft: '4px' }}>2,063</span>
        </button>
        <button
          onClick={() => setActiveTab('credit')}
          style={{
            background: activeTab === 'credit' ? '#ffffff' : 'transparent',
            border: activeTab === 'credit' ? '1px solid #cbd5e1' : 'none',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: activeTab === 'credit' ? '#0f172a' : '#64748b',
            cursor: 'pointer',
          }}
        >
          Credit Transactions (0)
        </button>
        <button
          onClick={() => setActiveTab('admissions')}
          style={{
            background: activeTab === 'admissions' ? '#ffffff' : 'transparent',
            border: activeTab === 'admissions' ? '1px solid #cbd5e1' : 'none',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: activeTab === 'admissions' ? '#0f172a' : '#64748b',
            cursor: 'pointer',
          }}
        >
          Hospital Admissions (0)
        </button>
      </div>

      {/* Search & Severity Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search medicine, generic, PCODE, barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.35rem 0.6rem 0.35rem 2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.78rem', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
          <span style={{ color: '#64748b' }}>Severity:</span>
          <select style={{ padding: '0.3rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', background: '#ffffff' }}>
            <option>All Depleted Stock (2,063)</option>
            <option>Critical (0 Units)</option>
          </select>
          <span style={{ color: '#64748b' }}>Show:</span>
          <select style={{ padding: '0.3rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', background: '#ffffff' }}>
            <option>15 rows</option>
            <option>25 rows</option>
          </select>
        </div>
      </div>

      {/* Depleted Stock Table from PDF Page 6 */}
      <div className="white-panel" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <table className="custom-table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
              <th>PRODUCT INFORMATION</th>
              <th>CATEGORY</th>
              <th>BARCODE / SKU</th>
              <th>STOCK STATUS</th>
              <th style={{ textAlign: 'center' }}>REORDER LEVEL</th>
              <th style={{ textAlign: 'right' }}>RETAIL PRICE</th>
              <th style={{ textAlign: 'center' }}>QUICK ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.sku}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#e11d48', fontWeight: 800 }}>!</span>
                    <strong style={{ color: '#0f172a', fontSize: '0.78rem' }}>{item.name}</strong>
                  </div>
                </td>
                <td style={{ color: '#64748b', fontSize: '0.75rem' }}>{item.category}</td>
                <td style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '0.75rem' }}>{item.sku}</td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#e11d48', fontWeight: 700, fontSize: '0.75rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e11d48' }} />
                    {item.status}
                  </span>
                </td>
                <td style={{ textAlign: 'center', fontWeight: 600, color: '#334155', fontSize: '0.78rem' }}>{item.reorder}</td>
                <td style={{ textAlign: 'right', fontWeight: 700, color: '#0f172a', fontSize: '0.78rem' }}>{item.price}</td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem' }}>
                    <button
                      onClick={onNewPurchase}
                      style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      + Purchase
                    </button>
                    <button
                      onClick={onFullInventory}
                      style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#475569', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Adjust
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ padding: '0.55rem 0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', background: '#ffffff', fontSize: '0.72rem', color: '#64748b' }}>
          <div>Showing 1 to 15 of 2063 entries</div>
          <div style={{ display: 'flex', gap: '2px' }}>
            <span style={{ padding: '0.2rem 0.45rem', background: '#047857', color: '#ffffff', borderRadius: '3px', fontWeight: 700 }}>1</span>
            <span style={{ padding: '0.2rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}>2</span>
            <span style={{ padding: '0.2rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}>3</span>
            <span style={{ padding: '0.2rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}>Next →</span>
          </div>
        </div>
      </div>
    </div>
  );
};
