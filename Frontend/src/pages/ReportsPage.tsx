import React, { useState } from 'react';
import {
  FileBarChart,
  DollarSign,
  TrendingUp,
  Download,
  Calendar,
  PieChart,
  Award,
  CreditCard,
  Building2,
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState<'pl' | 'sales' | 'bestsellers'>('pl');

  // Profit & Loss calculation snapshot
  const plData = {
    grossRevenue: 285000,
    discounts: 12500,
    netRevenue: 272500,
    cogs: 198000, // Cost of Goods Sold
    grossProfit: 74500,
    grossMargin: '27.34%',
    operatingExpenses: 66700,
    netProfit: 7800,
    netMargin: '2.86%',
  };

  const topSellers = [
    { name: 'Panadol Extra 500mg', generic: 'Paracetamol + Caffeine', unitsSold: 420, revenue: 231000 },
    { name: 'Augmentin 625mg', generic: 'Amoxicillin + Clavulanate', unitsSold: 180, revenue: 63000 },
    { name: 'Brufen 400mg', generic: 'Ibuprofen', unitsSold: 150, revenue: 36000 },
    { name: 'Softin 10mg', generic: 'Loratadine', unitsSold: 95, revenue: 20900 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Tabs & Export */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setReportType('pl')}
            className={reportType === 'pl' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem' }}
          >
            <TrendingUp size={16} /> Profit & Loss Statement (P&L)
          </button>
          <button
            onClick={() => setReportType('bestsellers')}
            className={reportType === 'bestsellers' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem' }}
          >
            <Award size={16} /> Best-Selling Medicines
          </button>
        </div>

        <button
          onClick={() => alert('Exported report as formatted PDF/Excel!')}
          className="btn-secondary"
          style={{ fontSize: '0.85rem' }}
        >
          <Download size={15} /> Export PDF / Excel
        </button>
      </div>

      {/* P&L View */}
      {reportType === 'pl' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem' }}>
          {/* Detailed Statement Table */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
              Financial Performance & Margin Analysis
            </h3>

            <table className="custom-table">
              <tbody>
                <tr>
                  <td>Total Gross Sales Revenue</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>Rs. {plData.grossRevenue.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style={{ color: '#fb7185' }}>Less: Sales Discounts & Redemptions</td>
                  <td style={{ textAlign: 'right', color: '#fb7185' }}>-Rs. {plData.discounts.toLocaleString()}</td>
                </tr>
                <tr style={{ background: 'rgba(30, 41, 59, 0.4)', fontWeight: 700 }}>
                  <td>Net Sales Revenue</td>
                  <td style={{ textAlign: 'right', color: '#38bdf8' }}>Rs. {plData.netRevenue.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style={{ color: '#f59e0b' }}>Cost of Goods Sold (COGS - Purchase Cost)</td>
                  <td style={{ textAlign: 'right', color: '#f59e0b' }}>-Rs. {plData.cogs.toLocaleString()}</td>
                </tr>
                <tr style={{ background: 'rgba(16, 185, 129, 0.1)', fontWeight: 800 }}>
                  <td style={{ color: '#34d399' }}>GROSS PROFIT (Margin: {plData.grossMargin})</td>
                  <td style={{ textAlign: 'right', color: '#34d399' }}>Rs. {plData.grossProfit.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style={{ color: '#fb7185' }}>Total Operating Expenses (Rent, Bills, Salaries)</td>
                  <td style={{ textAlign: 'right', color: '#fb7185' }}>-Rs. {plData.operatingExpenses.toLocaleString()}</td>
                </tr>
                <tr style={{ background: 'rgba(2, 132, 199, 0.15)', fontWeight: 800, fontSize: '1.05rem' }}>
                  <td style={{ color: '#38bdf8' }}>NET OPERATING PROFIT (Margin: {plData.netMargin})</td>
                  <td style={{ textAlign: 'right', color: '#38bdf8' }}>Rs. {plData.netProfit.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Graphical Summary Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(2, 132, 199, 0.05))' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Gross Margin Ratio</div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#34d399', margin: '0.5rem 0' }}>
                {plData.grossMargin}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Standard pharmacy healthy target: 20% - 30%</p>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Payment Method Breakdown</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span>Cash (65%)</span>
                    <span>Rs. 177,125</span>
                  </div>
                  <div style={{ height: '6px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden', marginTop: '0.2rem' }}>
                    <div style={{ width: '65%', height: '100%', background: '#10b981' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span>Card / POS Terminal (22%)</span>
                    <span>Rs. 59,950</span>
                  </div>
                  <div style={{ height: '6px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden', marginTop: '0.2rem' }}>
                    <div style={{ width: '22%', height: '100%', background: '#0ea5e9' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span>JazzCash / Easypaisa (13%)</span>
                    <span>Rs. 35,425</span>
                  </div>
                  <div style={{ height: '6px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden', marginTop: '0.2rem' }}>
                    <div style={{ width: '13%', height: '100%', background: '#f59e0b' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Best Sellers View */}
      {reportType === 'bestsellers' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
            Top Fast-Moving Medicines (By Quantity Sold)
          </h3>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Medicine Name & Generic</th>
                <th>Quantity Sold</th>
                <th>Total Revenue</th>
                <th>Velocity</th>
              </tr>
            </thead>
            <tbody>
              {topSellers.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 800, color: idx === 0 ? '#f59e0b' : '#94a3b8' }}>#{idx + 1}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.generic}</div>
                  </td>
                  <td style={{ fontWeight: 700, color: '#38bdf8' }}>{item.unitsSold} Units</td>
                  <td style={{ fontWeight: 700 }}>Rs. {item.revenue.toLocaleString()}</td>
                  <td>
                    <span className="badge badge-emerald">HIGH VELOCITY</span>
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
