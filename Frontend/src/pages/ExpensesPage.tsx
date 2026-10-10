import React, { useState } from 'react';
import { Receipt, Plus, Search, DollarSign, Calendar, Tag } from 'lucide-react';
import { Expense } from '../types';

export const ExpensesPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 'exp-1',
      expenseNumber: 'EXP-00101',
      category: 'Electricity',
      amount: 18500,
      description: 'IESCO Commercial electricity bill for October',
      paymentMethod: 'bank_transfer',
      expenseDate: '2026-10-05',
    },
    {
      id: 'exp-2',
      expenseNumber: 'EXP-00102',
      category: 'Supplies',
      amount: 3200,
      description: 'Thermal receipt rolls 80mm (box of 50)',
      paymentMethod: 'cash',
      expenseDate: '2026-10-07',
    },
    {
      id: 'exp-3',
      expenseNumber: 'EXP-00103',
      category: 'Salaries',
      amount: 45000,
      description: 'Pharmacist monthly salary advance',
      paymentMethod: 'bank_transfer',
      expenseDate: '2026-10-01',
    },
  ]);

  const [formData, setFormData] = useState({
    category: 'Misc',
    amount: 0,
    description: '',
    paymentMethod: 'cash',
  });

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Metrics Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Expenses (This Month)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fb7185', marginTop: '0.25rem' }}>
            Rs. {totalExpenses.toLocaleString()}
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Top Expense Category</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '0.25rem' }}>
            Salaries (67%)
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Expense Entries</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.25rem' }}>
            {expenses.length} Records
          </div>
        </div>
      </div>

      {/* Expense List */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Expense Log & Daily Operational Costs</h3>
          <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ fontSize: '0.85rem' }}>
            <Plus size={16} /> Record Daily Expense
          </button>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>Expense Ref #</th>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
              <th>Payment Method</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id}>
                <td style={{ fontFamily: 'monospace', color: '#38bdf8' }}>{e.expenseNumber}</td>
                <td>
                  <span className="badge badge-blue">{e.category}</span>
                </td>
                <td style={{ color: '#f8fafc' }}>{e.description}</td>
                <td>{e.expenseDate}</td>
                <td style={{ textTransform: 'uppercase', fontSize: '0.8rem' }}>{e.paymentMethod}</td>
                <td style={{ fontWeight: 700, color: '#fb7185' }}>Rs. {e.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="glass-panel" style={{ width: '450px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Record Pharmacy Expense</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newExp: Expense = {
                  id: `exp-${Date.now()}`,
                  expenseNumber: `EXP-${Date.now().toString().slice(-5)}`,
                  category: formData.category,
                  amount: formData.amount,
                  description: formData.description,
                  paymentMethod: formData.paymentMethod,
                  expenseDate: new Date().toISOString().split('T')[0],
                };
                setExpenses([newExp, ...expenses]);
                setShowAddModal(false);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
            >
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Category</label>
                <select
                  className="form-input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Rent">Rent</option>
                  <option value="Electricity">Electricity / Utilities</option>
                  <option value="Salaries">Salaries</option>
                  <option value="Supplies">Supplies & Consumables</option>
                  <option value="Repairs">Repairs & Maintenance</option>
                  <option value="Misc">Miscellaneous</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Amount (Rs.)</label>
                <input
                  type="number"
                  required
                  className="form-input"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Description</label>
                <textarea
                  required
                  rows={2}
                  className="form-input"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
