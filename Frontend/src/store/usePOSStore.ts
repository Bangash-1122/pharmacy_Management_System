import { create } from 'zustand';
import { POSCartItem, Medicine, Customer } from '../types';

interface POSState {
  cart: POSCartItem[];
  selectedCustomer: Customer | null;
  discountPercent: number;
  paymentMethod: string;
  receivedAmount: string;
  redeemPoints: number;
  heldCarts: { id: string; name: string; items: POSCartItem[]; date: string }[];

  addToCart: (med: Medicine) => void;
  updateQuantity: (medicineId: string, delta: number) => void;
  removeFromCart: (medicineId: string) => void;
  clearCart: () => void;
  setDiscountPercent: (discount: number) => void;
  setPaymentMethod: (method: string) => void;
  setReceivedAmount: (amount: string) => void;
  setSelectedCustomer: (customer: Customer | null) => void;
  setRedeemPoints: (points: number) => void;
  holdCurrentCart: (label: string) => void;
  resumeHeldCart: (id: string) => void;
}

export const usePOSStore = create<POSState>((set, get) => ({
  cart: [],
  selectedCustomer: {
    id: 'walk-in',
    name: 'Walk-in Customer',
    phone: '',
    customerType: 'walk_in',
    balance: 0,
    loyaltyPoints: 0,
    loyaltyTier: 'Bronze',
  },
  discountPercent: 0,
  paymentMethod: 'cash',
  receivedAmount: '',
  redeemPoints: 0,
  heldCarts: [],

  addToCart: (med) => {
    const { cart } = get();
    const existing = cart.find((i) => i.medicineId === med.id);
    if (existing) {
      if (existing.quantity >= med.totalStock) {
        alert(`Cannot add more. Available stock for ${med.name} is ${med.totalStock}.`);
        return;
      }
      set({
        cart: cart.map((i) =>
          i.medicineId === med.id
            ? { ...i, quantity: i.quantity + 1, subtotal: (i.quantity + 1) * i.unitPrice }
            : i
        ),
      });
    } else {
      const newItem: POSCartItem = {
        medicineId: med.id,
        medicineName: med.name,
        genericName: med.genericName,
        unitOfMeasure: med.unitOfMeasure,
        batchNo: 'FEFO-AUTO',
        expiryDate: med.nearestExpiry || '2027-01-01',
        availableStock: med.totalStock,
        quantity: 1,
        unitPrice: med.salePrice,
        discountPercent: 0,
        taxPercent: 0,
        subtotal: med.salePrice,
      };
      set({ cart: [...cart, newItem] });
    }
  },

  updateQuantity: (medicineId, delta) => {
    const { cart } = get();
    const updated = cart
      .map((item) => {
        if (item.medicineId === medicineId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          if (newQty > item.availableStock) {
            alert(`Maximum available stock is ${item.availableStock}`);
            return item;
          }
          return { ...item, quantity: newQty, subtotal: newQty * item.unitPrice };
        }
        return item;
      })
      .filter(Boolean) as POSCartItem[];
    set({ cart: updated });
  },

  removeFromCart: (medicineId) => {
    set({ cart: get().cart.filter((i) => i.medicineId !== medicineId) });
  },

  clearCart: () => {
    set({ cart: [], receivedAmount: '', discountPercent: 0, redeemPoints: 0 });
  },

  setDiscountPercent: (discountPercent) => set({ discountPercent }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setReceivedAmount: (receivedAmount) => set({ receivedAmount }),
  setSelectedCustomer: (selectedCustomer) => set({ selectedCustomer }),
  setRedeemPoints: (redeemPoints) => set({ redeemPoints }),

  holdCurrentCart: (label) => {
    const { cart, heldCarts } = get();
    if (cart.length === 0) return;
    const newHeld = {
      id: `held-${Date.now()}`,
      name: label || `Cart #${heldCarts.length + 1}`,
      items: [...cart],
      date: new Date().toLocaleTimeString(),
    };
    set({ heldCarts: [...heldCarts, newHeld], cart: [] });
  },

  resumeHeldCart: (id) => {
    const { heldCarts } = get();
    const selected = heldCarts.find((c) => c.id === id);
    if (selected) {
      set({
        cart: selected.items,
        heldCarts: heldCarts.filter((c) => c.id !== id),
      });
    }
  },
}));
