import React, { useState } from 'react';
import {
  TrendingUp,
  Building2,
  Activity,
  DollarSign,
  Search,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const SuperAdminDashboard: React.FC = () => {
  const { switchRolePreview } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Mock SaaS Tenants matching backend seed
  const [pharmacies, setPharmacies] = useState([
    {
      id: 'tenant-01',
      name: 'Al-Shifa Healthcare Pharmacy',
      owner: 'Dr. Ubaid Bangash',
      city: 'Islamabad',
      plan: 'PREMIUM',
      status: 'active',
      mrr: 16800,
      joinedDate: '2026-01-15',
      branches: 2,
    },
    {
      id: 'tenant-02',
      name: 'MedPlus City Chemist',
      owner: 'Tariq Mehmood',
      city: 'Lahore',
      plan: 'STANDARD',
      status: 'active',
      mrr: 6900,
      joinedDate: '2026-02-10',
      branches: 1,
    },
    {
      id: 'tenant-03',
      name: 'Khyber Medicos',
      owner: 'Kamran Khan',
      city: 'Peshawar',
      plan: 'BASIC',
      status: 'active',
      mrr: 2800,
      joinedDate: '2026-03-01',
      branches: 1,
    },
    {
      id: 'tenant-04',
      name: 'CureLine Pharmacy & Clinic',
      owner: 'Dr. Sarah Fatima',
      city: 'Karachi',
      plan: 'FREE_TRIAL',
      status: 'trial',
      mrr: 0,
      joinedDate: '2026-04-02',
      branches: 1,
    },
  ]);

  const toggleStatus = (id: string) => {
    setPharmacies((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: p.status === 'active' ? 'suspended' : 'active' } : p))
    );
  };

  const handleImpersonate = (pharmacyName: string) => {
    alert(`Starting secure audit-logged impersonation session for: ${pharmacyName}`);
    switchRolePreview('PHARMACY_OWNER');
  };

  const totalMRR = pharmacies.filter((p) => p.status === 'active').reduce((acc, p) => acc + p.mrr, 0);
  const totalARR = totalMRR * 12;

  const filtered = pharmacies.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header Banner */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.15), rgba(16, 185, 129, 0.1))' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-purple">
              <Shield size={12} /> System Owner Console
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Super Admin: Muhammad Wasim</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Platform Business & Operations Hub</h2>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Real-time Uptime SLA</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>99.98% Healthy</div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.85rem' }}>
            <span>Monthly Recurring Revenue</span>
            <DollarSign size={18} color="#38bdf8" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '0.5rem' }}>
            Rs. {totalMRR.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.25rem' }}>+18.4% from last month</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.85rem' }}>
            <span>Annual Run Rate (ARR)</span>
            <TrendingUp size={18} color="#34d399" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', marginTop: '0.5rem' }}>
            Rs. {totalARR.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>Forecast based on active tiers</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.85rem' }}>
            <span>Subscribed Pharmacies</span>
            <Building2 size={18} color="#c084fc" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.5rem' }}>
            {pharmacies.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            {pharmacies.filter((p) => p.status === 'active').length} Active • {pharmacies.filter((p) => p.status === 'trial').length} Trials
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.85rem' }}>
            <span>Platform Churn Rate</span>
            <Activity size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.5rem' }}>
            1.2%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.25rem' }}>Industry benchmark: &lt; 3.0%</div>
        </div>
      </div>

      {/* Subscribed Pharmacies Management Table */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Registered Pharmacies & Tenant Management</h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Control status, subscription overrides, and support impersonation</p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search pharmacy, owner, city..."
                className="form-input"
                style={{ paddingLeft: '2.2rem', width: '260px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="form-input"
              style={{ width: '130px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>Pharmacy & City</th>
              <th>Owner / Contact</th>
              <th>Plan Tier</th>
              <th>MRR</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th style={{ textAlign: 'right' }}>Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((pharmacy) => (
              <tr key={pharmacy.id}>
                <td>
                  <div style={{ fontWeight: 600, color: '#f8fafc' }}>{pharmacy.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{pharmacy.city} • {pharmacy.branches} branch(es)</div>
                </td>
                <td>
                  <div>{pharmacy.owner}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Owner Account</div>
                </td>
                <td>
                  <span className={pharmacy.plan === 'PREMIUM' ? 'badge badge-purple' : pharmacy.plan === 'STANDARD' ? 'badge badge-blue' : 'badge badge-amber'}>
                    {pharmacy.plan}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>Rs. {pharmacy.mrr.toLocaleString()}</td>
                <td>
                  <span className={pharmacy.status === 'active' ? 'badge badge-emerald' : pharmacy.status === 'trial' ? 'badge badge-blue' : 'badge badge-rose'}>
                    {pharmacy.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{pharmacy.joinedDate}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleImpersonate(pharmacy.name)}
                      className="btn-secondary"
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                      title="Log in as pharmacy for support"
                    >
                      <ExternalLink size={13} /> Impersonate
                    </button>
                    <button
                      onClick={() => toggleStatus(pharmacy.id)}
                      className={pharmacy.status === 'active' ? 'btn-danger' : 'btn-success'}
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                    >
                      {pharmacy.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
