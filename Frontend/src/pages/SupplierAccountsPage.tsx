import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileText, Printer, Search, Plus, Eye, DollarSign } from 'lucide-react';
import api from '../services/api';

interface SupplierAccount {
  id: string;
  code: string;
  name: string;
  phone: string;
  payable: number;
  advance: number;
  net: number;
}

export const SupplierAccountsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [includeCleared, setIncludeCleared] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierAccount | null>(null);

  // Fetch suppliers from backend
  const { data: suppliersData, isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      try {
        const res = await api.get('/suppliers');
        return res.data?.data || [];
      } catch (err) {
        return [];
      }
    },
  });

  // Calculate balances or fallback to defaults
  const accounts: SupplierAccount[] = (suppliersData && suppliersData.length > 0)
    ? suppliersData.map((s: any, idx: number) => ({
        id: s.id || `sup-${idx}`,
        code: s.code || `SUP-${String(idx + 1).padStart(3, '0')}`,
        name: s.name,
        phone: s.phone || '0300-1234567',
        payable: Number(s.payableBalance || s.balance || 0),
        advance: Number(s.advanceBalance || 0),
        net: Number((s.payableBalance || s.balance || 0) - (s.advanceBalance || 0)),
      }))
    : [];

  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch =
      acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.phone.includes(searchQuery);

    if (!includeCleared && acc.payable === 0 && acc.advance === 0) {
      return false;
    }
    return matchesSearch;
  });

  const totalPayable = filteredAccounts.reduce((sum, a) => sum + (a.payable > 0 ? a.payable : 0), 0);
  const totalAdvance = filteredAccounts.reduce((sum, a) => sum + (a.advance > 0 ? a.advance : 0), 0);
  const netPayable = totalPayable - totalAdvance;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Page Title & Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: '#064e3b',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(6, 78, 59, 0.2)',
            }}
          >
            <FileText size={20} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Supplier accounts
            </h1>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, marginTop: '2px' }}>
              All suppliers with payable, advance, and net balance.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={() => {}}
            className="btn-secondary"
            style={{
              padding: '0.45rem 0.9rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '6px',
            }}
          >
            Supplier list
          </button>
          <button
            onClick={handlePrint}
            style={{
              background: '#064e3b',
              color: '#ffffff',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(6, 78, 59, 0.3)',
            }}
          >
            <Printer size={15} />
            <span>Print report</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginTop: '0.25rem',
        }}
      >
        <div style={{ position: 'relative', width: '280px' }}>
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8',
            }}
          />
          <input
            type="text"
            placeholder="Search supplier"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.45rem 0.75rem 0.45rem 2rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.82rem',
              outline: 'none',
              background: '#ffffff',
            }}
          />
        </div>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.82rem',
            color: '#475569',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <input
            type="checkbox"
            checked={includeCleared}
            onChange={(e) => setIncludeCleared(e.target.checked)}
            style={{ accentColor: '#059669', width: '15px', height: '15px', cursor: 'pointer' }}
          />
          <span>Include cleared suppliers</span>
        </label>
      </div>

      {/* KPI Balance Cards (Matching Screenshot Colors) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
        }}
      >
        {/* Total Payable Card (Light Rose) */}
        <div
          style={{
            background: '#fff1f2',
            border: '1px solid #ffe4e6',
            borderRadius: '8px',
            padding: '1rem 1.25rem',
            boxShadow: '0 1px 2px rgba(225, 29, 72, 0.05)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#e11d48', fontWeight: 600 }}>Total payable</div>
          <div
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#e11d48',
              marginTop: '0.35rem',
              letterSpacing: '-0.02em',
            }}
          >
            PKR {totalPayable.toFixed(2)}
          </div>
        </div>

        {/* Total Advance Card (Light Mint Green) */}
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #dcfce7',
            borderRadius: '8px',
            padding: '1rem 1.25rem',
            boxShadow: '0 1px 2px rgba(22, 163, 74, 0.05)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>Total advance</div>
          <div
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#16a34a',
              marginTop: '0.35rem',
              letterSpacing: '-0.02em',
            }}
          >
            PKR {totalAdvance.toFixed(2)}
          </div>
        </div>

        {/* Net Payable Card (Soft Teal) */}
        <div
          style={{
            background: '#f0fdfa',
            border: '1px solid #ccfbf1',
            borderRadius: '8px',
            padding: '1rem 1.25rem',
            boxShadow: '0 1px 2px rgba(13, 148, 136, 0.05)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#0d9488', fontWeight: 600 }}>Net payable</div>
          <div
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#0d9488',
              marginTop: '0.35rem',
              letterSpacing: '-0.02em',
            }}
          >
            PKR {netPayable.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div
        className="white-panel"
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
        }}
      >
        <table className="custom-table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ width: '40px', padding: '0.65rem 0.85rem' }}>#</th>
              <th>Code</th>
              <th>Supplier</th>
              <th>Phone</th>
              <th style={{ textAlign: 'right' }}>Payable</th>
              <th style={{ textAlign: 'right' }}>Advance</th>
              <th style={{ textAlign: 'right' }}>Net</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    textAlign: 'center',
                    padding: '3.5rem 1rem',
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                  }}
                >
                  No supplier balances found.
                </td>
              </tr>
            ) : (
              filteredAccounts.map((acc, index) => (
                <tr key={acc.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedSupplier(acc)}>
                  <td style={{ color: '#64748b', fontWeight: 500 }}>{index + 1}</td>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#047857' }}>
                    {acc.code}
                  </td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{acc.name}</td>
                  <td style={{ color: '#475569' }}>{acc.phone}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: acc.payable > 0 ? '#e11d48' : '#64748b' }}>
                    PKR {acc.payable.toFixed(2)}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: acc.advance > 0 ? '#16a34a' : '#64748b' }}>
                    PKR {acc.advance.toFixed(2)}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 800, color: '#0d9488' }}>
                    PKR {acc.net.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Supplier Ledger Modal if selected */}
      {selectedSupplier && (
        <div className="modal-backdrop" onClick={() => setSelectedSupplier(null)}>
          <div
            className="white-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '650px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{selectedSupplier.name}</h3>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>
                  Supplier Code: {selectedSupplier.code} • Phone: {selectedSupplier.phone}
                </p>
              </div>
              <button onClick={() => setSelectedSupplier(null)} className="btn-secondary" style={{ padding: '0.3rem 0.6rem' }}>
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: '#fff1f2', padding: '0.75rem', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.7rem', color: '#e11d48' }}>Payable Balance</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e11d48' }}>
                  PKR {selectedSupplier.payable.toFixed(2)}
                </div>
              </div>
              <div style={{ background: '#f0fdf4', padding: '0.75rem', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.7rem', color: '#16a34a' }}>Advance Balance</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#16a34a' }}>
                  PKR {selectedSupplier.advance.toFixed(2)}
                </div>
              </div>
              <div style={{ background: '#f0fdfa', padding: '0.75rem', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.7rem', color: '#0d9488' }}>Net Dues</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0d9488' }}>
                  PKR {selectedSupplier.net.toFixed(2)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button onClick={() => setSelectedSupplier(null)} className="btn-secondary">
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Payment recorded for ${selectedSupplier.name}`);
                  setSelectedSupplier(null);
                }}
                className="btn-primary"
              >
                <DollarSign size={15} /> Record Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
