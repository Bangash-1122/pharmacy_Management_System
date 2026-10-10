import React from 'react';
import { Printer, X, Download, Share2, CheckCircle } from 'lucide-react';
import { SaleInvoice } from '../types';

interface POSReceiptModalProps {
  sale: SaleInvoice;
  onClose: () => void;
}

export const POSReceiptModal: React.FC<POSReceiptModalProps> = ({ sale, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop">
      <div className="glass-panel" style={{ width: '420px', maxWidth: '95vw', padding: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 700 }}>
            <CheckCircle size={20} />
            <span>Sale Completed Successfully</span>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Printable Thermal Receipt Box */}
        <div
          id="printable-receipt"
          style={{
            background: '#ffffff',
            color: '#111827',
            padding: '1.25rem',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            lineHeight: 1.4,
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>AL-SHIFA PHARMACY</h3>
            <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>Jinnah Avenue, Blue Area, Islamabad</div>
            <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>Phone: +92 300 1234567 • Lic: #PH-2026</div>
          </div>

          <div style={{ borderTop: '1px dashed #9ca3af', borderBottom: '1px dashed #9ca3af', padding: '0.4rem 0', margin: '0.5rem 0', fontSize: '0.75rem' }}>
            <div>Invoice: <strong>{sale.invoiceNo}</strong></div>
            <div>Date: {new Date(sale.createdAt).toLocaleString()}</div>
            <div>Customer: {sale.customerName}</div>
            <div>Cashier: {sale.cashierName}</div>
          </div>

          {/* Line Items */}
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0.5rem 0' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #d1d5db', textAlign: 'left' }}>
                <th style={{ padding: '0.2rem 0' }}>Item (Batch)</th>
                <th style={{ textAlign: 'center' }}>Qty</th>
                <th style={{ textAlign: 'right' }}>Price</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {sale.items.map((it, idx) => (
                <tr key={idx} style={{ borderBottom: '1px dotted #e5e7eb' }}>
                  <td style={{ padding: '0.25rem 0' }}>
                    {it.medicineName} <br />
                    <span style={{ fontSize: '0.65rem', color: '#6b7280' }}>({it.batchNo})</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>{it.quantity}</td>
                  <td style={{ textAlign: 'right' }}>Rs.{it.unitPrice}</td>
                  <td style={{ textAlign: 'right' }}>Rs.{it.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary Totals */}
          <div style={{ borderTop: '1px dashed #9ca3af', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>Rs.{sale.subtotal.toFixed(2)}</span>
            </div>
            {sale.discountTotal > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dc2626' }}>
                <span>Discount:</span>
                <span>-Rs.{sale.discountTotal.toFixed(2)}</span>
              </div>
            )}
            {sale.taxTotal > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tax/GST:</span>
                <span>+Rs.{sale.taxTotal.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.95rem', borderTop: '1px solid #111827', marginTop: '0.25rem', paddingTop: '0.25rem' }}>
              <span>NET TOTAL:</span>
              <span>Rs.{sale.grandTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '0.2rem' }}>
              <span>Paid ({sale.paymentMethod.toUpperCase()}):</span>
              <span>Rs.{sale.paidAmount.toFixed(2)}</span>
            </div>
            {sale.changeAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span>Change Returned:</span>
                <span>Rs.{sale.changeAmount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem', borderTop: '1px dashed #9ca3af', paddingTop: '0.5rem', fontSize: '0.7rem', color: '#4b5563' }}>
            <div>*** THANK YOU - GET WELL SOON ***</div>
            <div>Powered by MediFlow SaaS Platform</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button onClick={handlePrint} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            <Printer size={16} /> Print Receipt (58/80mm)
          </button>
          <button onClick={onClose} className="btn-secondary">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
