import React, { useState } from 'react';
import {
  RotateCcw,
  Search,
  Plus,
  Calendar,
  DollarSign,
  ArrowUpDown,
  CheckCircle2,
  Receipt,
  FileText,
} from 'lucide-react';

interface SaleReturnRecord {
  id: string;
  returnNo: string;
  date: string;
  time: string;
  originalInvoice: string;
  customerName: string;
  customerContact?: string;
  refundMethod: string;
  account: string;
  totalRefund: number;
  operator: string;
}

interface SaleReturnsPageProps {
  onProcessNewReturn?: () => void;
  onNavigateHistory?: () => void;
}

export const SaleReturnsPage: React.FC<SaleReturnsPageProps> = ({
  onProcessNewReturn,
  onNavigateHistory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('All Methods');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [pageSize, setPageSize] = useState(15);

  const records: SaleReturnRecord[] = [
    {
      id: '1',
      returnNo: 'SR-0007',
      date: '05 Oct 2026',
      time: '08:51 AM',
      originalInvoice: 'SAL-0008',
      customerName: 'Walk-in Customer',
      refundMethod: 'Cash Payout',
      account: 'BUSINESS ACCOUNT',
      totalRefund: 100.0,
      operator: 'Syed Zubair Shah',
    },
    {
      id: '2',
      returnNo: 'SR-0006',
      date: '02 Oct 2026',
      time: '11:16 PM',
      originalInvoice: 'Direct Return',
      customerName: 'Walk-in Customer',
      refundMethod: 'Cash Payout',
      account: 'BUSINESS ACCOUNT',
      totalRefund: 900.0,
      operator: 'Syed Zubair Shah',
    },
    {
      id: '3',
      returnNo: 'SR-0005',
      date: '30 Sep 2026',
      time: '08:18 PM',
      originalInvoice: 'Direct Return',
      customerName: 'Walk-in Customer',
      refundMethod: 'Cash Payout',
      account: 'BUSINESS ACCOUNT',
      totalRefund: 390.0,
      operator: 'Syed Zubair Shah',
    },
    {
      id: '4',
      returnNo: 'SR-0004',
      date: '29 Sep 2026',
      time: '01:17 PM',
      originalInvoice: 'Direct Return',
      customerName: 'Walk-in Customer',
      refundMethod: 'Cash Payout',
      account: 'BUSINESS ACCOUNT',
      totalRefund: 590.0,
      operator: 'Syed Zubair Shah',
    },
    {
      id: '5',
      returnNo: 'SR-0003',
      date: '29 Sep 2026',
      time: '12:51 PM',
      originalInvoice: 'Direct Return',
      customerName: 'Walk-in Customer',
      refundMethod: 'Cash Payout',
      account: 'BUSINESS ACCOUNT',
      totalRefund: 500.0,
      operator: 'Syed Zubair Shah',
    },
    {
      id: '6',
      returnNo: 'SR-0002',
      date: '14 Sep 2026',
      time: '01:21 PM',
      originalInvoice: 'IND-0005',
      customerName: 'W/O Syed Muddasser Shah',
      customerContact: '03085726836',
      refundMethod: 'Cash Payout',
      account: 'BUSINESS ACCOUNT',
      totalRefund: 140.0,
      operator: 'Syed Zubair Shah',
    },
    {
      id: '7',
      returnNo: 'SR-0001',
      date: '11 Sep 2026',
      time: '07:40 PM',
      originalInvoice: 'Direct Return',
      customerName: 'Walk-in Customer',
      refundMethod: 'Cash Payout',
      account: 'BUSINESS ACCOUNT',
      totalRefund: 2300.0,
      operator: 'Syed Zubair Shah',
    },
  ];

  const totalRefunded = records.reduce((s, r) => s + r.totalRefund, 0);

  const filteredRecords = records.filter(
    (r) =>
      r.returnNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.originalInvoice.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
        <div>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#047857', letterSpacing: '0.04em' }}>
            SALES MANAGEMENT • RETURNS &amp; REFUNDS
          </div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0' }}>
            Sale Returns
          </h1>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
            Track and manage customer return vouchers, stock restock &amp; cash refunds.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={onNavigateHistory} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
            Sales History
          </button>
          <button
            onClick={onProcessNewReturn}
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
            <Plus size={15} /> Process New Return
          </button>
        </div>
      </div>

      {/* 4 Metric Cards from PDF Page 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.04em' }}>
              TOTAL RETURNS
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
              {records.length} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>Vouchers</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Total customer returns recorded</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#f8fafc', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RotateCcw size={18} />
          </div>
        </div>

        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#e11d48', letterSpacing: '0.04em' }}>
              TOTAL REFUNDED
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#e11d48', marginTop: '2px' }}>
              PKR {totalRefunded.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Cumulative refund amount issued</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#fff1f2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={18} />
          </div>
        </div>

        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#047857', letterSpacing: '0.04em' }}>
              CASH REFUNDS
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#047857', marginTop: '2px' }}>
              PKR {totalRefunded.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Paid out from till / cash accounts</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Receipt size={18} />
          </div>
        </div>

        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#047857', letterSpacing: '0.04em' }}>
              TODAY'S RETURNS
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#047857', marginTop: '2px' }}>
              PKR 0 <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>(0 today)</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Returns processed on current date</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={18} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar from PDF Page 2 */}
      <div
        className="white-panel"
        style={{
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.85rem',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search Return #, Invoice #, customer... (Alt+E)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.35rem 0.6rem 0.35rem 2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.78rem', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ color: '#64748b' }}>Method:</span>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              style={{ padding: '0.3rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', background: '#ffffff' }}
            >
              <option value="All Methods">All Methods</option>
              <option value="Cash Payout">Cash Payout</option>
              <option value="Credit Adjustment">Credit Adjustment</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ color: '#64748b' }}>Sort:</span>
            <select
              style={{ padding: '0.3rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', background: '#ffffff' }}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
            <span style={{ background: '#f1f5f9', color: '#047857', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, border: '1px solid #cbd5e1' }}>
              DESC
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ color: '#64748b' }}>Show:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              style={{ padding: '0.3rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', background: '#ffffff' }}
            >
              <option value={15}>15</option>
              <option value={25}>25</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sale Returns Table from PDF Page 2 */}
      <div className="white-panel" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <table className="custom-table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
              <th>RETURN #</th>
              <th>DATE</th>
              <th>ORIGINAL INVOICE</th>
              <th>CUSTOMER / PATIENT</th>
              <th>REFUND METHOD</th>
              <th style={{ textAlign: 'right' }}>TOTAL REFUND</th>
              <th>OPERATOR</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((r) => (
              <tr key={r.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#e11d48', fontSize: '0.8rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e11d48' }} />
                    {r.returnNo}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.78rem' }}>{r.date}</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{r.time}</div>
                </td>
                <td>
                  {r.originalInvoice.startsWith('SAL') || r.originalInvoice.startsWith('IND') ? (
                    <span style={{ background: '#f0f9ff', color: '#0284c7', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, border: '1px solid #bae6fd' }}>
                      {r.originalInvoice}
                    </span>
                  ) : (
                    <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{r.originalInvoice}</span>
                  )}
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.78rem' }}>{r.customerName}</div>
                  {r.customerContact && (
                    <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{r.customerContact}</div>
                  )}
                </td>
                <td>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: '#ecfdf5', color: '#047857', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, border: '1px solid #a7f3d0' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981' }} />
                    {r.refundMethod}
                  </div>
                  <div style={{ fontSize: '0.62rem', color: '#94a3b8', marginTop: '1px' }}>{r.account}</div>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 800, color: '#e11d48', fontSize: '0.82rem' }}>
                  PKR {r.totalRefund.toFixed(2)}
                </td>
                <td style={{ color: '#334155', fontSize: '0.78rem' }}>{r.operator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
