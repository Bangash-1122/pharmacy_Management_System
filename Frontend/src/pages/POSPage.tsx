import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Search,
  Plus,
  Trash2,
  Calendar,
  CreditCard,
  Building2,
  Check,
  RotateCcw,
  UserPlus,
  Printer,
  X,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { usePOSStore } from '../store/usePOSStore';
import api from '../services/api';

interface POSItem {
  id: string;
  pCode: string;
  productName: string;
  stock: number;
  packQty: number;
  looseQty: number;
  packPrice: number;
  loosePrice: number;
  amount: number;
}

interface POSPageProps {
  onNavigateHistory?: () => void;
  onNavigateCustomerReturn?: () => void;
}

export const POSPage: React.FC<POSPageProps> = ({
  onNavigateHistory,
  onNavigateCustomerReturn,
}) => {
  const { user } = useAuthStore();

  // Header & Customer states
  const [billNo, setBillNo] = useState(39);
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerName, setCustomerName] = useState('Walk-in');
  const [fatherName, setFatherName] = useState('—');
  const [addressArea, setAddressArea] = useState('—');
  const [mobileNo, setMobileNo] = useState('—');
  const [prevDue, setPrevDue] = useState(0);

  // Left Entry states
  const [invoiceType, setInvoiceType] = useState('Sale invoice');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [pCodeInput, setPCodeInput] = useState('');
  const [productSearchInput, setProductSearchInput] = useState('');
  const [unitQtyPack, setUnitQtyPack] = useState(0);
  const [unitPricePack, setUnitPricePack] = useState(0);
  const [subUnitQtyLoose, setSubUnitQtyLoose] = useState(1);
  const [subUnitLoosePrice, setSubUnitLoosePrice] = useState(0);

  // Items table
  const [cartItems, setCartItems] = useState<POSItem[]>([]);

  // Summary financials
  const [fee, setFee] = useState(0);
  const [paymentType, setPaymentType] = useState('Cash');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paidHere, setPaidHere] = useState(0);
  const [cashPresented, setCashPresented] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [printOnSave, setPrintOnSave] = useState(true);
  const [autoReset, setAutoReset] = useState(true);

  // References for keyboard shortcuts
  const barcodeRef = useRef<HTMLInputElement>(null);
  const pCodeRef = useRef<HTMLInputElement>(null);
  const productRef = useRef<HTMLInputElement>(null);
  const paidRef = useRef<HTMLInputElement>(null);

  // Catalog items
  const catalog = [
    { pCode: 'ITM-0001', name: 'Panadol 500mg Tab', stock: 450, packPrice: 550, loosePrice: 2.75 },
    { pCode: 'ITM-0002', name: 'Augmentin 625mg Tab', stock: 80, packPrice: 350, loosePrice: 58.33 },
    { pCode: 'ITM-0003', name: 'Brufen 400mg Tab', stock: 120, packPrice: 600, loosePrice: 2.0 },
    { pCode: 'ITM-0004', name: 'Risek 20mg Cap', stock: 95, packPrice: 320, loosePrice: 22.85 },
    { pCode: 'ITM-0005', name: 'Softin 10mg Tab', stock: 60, packPrice: 150, loosePrice: 15.0 },
  ];

  const subtotal = cartItems.reduce((s, i) => s + i.amount, 0);
  const discountTotal = discountAmount > 0 ? discountAmount : (subtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, subtotal + fee - discountTotal);
  const returnAmount = cashPresented > grandTotal ? cashPresented - grandTotal : 0;
  const remaining = Math.max(0, grandTotal - paidHere);

  const addItemToBill = (item: any, pack = 0, loose = 1) => {
    const amount = pack * item.packPrice + loose * item.loosePrice;
    const newItem: POSItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      pCode: item.pCode,
      productName: item.name,
      stock: item.stock,
      packQty: pack,
      looseQty: loose,
      packPrice: item.packPrice,
      loosePrice: item.loosePrice,
      amount: parseFloat(amount.toFixed(2)),
    };
    setCartItems((prev) => [...prev, newItem]);
    setProductSearchInput('');
    setPCodeInput('');
  };

  const handleNextProductInsert = () => {
    const found = catalog.find(
      (c) =>
        c.pCode.toLowerCase() === pCodeInput.toLowerCase() ||
        c.name.toLowerCase().includes(productSearchInput.toLowerCase())
    );
    if (found) {
      addItemToBill(found, unitQtyPack, subUnitQtyLoose);
      setUnitQtyPack(0);
      setSubUnitQtyLoose(1);
    } else if (catalog.length > 0) {
      addItemToBill(catalog[0], unitQtyPack, subUnitQtyLoose);
    }
  };

  const handleSaveInvoice = () => {
    if (cartItems.length === 0) {
      alert('Please add products to the bill before saving.');
      return;
    }
    alert(`Invoice SAL-00${billNo} saved successfully! Amount: PKR ${grandTotal.toFixed(2)}`);
    setCartItems([]);
    setBillNo((b) => b + 1);
    setCashPresented(0);
    setPaidHere(0);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === 'F4') {
        e.preventDefault();
        barcodeRef.current?.focus();
      }
      if (e.key === 'F5') {
        e.preventDefault();
        onNavigateHistory?.();
      }
      if (e.key === 'F10') {
        e.preventDefault();
        paidRef.current?.focus();
      }
      if (e.key === 'F2' || (e.ctrlKey && (e.key === 's' || e.key === 'S'))) {
        e.preventDefault();
        handleSaveInvoice();
      }
      if (e.key === 'Insert') {
        e.preventDefault();
        handleNextProductInsert();
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [cartItems, grandTotal]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Top Header & Fast Action Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#047857', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={16} />
          </div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Sale Desk
          </h2>
          <span style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '0.15rem 0.5rem', fontSize: '0.72rem', fontWeight: 700, color: '#334155', background: '#ffffff' }}>
            POS Desk
          </span>
        </div>

        {/* Find & Edit invoice */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>
            Find &amp; Edit Invoice:
          </span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="SAL-0001 or no..."
              style={{ width: '130px', padding: '0.25rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px 0 0 4px', fontSize: '0.75rem', outline: 'none' }}
            />
            <button style={{ border: '1px solid #cbd5e1', borderLeft: 'none', background: '#f8fafc', padding: '0.25rem 0.55rem', borderRadius: '0 4px 4px 0', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>
              Edit
            </button>
          </div>
        </div>

        {/* Shortcut Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          <button style={{ background: '#047857', color: '#ffffff', border: 'none', padding: '0.35rem 0.7rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
            Bill (F4)
          </button>
          <button onClick={onNavigateHistory} className="btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '4px' }}>
            History (F5)
          </button>
          <button className="btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '4px' }}>
            Cash &amp; recovery (F6)
          </button>
          <button className="btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '4px' }}>
            Invoice detail (F7)
          </button>
          <button className="btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '4px' }}>
            Quotation
          </button>
          <button className="btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '4px' }}>
            Product wise (F8)
          </button>
          <button className="btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '4px' }}>
            Profit (F9)
          </button>
        </div>
      </div>

      {/* Customer Info Row (Image 1 / PDF Page 5) */}
      <div
        className="white-panel"
        style={{
          padding: '0.65rem 0.85rem',
          display: 'grid',
          gridTemplateColumns: '35px 180px 140px 140px 140px 120px 80px auto',
          alignItems: 'center',
          gap: '0.65rem',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
        }}
      >
        <div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>No</div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{billNo}</div>
        </div>

        <div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Customer search (Alt+S)</div>
          <input
            type="text"
            placeholder="Click or type name, code, mobile..."
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
            style={{ width: '100%', padding: '0.25rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem' }}
          />
        </div>

        <div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Name (Alt+C)</div>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={{ width: '100%', padding: '0.25rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}
          />
        </div>

        <div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Father Name (s/o)</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{fatherName}</div>
        </div>

        <div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Address / Area</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{addressArea}</div>
        </div>

        <div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Mobile</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{mobileNo}</div>
        </div>

        <div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Prev. Due</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>{prevDue}</div>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setCustomerName('Walk-in')}
            style={{ background: '#064e3b', color: '#ffffff', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
          >
            Walk-in
          </button>
          <button className="btn-secondary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', borderRadius: '4px' }}>
            + Add customer
          </button>
        </div>
      </div>

      {/* Main Workspace: Left Entry (200px), Center Table (Flex 1), Right Summary (260px) */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 260px', gap: '0.75rem', alignItems: 'start' }}>
        {/* Left Entry Form */}
        <div className="white-panel" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div>
            <label style={{ fontSize: '0.68rem', color: '#64748b' }}>Invoice type</label>
            <select
              value={invoiceType}
              onChange={(e) => setInvoiceType(e.target.value)}
              style={{ width: '100%', padding: '0.25rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', background: '#ffffff', marginTop: '2px' }}
            >
              <option value="Sale invoice">Sale invoice</option>
              <option value="Hospital Inpatient">Hospital Inpatient</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>
              Scan item barcode (Alt+S)
            </label>
            <div style={{ display: 'flex', gap: '0.25rem', marginTop: '2px' }}>
              <input
                ref={barcodeRef}
                type="text"
                placeholder="Scan barcode and press Ent"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (catalog.length > 0) addItemToBill(catalog[0]);
                    setBarcodeInput('');
                  }
                }}
                style={{ flex: 1, padding: '0.25rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.72rem' }}
              />
              <button
                onClick={() => {
                  if (catalog.length > 0) addItemToBill(catalog[0]);
                }}
                style={{ background: '#047857', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '0 0.5rem', cursor: 'pointer' }}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>P.Code (Alt+I)</label>
            <input
              ref={pCodeRef}
              type="text"
              placeholder="Click or type P.Code / SKU"
              value={pCodeInput}
              onChange={(e) => setPCodeInput(e.target.value)}
              style={{ width: '100%', padding: '0.25rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', marginTop: '2px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Product search (Alt+P)</label>
            <input
              ref={productRef}
              type="text"
              placeholder="Click or type name / code / barcode"
              value={productSearchInput}
              onChange={(e) => setProductSearchInput(e.target.value)}
              style={{ width: '100%', padding: '0.25rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', marginTop: '2px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
            <div>
              <label style={{ fontSize: '0.65rem', color: '#64748b' }}>Unit qty (Pack)</label>
              <input
                type="number"
                min="0"
                value={unitQtyPack}
                onChange={(e) => setUnitQtyPack(Number(e.target.value))}
                style={{ width: '100%', padding: '0.2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', color: '#64748b' }}>Unit price (F1)</label>
              <input
                type="number"
                min="0"
                value={unitPricePack}
                onChange={(e) => setUnitPricePack(Number(e.target.value))}
                style={{ width: '100%', padding: '0.2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
            <div>
              <label style={{ fontSize: '0.65rem', color: '#64748b' }}>Sub unit qty (Loose)</label>
              <input
                type="number"
                min="0"
                value={subUnitQtyLoose}
                onChange={(e) => setSubUnitQtyLoose(Number(e.target.value))}
                style={{ width: '100%', padding: '0.2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', color: '#64748b' }}>Sub unit price (Alt+N)</label>
              <input
                type="number"
                min="0"
                value={subUnitLoosePrice}
                onChange={(e) => setSubUnitLoosePrice(Number(e.target.value))}
                style={{ width: '100%', padding: '0.2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', marginTop: '0.2rem' }}>
            <button className="btn-secondary" style={{ padding: '0.25rem', fontSize: '0.68rem', justifyContent: 'center' }}>
              + Open Stoc Alt+O
            </button>
            <button className="btn-secondary" style={{ padding: '0.25rem', fontSize: '0.68rem', justifyContent: 'center' }}>
              Check Q Alt+K
            </button>
          </div>

          <button
            onClick={handleNextProductInsert}
            style={{
              background: '#047857',
              color: '#ffffff',
              border: 'none',
              padding: '0.45rem',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer',
              marginTop: '0.3rem',
            }}
          >
            Next product (Insert)
          </button>
        </div>

        {/* Center Items Table */}
        <div className="white-panel" style={{ display: 'flex', flexDirection: 'column', minHeight: '380px' }}>
          <div style={{ padding: '0.5rem 0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>Items • Bill {billNo}</span>
              <button className="btn-secondary" style={{ padding: '0.15rem 0.45rem', fontSize: '0.7rem' }}>
                Invoice detail (Alt+Q)
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: '#64748b' }}>
              <span>Invoice date (Alt+D):</span>
              <input type="text" defaultValue="10/10/2026" style={{ width: '85px', padding: '0.15rem 0.35rem', border: '1px solid #cbd5e1', borderRadius: '3px', fontSize: '0.72rem' }} />
            </div>
          </div>

          <div style={{ overflowX: 'auto', flex: 1 }}>
            <table className="custom-table" style={{ width: '100%' }}>
              <thead>
                <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
                  <th style={{ width: '90px' }}>P.CODE</th>
                  <th>PRODUCT</th>
                  <th style={{ width: '60px', textAlign: 'center' }}>STOCK</th>
                  <th style={{ width: '55px', textAlign: 'center' }}>PACK</th>
                  <th style={{ width: '55px', textAlign: 'center' }}>LOOSE</th>
                  <th style={{ width: '70px', textAlign: 'right' }}>PRICE</th>
                  <th style={{ width: '80px', textAlign: 'right' }}>AMOUNT</th>
                  <th style={{ width: '35px' }}></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8', fontSize: '0.82rem' }}>
                      No items yet — enter P.Code then Insert
                    </td>
                  </tr>
                ) : (
                  cartItems.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontFamily: 'monospace', color: '#047857', fontWeight: 700 }}>{item.pCode}</td>
                      <td style={{ fontWeight: 600, color: '#0f172a' }}>{item.productName}</td>
                      <td style={{ textAlign: 'center', color: '#64748b' }}>{item.stock}</td>
                      <td style={{ textAlign: 'center' }}>{item.packQty}</td>
                      <td style={{ textAlign: 'center' }}>{item.looseQty}</td>
                      <td style={{ textAlign: 'right', color: '#334155' }}>{item.loosePrice.toFixed(2)}</td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                        PKR {item.amount.toFixed(2)}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => setCartItems(cartItems.filter((i) => i.id !== item.id))}
                          style={{ background: 'transparent', border: 'none', color: '#e11d48', cursor: 'pointer' }}
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

          {/* Bottom Table Toolbar */}
          <div style={{ padding: '0.5rem 0.85rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button
                onClick={() => setCartItems(cartItems.slice(0, -1))}
                className="btn-secondary"
                style={{ padding: '0.2rem 0.45rem', fontSize: '0.7rem' }}
              >
                Delete last (Del)
              </button>
              <button
                onClick={() => setCartItems([])}
                className="btn-secondary"
                style={{ padding: '0.2rem 0.45rem', fontSize: '0.7rem' }}
              >
                Delete all (Shift+Del)
              </button>
              <button
                onClick={() => {
                  setCartItems([]);
                  setBillNo((b) => b + 1);
                }}
                className="btn-secondary"
                style={{ padding: '0.2rem 0.45rem', fontSize: '0.7rem' }}
              >
                + New bill (Alt+W)
              </button>
              <button className="btn-secondary" style={{ padding: '0.2rem 0.45rem', fontSize: '0.7rem' }}>
                Customers (Alt+J)
              </button>
            </div>

            <div style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 600 }}>
              Products: <strong>{cartItems.length}</strong> • This bill: <strong>PKR {subtotal.toFixed(0)}</strong>
            </div>
          </div>

          <div style={{ padding: '0.4rem 0.85rem', borderTop: '1px solid #f1f5f9', background: '#ffffff', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
            <div>Sales man (Alt+R): <strong style={{ color: '#0f172a' }}>{user?.name || 'Syed Zubair Shah'}</strong></div>
            <div>Cash receiving account: <strong style={{ color: '#047857' }}>1 — BUSINESS ACCOUNT</strong></div>
          </div>
        </div>

        {/* Right Summary Panel from Image 1 */}
        <div className="white-panel" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
            <span>Subtotal</span>
            <span style={{ fontWeight: 600 }}>PKR {subtotal.toFixed(0)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Fee (Alt+A)</span>
            <input
              type="number"
              min="0"
              value={fee}
              onChange={(e) => setFee(Number(e.target.value))}
              style={{ width: '70px', padding: '0.2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', textAlign: 'right' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Payment type</span>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              style={{ width: '85px', padding: '0.2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', background: '#ffffff' }}
            >
              <option value="Cash">Cash</option>
              <option value="Credit">Credit</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Discount %</span>
            <input
              type="number"
              min="0"
              max="100"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              style={{ width: '70px', padding: '0.2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', textAlign: 'right' }}
            />
          </div>

          {/* Mint Green Grand Total Box */}
          <div
            style={{
              background: '#d1fae5',
              border: '1px solid #a7f3d0',
              borderRadius: '6px',
              padding: '0.55rem 0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#065f46' }}>Grand total</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#064e3b' }}>
              PKR {grandTotal.toFixed(0)}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Paid here (F10)</span>
            <input
              ref={paidRef}
              type="number"
              min="0"
              value={paidHere}
              onChange={(e) => setPaidHere(Number(e.target.value))}
              style={{ width: '85px', padding: '0.2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', textAlign: 'right', fontWeight: 700 }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Cash presented</span>
            <input
              type="number"
              min="0"
              value={cashPresented}
              onChange={(e) => setCashPresented(Number(e.target.value))}
              style={{ width: '85px', padding: '0.2rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', textAlign: 'right' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
            <span>Return amount</span>
            <span style={{ fontWeight: 700, color: returnAmount > 0 ? '#047857' : '#64748b' }}>
              PKR {returnAmount.toFixed(0)}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
            <span>Remaining</span>
            <span style={{ fontWeight: 700, color: remaining > 0 ? '#e11d48' : '#047857' }}>
              PKR {remaining.toFixed(0)}
            </span>
          </div>

          <div>
            <label style={{ fontSize: '0.68rem', color: '#64748b' }}>Remarks (F11)</label>
            <input
              type="text"
              placeholder="Optional note"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              style={{ width: '100%', padding: '0.2rem 0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.72rem', marginTop: '2px' }}
            />
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleSaveInvoice}
            style={{
              background: '#047857',
              color: '#ffffff',
              border: 'none',
              padding: '0.55rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              marginTop: '0.3rem',
            }}
          >
            Save invoice (F2 / Ctrl+S)
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#475569' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={printOnSave} onChange={(e) => setPrintOnSave(e.target.checked)} style={{ accentColor: '#047857' }} />
              Print on save
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={autoReset} onChange={(e) => setAutoReset(e.target.checked)} style={{ accentColor: '#047857' }} />
              Auto reset
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
            <button
              onClick={() => {
                handleSaveInvoice();
                window.print();
              }}
              className="btn-secondary"
              style={{ padding: '0.35rem', fontSize: '0.72rem', justifyContent: 'center' }}
            >
              Save &amp; print
            </button>
            <button
              onClick={() => setCartItems([])}
              className="btn-secondary"
              style={{ padding: '0.35rem', fontSize: '0.72rem', justifyContent: 'center' }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
