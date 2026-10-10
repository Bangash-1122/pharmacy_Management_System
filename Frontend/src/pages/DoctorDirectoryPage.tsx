import React, { useState } from 'react';
import {
  Stethoscope,
  Search,
  Plus,
  Users,
  Calendar,
  Activity,
  CheckCircle2,
  DollarSign,
  Phone,
  MoreVertical,
  Building2,
  X,
} from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  degrees: string;
  specialty: string;
  contact: string;
  standardFee: number;
  visits: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export const DoctorDirectoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);

  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 'doc-1',
      name: 'Dr. Syed Kazim Shah',
      degrees: 'ENT / Surgical',
      specialty: 'Consultant ENT Specialist',
      contact: '+92 300 9876543',
      standardFee: 500,
      visits: 0,
      status: 'ACTIVE',
    },
    {
      id: 'doc-2',
      name: 'Dr. Syed Qasim Shah',
      degrees: 'MBBS, FCPS, MRCP / Indoor / OT',
      specialty: 'Consultant Medical Specialist',
      contact: '+92 334 8206077',
      standardFee: 1000,
      visits: 11,
      status: 'ACTIVE',
    },
  ]);

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.contact.includes(searchQuery)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header & Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Doctor Consultants &amp; Specialists Directory
            </h1>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', background: '#ecfdf5', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid #a7f3d0' }}>
              {doctors.length} Registered
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '3px 0 0' }}>
            Manage hospital specialists, visiting consultants, and default consultation fee structure.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
            • Doctor Appointment Live
          </button>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
            Doctor Appointments
          </button>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
            Indoor Hub
          </button>
          <button
            onClick={() => setShowAddDoctorModal(true)}
            className="btn-primary"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
          >
            <Plus size={15} /> Add Consultant / Doctor
          </button>
        </div>
      </div>

      {/* 4 Metric Cards from PDF Page 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.04em' }}>
              TOTAL CONSULTANTS
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
              {doctors.length}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Registered across specialties</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={18} />
          </div>
        </div>

        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.04em' }}>
              ACTIVE DOCTORS
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#047857', marginTop: '2px' }}>
              {doctors.filter((d) => d.status === 'ACTIVE').length}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Available for inpatient/opd</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.04em' }}>
              AVERAGE STANDARD FEE
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#b45309', marginTop: '2px' }}>
              PKR 750
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Auto-filled on visit selection</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#fffbeb', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={18} />
          </div>
        </div>

        <div className="white-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.04em' }}>
              TOTAL VISITS RECORDED
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
              11
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Inpatient consultations billed</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#f0fdfa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={18} />
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', width: '360px' }}>
        <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        <input
          type="text"
          placeholder="Search doctor name, specialty, qualification above..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '0.45rem 0.75rem 0.45rem 2rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', outline: 'none' }}
        />
      </div>

      {/* Doctors Table from PDF Page 1 */}
      <div className="white-panel" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <table className="custom-table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ background: '#ffffff', fontSize: '0.68rem' }}>
              <th>DOCTOR / CONSULTANT</th>
              <th>SPECIALTY / FIELD</th>
              <th>CONTACT</th>
              <th style={{ textAlign: 'right' }}>STANDARD FEE (PKR)</th>
              <th style={{ textAlign: 'center' }}>VISITS</th>
              <th style={{ textAlign: 'center' }}>STATUS</th>
              <th style={{ width: '40px', textAlign: 'center' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#047857', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                      Sy
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.82rem' }}>{doc.name}</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{doc.degrees}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontWeight: 500, color: '#334155', fontSize: '0.78rem' }}>{doc.specialty}</td>
                <td style={{ color: '#64748b', fontSize: '0.78rem' }}>{doc.contact}</td>
                <td style={{ textAlign: 'right', fontWeight: 700, color: '#0f172a', fontSize: '0.82rem' }}>
                  PKR {doc.standardFee.toFixed(2)}
                  <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Default fee</div>
                </td>
                <td style={{ textAlign: 'center', fontSize: '0.78rem', color: '#334155' }}>{doc.visits} visits</td>
                <td style={{ textAlign: 'center' }}>
                  <span className="badge badge-emerald">• ACTIVE</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                    <MoreVertical size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Consultant Modal */}
      {showAddDoctorModal && (
        <div className="modal-backdrop" onClick={() => setShowAddDoctorModal(false)}>
          <div className="white-panel" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '480px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>Add Consultant / Doctor</h3>
              <button onClick={() => setShowAddDoctorModal(false)} className="btn-secondary" style={{ padding: '0.2rem 0.5rem' }}>
                <X size={14} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const newDoc: Doctor = {
                  id: `doc-${Date.now()}`,
                  name: fd.get('name') as string,
                  degrees: fd.get('degrees') as string,
                  specialty: fd.get('specialty') as string,
                  contact: fd.get('contact') as string,
                  standardFee: Number(fd.get('standardFee')),
                  visits: 0,
                  status: 'ACTIVE',
                };
                setDoctors([...doctors, newDoc]);
                setShowAddDoctorModal(false);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}
            >
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Doctor Name *</label>
                <input required name="name" className="form-input form-input-sm" placeholder="Dr. Full Name" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Degrees / Qualification</label>
                  <input name="degrees" className="form-input form-input-sm" placeholder="MBBS, FCPS" />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Specialty / Field *</label>
                  <input required name="specialty" className="form-input form-input-sm" placeholder="Consultant Cardiologist" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Contact Phone *</label>
                  <input required name="contact" className="form-input form-input-sm" placeholder="+92 300 1234567" />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Standard Fee (PKR) *</label>
                  <input required type="number" name="standardFee" className="form-input form-input-sm" defaultValue={1000} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowAddDoctorModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
