import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  Pill,
  Package,
  Truck,
  Users,
  Building2,
  Receipt,
  FileBarChart,
  ShieldCheck,
  Settings,
  Sliders,
  DollarSign,
  Download,
  RotateCcw,
  BookOpen,
  UserCheck,
  CreditCard,
  FileText,
  Clock,
  Tv,
  Plus,
  BedDouble,
  Activity,
  History,
  Bell,
  Stethoscope,
  Calendar,
  AlertOctagon,
  UserPlus,
  FolderHeart,
  LucideIcon,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  hotkey?: string;
  badge?: string;
  badgeColor?: string;
  isLiveDot?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const navSections: NavSection[] = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'SALES',
      items: [
        { id: 'pos', label: '+ New Sale', icon: ShoppingCart },
        { id: 'sales-history', label: 'Sales History', icon: BookOpen },
        { id: 'sale-return-process', label: 'New Return', icon: RotateCcw },
        { id: 'sale-returns', label: 'Return Sales', icon: RotateCcw },
      ],
    },
    {
      title: 'OPD & APPOINTMENTS',
      items: [
        { id: 'doctor-appointments', label: 'Doctor Appointments', icon: Calendar },
        { id: 'doctor-appointment-live', label: 'Doctor Appointment Live', icon: Activity, badge: 'LIVE', badgeColor: '#10b981' },
        { id: 'doctors', label: 'Consultants & Doctors', icon: Stethoscope },
      ],
    },
    {
      title: 'INDOOR & EMERGENCY',
      items: [
        { id: 'emergency', label: 'Emergency & Casualty', icon: AlertOctagon, badge: 'URGENT', badgeColor: '#e11d48' },
        { id: 'patients-registry', label: 'Patients Registry', icon: Users },
        { id: 'admissions-wards', label: 'Admissions & Wards', icon: FolderHeart },
        { id: 'rooms-beds', label: 'Rooms & Beds', icon: BedDouble },
        { id: 'indoor-sale', label: 'Indoor Sale', icon: ShoppingCart },
        { id: 'indoor-sales-history', label: 'Indoor Sales History', icon: BookOpen },
      ],
    },
    {
      title: 'OPERATION THEATER',
      items: [
        { id: 'ot-station', label: 'OT Station & Consents', icon: Activity },
        { id: 'ot-live-screen', label: 'OT Live Screen (TV)', icon: Tv, isLiveDot: true },
        { id: 'ot-book-surgery', label: '+ Book Surgery / Consent', icon: Plus },
        { id: 'ot-reports', label: 'OT Reports & Analytics', icon: FileBarChart },
      ],
    },
    {
      title: 'PURCHASES',
      items: [
        { id: 'purchase-desk', label: 'New Purchase', icon: ShoppingCart },
        { id: 'purchase-return', label: 'Purchase Return', icon: RotateCcw },
        { id: 'purchase-history', label: 'Purchase History', icon: BookOpen },
        { id: 'suppliers', label: 'Suppliers', icon: Truck },
        { id: 'supplier-accounts', label: 'Supplier Accounts', icon: CreditCard },
      ],
    },
    {
      title: 'CATALOG',
      items: [
        { id: 'products', label: 'Products', icon: Pill },
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'adjust-stock', label: 'Adjust Stock', icon: Sliders },
        { id: 'customers', label: 'Customers', icon: Users },
      ],
    },
    {
      title: 'FINANCE',
      items: [
        { id: 'cash-accounts', label: 'Cash Accounts', icon: DollarSign },
        { id: 'expenses', label: 'Expenses', icon: Receipt },
        { id: 'employees', label: 'Employees', icon: UserCheck },
        { id: 'reports', label: 'Reports', icon: FileBarChart },
      ],
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { id: 'branches', label: 'Branches', icon: Building2 },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck },
        { id: 'login-history', label: 'Login History', icon: History },
        { id: 'audit-logs', label: 'Audit Logs', icon: FileText },
        { id: 'backups', label: 'Backups', icon: Download },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        { id: 'settings', label: 'Organization', icon: Settings },
        { id: 'notifications', label: 'Notifications', icon: Bell },
      ],
    },
  ];

  return (
    <aside
      style={{
        width: '240px',
        background: '#06372b',
        borderRight: '1px solid #042920',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* Brand Header with Original Hospital Emblem Logo */}
      <div
        style={{
          padding: '0.85rem 1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          background: '#042a21',
        }}
      >
        {/* Authentic Hospital Medical Emblem Logo */}
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #047857 0%, #064e3b 100%)',
            border: '1.5px solid #34d399',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            flexShrink: 0,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hospital Building Pediment */}
            <path
              d="M12 2L3 7V9H21V7L12 2Z"
              fill="#ffffff"
            />
            {/* Columns & Base */}
            <rect x="5" y="11" width="2.5" height="8" rx="0.5" fill="#a7f3d0" />
            <rect x="9.75" y="14" width="4.5" height="5" rx="0.5" fill="#ffffff" />
            <rect x="16.5" y="11" width="2.5" height="8" rx="0.5" fill="#a7f3d0" />
            <rect x="2" y="20" width="20" height="2" rx="0.5" fill="#ffffff" />
            {/* Medical Cross on Roof */}
            <path
              d="M12 3.5V6.5M10.5 5H13.5"
              stroke="#047857"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Doorway Cross */}
            <path
              d="M12 15.2V17.8M10.7 16.5H13.3"
              stroke="#064e3b"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: '0.82rem',
              color: '#ffffff',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              lineHeight: 1.2,
            }}
          >
            Haji Waris Khan General H...
          </div>
          <div
            style={{
              fontSize: '0.68rem',
              color: '#a7f3d0',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            Haji Waris Khan Medical Center
          </div>
        </div>
      </div>

      {/* Navigation Links Scrollable */}
      <nav
        style={{
          flex: 1,
          padding: '0.6rem 0.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        {navSections.map((sec, sIdx) => (
          <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.12rem' }}>
            {sec.title && (
              <div
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  color: '#6ee7b7',
                  letterSpacing: '0.07em',
                  padding: '0.35rem 0.6rem 0.15rem',
                  textTransform: 'uppercase',
                }}
              >
                {sec.title}
              </div>
            )}
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.42rem 0.6rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: isActive ? '#059669' : 'transparent',
                    color: isActive ? '#ffffff' : '#e2e8f0',
                    fontWeight: isActive ? 600 : 450,
                    fontSize: '0.79rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.12s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Icon size={15} color={isActive ? '#ffffff' : '#a7f3d0'} />
                    <span>{item.label}</span>
                    {item.isLiveDot && (
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#f43f5e',
                          display: 'inline-block',
                          boxShadow: '0 0 5px #f43f5e',
                        }}
                      />
                    )}
                  </div>
                  {item.badge && (
                    <span
                      style={{
                        background: item.badgeColor || '#10b981',
                        color: '#ffffff',
                        fontSize: '0.58rem',
                        fontWeight: 700,
                        padding: '0.05rem 0.3rem',
                        borderRadius: '3px',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.hotkey && <span className="key-badge-dark">{item.hotkey}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Sidebar Footer with PWA Install, Status and Live Clock */}
      <div
        style={{
          padding: '0.65rem 0.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: '#042a21',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <button
          onClick={() => alert('PWA Application ready for desktop/mobile offline install.')}
          style={{
            background: 'rgba(5, 150, 105, 0.25)',
            border: '1px solid #059669',
            color: '#ffffff',
            borderRadius: '6px',
            padding: '0.4rem 0.65rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Download size={13} color="#34d399" />
          <span>Install App (PWA)</span>
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.68rem',
              color: '#a7f3d0',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#10b981',
                display: 'inline-block',
              }}
            />
            <span>SYSTEM ONLINE</span>
          </div>
          <span
            style={{
              background: '#065f46',
              color: '#a7f3d0',
              fontSize: '0.62rem',
              fontWeight: 700,
              padding: '0.1rem 0.35rem',
              borderRadius: '4px',
            }}
          >
            Active
          </span>
        </div>

        <div
          style={{
            fontSize: '0.67rem',
            color: '#94a3b8',
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '0.35rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: '#ffffff',
              fontWeight: 600,
            }}
          >
            <Clock size={11} color="#34d399" />
            <span>{currentTime || '06:50:02 AM'}</span>
          </div>
          <span>{currentDate || 'Sat, Oct 10, 2026'}</span>
        </div>
      </div>
    </aside>
  );
};
