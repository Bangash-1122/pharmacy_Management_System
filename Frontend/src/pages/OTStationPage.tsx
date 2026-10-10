import React, { useState } from 'react';
import {
  Activity,
  Tv,
  Plus,
  FileBarChart,
  CheckCircle2,
  Clock,
  UserCheck,
  Building2,
  Calendar,
  AlertCircle,
  FileText,
  X,
  Stethoscope,
} from 'lucide-react';

interface SurgeryCase {
  id: string;
  patientName: string;
  mrNo: string;
  procedure: string;
  surgeon: string;
  anesthetist: string;
  otRoom: string;
  scheduledTime: string;
  stage: 'Pre-Op' | 'Intra-Op' | 'Recovery' | 'Completed';
  consentSigned: boolean;
}

export const OTStationPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'station' | 'tv' | 'reports'>('station');
  const [showBookSurgeryModal, setShowBookSurgeryModal] = useState(false);

  const [surgeries, setSurgeries] = useState<SurgeryCase[]>([
    {
      id: 'ot-101',
      patientName: 'Muhammad Tariq',
      mrNo: 'HWK-MR-0891',
      procedure: 'Laparoscopic Cholecystectomy',
      surgeon: 'Dr. Syed Qasim Shah',
      anesthetist: 'Dr. Noman Tariq',
      otRoom: 'OT Table 1 (Major)',
      scheduledTime: '08:30 AM',
      stage: 'Intra-Op',
      consentSigned: true,
    },
    {
      id: 'ot-102',
      patientName: 'Zainab Bibi',
      mrNo: 'HWK-MR-0942',
      procedure: 'ENT Septoplasty & Turbinoplasty',
      surgeon: 'Dr. Syed Kazim Shah',
      anesthetist: 'Dr. Noman Tariq',
      otRoom: 'OT Table 2 (ENT/Eye)',
      scheduledTime: '10:15 AM',
      stage: 'Pre-Op',
      consentSigned: true,
    },
    {
      id: 'ot-103',
      patientName: 'Abdul Rehman',
      mrNo: 'HWK-MR-0955',
      procedure: 'Emergency Appendectomy',
      surgeon: 'Dr. Syed Qasim Shah',
      anesthetist: 'Dr. Asad Ullah',
      otRoom: 'Emergency OT 3',
      scheduledTime: '11:45 AM',
      stage: 'Pre-Op',
      consentSigned: false,
    },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header & Fast Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Operation Theater (OT) Suite &amp; Consents
            </h1>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6d28d9', background: '#f5f3ff', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid #ddd6fe' }}>
              Clinical Unit
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '2px 0 0' }}>
            Surgical scheduling, informed consents, anesthesia logs, and patient live screen for attendants.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveSubTab('station')}
            className={activeSubTab === 'station' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
          >
            <Activity size={14} /> OT Station &amp; Consents
          </button>
          <button
            onClick={() => setActiveSubTab('tv')}
            className={activeSubTab === 'tv' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Tv size={14} />
            <span>OT Live Screen (TV)</span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e11d48', display: 'inline-block' }} />
          </button>
          <button
            onClick={() => setShowBookSurgeryModal(true)}
            style={{
              background: '#047857',
              color: '#ffffff',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Plus size={15} /> + Book Surgery / Consent
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>SCHEDULED SURGERIES</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>{surgeries.length}</div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Today's surgical roster</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={18} />
          </div>
        </div>

        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>CURRENTLY IN SURGERY</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#e11d48', marginTop: '2px' }}>
              {surgeries.filter((s) => s.stage === 'Intra-Op').length}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Active intra-op cases</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#fff1f2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={18} />
          </div>
        </div>

        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>SIGNED CONSENTS</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#047857', marginTop: '2px' }}>
              {surgeries.filter((s) => s.consentSigned).length} / {surgeries.length}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Pre-op legal clearance</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>ACTIVE OT ROOMS</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0284c7', marginTop: '2px' }}>3 / 4</div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Tables operational</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={18} />
          </div>
        </div>
      </div>

      {/* Tab View 1: OT Station & Consents Table */}
      {activeSubTab === 'station' && (
        <div className="white-panel" style={{ borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '0.75rem 1rem', background: '#ffffff', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>Today's Operation Theater Schedule &amp; Consents</div>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Real-time surgical tracking</span>
          </div>

          <table className="custom-table" style={{ width: '100%' }}>
            <thead>
              <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
                <th>PATIENT &amp; MR NO</th>
                <th>PROCEDURE</th>
                <th>SURGEON &amp; ANESTHETIST</th>
                <th>OT ROOM</th>
                <th>TIME</th>
                <th>STAGE</th>
                <th style={{ textAlign: 'center' }}>CONSENT</th>
                <th style={{ textAlign: 'center' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {surgeries.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.82rem' }}>{s.patientName}</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: '#047857' }}>{s.mrNo}</div>
                  </td>
                  <td style={{ fontWeight: 600, color: '#334155' }}>{s.procedure}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.78rem' }}>{s.surgeon}</div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Anesthesia: {s.anesthetist}</div>
                  </td>
                  <td style={{ fontWeight: 600, color: '#0284c7' }}>{s.otRoom}</td>
                  <td style={{ color: '#475569', fontSize: '0.78rem' }}>{s.scheduledTime}</td>
                  <td>
                    <span
                      style={{
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        background:
                          s.stage === 'Intra-Op' ? '#fff1f2' : s.stage === 'Pre-Op' ? '#fffbeb' : '#ecfdf5',
                        color:
                          s.stage === 'Intra-Op' ? '#e11d48' : s.stage === 'Pre-Op' ? '#b45309' : '#047857',
                        border: `1px solid ${
                          s.stage === 'Intra-Op' ? '#fecdd3' : s.stage === 'Pre-Op' ? '#fde68a' : '#a7f3d0'
                        }`,
                      }}
                    >
                      {s.stage === 'Intra-Op' && '• '}
                      {s.stage}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {s.consentSigned ? (
                      <span className="badge badge-emerald">SIGNED</span>
                    ) : (
                      <button
                        onClick={() => {
                          setSurgeries(surgeries.map((item) => (item.id === s.id ? { ...item, consentSigned: true } : item)));
                          alert(`Consent form signed for patient ${s.patientName}`);
                        }}
                        style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Sign Consent
                      </button>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <select
                      value={s.stage}
                      onChange={(e) => {
                        const newStage = e.target.value as any;
                        setSurgeries(surgeries.map((item) => (item.id === s.id ? { ...item, stage: newStage } : item)));
                      }}
                      style={{ padding: '0.2rem 0.4rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.72rem', background: '#ffffff' }}
                    >
                      <option value="Pre-Op">Pre-Op</option>
                      <option value="Intra-Op">Intra-Op</option>
                      <option value="Recovery">Recovery</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab View 2: OT Live Screen (TV Broadcast for Patient Attendants) */}
      {activeSubTab === 'tv' && (
        <div
          style={{
            background: '#042a21',
            borderRadius: '12px',
            padding: '1.5rem',
            color: '#ffffff',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ffffff', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                ✚
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>HAJI WARIS KHAN GENERAL HOSPITAL</div>
                <div style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>OPERATION THEATER LIVE BROADCAST FOR ATTENDANTS</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(225, 29, 72, 0.2)', border: '1px solid #e11d48', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 800, color: '#fecdd3' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e11d48', display: 'inline-block' }} />
              LIVE SCREEN
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {surgeries.map((s) => (
              <div
                key={s.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#a7f3d0', fontWeight: 700 }}>{s.otRoom}</span>
                  <span
                    style={{
                      background: s.stage === 'Intra-Op' ? '#e11d48' : '#059669',
                      color: '#ffffff',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                    }}
                  >
                    {s.stage}
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>{s.patientName}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>MR No: {s.mrNo}</div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem' }}>
                  <div style={{ color: '#6ee7b7' }}>Procedure: <strong>{s.procedure}</strong></div>
                  <div style={{ color: '#cbd5e1' }}>Lead Surgeon: <strong>{s.surgeon}</strong></div>
                  <div style={{ color: '#94a3b8' }}>Scheduled Time: <strong>{s.scheduledTime}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Book Surgery Modal */}
      {showBookSurgeryModal && (
        <div className="modal-backdrop" onClick={() => setShowBookSurgeryModal(false)}>
          <div className="white-panel" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '520px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>Book Surgery / Schedule OT Procedure</h3>
              <button onClick={() => setShowBookSurgeryModal(false)} className="btn-secondary" style={{ padding: '0.2rem 0.5rem' }}>
                <X size={14} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const newCase: SurgeryCase = {
                  id: `ot-${Date.now()}`,
                  patientName: fd.get('patientName') as string,
                  mrNo: (fd.get('mrNo') as string) || `HWK-MR-${Date.now().toString().slice(-4)}`,
                  procedure: fd.get('procedure') as string,
                  surgeon: fd.get('surgeon') as string,
                  anesthetist: fd.get('anesthetist') as string,
                  otRoom: fd.get('otRoom') as string,
                  scheduledTime: fd.get('scheduledTime') as string,
                  stage: 'Pre-Op',
                  consentSigned: fd.get('consentSigned') === 'on',
                };
                setSurgeries([...surgeries, newCase]);
                setShowBookSurgeryModal(false);
                alert(`Surgery scheduled successfully for patient ${newCase.patientName}`);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Patient Full Name *</label>
                  <input required name="patientName" className="form-input form-input-sm" placeholder="e.g. Tariq Mehmood" />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>MR No / Patient ID</label>
                  <input name="mrNo" className="form-input form-input-sm" placeholder="HWK-MR-0992" />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Surgical Procedure *</label>
                <input required name="procedure" className="form-input form-input-sm" placeholder="e.g. Laparoscopic Hernioplasty" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Lead Surgeon *</label>
                  <select name="surgeon" className="form-input form-input-sm" style={{ background: '#ffffff' }}>
                    <option value="Dr. Syed Qasim Shah">Dr. Syed Qasim Shah</option>
                    <option value="Dr. Syed Kazim Shah">Dr. Syed Kazim Shah</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Anesthetist</label>
                  <input name="anesthetist" className="form-input form-input-sm" defaultValue="Dr. Noman Tariq" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>OT Room / Table</label>
                  <select name="otRoom" className="form-input form-input-sm" style={{ background: '#ffffff' }}>
                    <option value="OT Table 1 (Major)">OT Table 1 (Major)</option>
                    <option value="OT Table 2 (ENT/Eye)">OT Table 2 (ENT/Eye)</option>
                    <option value="Emergency OT 3">Emergency OT 3</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Scheduled Time</label>
                  <input name="scheduledTime" className="form-input form-input-sm" defaultValue="11:30 AM" />
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#334155', cursor: 'pointer', marginTop: '0.2rem' }}>
                <input type="checkbox" name="consentSigned" defaultChecked style={{ accentColor: '#047857' }} />
                <span>Pre-Operative Informed Consent Signed &amp; Filed</span>
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowBookSurgeryModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
