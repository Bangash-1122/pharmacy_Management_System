import React, { useState } from 'react';
import { History, Search, ShieldCheck } from 'lucide-react';

export const LoginHistoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const history = [
    { when: '10-10-2026 06:34', user: 'Syed Zubair Shah', login: 'admin@pharmacymardan.local', ip: '154.192.112.18', result: 'Success' },
    { when: '09-10-2026 18:10', user: 'Syed Zubair Shah', login: 'admin@pharmacymardan.local', ip: '2402:ad80:6a:e2a9:1c10:d523:821a:cc27', result: 'Success' },
    { when: '09-10-2026 12:58', user: 'Syed Zubair Shah', login: 'admin@pharmacymardan.local', ip: '39.44.147.163', result: 'Success' },
    { when: '09-10-2026 11:46', user: 'Syed Zubair Shah', login: 'admin@pharmacymardan.local', ip: '2402:ad80:108:6e3b:c4a:36ff:fea5:ce1d', result: 'Success' },
    { when: '08-10-2026 14:38', user: 'Syed Zubair Shah', login: 'admin@pharmacymardan.local', ip: '121.91.34.51', result: 'Success' },
    { when: '08-10-2026 12:19', user: 'Syed Zubair Shah', login: 'admin@pharmacymardan.local', ip: '2402:ad80:6a:e2a9:2c0d:f7ff:fe19:bcb7', result: 'Success' },
    { when: '08-10-2026 12:17', user: 'Syed Zubair Shah', login: 'admin@pharmacymardan.local', ip: '2402:ad80:6a:e2a9:c17f:f166:8100:e3eb', result: 'Success' },
    { when: '08-10-2026 08:25', user: 'Syed Zubair Shah', login: 'admin@pharmacymardan.local', ip: '2402:ad80:107:aa40:2d36:a88c:7bec:3a3e', result: 'Success' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Login history</h1>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
            Successful and failed sign-in attempts
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: '#64748b' }}>Sort: When</span>
            <span style={{ background: '#f1f5f9', color: '#047857', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 700, border: '1px solid #cbd5e1' }}>
              ↓ DESC
            </span>
          </div>
          <input
            type="text"
            placeholder="Search user, login, IP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '200px', padding: '0.35rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
          />
        </div>
      </div>

      <div className="white-panel" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <table className="custom-table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
              <th style={{ width: '180px' }}>WHEN ↓ DESC</th>
              <th style={{ width: '180px' }}>USER</th>
              <th>LOGIN</th>
              <th>IP</th>
              <th style={{ width: '100px', textAlign: 'center' }}>RESULT</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, idx) => (
              <tr key={idx}>
                <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#475569' }}>{h.when}</td>
                <td style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.78rem' }}>{h.user}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#334155' }}>{h.login}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{h.ip}</td>
                <td style={{ textAlign: 'center' }}>
                  <span className="badge badge-emerald">{h.result}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ padding: '0.55rem 0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', background: '#ffffff', fontSize: '0.72rem', color: '#64748b' }}>
          <div>Showing 1 to 15 of 404 entries</div>
          <div style={{ display: 'flex', gap: '2px' }}>
            <span style={{ padding: '0.2rem 0.45rem', background: '#047857', color: '#ffffff', borderRadius: '3px', fontWeight: 700 }}>1</span>
            <span style={{ padding: '0.2rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}>2</span>
            <span style={{ padding: '0.2rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}>3</span>
            <span style={{ padding: '0.2rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}>Next →</span>
          </div>
        </div>
      </div>
    </div>
  );
};
