import React, { useState } from 'react';
import { FileText, Search, ShieldCheck, Download, MoreVertical } from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const logs = [
    { when: '10-10-2026 06:34:23', user: 'Syed Zubair Shah', module: 'settings', event: 'UPDATED', description: 'updated store address and contact info' },
    { when: '10-10-2026 06:34:23', user: 'Syed Zubair Shah', module: 'settings', event: 'UPDATED', description: 'updated tax rate settings' },
    { when: '10-10-2026 06:34:23', user: 'Syed Zubair Shah', module: 'backups', event: 'CREATED DATABASE BACKUP ARCHIVE: BACKUP-AUTO-20261010-063423.SQL.GZ (177.96 KB)', description: 'Created database backup archive: backup-auto-20261010-063423.sql.gz (177.96 KB)' },
    { when: '10-10-2026 06:34:22', user: 'Syed Zubair Shah', module: 'users', event: 'UPDATED', description: 'updated role permissions for Cashier' },
    { when: '09-10-2026 18:10:56', user: 'Syed Zubair Shah', module: 'users', event: 'UPDATED', description: 'updated password policy' },
    { when: '09-10-2026 12:59:19', user: 'Syed Zubair Shah', module: 'users', event: 'UPDATED', description: 'updated user profile' },
    { when: '09-10-2026 12:58:54', user: 'Syed Zubair Shah', module: 'users', event: 'UPDATED', description: 'updated session timeout' },
    { when: '09-10-2026 11:46:13', user: 'Syed Zubair Shah', module: 'settings', event: 'UPDATED', description: 'updated currency formatting' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Audit logs</h1>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
            Sensitive create, update and permission changes
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
          <select style={{ padding: '0.35rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#ffffff' }}>
            <option>All Events</option>
            <option>UPDATED</option>
            <option>CREATED</option>
          </select>
          <select style={{ padding: '0.35rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#ffffff' }}>
            <option>All Modules</option>
            <option>settings</option>
            <option>users</option>
            <option>backups</option>
          </select>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: '#64748b' }}>Sort:</span>
            <span style={{ background: '#f1f5f9', color: '#047857', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 700, border: '1px solid #cbd5e1' }}>
              ↓ DESC
            </span>
          </div>
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '180px', padding: '0.35rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
          />
        </div>
      </div>

      <div className="white-panel" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <table className="custom-table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
              <th style={{ width: '180px' }}>WHEN ↓ DESC</th>
              <th style={{ width: '150px' }}>USER</th>
              <th style={{ width: '100px' }}>MODULE</th>
              <th style={{ width: '160px' }}>EVENT</th>
              <th>DESCRIPTION</th>
              <th style={{ width: '30px' }}></th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr key={idx}>
                <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#475569' }}>{log.when}</td>
                <td style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.78rem' }}>{log.user}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#0284c7' }}>{log.module}</td>
                <td>
                  <span style={{ background: '#fffbeb', color: '#b45309', padding: '0.15rem 0.4rem', borderRadius: '3px', fontSize: '0.68rem', fontWeight: 700, border: '1px solid #fde68a' }}>
                    {log.event.slice(0, 30)}
                  </span>
                </td>
                <td style={{ color: '#334155', fontSize: '0.75rem' }}>{log.description}</td>
                <td style={{ textAlign: 'center' }}>
                  <MoreVertical size={14} color="#94a3b8" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ padding: '0.55rem 0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', background: '#ffffff', fontSize: '0.72rem', color: '#64748b' }}>
          <div>Showing 1 to 15 of 1215 entries</div>
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
