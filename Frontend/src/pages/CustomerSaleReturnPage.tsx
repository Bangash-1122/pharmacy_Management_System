import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface ReturnRow {
  id: string;
  name: string;
  packQty: number;
  looseQty: number;
  packPrice: number;
  loosePrice: number;
  total: number;
}

interface CustomerSaleReturnPageProps {
  onBack?: () => void;
}

export const CustomerSaleReturnPage: React.FC<CustomerSaleReturnPageProps> = ({ onBack }) => {
  const [invoiceRef, setInvoiceRef] = useState('');
  const [returnDate, setReturnDate] = useState('10/10/2026');
  const [customerName, setCustomerName] = useState('-- Walk-in / Search Customer --');
  const [refundMethod, setRefundMethod] = useState('Cash Refund (Pay Customer Now)');
  const [cashAccount, setCashAccount] = useState('BUSINESS ACCOUNT (1)');
  const [notesReason, setNotesReason] = useState('');

  const [rows, setRows] = useState<ReturnRow[]>([
    {
      id: '1',
      name: '-- Search or Select Product --',
      packQty: 0,
      looseQty: 0,
      packPrice: 0,
      loosePrice: 0,
      total: 0,
    },
  ]);

  const subtotal = rows.reduce((s, r) => s + r.total, 0);

  const handleLoadInvoice = () => {
    if (!invoiceRef.trim()) {
      alert('Please enter an invoice reference (e.g. SAL-0008).');
      return;
    }
    setCustomerName('Walk-in Customer');
    setRows([
      {
        id: '1',
        name: 'Panadol Extra 500mg (Box of 200 Tabs)',
        packQty: 0,
        looseQty: 10,
        packPrice: 550,
        loosePrice: 2.75,
        total: 27.5,
      },
      {
        id: '2',
        name: 'Augmentin 625mg (Strip of 6 Tabs)',
        packQty: 1,
        looseQty: 0,
        packPrice: 350,
        loosePrice: 58.33,
        total: 350.0,
      },
    ]);
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: `row-${Date.now()}`,
        name: '-- Search or Select Product --',
        packQty: 0,
        looseQty: 1,
        packPrice: 0,
        loosePrice: 0,
        total: 0,
      },
    ]);
  };

  const removeRow = (id: string) => {
    if (rows.length <= 1) {
      setRows([
        {
          id: '1',
          name: '-- Search or Select Product --',
          packQty: 0,
          looseQty: 0,
          packPrice: 0,
          loosePrice: 0,
          total: 0,
        },
      ]);
    } else {
      setRows(rows.filter((r) => r.id !== id));
    }
  };

  const handleConfirm = () => {
    alert(`Customer return of PKR ${subtotal.toFixed(2)} processed and cash refund issued.`);
    onBack?.();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={onBack} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
            <ArrowLeft size={14} /> Back
          </button>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'inline' }}>
              Customer Sale Return &amp; Refund
            </h2>
            <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: '0.5rem' }}>
              • Restock items, restore inventory, issue refund
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={addRow} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
            + Add Row
          </button>
          <button
            onClick={handleConfirm}
            style={{
              background: '#e11d48',
              color: '#ffffff',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            Process (PKR {subtotal.toFixed(2)})
          </button>
        </div>
      </div>

      {/* Amber Find & Edit Invoice Bar from PDF Page 4 */}
      <div
        style={{
          background: '#ffffff',
          border: '1.5px solid #f59e0b',
          borderRadius: '8px',
          padding: '0.65rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 1px 3px rgba(245, 158, 11, 0.08)',
        }}
      >
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#b45309', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
          FIND &amp; EDIT INVOICE (ALT+E / ENTER):
        </span>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Scan barcode or enter invoice reference (e.g. SAL-0001 or sale ID...)"
            value={invoiceRef}
            onChange={(e) => setInvoiceRef(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleLoadInvoice();
            }}
            style={{ width: '100%', padding: '0.35rem 0.6rem 0.35rem 2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.78rem', outline: 'none' }}
          />
        </div>
        <button
          onClick={handleLoadInvoice}
          style={{ background: '#f59e0b', color: '#ffffff', border: 'none', padding: '0.4rem 0.85rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          Load Invoice
        </button>
      </div>

      {/* Main Grid: Return Line Items (Left) & Refund Details Panel (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 310px', gap: '1rem', alignItems: 'start' }}>
        {/* Left Side: Items Table */}
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155' }}>
              RETURN LINE ITEMS ({rows.length} item)
            </div>
            <button onClick={addRow} style={{ background: 'transparent', border: 'none', color: '#e11d48', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
              + Add Row
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Scan barcode..."
              style={{ padding: '0.35rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.78rem' }}
            />
            <input
              type="text"
              placeholder="Type product name, SKU, generic or salt to add (Alt+P)..."
              style={{ padding: '0.35rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.78rem' }}
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table" style={{ width: '100%' }}>
              <thead>
                <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
                  <th style={{ width: '30px' }}>#</th>
                  <th>PRODUCT</th>
                  <th style={{ width: '65px', textAlign: 'center' }}>PACK QTY</th>
                  <th style={{ width: '65px', textAlign: 'center' }}>LOOSE QTY</th>
                  <th style={{ width: '75px', textAlign: 'right' }}>PACK PRICE</th>
                  <th style={{ width: '75px', textAlign: 'right' }}>LOOSE PRICE</th>
                  <th style={{ width: '90px', textAlign: 'right' }}>REFUND TOTAL</th>
                  <th style={{ width: '40px', textAlign: 'center' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={r.id}>
                    <td style={{ color: '#64748b' }}>{idx + 1}</td>
                    <td>
                      <select
                        style={{ width: '100%', padding: '0.3rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', background: '#ffffff' }}
                      >
                        <option>{r.name}</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        min="0"
                        value={r.packQty}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setRows(rows.map((row) => (row.id === r.id ? { ...row, packQty: val, total: val * row.packPrice + row.looseQty * row.loosePrice } : row)));
                        }}
                        style={{ width: '50px', padding: '0.2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', textAlign: 'center' }}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        min="0"
                        value={r.looseQty}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setRows(rows.map((row) => (row.id === r.id ? { ...row, looseQty: val, total: row.packQty * row.packPrice + val * row.loosePrice } : row)));
                        }}
                        style={{ width: '50px', padding: '0.2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', textAlign: 'center' }}
                      />
                    </td>
                    <td style={{ textAlign: 'right', color: '#475569', fontSize: '0.75rem' }}>{r.packPrice.toFixed(2)}</td>
                    <td style={{ textAlign: 'right', color: '#475569', fontSize: '0.75rem' }}>{r.loosePrice.toFixed(2)}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: '#e11d48', fontSize: '0.78rem' }}>
                      PKR {r.total.toFixed(2)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button onClick={() => removeRow(r.id)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', whiteSpace: 'nowrap' }}>
              NOTES / REASON:
            </span>
            <input
              type="text"
              placeholder="e.g. Wrong dosage, customer allergy, sealed pack returned in good condition..."
              value={notesReason}
              onChange={(e) => setNotesReason(e.target.value)}
              style={{ flex: 1, padding: '0.35rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem' }}
            />
          </div>
        </div>

        {/* Right Side: REFUND DETAILS Panel from PDF Page 4 */}
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.04em' }}>
              REFUND DETAILS
            </div>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', background: '#f1f5f9', padding: '0.1rem 0.35rem', borderRadius: '3px' }}>
              SETTLEMENT
            </span>
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Return Date</label>
            <input
              type="text"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              style={{ width: '100%', padding: '0.35rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.78rem', marginTop: '2px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Customer (Alt+C)</label>
            <select
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{ width: '100%', padding: '0.35rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.78rem', background: '#ffffff', marginTop: '2px' }}
            >
              <option value="-- Walk-in / Search Customer --">-- Walk-in / Search Customer --</option>
              <option value="Walk-in Customer">Walk-in Customer</option>
              <option value="Mr. Syed Zubair Shah">Mr. Syed Zubair Shah</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Refund Method</label>
            <select
              value={refundMethod}
              onChange={(e) => setRefundMethod(e.target.value)}
              style={{ width: '100%', padding: '0.35rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.78rem', background: '#ffffff', marginTop: '2px' }}
            >
              <option value="Cash Refund (Pay Customer Now)">Cash Refund (Pay Customer Now)</option>
              <option value="Account Credit Adjustment">Account Credit Adjustment</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Refund From Cash Account</label>
            <select
              value={cashAccount}
              onChange={(e) => setCashAccount(e.target.value)}
              style={{ width: '100%', padding: '0.35rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.78rem', background: '#ffffff', marginTop: '2px' }}
            >
              <option value="BUSINESS ACCOUNT (1)">BUSINESS ACCOUNT (1)</option>
              <option value="COUNTER TILL (2)">COUNTER TILL (2)</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Items Subtotal:</span>
              <span style={{ fontWeight: 600 }}>PKR {subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Discount Deduction:</span>
              <span>0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tax / Fee:</span>
              <span>0</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Total Refund:</span>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#e11d48' }}>
              PKR {subtotal.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleConfirm}
            style={{
              background: '#e11d48',
              color: '#ffffff',
              border: 'none',
              padding: '0.55rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              marginTop: '0.3rem',
            }}
          >
            <CheckCircle2 size={15} />
            <span>Confirm Return &amp; Refund</span>
          </button>
        </div>
      </div>
    </div>
  );
};
