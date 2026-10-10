import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Cpu,
  Receipt,
  Users,
  Smartphone,
  Server,
  Layers,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const { login } = useAuthStore();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Standard');

  // Registration Form State
  const [formData, setFormData] = useState({
    pharmacyName: '',
    ownerName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      {
        id: 'new-user',
        name: formData.ownerName || 'Dr. Pharmacist',
        email: formData.email,
        role: 'PHARMACY_OWNER',
      },
      {
        id: 'new-tenant',
        name: formData.pharmacyName || 'New City Pharmacy',
        slug: 'new-city-pharmacy',
        email: formData.email,
        phone: formData.phone,
        pharmacyType: 'Retail Pharmacy',
        city: formData.city,
        planId: selectedPlan.toLowerCase(),
        subscriptionStatus: 'trial',
      },
      'mock_token_2026'
    );
    setShowRegisterModal(false);
    onEnterApp();
  };

  const plans = [
    {
      name: 'Basic',
      pricePKR: 2800,
      priceUSD: 10,
      badge: 'Small Pharmacy',
      features: ['Up to 3 Staff Users', '1 Branch', '2,000 Medicine SKUs', 'Core POS Billing', 'Purchase Orders & GRN', 'Supplier & Customer Ledger'],
      popular: false,
    },
    {
      name: 'Standard',
      pricePKR: 6900,
      priceUSD: 25,
      badge: 'Most Popular',
      features: ['Up to 8 Staff Users', '1 Branch', 'Unlimited Medicine SKUs', 'FEFO Expiry Radar', 'Thermal 58/80mm Printing', 'Loyalty Rewards Program', 'Advanced P&L Reports'],
      popular: true,
    },
    {
      name: 'Premium',
      pricePKR: 16800,
      priceUSD: 60,
      badge: 'Multi-Branch Pharmacy',
      features: ['Up to 20 Staff Users', 'Up to 3 Branches', 'Inter-Branch Stock Transfers', 'Barcode Label Generation', 'AI Reorder Point Suggestions', 'Full Granular RBAC', 'Priority 24/7 SLA Support'],
      popular: false,
    },
    {
      name: 'Enterprise',
      pricePKR: 'Custom',
      priceUSD: 'Custom',
      badge: 'Pharmacy Chains',
      features: ['Unlimited Users & Branches', 'Custom API & ERP Integrations', 'Dedicated Account Manager', 'White-Label Branding', 'Automated Daily Cloud Backups'],
      popular: false,
    },
  ];

  return (
    <div style={{ background: '#090d16', minHeight: '100vh', color: '#f8fafc' }}>
      {/* Navigation Bar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 4rem', borderBottom: '1px solid #1e293b', background: 'rgba(11, 17, 30, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #0284c7, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>
            Rx
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>MediFlow SaaS</span>
        </div>

        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#94a3b8' }}>
          <a href="#features" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Features</a>
          <a href="#pricing" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Pricing</a>
          <a href="#architecture" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Architecture</a>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={onEnterApp} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
            Live App Demo
          </button>
          <button onClick={() => setShowRegisterModal(true)} className="btn-primary" style={{ fontSize: '0.85rem' }}>
            Start 30-Day Free Trial
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '5rem 4rem 4rem', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '9999px', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.3)', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          <Zap size={15} /> Enterprise Multi-Tenant SaaS Platform v3.0
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem' }}>
          Modern Cloud Management For <br />
          <span style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Pharmacies & Retail Chains
          </span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
          Accelerate counter billing with high-speed POS, eliminate medicine losses with automated First-Expired-First-Out (FEFO) batching, and scale across multiple branches with zero local server installations.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem' }}>
          <button onClick={() => setShowRegisterModal(true)} className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
            Get Started Free <ArrowRight size={18} />
          </button>
          <button onClick={onEnterApp} className="btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
            Explore Interactive Demo
          </button>
        </div>

        {/* Hero KPI Stat Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginTop: '4rem' }}>
          {[
            { label: 'POS Checkout Speed', val: '< 500ms', color: '#38bdf8' },
            { label: 'Inventory Loss Reduction', val: '-85%', color: '#34d399' },
            { label: 'Uptime SLA', val: '99.98%', color: '#c084fc' },
            { label: 'FEFO Batch Accuracy', val: '100%', color: '#f59e0b' },
          ].map((s, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, marginBottom: '0.25rem' }}>{s.val}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" style={{ padding: '5rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Built For Every Stage Of Pharmacy Operations</h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Complete compliance, batch-level precision, and financial clarity in one platform.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {[
            { title: 'Keyboard-First POS', desc: 'Scan barcodes or search brand/generics in milliseconds. Auto-applies discounts, loyalty points, and generates 58mm/80mm thermal receipts.', icon: Receipt, tag: 'Point of Sale' },
            { title: 'FEFO Expiry Radar', desc: 'Automatic First-Expired-First-Out dispensing ensures older batches sell first. 7/30/60/90-day alert radars prevent inventory write-offs.', icon: Layers, tag: 'Inventory' },
            { title: 'Purchase & Supplier Ledger', desc: 'Manage Purchase Orders, receive Goods Received Notes (GRN) with batch entries, and track supplier credit balances seamlessly.', icon: TrendingUp, tag: 'Procurement' },
            { title: 'Customer Credit & Loyalty', desc: 'Track customer balances, patient prescription history, and reward points with automated tier upgrades (Bronze to Platinum).', icon: Users, tag: 'CRM' },
            { title: 'Multi-Branch Sync', desc: 'Manage multiple branches under one account. Transfer stock between branches with full approval and dispatch verification.', icon: Smartphone, tag: 'Enterprise' },
            { title: 'Real-Time Financials', desc: 'Instant Profit & Loss (P&L) statements, Cost of Goods Sold (COGS), Cashier-wise reconciliations, and tax/GST compliance.', icon: Cpu, tag: 'Analytics' },
          ].map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(14, 165, 233, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                    <Icon size={22} />
                  </div>
                  <span className="badge badge-blue">{f.tag}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{f.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing Matrix */}
      <section id="pricing" style={{ padding: '5rem 4rem', background: '#0b111e', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Transparent SaaS Pricing</h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Choose the tier that fits your pharmacy size. Switch or cancel anytime.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {plans.map((p, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderColor: p.popular ? '#0284c7' : 'rgba(255,255,255,0.08)',
                background: p.popular ? 'rgba(2, 132, 199, 0.08)' : 'rgba(17, 24, 39, 0.6)',
                position: 'relative',
              }}
            >
              {p.popular && (
                <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #0284c7, #10b981)', color: 'white', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.8rem', borderRadius: '9999px' }}>
                  {p.badge}
                </span>
              )}

              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>{p.name}</h3>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', margin: '1rem 0' }}>
                  {typeof p.pricePKR === 'number' ? `Rs. ${p.pricePKR.toLocaleString()}` : p.pricePKR}
                  {typeof p.pricePKR === 'number' && <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 400 }}> / month</span>}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginBottom: '1.5rem' }}>
                  {typeof p.priceUSD === 'number' ? `$${p.priceUSD} USD / mo` : 'Contact for enterprise quote'}
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  {p.features.map((feat, fidx) => (
                    <li key={fidx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={16} color="#10b981" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => { setSelectedPlan(p.name); setShowRegisterModal(true); }}
                className={p.popular ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', justifyContent: 'center', marginTop: '2rem' }}
              >
                Choose {p.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="modal-backdrop">
          <div className="glass-panel" style={{ width: '500px', maxWidth: '95vw', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Start Your 30-Day Free Trial</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Selected Plan: <strong style={{ color: '#38bdf8' }}>{selectedPlan}</strong> • No credit card required.
            </p>

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Pharmacy / Business Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Al-Razi Pharmacy"
                  className="form-input"
                  value={formData.pharmacyName}
                  onChange={(e) => setFormData({ ...formData, pharmacyName: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Owner Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. John Doe"
                    className="form-input"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Islamabad"
                    className="form-input"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="owner@pharmacy.com"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Create Password</label>
                <input
                  type="password"
                  required
                  placeholder="Min 8 characters"
                  className="form-input"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowRegisterModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                  Launch Pharmacy Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
