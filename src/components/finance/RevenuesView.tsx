import { useState } from 'react';
import { revenueEntries, channels, REVENUE_SOURCE_LABELS, type RevenueSource } from '@/data/mockData';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const month = '2026-02';

export default function RevenuesView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const data = revenueEntries.filter(r => r.month === month);
  const total = data.reduce((s, r) => s + r.amount, 0);

  // Group by channel
  const byChannel = channels.map(ch => {
    const entries = data.filter(r => r.channelId === ch.id);
    const channelTotal = entries.reduce((s, r) => s + r.amount, 0);
    return { ...ch, entries, total: channelTotal };
  }).filter(c => c.total > 0).sort((a, b) => b.total - a.total);

  // Group by source
  const bySource = Object.entries(
    data.reduce((acc, r) => { acc[r.source] = (acc[r.source] || 0) + r.amount; return acc; }, {} as Record<string, number>)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 mr-4">
          <div className="stat-card"><span className="stat-label">Total Revenue</span><div className="stat-value text-primary">${total.toLocaleString()}</div></div>
          {bySource.map(([source, amount]) => (
            <div key={source} className="stat-card">
              <span className="stat-label">{REVENUE_SOURCE_LABELS[source as RevenueSource]}</span>
              <div className="stat-value text-foreground">${(amount as number).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform shrink-0">
              <Plus className="w-4 h-4" /> Add Revenue
            </button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader><DialogTitle>Add Revenue Entry</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>Channel</Label>
                <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select channel" /></SelectTrigger>
                <SelectContent>{channels.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select>
              </div>
              <div><Label>Source</Label>
                <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select source" /></SelectTrigger>
                <SelectContent>{Object.entries(REVENUE_SOURCE_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v as string}</SelectItem>)}</SelectContent></Select>
              </div>
              <div><Label>Amount ($)</Label><Input type="number" placeholder="0.00" className="mt-1" /></div>
              <div><Label>Notes</Label><Input placeholder="Optional notes" className="mt-1" /></div>
              <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold" onClick={() => setDialogOpen(false)}>Save Revenue</button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Revenue by Channel */}
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Revenue by Channel — February 2026</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Channel', 'Source', 'Amount', 'Notes'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {byChannel.map(ch => (
              <>
                {ch.entries.map((r, i) => (
                  <tr key={r.id} className={`table-row-hover border-b border-border/50 ${i === 0 ? '' : 'bg-background/10'}`}>
                    {i === 0 && <td rowSpan={ch.entries.length} className="py-3 px-3 font-medium border-r border-border/30 align-top">{ch.name}<div className="text-xs text-muted-foreground mt-1">Total: ${ch.total.toLocaleString()}</div></td>}
                    <td className="py-3 px-3"><span className="pill pill-published">{REVENUE_SOURCE_LABELS[r.source]}</span></td>
                    <td className="py-3 px-3 font-semibold text-primary">${r.amount.toLocaleString()}</td>
                    <td className="py-3 px-3 text-muted-foreground text-xs">{r.notes || '—'}</td>
                  </tr>
                ))}
              </>
            ))}
            <tr className="border-t-2 border-border font-bold">
              <td className="py-3 px-3">Grand Total</td>
              <td></td>
              <td className="py-3 px-3 text-primary">${total.toLocaleString()}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}