import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FileText,
  Search,
  Plus,
  ArrowUpDown,
  Download,
  Eye,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import api from '../services/api';

interface PurchaseRecord {
  id: string;
  reference: string;
  date: string;
  supplierName: string;
  total: number;
  docUrl?: string;
  status: 'RECEIVED' | 'POSTED' | 'DRAFT';
  createdBy: string;
}

interface PurchaseHistoryPageProps {
  onNewPurchase?: () => void;
}

export const PurchaseHistoryPage: React.FC<PurchaseHistoryPageProps> = ({ onNewPurchase }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'date' | 'total'>('date');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [pageSize, setPageSize] = useState(15);
  const [selectedRecord, setSelectedRecord] = useState<PurchaseRecord | null>(null);

  // Fetch purchases from API
  const { data: purchasesData = [], isLoading } = useQuery({
    queryKey: ['purchases'],
    queryFn: async () => {
      try {
        const res = await api.get('/purchases');
        return res.data?.data || [];
      } catch (err) {
        return [];
      }
    },
  });

  // Map API data or fallback
  const records: PurchaseRecord[] = purchasesData.length > 0
    ? purchasesData.map((p: any, idx: number) => ({
        id: p.id || `pur-${idx}`,
        reference: p.invoiceNumber || `PUR-${String(idx + 1).padStart(4, '0')}`,
        date: p.invoiceDate ? new Date(p.invoiceDate).toLocaleDateString('en-GB') : '10/10/2026',
        supplierName: p.supplier?.name || p.supplierName || 'Getz Pharma (Pvt) Ltd',
        total: Number(p.totalAmount || 0),
        docUrl: p.documentUrl,
        status: p.status || 'RECEIVED',
        createdBy: p.createdBy?.name || 'Syed Zubair Shah',
      }))
    : [];

  // Filter records
  const filteredRecords = records.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.reference.toLowerCase().includes(q) ||
      r.supplierName.toLowerCase().includes(q) ||
      r.createdBy.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Page Title & Search/Actions Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Left Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              background: '#047857',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FileText size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Purchases
            </h2>
            <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, marginTop: '2px' }}>
              Search and manage supplier stock-in records
            </p>
          </div>
        </div>

        {/* Right Search, Sort, New Purchase */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
            Find &amp; Edit Invoice (Alt+E / Enter):
          </span>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search
              size={13}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8',
              }}
            />
            <input
              type="text"
              placeholder="PUR-0001, supplier, invoice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.35rem 0.5rem 0.35rem 1.75rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.78rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}>
            <span style={{ color: '#64748b' }}>Sort:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as any)}
              style={{
                padding: '0.35rem 0.5rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.75rem',
                background: '#ffffff',
              }}
            >
              <option value="date">Date</option>
              <option value="total">Total</option>
            </select>
            <span
              style={{
                background: '#f1f5f9',
                color: '#047857',
                padding: '0.2rem 0.4rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 700,
                border: '1px solid #cbd5e1',
              }}
            >
              DESC
            </span>
          </div>

          <button
            onClick={onNewPurchase}
            style={{
              background: '#047857',
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
            <Plus size={15} />
            <span>New purchase</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div
        className="white-panel"
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
        }}
      >
        {/* Table Subhead */}
        <div
          style={{
            padding: '0.55rem 0.85rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#ffffff',
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', letterSpacing: '0.04em' }}>
            {filteredRecords.length} PURCHASE RECORDS
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            Search includes products and barcodes
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table" style={{ width: '100%' }}>
            <thead>
              <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
                <th style={{ width: '130px' }}>
                  REFERENCE <ArrowUpDown size={11} style={{ verticalAlign: 'middle', marginLeft: '2px' }} />
                </th>
                <th style={{ width: '110px' }}>
                  DATE <span style={{ color: '#047857', fontWeight: 800 }}>↓ DESC</span>
                </th>
                <th>
                  SUPPLIER <ArrowUpDown size={11} style={{ verticalAlign: 'middle', marginLeft: '2px' }} />
                </th>
                <th style={{ width: '120px', textAlign: 'right' }}>
                  TOTAL <ArrowUpDown size={11} style={{ verticalAlign: 'middle', marginLeft: '2px' }} />
                </th>
                <th style={{ width: '70px', textAlign: 'center' }}>DOC</th>
                <th style={{ width: '90px', textAlign: 'center' }}>STATUS</th>
                <th style={{ width: '140px' }}>CREATED BY</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: 'center',
                      padding: '4rem 1rem',
                      color: '#94a3b8',
                      fontSize: '0.85rem',
                    }}
                  >
                    No purchases found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec) => (
                  <tr
                    key={rec.id}
                    onClick={() => setSelectedRecord(rec)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#047857' }}>
                      {rec.reference}
                    </td>
                    <td style={{ color: '#475569', fontSize: '0.78rem' }}>{rec.date}</td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{rec.supplierName}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                      PKR {rec.total.toFixed(2)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span
                        style={{
                          background: '#f1f5f9',
                          color: '#475569',
                          fontSize: '0.65rem',
                          padding: '0.15rem 0.35rem',
                          borderRadius: '3px',
                          fontWeight: 600,
                        }}
                      >
                        PDF
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="badge badge-emerald">RECEIVED</span>
                    </td>
                    <td style={{ color: '#475569', fontSize: '0.78rem' }}>{rec.createdBy}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div
          style={{
            padding: '0.55rem 0.85rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #f1f5f9',
            background: '#ffffff',
            fontSize: '0.75rem',
            color: '#64748b',
          }}
        >
          <div>
            {filteredRecords.length === 0
              ? 'No matching entries found'
              : `Showing 1 to ${filteredRecords.length} of ${filteredRecords.length} entries`}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Show:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              style={{
                padding: '0.2rem 0.4rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.75rem',
                background: '#ffffff',
              }}
            >
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>per page</span>
          </div>
        </div>
      </div>
    </div>
  );
};
