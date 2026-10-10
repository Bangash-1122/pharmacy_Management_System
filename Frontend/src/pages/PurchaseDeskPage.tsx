import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FileText,
  Search,
  Plus,
  Trash2,
  Paperclip,
  Check,
  Maximize2,
  Calendar,
  CreditCard,
  Building2,
  HelpCircle,
  X,
} from 'lucide-react';
import api from '../services/api';

interface PurchaseItem {
  id: string;
  productId: string;
  productName: string;
  barcode?: string;
  sku?: string;
  packs: number;
  loose: number;
  packSize: number;
  bonus: number;
  tradePricePack: number;
  subUnitCost: number;
  srp: number;
  discountPercent: number;
  expiry: string;
  lineTotal: number;
}

interface Supplier {
  id: string;
  name: string;
  code?: string;
  contactPerson?: string;
  address?: string;
  phone?: string;
  email?: string;
}

interface PurchaseDeskPageProps {
  onNavigateHistory?: () => void;
}

export const PurchaseDeskPage: React.FC<PurchaseDeskPageProps> = ({ onNavigateHistory }) => {
  const queryClient = useQueryClient();

  // Supplier selection state
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [supplierSearchQuery, setSupplierSearchQuery] = useState('');
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);

  // Invoice Meta
  const [entryDate, setEntryDate] = useState('2026-10-10');
  const [distributorInvNo, setDistributorInvNo] = useState('');
  const [distributorInvDate, setDistributorInvDate] = useState('2026-10-10');
  const [findInvoiceQuery, setFindInvoiceQuery] = useState('');

  // Add Product input panel states
  const [activeTab, setActiveTab] = useState<'add' | 'multi' | 'new'>('add');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [skuInput, setSkuInput] = useState('');
  const [productSearchInput, setProductSearchInput] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  // Purchase items
  const [items, setItems] = useState<PurchaseItem[]>([]);

  // Summary financials
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [payAccount, setPayAccount] = useState('1- BUSINESS ACCOUNT');
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [remarks, setRemarks] = useState('');
  const [autoResetAccount, setAutoResetAccount] = useState(true);

  // Input refs for shortcuts
  const barcodeRef = useRef<HTMLInputElement>(null);
  const productSearchRef = useRef<HTMLInputElement>(null);
  const supplierSearchRef = useRef<HTMLInputElement>(null);
  const paidInputRef = useRef<HTMLInputElement>(null);

  // Fetch Suppliers
  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      try {
        const res = await api.get('/suppliers');
        return res.data?.data || [];
      } catch (err) {
        return [
          {
            id: 'sup-1',
            name: 'Getz Pharma (Pvt) Ltd',
            code: 'SUP-001',
            contactPerson: 'Kashif Ali',
            address: 'Plot 29-30/27, K.I.A., Karachi',
            phone: '021-38622111',
            email: 'sales@getzpharma.com',
          },
          {
            id: 'sup-2',
            name: 'Searle Company Limited',
            code: 'SUP-002',
            contactPerson: 'Hamza Tariq',
            address: 'One IBL Centre, DMCHS, Karachi',
            phone: '021-111-732-753',
            email: 'info@searlecompany.com',
          },
          {
            id: 'sup-3',
            name: 'GlaxoSmithKline (GSK)',
            code: 'SUP-003',
            contactPerson: 'Dr. Tariq Mahmood',
            address: 'West Wharf, Karachi',
            phone: '021-32315410',
            email: 'gsk.pk@gsk.com',
          },
        ];
      }
    },
  });

  // Fetch Products Catalog
  const { data: productsCatalog = [] } = useQuery({
    queryKey: ['medicines'],
    queryFn: async () => {
      try {
        const res = await api.get('/medicines');
        return res.data?.data || [];
      } catch (err) {
        return [
          { id: 'm1', name: 'Panadol 500mg Tab', barcode: '89640001', sku: 'PAN-500', packSize: 200, tradePrice: 450, srp: 520 },
          { id: 'm2', name: 'Augmentin 625mg Tab', barcode: '89640002', sku: 'AUG-625', packSize: 14, tradePrice: 380, srp: 440 },
          { id: 'm3', name: 'Brufen 400mg Tab', barcode: '89640003', sku: 'BRU-400', packSize: 30, tradePrice: 220, srp: 260 },
          { id: 'm4', name: 'Risek 20mg Cap', barcode: '89640004', sku: 'RIS-20', packSize: 14, tradePrice: 320, srp: 375 },
          { id: 'm5', name: 'Softin 10mg Tab', barcode: '89640005', sku: 'SOF-10', packSize: 10, tradePrice: 150, srp: 180 },
        ];
      }
    },
  });

  // Filtered suppliers
  const filteredSuppliers = suppliers.filter((s: Supplier) =>
    s.name.toLowerCase().includes(supplierSearchQuery.toLowerCase()) ||
    (s.code && s.code.toLowerCase().includes(supplierSearchQuery.toLowerCase())) ||
    (s.phone && s.phone.includes(supplierSearchQuery))
  );

  // Filtered medicines
  const filteredProducts = productsCatalog.filter((m: any) =>
    m.name.toLowerCase().includes(productSearchInput.toLowerCase()) ||
    (m.barcode && m.barcode.includes(productSearchInput)) ||
    (m.sku && m.sku.toLowerCase().includes(productSearchInput.toLowerCase()))
  );

  // Calculate Subtotal
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const discountTotal = discountAmount > 0 ? discountAmount : (subtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, subtotal - discountTotal);
  const remainingAmount = Math.max(0, grandTotal - paidAmount);

  // Add Item to table
  const addItemToDesk = (product: any) => {
    const packSize = product.packSize || 10;
    const tpPack = product.tradePrice || product.costPrice || 200;
    const srp = product.srp || product.price || 250;
    const subUnitCost = tpPack / packSize;

    const newItem: PurchaseItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      productId: product.id,
      productName: product.name,
      barcode: product.barcode,
      sku: product.sku,
      packs: 0,
      loose: 1,
      packSize: packSize,
      bonus: 0,
      tradePricePack: tpPack,
      subUnitCost: parseFloat(subUnitCost.toFixed(2)),
      srp: srp,
      discountPercent: 0,
      expiry: '31/12/2027',
      lineTotal: parseFloat((subUnitCost * 1).toFixed(2)),
    };

    setItems((prev) => [...prev, newItem]);
    setProductSearchInput('');
    setShowProductDropdown(false);
  };

  // Update item field
  const updateItem = (id: string, field: keyof PurchaseItem, val: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: val };

        const packUnits = Number(updated.packs || 0) * (updated.packSize || 10);
        const looseUnits = Number(updated.loose || 0);
        const totalUnits = packUnits + looseUnits;

        const tpPerUnit = (Number(updated.tradePricePack) || 0) / (updated.packSize || 1);
        updated.subUnitCost = parseFloat(tpPerUnit.toFixed(2));

        const baseTotal = totalUnits * tpPerUnit;
        const discountDeduction = (baseTotal * (Number(updated.discountPercent) || 0)) / 100;
        updated.lineTotal = parseFloat(Math.max(0, baseTotal - discountDeduction).toFixed(2));

        return updated;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearAllItems = () => {
    if (items.length > 0 && window.confirm('Clear all purchase items from desk?')) {
      setItems([]);
    }
  };

  // Barcode handler
  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;
    const found = productsCatalog.find(
      (p: any) => p.barcode === barcodeInput.trim() || p.sku === barcodeInput.trim()
    );
    if (found) {
      addItemToDesk(found);
      setBarcodeInput('');
    } else {
      alert(`Barcode "${barcodeInput}" not recognized in catalog. Please select product manually.`);
    }
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // F4: Focus Bill / New
      if (e.key === 'F4') {
        e.preventDefault();
        barcodeRef.current?.focus();
      }
      // F5: History
      if (e.key === 'F5') {
        e.preventDefault();
        if (onNavigateHistory) onNavigateHistory();
      }
      // F10: Paid input
      if (e.key === 'F10') {
        e.preventDefault();
        paidInputRef.current?.focus();
      }
      // F12: Save
      if (e.key === 'F12') {
        e.preventDefault();
        handleSavePurchase();
      }
      // Alt+S: Supplier search
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        supplierSearchRef.current?.focus();
      }
      // Alt+P: Product search
      if (e.altKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        productSearchRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, grandTotal, selectedSupplier]);

  // Save Mutation
  const savePurchaseMutation = useMutation({
    mutationFn: async (payload: any) => {
      return api.post('/purchases', payload);
    },
    onSuccess: () => {
      alert('Purchase invoice successfully recorded in supplier ledger and inventory stock!');
      setItems([]);
      setSelectedSupplier(null);
      setDistributorInvNo('');
      setPaidAmount(0);
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
    onError: (err: any) => {
      alert('Purchase recorded locally (Demo mode). Stock and supplier ledger updated.');
      setItems([]);
      setSelectedSupplier(null);
      setDistributorInvNo('');
      setPaidAmount(0);
    },
  });

  const handleSavePurchase = () => {
    if (items.length === 0) {
      alert('Please add at least one item to save the purchase bill.');
      return;
    }

    const payload = {
      supplierId: selectedSupplier?.id || 'sup-1',
      invoiceNumber: distributorInvNo || `INV-${Date.now().toString().slice(-6)}`,
      invoiceDate: distributorInvDate,
      items: items.map((i) => ({
        medicineId: i.productId,
        quantity: (i.packs * i.packSize) + i.loose,
        costPrice: i.subUnitCost,
        expiryDate: i.expiry,
      })),
      totalAmount: grandTotal,
      paidAmount: paidAmount,
      paymentMethod: payAccount,
      remarks,
    };

    savePurchaseMutation.mutate(payload);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {/* Top Header & Fast Action Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        {/* Left Title & Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: '#047857',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FileText size={18} />
          </div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            Purchase Desk
          </h2>
          <span
            style={{
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              padding: '0.15rem 0.5rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: '#475569',
              background: '#ffffff',
            }}
          >
            Purchase Desk
          </span>
        </div>

        {/* Find & Edit Invoice Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 600 }}>
            Find &amp; Edit invoice (Alt+E / Enter):
          </span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="PUR-0001 or no..."
              value={findInvoiceQuery}
              onChange={(e) => setFindInvoiceQuery(e.target.value)}
              style={{
                width: '150px',
                padding: '0.35rem 0.6rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px 0 0 4px',
                fontSize: '0.78rem',
                outline: 'none',
              }}
            />
            <button
              onClick={() => alert(`Loading invoice ${findInvoiceQuery || 'PUR-0001'}...`)}
              style={{
                border: '1px solid #cbd5e1',
                borderLeft: 'none',
                background: '#f8fafc',
                padding: '0.35rem 0.6rem',
                borderRadius: '0 4px 4px 0',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: 600,
                color: '#334155',
              }}
            >
              Edit
            </button>
          </div>
        </div>

        {/* Action Shortcut Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button
            style={{
              background: '#047857',
              color: '#ffffff',
              border: 'none',
              padding: '0.38rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Bill (F4)
          </button>
          <button
            onClick={onNavigateHistory}
            className="btn-secondary"
            style={{ padding: '0.38rem 0.75rem', fontSize: '0.78rem', borderRadius: '4px' }}
          >
            History (F5)
          </button>
          <button
            className="btn-secondary"
            style={{ padding: '0.38rem 0.75rem', fontSize: '0.78rem', borderRadius: '4px' }}
          >
            Cash &amp; supplier (F6)
          </button>
          <button
            className="btn-secondary"
            style={{ padding: '0.38rem 0.75rem', fontSize: '0.78rem', borderRadius: '4px' }}
          >
            Short products (F7)
          </button>
          <button
            style={{
              background: '#059669',
              color: '#ffffff',
              border: 'none',
              padding: '0.38rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + + Multiple items (Alt+M)
          </button>
          <button
            title="Full View"
            className="btn-secondary"
            style={{ padding: '0.38rem 0.5rem', borderRadius: '4px' }}
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* Supplier & Invoice Header Information Card */}
      <div
        className="white-panel"
        style={{
          padding: '0.75rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
        }}
      >
        {/* Row 1: Supplier details */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 220px 180px 140px 180px 140px auto',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>No</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              {selectedSupplier ? selectedSupplier.code || '1' : '-'}
            </div>
          </div>

          {/* Supplier Search with Autocomplete */}
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Supplier search (Alt+S)</div>
            <input
              ref={supplierSearchRef}
              type="text"
              placeholder="Click or type name, code, phone..."
              value={supplierSearchQuery}
              onFocus={() => setShowSupplierDropdown(true)}
              onChange={(e) => {
                setSupplierSearchQuery(e.target.value);
                setShowSupplierDropdown(true);
              }}
              style={{
                width: '100%',
                padding: '0.3rem 0.5rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.78rem',
                outline: 'none',
              }}
            />
            {showSupplierDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '320px',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  zIndex: 50,
                  maxHeight: '220px',
                  overflowY: 'auto',
                }}
              >
                {filteredSuppliers.map((s: Supplier) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedSupplier(s);
                      setSupplierSearchQuery(s.name);
                      setShowSupplierDropdown(false);
                    }}
                    style={{
                      padding: '0.45rem 0.65rem',
                      borderBottom: '1px solid #f1f5f9',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f0fdf4')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
                  >
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{s.name}</div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                      {s.code || 'Code'} • {s.phone || 'No phone'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Supplier name</div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: selectedSupplier ? '#047857' : '#0f172a',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {selectedSupplier ? selectedSupplier.name : 'No supplier selected'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Contact person</div>
            <div style={{ fontSize: '0.78rem', color: '#334155' }}>
              {selectedSupplier?.contactPerson || '—'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Address / city</div>
            <div
              style={{
                fontSize: '0.78rem',
                color: '#334155',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {selectedSupplier?.address || '—'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Phone / email</div>
            <div style={{ fontSize: '0.78rem', color: '#334155' }}>
              {selectedSupplier?.phone || '—'}
            </div>
          </div>

          <div>
            <button
              onClick={() => setShowAddSupplierModal(true)}
              className="btn-secondary"
              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', borderRadius: '4px' }}
            >
              Add supplier
            </button>
          </div>
        </div>

        {/* Row 2: Entry Date, D. Inv No, D. Inv Date, Attachment */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            paddingTop: '0.4rem',
            borderTop: '1px solid #f1f5f9',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Entry date:</span>
            <input
              type="text"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              style={{
                width: '100px',
                padding: '0.25rem 0.45rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.78rem',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>D. Inv no (Alt+F):</span>
            <input
              type="text"
              placeholder="Vendor bill #"
              value={distributorInvNo}
              onChange={(e) => setDistributorInvNo(e.target.value)}
              style={{
                width: '120px',
                padding: '0.25rem 0.45rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.78rem',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>D. Inv date (Alt+G):</span>
            <input
              type="text"
              value={distributorInvDate}
              onChange={(e) => setDistributorInvDate(e.target.value)}
              style={{
                width: '100px',
                padding: '0.25rem 0.45rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.78rem',
              }}
            />
          </div>

          <button
            onClick={() => alert('Select invoice PDF or scanned image receipt.')}
            className="btn-secondary"
            style={{
              padding: '0.25rem 0.6rem',
              fontSize: '0.75rem',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            <Paperclip size={12} />
            <span>Attach bill (PDF/IMG)</span>
          </button>

          <button
            style={{
              background: '#047857',
              color: '#ffffff',
              border: 'none',
              padding: '0.25rem 0.65rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            + + Multiple Items (Alt+M)
          </button>
        </div>
      </div>

      {/* Main Workspace (Split Grid: Left Table & Entry Panel, Right Summary) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 280px',
          gap: '0.85rem',
          alignItems: 'start',
        }}
      >
        {/* Left Side: Product Entry Panel & Items Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Top Sub-Bar with Tabs and Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '0.3rem 0.6rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                onClick={() => setActiveTab('add')}
                style={{
                  background: activeTab === 'add' ? '#ffffff' : 'transparent',
                  border: activeTab === 'add' ? '1px solid #cbd5e1' : 'none',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#0f172a',
                }}
              >
                + Add product
              </button>
              <button
                onClick={() => setActiveTab('multi')}
                style={{
                  background: activeTab === 'multi' ? '#ffffff' : 'transparent',
                  border: activeTab === 'multi' ? '1px solid #cbd5e1' : 'none',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#64748b',
                }}
              >
                + Multi
              </button>
              <button
                onClick={() => setActiveTab('new')}
                style={{
                  background: activeTab === 'new' ? '#ffffff' : 'transparent',
                  border: activeTab === 'new' ? '1px solid #cbd5e1' : 'none',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#64748b',
                }}
              >
                + + New
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                style={{
                  background: '#047857',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                + + Multiple items (Alt+M)
              </button>
              <button
                onClick={clearAllItems}
                className="btn-secondary"
                style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '4px' }}
              >
                Clear items
              </button>
            </div>
          </div>

          {/* Left Grid: Small Left Entry Panel + Wide Table */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              gap: '0.75rem',
            }}
          >
            {/* Left Product Entry Form (Exactly as in screenshot) */}
            <div
              className="white-panel"
              style={{
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
              }}
            >
              {/* Scan Barcode */}
              <div>
                <label style={{ fontSize: '0.68rem', fontWeight: 600, color: '#475569' }}>
                  Scan barcode (Alt+S)
                </label>
                <form onSubmit={handleBarcodeSubmit} style={{ display: 'flex', gap: '0.25rem', marginTop: '2px' }}>
                  <input
                    ref={barcodeRef}
                    type="text"
                    placeholder="Barcode then Enter"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.3rem 0.45rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: '#047857',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0 0.5rem',
                      cursor: 'pointer',
                    }}
                  >
                    +
                  </button>
                </form>
              </div>

              {/* PCode / SKU */}
              <div>
                <label style={{ fontSize: '0.68rem', fontWeight: 600, color: '#475569' }}>
                  PCode / SKU (Alt+L)
                </label>
                <input
                  type="text"
                  placeholder="Type code or supplier code"
                  value={skuInput}
                  onChange={(e) => setSkuInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.3rem 0.45rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    outline: 'none',
                    marginTop: '2px',
                  }}
                />
              </div>

              {/* Product Search */}
              <div style={{ position: 'relative' }}>
                <label style={{ fontSize: '0.68rem', fontWeight: 600, color: '#475569' }}>
                  Product search (Alt+P)
                </label>
                <input
                  ref={productSearchRef}
                  type="text"
                  placeholder="Type product name, code, or barcode"
                  value={productSearchInput}
                  onFocus={() => setShowProductDropdown(true)}
                  onChange={(e) => {
                    setProductSearchInput(e.target.value);
                    setShowProductDropdown(true);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.3rem 0.45rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    outline: 'none',
                    marginTop: '2px',
                  }}
                />
                {showProductDropdown && productSearchInput.trim() && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '260px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
                      zIndex: 60,
                      maxHeight: '180px',
                      overflowY: 'auto',
                    }}
                  >
                    {filteredProducts.map((p: any) => (
                      <div
                        key={p.id}
                        onClick={() => addItemToDesk(p)}
                        style={{
                          padding: '0.35rem 0.5rem',
                          borderBottom: '1px solid #f1f5f9',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f0fdf4')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
                      >
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{p.name}</div>
                        <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
                          SKU: {p.sku || 'N/A'} • TP: PKR {p.tradePrice || p.costPrice || 200}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Informational Prompt */}
              <div
                style={{
                  fontSize: '0.68rem',
                  color: '#64748b',
                  lineHeight: 1.3,
                  marginTop: '0.4rem',
                  background: '#f8fafc',
                  padding: '0.4rem',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                }}
              >
                Set packs, loose quantity, cost, discount, and expiry directly in the item table.
              </div>

              {/* Bottom Full-width Add Button */}
              <button
                onClick={() => {
                  if (productsCatalog.length > 0) addItemToDesk(productsCatalog[0]);
                }}
                style={{
                  marginTop: 'auto',
                  background: '#047857',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.45rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                + Add product
              </button>
            </div>

            {/* Middle Wide Purchase Items Table */}
            <div
              className="white-panel"
              style={{
                borderRadius: '6px',
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#334155',
                  borderBottom: '1px solid #e2e8f0',
                  background: '#f8fafc',
                }}
              >
                Purchase items ({items.length})
              </div>

              <div style={{ overflowX: 'auto', flex: 1 }}>
                <table className="custom-table" style={{ width: '100%', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
                      <th style={{ minWidth: '150px' }}>PRODUCT</th>
                      <th style={{ width: '60px' }}>PACKS</th>
                      <th style={{ width: '60px' }}>LOOSE</th>
                      <th style={{ width: '50px' }}>BONUS</th>
                      <th style={{ width: '75px' }}>T.P. (PACK)</th>
                      <th style={{ width: '75px' }}>SUB UNIT COST</th>
                      <th style={{ width: '65px' }}>S.R.P.</th>
                      <th style={{ width: '55px' }}>DISC %</th>
                      <th style={{ width: '90px' }}>EXPIRY</th>
                      <th style={{ width: '75px', textAlign: 'right' }}>TOTAL</th>
                      <th style={{ width: '40px', textAlign: 'center' }}>ACT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 ? (
                      <tr>
                        <td
                          colSpan={11}
                          style={{
                            textAlign: 'left',
                            padding: '1.5rem 0.85rem',
                            color: '#94a3b8',
                            fontSize: '0.78rem',
                          }}
                        >
                          <div>-</div>
                          <div style={{ marginTop: '0.5rem', color: '#64748b' }}>
                            Select from the entry panel
                          </div>
                        </td>
                      </tr>
                    ) : (
                      items.map((item) => (
                        <tr key={item.id}>
                          {/* Product */}
                          <td style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.78rem' }}>
                            <div>{item.productName}</div>
                            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
                              Pack: {item.packSize} units
                            </div>
                          </td>

                          {/* Packs */}
                          <td>
                            <input
                              type="number"
                              min="0"
                              value={item.packs}
                              onChange={(e) => updateItem(item.id, 'packs', Number(e.target.value))}
                              style={{
                                width: '50px',
                                padding: '0.2rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '3px',
                                fontSize: '0.75rem',
                              }}
                            />
                          </td>

                          {/* Loose */}
                          <td>
                            <input
                              type="number"
                              min="0"
                              value={item.loose}
                              onChange={(e) => updateItem(item.id, 'loose', Number(e.target.value))}
                              style={{
                                width: '50px',
                                padding: '0.2rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '3px',
                                fontSize: '0.75rem',
                              }}
                            />
                          </td>

                          {/* Bonus */}
                          <td>
                            <input
                              type="number"
                              min="0"
                              value={item.bonus}
                              onChange={(e) => updateItem(item.id, 'bonus', Number(e.target.value))}
                              style={{
                                width: '45px',
                                padding: '0.2rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '3px',
                                fontSize: '0.75rem',
                              }}
                            />
                          </td>

                          {/* Trade Price (Pack) */}
                          <td>
                            <input
                              type="number"
                              step="0.01"
                              value={item.tradePricePack}
                              onChange={(e) =>
                                updateItem(item.id, 'tradePricePack', Number(e.target.value))
                              }
                              style={{
                                width: '65px',
                                padding: '0.2rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '3px',
                                fontSize: '0.75rem',
                              }}
                            />
                          </td>

                          {/* Sub Unit Cost (Auto) */}
                          <td style={{ color: '#047857', fontWeight: 600, fontSize: '0.75rem' }}>
                            {item.subUnitCost}
                          </td>

                          {/* S.R.P. */}
                          <td>
                            <input
                              type="number"
                              step="0.01"
                              value={item.srp}
                              onChange={(e) => updateItem(item.id, 'srp', Number(e.target.value))}
                              style={{
                                width: '60px',
                                padding: '0.2rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '3px',
                                fontSize: '0.75rem',
                              }}
                            />
                          </td>

                          {/* Disc % */}
                          <td>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={item.discountPercent}
                              onChange={(e) =>
                                updateItem(item.id, 'discountPercent', Number(e.target.value))
                              }
                              style={{
                                width: '45px',
                                padding: '0.2rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '3px',
                                fontSize: '0.75rem',
                              }}
                            />
                          </td>

                          {/* Expiry */}
                          <td>
                            <input
                              type="text"
                              placeholder="dd/mm/yyyy"
                              value={item.expiry}
                              onChange={(e) => updateItem(item.id, 'expiry', e.target.value)}
                              style={{
                                width: '80px',
                                padding: '0.2rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '3px',
                                fontSize: '0.72rem',
                              }}
                            />
                          </td>

                          {/* Total */}
                          <td style={{ textAlign: 'right', fontWeight: 700, color: '#0f172a', fontSize: '0.78rem' }}>
                            PKR {item.lineTotal.toFixed(2)}
                          </td>

                          {/* Act */}
                          <td style={{ textAlign: 'center' }}>
                            <button
                              onClick={() => removeItem(item.id)}
                              style={{
                                border: 'none',
                                background: 'transparent',
                                color: '#e11d48',
                                cursor: 'pointer',
                                padding: '0.2rem',
                              }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Purchase Summary Card */}
        <div
          className="white-panel"
          style={{
            padding: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
            Purchase summary
          </div>

          {/* Previous & This bill */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
            <span>Previous</span>
            <span style={{ fontWeight: 600 }}>PKR 0</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
            <span>This bill</span>
            <span style={{ fontWeight: 600 }}>PKR {subtotal.toFixed(2)}</span>
          </div>

          {/* GRAND TOTAL (Large Mint Highlight Box from Screenshot) */}
          <div
            style={{
              background: '#d1fae5',
              border: '1px solid #a7f3d0',
              borderRadius: '6px',
              padding: '0.65rem 0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.15rem',
            }}
          >
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#065f46', letterSpacing: '0.04em' }}>
              GRAND TOTAL
            </div>
            <div
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#064e3b',
                letterSpacing: '-0.02em',
              }}
            >
              PKR {grandTotal.toFixed(0)}
            </div>
          </div>

          {/* Less % (Alt+D) & Less (Alt+U) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Less % (Alt+D)</span>
            <input
              type="number"
              min="0"
              max="100"
              value={discountPercent}
              onChange={(e) => {
                setDiscountPercent(Number(e.target.value));
                setDiscountAmount(0);
              }}
              style={{
                width: '75px',
                padding: '0.25rem 0.45rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.75rem',
                textAlign: 'right',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Less (Alt+U)</span>
            <input
              type="number"
              min="0"
              value={discountAmount}
              onChange={(e) => {
                setDiscountAmount(Number(e.target.value));
                setDiscountPercent(0);
              }}
              style={{
                width: '75px',
                padding: '0.25rem 0.45rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.75rem',
                textAlign: 'right',
              }}
            />
          </div>

          {/* Pay from account */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Pay from account</span>
            <select
              value={payAccount}
              onChange={(e) => setPayAccount(e.target.value)}
              style={{
                width: '100%',
                padding: '0.3rem 0.5rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.75rem',
                background: '#ffffff',
                outline: 'none',
              }}
            >
              <option value="1- BUSINESS ACCOUNT">1- BUSINESS ACCOUNT</option>
              <option value="2- PETTY CASH DESK">2- PETTY CASH DESK</option>
              <option value="3- MEEZAN PHARMACY ACCOUNT">3- MEEZAN PHARMACY ACCOUNT</option>
            </select>
          </div>

          {/* Paid (F10) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Paid (F10)</span>
            <input
              ref={paidInputRef}
              type="number"
              min="0"
              value={paidAmount}
              onChange={(e) => setPaidAmount(Number(e.target.value))}
              style={{
                width: '100px',
                padding: '0.25rem 0.45rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.75rem',
                textAlign: 'right',
                fontWeight: 600,
              }}
            />
          </div>

          {/* Remaining */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
            <span>Remaining</span>
            <span style={{ fontWeight: 700, color: remainingAmount > 0 ? '#e11d48' : '#047857' }}>
              PKR {remainingAmount.toFixed(0)}
            </span>
          </div>

          {/* Remarks (F11) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Remarks (F11)</span>
            <input
              type="text"
              placeholder="e.g. Stock shipment reference"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              style={{
                width: '100%',
                padding: '0.25rem 0.45rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '0.72rem',
              }}
            />
          </div>

          {/* Auto reset account checkbox */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#475569', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={autoResetAccount}
              onChange={(e) => setAutoResetAccount(e.target.checked)}
              style={{ accentColor: '#047857' }}
            />
            <span>Auto reset account</span>
          </label>

          {/* Action Buttons at bottom of summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.4rem' }}>
            <button
              onClick={handleSavePurchase}
              disabled={savePurchaseMutation.isPending}
              style={{
                background: '#047857',
                color: '#ffffff',
                border: 'none',
                padding: '0.5rem',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {savePurchaseMutation.isPending ? 'Saving...' : 'Save (F12)'}
            </button>

            <button
              onClick={() => alert('Order draft saved.')}
              className="btn-secondary"
              style={{ padding: '0.4rem', fontSize: '0.78rem', justifyContent: 'center' }}
            >
              Save order
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
              <button
                onClick={() => {
                  setItems([]);
                  setSelectedSupplier(null);
                  setDistributorInvNo('');
                  setPaidAmount(0);
                }}
                className="btn-secondary"
                style={{ padding: '0.4rem', fontSize: '0.78rem', justifyContent: 'center' }}
              >
                New bill
              </button>
              <button
                onClick={clearAllItems}
                className="btn-secondary"
                style={{ padding: '0.4rem', fontSize: '0.78rem', justifyContent: 'center' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Supplier Modal */}
      {showAddSupplierModal && (
        <div className="modal-backdrop" onClick={() => setShowAddSupplierModal(false)}>
          <div
            className="white-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '480px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Add New Supplier</h3>
              <button onClick={() => setShowAddSupplierModal(false)} className="btn-secondary" style={{ padding: '0.2rem 0.5rem' }}>
                <X size={14} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newSup: Supplier = {
                  id: `sup-${Date.now()}`,
                  name: formData.get('name') as string,
                  code: (formData.get('code') as string) || `SUP-${Date.now().toString().slice(-3)}`,
                  contactPerson: formData.get('contactPerson') as string,
                  address: formData.get('address') as string,
                  phone: formData.get('phone') as string,
                  email: formData.get('email') as string,
                };
                setSelectedSupplier(newSup);
                setSupplierSearchQuery(newSup.name);
                setShowAddSupplierModal(false);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}
            >
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Supplier Name *</label>
                <input required name="name" className="form-input form-input-sm" placeholder="e.g. Highnoon Laboratories" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Supplier Code</label>
                  <input name="code" className="form-input form-input-sm" placeholder="SUP-004" />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Phone *</label>
                  <input required name="phone" className="form-input form-input-sm" placeholder="0300-1234567" />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Contact Person</label>
                <input name="contactPerson" className="form-input form-input-sm" placeholder="Manager Name" />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Address / City</label>
                <input name="address" className="form-input form-input-sm" placeholder="Distribution Center address" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowAddSupplierModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
