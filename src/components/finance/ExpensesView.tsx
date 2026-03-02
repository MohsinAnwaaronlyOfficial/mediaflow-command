import { useState } from 'react';
import { expenseEntries, channels, EXPENSE_CATEGORY_LABELS, type ExpenseCategory, type ExpenseType } from '@/data/mockData';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const month = '2026-02';

const TYPE_LABELS: Record<ExpenseType, string> = {
  OVERHEAD: 'Overhead',
  CHANNEL_DIRECT: 'Channel Direct',
  SHARED: 'Shared',
  DERIVED: 'Derived',
};

const TYPE_PILLS: Record<ExpenseType, string> = {
  OVERHEAD: 'pill-queued',
  CHANNEL_DIRECT: 'pill-published',
  SHARED: 'pill-uploading',
  DERIVED: 'pill-unlisted',
};

export default function ExpensesView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const data = expenseEntries.filter(e => e.month === month);
  const filtered = filter === 'all' ? data : data.filter(e => e.expenseType === filter);
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const overhead = data.filter(e => e.expenseType === 'OVERHEAD').reduce((s, e) => s + e.amount, 0);
  const channelDirect = data.filter(e => e.expenseType === 'CHANNEL_DIRECT').reduce((s, e) => s + e.amount, 0);
  const shared = data.filter(e => e.expenseType === 'SHARED').reduce((s, e) => s + e.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card"><span className="stat-label">Total Expenses</span><div className="stat-value text-destructive">${data.reduce((s, e) => s + e.amount, 0).toLocaleString()}</div></div>
        <div className="stat-card"><span className="stat-label">Overhead</span><div className="stat-value text-warning">${overhead.toLocaleString()}</div></div>
        <div className="stat-card"><span className="stat-label">Channel Direct</span><div className="stat-value text-primary">${channelDirect.toLocaleString()}</div></div>
        <div className="stat-card"><span className="stat-label">Shared</span><div className="stat-value text-foreground">${shared.toLocaleString()}</div></div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {['all', 'OVERHEAD', 'CHANNEL_DIRECT', 'SHARED'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted/30 text-muted-foreground hover:text-foreground'}`}>
              {f === 'all' ? 'All' : TYPE_LABELS[f as ExpenseType]}
            </button>
          ))}
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
              <Plus className="w-4 h-4" /> Add Expense
            </button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader><DialogTitle>Add Expense Entry</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>Category</Label>
                <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>{Object.entries(EXPENSE_CATEGORY_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent></Select>
              </div>
              <div><Label>Type</Label>
                <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>{Object.entries(TYPE_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent></Select>
              </div>
              <div><Label>Channel (optional)</Label>
                <Select><SelectTrigger className="mt-1"><SelectValue placeholder="None (overhead)" /></SelectTrigger>
                <SelectContent>{channels.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select>
              </div>
              <div><Label>Amount ($)</Label><Input type="number" placeholder="0.00" className="mt-1" /></div>
              <div><Label>Vendor</Label><Input placeholder="Vendor name" className="mt-1" /></div>
              <div><Label>Notes</Label><Input placeholder="Description" className="mt-1" /></div>
              <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold" onClick={() => setDialogOpen(false)}>Save Expense</button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="stat-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Category', 'Type', 'Channel', 'Vendor', 'Amount', 'Notes', 'Created By'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((e, i) => (
              <tr key={e.id} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-3 font-medium">{EXPENSE_CATEGORY_LABELS[e.category]}</td>
                <td className="py-3 px-3"><span className={`pill ${TYPE_PILLS[e.expenseType]}`}>{TYPE_LABELS[e.expenseType]}</span></td>
                <td className="py-3 px-3 text-muted-foreground">{e.channelName || '—'}</td>
                <td className="py-3 px-3 text-muted-foreground">{e.vendor}</td>
                <td className="py-3 px-3 font-semibold text-primary">${e.amount.toLocaleString()}</td>
                <td className="py-3 px-3 text-xs text-muted-foreground">{e.notes}</td>
                <td className="py-3 px-3 text-xs text-muted-foreground">{e.createdBy}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-border font-bold">
              <td className="py-3 px-3">Total ({filtered.length} entries)</td>
              <td colSpan={3}></td>
              <td className="py-3 px-3 text-primary">${total.toLocaleString()}</td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}