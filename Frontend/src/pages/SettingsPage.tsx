import React, { useState } from 'react';
import { Save, Printer, Sliders } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const SettingsPage: React.FC = () => {
  const { tenant, updateTenantSettings } = useAuthStore();

  const [settings, setSettings] = useState({
    pharmacyName: tenant?.name || 'Al-Shifa Healthcare Pharmacy',
    phone: tenant?.phone || '+92 300 1234567',
    city: tenant?.city || 'Islamabad',
    address: tenant?.address || 'Blue Area, Jinnah Avenue, Islamabad',
    licenseNumber: '#PH-ISB-2026-99',
    taxNumber: 'NTN-7788991-0',
    invoicePrefix: tenant?.settings?.invoicePrefix || 'INV',
    invoiceFooterNote: tenant?.settings?.invoiceFooterNote || 'Thank you for choosing our pharmacy. Get well soon!',
    lowStockThreshold: tenant?.settings?.lowStockThresholdDefault || 10,
    nearExpiryDaysThreshold: tenant?.settings?.nearExpiryDaysThreshold || 60,
    enableLoyalty: tenant?.settings?.enableLoyaltyProgram ?? true,
    loyaltyRate: 0.05,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTenantSettings({
      invoicePrefix: settings.invoicePrefix,
      invoiceFooterNote: settings.invoiceFooterNote,
      lowStockThresholdDefault: settings.lowStockThreshold,
      nearExpiryDaysThreshold: settings.nearExpiryDaysThreshold,
      enableLoyaltyProgram: settings.enableLoyalty,
    });
    alert('Pharmacy settings saved successfully!');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem' }}>Pharmacy Store & Invoice Configuration</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Customize business identifiers, receipt headers, tax rates, and inventory alert parameters.
        </p>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Pharmacy Profile */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Pharmacy Trade Name</label>
              <input
                type="text"
                required
                className="form-input"
                value={settings.pharmacyName}
                onChange={(e) => setSettings({ ...settings, pharmacyName: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Contact Phone</label>
              <input
                type="text"
                required
                className="form-input"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Drug License Number</label>
              <input
                type="text"
                className="form-input"
                value={settings.licenseNumber}
                onChange={(e) => setSettings({ ...settings, licenseNumber: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Tax / NTN Registration</label>
              <input
                type="text"
                className="form-input"
                value={settings.taxNumber}
                onChange={(e) => setSettings({ ...settings, taxNumber: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Store Address</label>
            <input
              type="text"
              className="form-input"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            />
          </div>

          {/* Receipt Customization */}
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Printer size={16} /> Thermal Receipt Print Customizations
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Invoice Prefix</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.invoicePrefix}
                  onChange={(e) => setSettings({ ...settings, invoicePrefix: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Footer Wish / Note</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.invoiceFooterNote}
                  onChange={(e) => setSettings({ ...settings, invoiceFooterNote: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Inventory Safety Thresholds */}
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sliders size={16} /> Inventory Safety & Expiry Radar Alerts
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Default Low-Stock Threshold (Units)</label>
                <input
                  type="number"
                  className="form-input"
                  value={settings.lowStockThreshold}
                  onChange={(e) => setSettings({ ...settings, lowStockThreshold: parseInt(e.target.value) || 10 })}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Near-Expiry Alert Warning (Days)</label>
                <input
                  type="number"
                  className="form-input"
                  value={settings.nearExpiryDaysThreshold}
                  onChange={(e) => setSettings({ ...settings, nearExpiryDaysThreshold: parseInt(e.target.value) || 60 })}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', justifyContent: 'center', padding: '0.75rem' }}>
            <Save size={18} /> Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};
