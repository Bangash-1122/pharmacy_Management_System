import React, { useState } from 'react';
import {
  Search,
  Maximize2,
  Bell,
  ChevronDown,
  ChevronLeft,
  Shield,
  UserCheck,
  ShoppingBag,
  Globe,
  LogOut,
  Hospital
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface HeaderProps {
  title?: string;
  onOpenLanding?: () => void;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLanding, onBack }) => {
  const { user, tenant, switchRolePreview } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header
      style={{
        height: '60px',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
      }}
    >
      {/* Left Back / Toggle Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={onBack}
          title="Back / Collapse"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748b',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f1f5f9';
            e.currentTarget.style.color = '#0f172a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.color = '#64748b';
          }}
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Middle Global Search Bar */}
      <div style={{ flex: 1, maxWidth: '580px', margin: '0 1.5rem', position: 'relative' }}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              color: '#94a3b8',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search products, invoices, patients, admissions..."
            style={{
              width: '100%',
              padding: '0.45rem 4rem 0.45rem 2.25rem',
              borderRadius: '9999px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              fontSize: '0.82rem',
              color: '#0f172a',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
              transition: 'all 0.15s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#059669';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.02)';
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <span
              style={{
                fontSize: '0.68rem',
                fontFamily: 'monospace',
                background: '#f1f5f9',
                color: '#64748b',
                padding: '0.15rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid #cbd5e1',
                fontWeight: 600,
              }}
            >
              Ctrl K
            </span>
          </div>
        </div>
      </div>

      {/* Right User Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f8fafc';
            e.currentTarget.style.color = '#0f172a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.color = '#64748b';
          }}
        >
          <Maximize2 size={16} />
        </button>

        {/* Notifications with 99+ Badge */}
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <button
            title="Notifications"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.color = '#0f172a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#64748b';
            }}
          >
            <Bell size={16} />
          </button>
          <span
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-6px',
              background: '#e11d48',
              color: '#ffffff',
              fontSize: '0.62rem',
              fontWeight: 800,
              borderRadius: '9999px',
              padding: '0.1rem 0.35rem',
              lineHeight: 1,
              boxShadow: '0 1px 3px rgba(225, 29, 72, 0.4)',
              border: '1.5px solid #ffffff',
            }}
          >
            99+
          </span>
        </div>

        {/* User Profile Info Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.3rem 0.5rem',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
          >
            {/* Avatar Letter */}
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: '#064e3b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}
            >
              S
            </div>
            {/* Text details */}
            <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                Syed Zubair Shah
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                {user?.role === 'SUPER_ADMIN' ? 'Super Admin' : user?.role.replace('_', ' ') || 'Super Admin'}
              </div>
            </div>
            <ChevronDown size={14} color="#64748b" />
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '115%',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                width: '240px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                padding: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                zIndex: 100,
              }}
            >
              <div
                style={{
                  fontSize: '0.7rem',
                  color: '#94a3b8',
                  padding: '0.3rem 0.5rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                Switch Role (Demo Preview)
              </div>
              <button
                onClick={() => {
                  switchRolePreview('SUPER_ADMIN');
                  setShowUserMenu(false);
                }}
                style={{
                  background: user?.role === 'SUPER_ADMIN' ? '#f0fdf4' : 'transparent',
                  border: 'none',
                  color: '#0f172a',
                  padding: '0.45rem 0.6rem',
                  textAlign: 'left',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: user?.role === 'SUPER_ADMIN' ? 700 : 500,
                }}
              >
                <Shield size={14} color="#059669" /> Super Admin (Current)
              </button>
              <button
                onClick={() => {
                  switchRolePreview('PHARMACY_OWNER');
                  setShowUserMenu(false);
                }}
                style={{
                  background: user?.role === 'PHARMACY_OWNER' ? '#f0fdf4' : 'transparent',
                  border: 'none',
                  color: '#0f172a',
                  padding: '0.45rem 0.6rem',
                  textAlign: 'left',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: user?.role === 'PHARMACY_OWNER' ? 700 : 500,
                }}
              >
                <UserCheck size={14} color="#0284c7" /> Pharmacy Owner
              </button>
              <button
                onClick={() => {
                  switchRolePreview('CASHIER');
                  setShowUserMenu(false);
                }}
                style={{
                  background: user?.role === 'CASHIER' ? '#f0fdf4' : 'transparent',
                  border: 'none',
                  color: '#0f172a',
                  padding: '0.45rem 0.6rem',
                  textAlign: 'left',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: user?.role === 'CASHIER' ? 700 : 500,
                }}
              >
                <ShoppingBag size={14} color="#d97706" /> POS Cashier
              </button>

              <div style={{ height: '1px', background: '#f1f5f9', margin: '0.2rem 0' }} />

              {onOpenLanding && (
                <button
                  onClick={() => {
                    onOpenLanding();
                    setShowUserMenu(false);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#0f172a',
                    padding: '0.45rem 0.6rem',
                    textAlign: 'left',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Globe size={14} color="#64748b" /> Open Public Landing Page
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
