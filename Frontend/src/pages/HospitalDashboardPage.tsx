import React, { useState } from 'react';
import {
  Activity,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Truck,
  Users,
  BedDouble,
  Tv,
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  PieChart,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  Plus,
} from 'lucide-react';

interface DashboardProps {
  onNavigateTab?: (tab: string) => void;
}

export const HospitalDashboardPage: React.FC<DashboardProps> = ({ onNavigateTab }) => {
  const [selectedRange, setSelectedRange] = useState('Today');
  const [fromDate, setFromDate] = useState('10/10/2026');
  const [toDate, setToDate] = useState('10/10/2026');

  const rangeButtons = ['Today', 'Yesterday', '7 Days', '30 Days', 'This Month', 'Last Month', 'This Year'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header Information */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Hospital &amp; Pharmacy Dashboard
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '3px 0 0' }}>
            Live operational &amp; financial intelligence for <strong style={{ color: '#047857' }}>Haji Waris Khan General Hospital</strong> — sales, cash, stock, OT procedures, and patient occupancy.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#047857', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700, border: '1px solid #a7f3d0' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }} />
            <span>Live System</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Sat, 10 Oct 2026</span>
        </div>
      </div>

      {/* Date Filter Bar from Image 2 */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#f8fafc', padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.78rem', color: '#334155', fontWeight: 600 }}>
            <Calendar size={13} color="#047857" />
            <span>DATE FILTER: Today (10 Oct 2026)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#64748b' }}>
            <span>From:</span>
            <input
              type="text"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{ width: '90px', padding: '0.2rem 0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem' }}
            />
            <span>To:</span>
            <input
              type="text"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{ width: '90px', padding: '0.2rem 0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem' }}
            />
            <button
              style={{ background: '#047857', color: '#ffffff', border: 'none', padding: '0.25rem 0.65rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Apply Filter
            </button>
          </div>
        </div>

        {/* Range Buttons & Quick Counts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '2px', background: '#f1f5f9', padding: '2px', borderRadius: '6px' }}>
            {rangeButtons.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                style={{
                  padding: '0.25rem 0.55rem',
                  borderRadius: '4px',
                  border: 'none',
                  fontSize: '0.72rem',
                  fontWeight: selectedRange === range ? 700 : 500,
                  background: selectedRange === range ? '#ffffff' : 'transparent',
                  color: selectedRange === range ? '#047857' : '#64748b',
                  cursor: 'pointer',
                  boxShadow: selectedRange === range ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                {range}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
            Invoices: <strong>0</strong> • Admissions: <strong>0</strong> • OT Consents: <strong>0</strong>
          </div>
        </div>
      </div>

      {/* Grid: Charts & Analytics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        {/* Revenue & Cash Outgoing Momentum */}
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>
                Revenue &amp; Cash Outgoing Momentum
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                Sales revenue vs combined supplier purchases &amp; operating expenses
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.7rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#047857', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} /> Sales
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#e11d48', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e11d48' }} /> Outgoing (Purchases+Exp)
              </span>
            </div>
          </div>

          {/* Metric Sub-header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', background: '#f8fafc', padding: '0.5rem', borderRadius: '6px' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>PERIOD SALES</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>PKR 0.00</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>TOTAL OUTGOING</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#e11d48' }}>PKR 0.00</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>NET SURPLUS</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#047857' }}>PKR 0.00</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>AVG BILL (AOV)</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>PKR 0.00</div>
            </div>
          </div>

          {/* Interactive Chart Canvas Simulation */}
          <div style={{ height: '160px', width: '100%', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 0.5rem' }}>
            {['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'].map((time) => (
              <div key={time} style={{ textAlign: 'center', fontSize: '0.65rem', color: '#94a3b8' }}>
                <div style={{ height: '100px', width: '2px', background: '#f1f5f9', margin: '0 auto 4px' }} />
                {time}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Channels Card */}
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>Payment Channels</div>
            <span style={{ fontSize: '0.65rem', color: '#64748b', background: '#f1f5f9', padding: '0.1rem 0.35rem', borderRadius: '3px' }}>Breakdown</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Cash-counter receipts vs customer credit receivables</div>

          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b', letterSpacing: '0.04em' }}>TOTAL VOLUME</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>PKR 0.00</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ecfdf5', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: '#047857' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} /> Cash-Counter
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.75rem', fontWeight: 700, color: '#047857' }}>
                PKR 0.00 <span style={{ fontSize: '0.65rem', fontWeight: 500 }}>(100% On-Site)</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0f9ff', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #bae6fd' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: '#0369a1' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284c7' }} /> Credit / Receivable
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.75rem', fontWeight: 700, color: '#0369a1' }}>
                PKR 0.00 <span style={{ fontSize: '0.65rem', fontWeight: 500 }}>(0% On-Acc)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Fast-Moving Medicines & Product Categories & Bed Capacity & OT Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {/* Fast-Moving Medicines (Top 5) */}
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>Fast-Moving Medicines (Top 5)</div>
            <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#047857', background: '#ecfdf5', padding: '0.1rem 0.35rem', borderRadius: '3px' }}>High Demand</span>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Highest dispensing volume by units sold</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.25rem' }}>
            {[
              { name: 'Galaxy 20mg Capsule', units: 140, color: '#10b981' },
              { name: 'Mep 40mg Capsule', units: 95, color: '#06b6d4' },
              { name: 'Abeticodic 5mg Tablet', units: 82, color: '#38bdf8' },
              { name: 'Levoma 50mg Tablet', units: 82, color: '#818cf8' },
              { name: 'Syringe 10cc', units: 62, color: '#c084fc' },
            ].map((med) => (
              <div key={med.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#334155', marginBottom: '2px' }}>
                  <span>{med.name}</span>
                  <strong>{med.units} units</strong>
                </div>
                <div style={{ height: '6px', width: '100%', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(med.units / 150) * 100}%`, background: med.color, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital Bed Capacity */}
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>Hospital Bed Capacity</div>
            <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#0284c7', background: '#f0f9ff', padding: '0.1rem 0.35rem', borderRadius: '3px' }}>0% Occupied</span>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Indoor patient admission &amp; bed availability</div>

          <div style={{ padding: '1rem 0' }}>
            <div style={{ width: '110px', height: '55px', border: '8px solid #059669', borderBottom: 'none', borderRadius: '60px 60px 0 0', margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>50</div>
                <div style={{ fontSize: '0.62rem', color: '#64748b' }}>BEDS FREE</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>ADMITTED</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0284c7' }}>0 Patients</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>TOTAL BEDS</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>50 Beds</div>
            </div>
          </div>
        </div>

        {/* Clinical & Operation Theater (OT) Activity (Highlighted by user!) */}
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>
              <Activity size={15} color="#7c3aed" />
              <span>Clinical &amp; Operation Theater (OT) Activity</span>
            </div>
            <button
              onClick={() => onNavigateTab?.('ot-station')}
              style={{ background: 'transparent', border: 'none', color: '#7c3aed', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
            >
              OT Station →
            </button>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Surgical consents, scheduled procedures, and hospital admissions</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.2rem' }}>
            <div style={{ background: '#f5f3ff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ddd6fe' }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#6d28d9' }}>PERIOD ADMISSIONS</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#6d28d9' }}>0</div>
              <div style={{ fontSize: '0.62rem', color: '#64748b' }}>Admitted</div>
            </div>

            <div style={{ background: '#f0fdf4', padding: '0.5rem', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#15803d' }}>OT CONSENTS</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#15803d' }}>0</div>
              <div style={{ fontSize: '0.62rem', color: '#64748b' }}>Surgeries logged</div>
            </div>

            <div style={{ background: '#fffbeb', padding: '0.5rem', borderRadius: '6px', border: '1px solid #fde68a' }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#b45309' }}>ACTIVE QUEUE</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#b45309' }}>0</div>
              <div style={{ fontSize: '0.62rem', color: '#64748b' }}>In Op / Scheduled</div>
            </div>

            <div style={{ background: '#ecfdf5', padding: '0.5rem', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#047857' }}>CURRENT OCCUPANCY</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#047857' }}>0%</div>
              <div style={{ fontSize: '0.62rem', color: '#64748b' }}>50 beds open</div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary: 8 Health KPI Metric Cards from Image 2 */}
      <div
        className="white-panel"
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>
              Period Margin &amp; Profitability Health
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
              Direct sales revenue vs estimated cost of goods sold and operating expenses.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.72rem' }}>
            <span>GROSS SALES: <strong>PKR 0.00</strong></span>
            <span>EST. COGS: <strong>PKR 0.00</strong></span>
            <span style={{ color: '#047857' }}>GROSS PROFIT: <strong>PKR 0.00</strong></span>
            <span style={{ color: '#047857' }}>NET PROFIT: <strong>PKR 0.00</strong></span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>TODAY'S SALES</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '2px 0' }}>PKR 0.00</div>
            <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Today (10 Oct 2026)</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>CASH SALES</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#047857', margin: '2px 0' }}>PKR 0.00</div>
            <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Today (10 Oct 2026)</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>CREDIT SALES</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0284c7', margin: '2px 0' }}>PKR 0.00</div>
            <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Today (10 Oct 2026)</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>PURCHASES</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#b45309', margin: '2px 0' }}>PKR 0.00</div>
            <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Today (10 Oct 2026)</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>EXPENSES</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#e11d48', margin: '2px 0' }}>PKR 0.00</div>
            <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Today (10 Oct 2026)</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>GROSS PROFIT</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#047857', margin: '2px 0' }}>PKR 0.00</div>
            <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Today (10 Oct 2026)</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>NET PROFIT</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#047857', margin: '2px 0' }}>PKR 0.00</div>
            <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Today (10 Oct 2026)</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>ADMITTED PATIENTS</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#7c3aed', margin: '2px 0' }}>0</div>
            <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Today (10 Oct 2026)</div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Sales Invoices & Low Stock Watchlist */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1rem' }}>
        {/* Recent Sales Invoices */}
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>Recent Sales Invoices (Today 10 Oct 2026)</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Latest completed customer &amp; patient sales</div>
            </div>
            <button
              onClick={() => onNavigateTab?.('pos')}
              style={{ background: 'transparent', border: 'none', color: '#047857', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
            >
              All Sales →
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table" style={{ width: '100%' }}>
              <thead>
                <tr style={{ background: '#ffffff', fontSize: '0.65rem' }}>
                  <th>INVOICE #</th>
                  <th>CUSTOMER / PATIENT</th>
                  <th>PAYMENT</th>
                  <th>ITEMS</th>
                  <th style={{ textAlign: 'right' }}>AMOUNT (PKR)</th>
                  <th style={{ textAlign: 'right' }}>TIME</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'SAL-0009', customer: 'Walk-in Customer', pay: 'Cash', items: '2 items', amount: 1200, time: '07:49 PM' },
                  { id: 'SAL-0008', customer: 'Walk-in Customer', pay: 'Cash', items: '1 item', amount: 900, time: '05:52 AM' },
                  { id: 'IND-0028', customer: 'Mr. Syed Zubair Shah', pay: 'Cash', items: '5 items', amount: 7385, time: '05:10 PM' },
                  { id: 'SAL-0007', customer: 'Walk-in Customer', pay: 'Cash', items: '1 item', amount: 700, time: '03:22 PM' },
                  { id: 'IND-0026', customer: 'Mr. Syed Zubair Shah', pay: 'Cash', items: '3 items', amount: 4850, time: '11:13 AM' },
                  { id: 'IND-0027', customer: 'Mr. Syed Zubair Shah', pay: 'Cash', items: '1 item', amount: 2400, time: '11:29 PM' },
                ].map((row) => (
                  <tr key={row.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#047857' }}>{row.id}</td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{row.customer}</td>
                    <td>
                      <span className="badge badge-emerald">{row.pay}</span>
                    </td>
                    <td style={{ color: '#64748b' }}>{row.items}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>PKR {row.amount.toLocaleString()}</td>
                    <td style={{ textAlign: 'right', color: '#64748b' }}>{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Watchlist */}
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>Low Stock Watchlist</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Medications near or below reorder level</div>
            </div>
            <button
              onClick={() => onNavigateTab?.('notifications')}
              style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#e11d48', fontSize: '0.68rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '4px', cursor: 'pointer' }}
            >
              Restock
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { name: 'Galaxy 20mg Capsule', reorder: '10 units', left: '-520 left' },
              { name: 'Mep 40mg Capsule', reorder: '10 units', left: '-70 left' },
              { name: 'Levoma 50mg Tablet', reorder: '10 units', left: '-50 left' },
              { name: 'Syringe 10cc', reorder: '10 units', left: '-41 left' },
              { name: 'Comfarta 10mg Tablet', reorder: '10 units', left: '-40 left' },
            ].map((item) => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0f172a' }}>{item.name}</div>
                  <div style={{ fontSize: '0.62rem', color: '#64748b' }}>Reorder: {item.reorder}</div>
                </div>
                <span style={{ background: '#fff1f2', color: '#e11d48', fontWeight: 700, fontSize: '0.68rem', padding: '0.15rem 0.4rem', borderRadius: '3px', border: '1px solid #fecdd3' }}>
                  {item.left}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab?.('inventory')}
            style={{ marginTop: 'auto', background: 'transparent', border: 'none', color: '#047857', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', textAlign: 'center', paddingTop: '0.5rem' }}
          >
            Open Full Inventory Manager →
          </button>
        </div>
      </div>

      {/* Quick Actions & Store Branch Info Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        {/* Quick Actions Shortcuts */}
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>Quick Actions &amp; Shortcuts</div>
            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Fast Access</span>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Jump directly into high-frequency pharmacy and hospital operations.</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginTop: '0.2rem' }}>
            <button
              onClick={() => onNavigateTab?.('pos')}
              className="white-card"
              style={{ padding: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#047857', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>New Sale (POS)</div>
                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Create invoice &amp; collect payment</div>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab?.('purchase-desk')}
              className="white-card"
              style={{ padding: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#0f172a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>New Purchase</div>
                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Add stock from medicine supplier</div>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab?.('products')}
              className="white-card"
              style={{ padding: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#f59e0b', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>Products Catalog</div>
                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Manage medicine formulary</div>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab?.('ot-station')}
              className="white-card"
              style={{ padding: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#7c3aed', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>OT Station</div>
                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Operation theater consents &amp; queue</div>
              </div>
            </button>
          </div>
        </div>

        {/* Store & Branch Info */}
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>Store &amp; Branch Info</div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Active session and location summary.</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.2rem', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.3rem' }}>
              <span style={{ color: '#64748b' }}>Branch</span>
              <strong style={{ color: '#0f172a' }}>Haji Waris Khan M...</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.3rem' }}>
              <span style={{ color: '#64748b' }}>Date</span>
              <strong>10 Oct 2026</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.3rem' }}>
              <span style={{ color: '#64748b' }}>Time</span>
              <strong>07:56 AM</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>System Mode</span>
              <span style={{ color: '#047857', fontWeight: 700 }}>• Online</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
            <button
              onClick={() => onNavigateTab?.('pos')}
              className="btn-primary"
              style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}
            >
              View sales
            </button>
            <button
              onClick={() => onNavigateTab?.('reports')}
              className="btn-secondary"
              style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}
            >
              Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
