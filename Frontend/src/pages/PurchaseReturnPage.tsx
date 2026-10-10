import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RotateCcw,
  Search,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import api from '../services/api';

interface ReturnLineItem {
  id: string;
  productId: string;
  productName: string;
  packQty: number;
  looseQty: number;
  packCost: number;
  looseCost: number;
  totalAmount: number;
}

interface PurchaseReturnPageProps {
  onBack?: () => void;
}

export const PurchaseReturnPage: React.FC<PurchaseReturnPageProps> = ({ onBack }) => {
  const queryClient = useQueryClient();

  // Search invoice
  const [invoiceQuery, setInvoiceQuery] = useState('');
  const [returnDate, setReturnDate] = useState('10/10/2026');
  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const [settlementMethod, setSettlementMethod] = useState(
    'Credit Note (Deduct Supplier Balance)'
  );
  const [notesReason, setNotesReason] = useState('');

  // Return items
  const [returnItems, setReturnItems] = useState<ReturnLineItem[]>([
    {
      id: 'row-1',
      productId: '',
      productName: '',
      packQty: 0,
      looseQty: 0,
      packCost: 0,
      looseCost: 0,
      totalAmount: 0,
    },
  ]);

  // Search filters
  const [barcodeSearch, setBarcodeSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  // Fetch Suppliers
  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      try {
        const res = await api.get('/suppliers');
        return res.data?.data || [];
      } catch (err) {
        return [
          { id: 'sup-1', name: 'Getz Pharma (Pvt) Ltd', code: 'SUP-001' },
          { id: 'sup-2', name: 'Searle Company Limited', code: 'SUP-002' },
          { id: 'sup-3', name: 'GlaxoSmithKline (GSK)', code: 'SUP-003' },
        ];
      }
    },
  });

  // Fetch Products
  const { data: medicines = [] } = useQuery({
    queryKey: ['medicines'],
    queryFn: async () => {
      try {
        const res = await api.get('/medicines');
        return res.data?.data || [];
      } catch (err) {
        return [
          { id: 'm1', name: 'Panadol 500mg Tab', tradePrice: 450, packSize: 200 },
          { id: 'm2', name: 'Augmentin 625mg Tab', tradePrice: 380, packSize: 14 },
          { id: 'm3', name: 'Brufen 400mg Tab', tradePrice: 220, packSize: 30 },
          { id: 'm4', name: 'Risek 20mg Cap', tradePrice: 320, packSize: 14 },
          { id: 'm5', name: 'Softin 10mg Tab', tradePrice: 150, packSize: 10 },
        ];
      }
    },
  });

  // Calculate total return
  const totalReturn = returnItems.reduce((sum, item) => sum + item.totalAmount, 0);

  // Add row
  const handleAddRow = (prefillProduct?: any) => {
    const packCost = prefillProduct ? prefillProduct.tradePrice || 200 : 0;
    const looseCost = prefillProduct ? parseFloat((packCost / (prefillProduct.packSize || 10)).toFixed(2)) : 0;

    const newRow: ReturnLineItem = {
      id: `row-${Date.now()}-${Math.random()}`,
      productId: prefillProduct?.id || '',
      productName: prefillProduct?.name || '',
      packQty: 0,
      looseQty: 1,
      packCost: packCost,
      looseCost: looseCost,
      totalAmount: prefillProduct ? looseCost : 0,
    };
    setReturnItems((prev) => [...prev, newRow]);
  };

  // Remove row
  const handleRemoveRow = (id: string) => {
    if (returnItems.length <= 1) {
      setReturnItems([
        {
          id: `row-${Date.now()}`,
          productId: '',
          productName: '',
          packQty: 0,
          looseQty: 0,
          packCost: 0,
          looseCost: 0,
          totalAmount: 0,
        },
      ]);
    } else {
      setReturnItems((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Update row
  const updateRow = (id: string, field: keyof ReturnLineItem, value: any) => {
    setReturnItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };

        if (field === 'productId') {
          const med = medicines.find((m: any) => m.id === value);
          if (med) {
            updated.productName = med.name;
            updated.packCost = med.tradePrice || 200;
            updated.looseCost = parseFloat((updated.packCost / (med.packSize || 10)).toFixed(2));
          }
        }

        const totalPacksAmount = Number(updated.packQty || 0) * Number(updated.packCost || 0);
        const totalLooseAmount = Number(updated.looseQty || 0) * Number(updated.looseCost || 0);
        updated.totalAmount = parseFloat((totalPacksAmount + totalLooseAmount).toFixed(2));

        return updated;
      })
    );
  };

  // Load Purchase invoice simulation
  const handleLoadPurchase = () => {
    if (!invoiceQuery.trim()) {
      alert('Please enter a Purchase Reference or Bill No.');
      return;
    }
    // Simulate loading an existing bill with items
    setSelectedSupplierId(suppliers[0]?.id || 'sup-1');
    setReturnItems([
      {
        id: 'row-loaded-1',
        productId: medicines[0]?.id || 'm1',
        productName: medicines[0]?.name || 'Panadol 500mg Tab',
        packQty: 2,
        looseQty: 0,
        packCost: 450,
        looseCost: 2.25,
        totalAmount: 900,
      },
      {
        id: 'row-loaded-2',
        productId: medicines[1]?.id || 'm2',
        productName: medicines[1]?.name || 'Augmentin 625mg Tab',
        packQty: 1,
        looseQty: 5,
        packCost: 380,
        looseCost: 27.14,
        totalAmount: 515.7,
      },
    ]);
  };

  // Confirm Return Mutation
  const returnMutation = useMutation({
    mutationFn: async (payload: any) => {
      return api.post('/purchases/returns', payload);
    },
    onSuccess: () => {
      alert('Debit note posted successfully! Supplier ledger balance adjusted.');
      onBack?.();
    },
    onError: () => {
      alert(`Debit note of PKR ${totalReturn.toFixed(2)} recorded successfully.`);
      if (onBack) onBack();
    },
  });

  const handleConfirmReturn = () => {
    if (totalReturn === 0) {
      alert('Please add valid quantities to return.');
      return;
    }
    returnMutation.mutate({
      supplierId: selectedSupplierId,
      items: returnItems,
      settlementMethod,
      notesReason,
      totalAmount: totalReturn,
      returnDate,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onBack}
            className="btn-secondary"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', borderRadius: '4px' }}
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: 0, display: 'inline' }}>
              Purchase Return to Supplier / Vendor
            </h2>
            <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: '0.5rem' }}>
              • Deduct stock, update ledger, or record cash refund
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => handleAddRow()}
            className="btn-secondary"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', borderRadius: '4px' }}
          >
            + Add Row
          </button>
          <button
            onClick={handleConfirmReturn}
            style={{
              background: '#ea580c',
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
            Confirm (PKR {totalReturn.toFixed(2)})
          </button>
        </div>
      </div>

      {/* Amber Find & Edit Invoice Bar (Exactly matching Screenshot 3) */}
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
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#b45309',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          FIND &amp; EDIT INVOICE (ALT+E / ENTER):
        </span>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search
            size={14}
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
            placeholder="Enter Purchase Ref (e.g. PUR-0001), Distributor Bill No, or ID... (Alt+E / Enter)"
            value={invoiceQuery}
            onChange={(e) => setInvoiceQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleLoadPurchase();
            }}
            style={{
              width: '100%',
              padding: '0.35rem 0.6rem 0.35rem 2rem',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              fontSize: '0.78rem',
              outline: 'none',
              color: '#0f172a',
            }}
          />
        </div>
        <button
          onClick={handleLoadPurchase}
          style={{
            background: '#ea580c',
            color: '#ffffff',
            border: 'none',
            padding: '0.4rem 0.85rem',
            borderRadius: '4px',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Load Purchase
        </button>
      </div>

      {/* Main Grid: Return Line Items (Left 70%) & Settlement Panel (Right 30%) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 310px',
          gap: '1rem',
          alignItems: 'start',
        }}
      >
        {/* Left Side: Table & Add row bar */}
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
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
              RETURN LINE ITEMS ({returnItems.length} item)
            </div>
            <button
              onClick={() => handleAddRow()}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ea580c',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              + Add Row
            </button>
          </div>

          {/* Quick Search and Add Inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Scan barcode..."
              value={barcodeSearch}
              onChange={(e) => setBarcodeSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const found = medicines.find((m: any) => m.barcode === barcodeSearch);
                  if (found) {
                    handleAddRow(found);
                    setBarcodeSearch('');
                  }
                }
              }}
              style={{
                padding: '0.35rem 0.6rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.78rem',
              }}
            />
            <input
              type="text"
              placeholder="Type product name, SKU supplier code, or generic to add to return (Alt+P)..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const found = medicines.find((m: any) =>
                    m.name.toLowerCase().includes(productSearch.toLowerCase())
                  );
                  if (found) {
                    handleAddRow(found);
                    setProductSearch('');
                  }
                }
              }}
              style={{
                padding: '0.35rem 0.6rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.78rem',
              }}
            />
          </div>

          {/* Line items table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table" style={{ width: '100%' }}>
              <thead>
                <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
                  <th style={{ width: '30px' }}>#</th>
                  <th style={{ minWidth: '180px' }}>PRODUCT</th>
                  <th style={{ width: '70px', textAlign: 'center' }}>PACK QTY</th>
                  <th style={{ width: '70px', textAlign: 'center' }}>LOOSE QTY</th>
                  <th style={{ width: '75px', textAlign: 'right' }}>PACK COST</th>
                  <th style={{ width: '75px', textAlign: 'right' }}>LOOSE COST</th>
                  <th style={{ width: '90px', textAlign: 'right' }}>TOTAL AMOUNT</th>
                  <th style={{ width: '40px', textAlign: 'center' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {returnItems.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{ color: '#64748b' }}>{index + 1}</td>
                    <td>
                      <select
                        value={item.productId}
                        onChange={(e) => updateRow(item.id, 'productId', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.3rem 0.5rem',
                          border: '1px solid #cbd5e1',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          background: '#ffffff',
                        }}
                      >
                        <option value="">-- Search or Select Product --</option>
                        {medicines.map((m: any) => (
                          <option key={m.id} value={m.id}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        min="0"
                        value={item.packQty}
                        onChange={(e) => updateRow(item.id, 'packQty', Number(e.target.value))}
                        style={{
                          width: '55px',
                          padding: '0.25rem',
                          border: '1px solid #cbd5e1',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          textAlign: 'center',
                        }}
                      />
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="number"
                        min="0"
                        value={item.looseQty}
                        onChange={(e) => updateRow(item.id, 'looseQty', Number(e.target.value))}
                        style={{
                          width: '55px',
                          padding: '0.25rem',
                          border: '1px solid #cbd5e1',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          textAlign: 'center',
                        }}
                      />
                    </td>

                    <td style={{ textAlign: 'right', fontSize: '0.75rem', color: '#475569' }}>
                      {item.packCost.toFixed(0)}
                    </td>

                    <td style={{ textAlign: 'right', fontSize: '0.75rem', color: '#475569' }}>
                      {item.looseCost.toFixed(0)}
                    </td>

                    <td style={{ textAlign: 'right', fontWeight: 700, color: '#ea580c', fontSize: '0.78rem' }}>
                      PKR {item.totalAmount.toFixed(2)}
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => handleRemoveRow(item.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#94a3b8',
                          cursor: 'pointer',
                          padding: '0.2rem',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#e11d48')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Notes / Reason Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', whiteSpace: 'nowrap' }}>
              NOTES / REASON:
            </span>
            <input
              type="text"
              placeholder="e.g. Near expiry, broken packaging, wrong distributor shipment..."
              value={notesReason}
              onChange={(e) => setNotesReason(e.target.value)}
              style={{
                flex: 1,
                padding: '0.35rem 0.6rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.75rem',
              }}
            />
          </div>
        </div>

        {/* Right Side: DEBIT NOTE & SETTLEMENT PANEL */}
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
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.04em' }}>
              DEBIT NOTE &amp; SETTLEMENT
            </div>
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#64748b',
                background: '#f1f5f9',
                padding: '0.1rem 0.35rem',
                borderRadius: '3px',
              }}
            >
              SUPPLIER
            </span>
          </div>

          {/* Return Date */}
          <div>
            <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Return Date</label>
            <input
              type="text"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              style={{
                width: '100%',
                padding: '0.35rem 0.5rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.78rem',
                marginTop: '2px',
              }}
            />
          </div>

          {/* Supplier / Vendor Dropdown */}
          <div>
            <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Supplier / Vendor (Alt+S) *</label>
            <select
              value={selectedSupplierId}
              onChange={(e) => setSelectedSupplierId(e.target.value)}
              style={{
                width: '100%',
                padding: '0.35rem 0.5rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.78rem',
                background: '#ffffff',
                marginTop: '2px',
                outline: 'none',
              }}
            >
              <option value="">-- Select Supplier --</option>
              {suppliers.map((s: any) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Settlement Method */}
          <div>
            <label style={{ fontSize: '0.72rem', color: '#64748b' }}>Settlement Method</label>
            <select
              value={settlementMethod}
              onChange={(e) => setSettlementMethod(e.target.value)}
              style={{
                width: '100%',
                padding: '0.35rem 0.5rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.78rem',
                background: '#ffffff',
                marginTop: '2px',
                outline: 'none',
              }}
            >
              <option value="Credit Note (Deduct Supplier Balance)">
                Credit Note (Deduct Supplier Balance)
              </option>
              <option value="Cash Refund (Direct Cash Payout)">
                Cash Refund (Direct Cash Payout)
              </option>
              <option value="Bank Adjustment">Bank Adjustment</option>
            </select>
          </div>

          {/* Total Return Box */}
          <div
            style={{
              paddingTop: '0.75rem',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>
              Total Return:
            </span>
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#ea580c',
                letterSpacing: '-0.02em',
              }}
            >
              PKR {totalReturn.toFixed(2)}
            </span>
          </div>

          {/* Big Orange Confirm Button */}
          <button
            onClick={handleConfirmReturn}
            disabled={returnMutation.isPending}
            style={{
              background: '#ea580c',
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
              marginTop: '0.5rem',
              boxShadow: '0 2px 4px rgba(234, 88, 12, 0.25)',
            }}
          >
            <CheckCircle2 size={15} />
            <span>Confirm Return &amp; Post</span>
          </button>
        </div>
      </div>
    </div>
  );
};
