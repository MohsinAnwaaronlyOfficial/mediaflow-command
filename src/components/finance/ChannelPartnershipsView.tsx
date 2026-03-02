import { useState } from 'react';
import { channelPartnerships, partners, channels } from '@/data/mockData';
import { Plus, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ChannelPartnershipsView() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Channel Partnerships</h3>
          <p className="text-xs text-muted-foreground">Revenue split configuration per channel. Total must equal 100%.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
              <Plus className="w-4 h-4" /> Add Partnership
            </button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader><DialogTitle>Add Channel Partnership</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>Channel</Label>
                <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select channel" /></SelectTrigger>
                <SelectContent>{channels.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select>
              </div>
              <div><Label>Partner</Label>
                <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select partner" /></SelectTrigger>
                <SelectContent>{partners.map(p => <SelectItem key={p.id} value={p.id}>{p.name} ({p.title})</SelectItem>)}</SelectContent></Select>
              </div>
              <div><Label>Partner Share %</Label><Input type="number" min={0} max={100} placeholder="80" className="mt-1" /></div>
              <div><Label>Company Share %</Label><Input type="number" min={0} max={100} placeholder="20" className="mt-1" /></div>
              <div><Label>Start Month</Label><Input type="month" className="mt-1" /></div>
              <div className="flex items-center gap-2 p-2 bg-warning/10 rounded-lg border border-warning/20">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="text-xs text-warning">Partner + Company shares must equal 100%</span>
              </div>
              <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold" onClick={() => setDialogOpen(false)}>Save Partnership</button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="stat-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Channel', 'Partner', 'Partner %', 'Company %', 'Start', 'End', 'Status', 'Validation'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {channelPartnerships.map((cp, i) => {
              const isValid = cp.partnerSharePercent + cp.companySharePercent === 100;
              return (
                <tr key={cp.id} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                  <td className="py-3 px-3 font-medium">{cp.channelName}</td>
                  <td className="py-3 px-3">{cp.partnerName}</td>
                  <td className="py-3 px-3 font-semibold text-warning">{cp.partnerSharePercent}%</td>
                  <td className="py-3 px-3 font-semibold text-primary">{cp.companySharePercent}%</td>
                  <td className="py-3 px-3 text-muted-foreground">{cp.startMonth}</td>
                  <td className="py-3 px-3 text-muted-foreground">{cp.endMonth || 'Ongoing'}</td>
                  <td className="py-3 px-3"><span className={`pill ${cp.endMonth ? 'pill-error' : 'pill-published'}`}>{cp.endMonth ? 'Ended' : 'Active'}</span></td>
                  <td className="py-3 px-3">{isValid ? <span className="text-success text-xs">✓ Valid</span> : <span className="text-destructive text-xs">✗ Invalid</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Partners Equity */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Partners & Equity</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map(p => (
            <div key={p.id} className="p-4 bg-muted/20 rounded-lg border border-border/50 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-primary">{p.name[0]}</span>
              </div>
              <h4 className="font-semibold text-sm">{p.name}</h4>
              <p className="text-xs text-muted-foreground">{p.title}</p>
              <div className="mt-2 text-2xl font-bold text-primary">{p.equityPercent}%</div>
              <p className="text-xs text-muted-foreground mt-1">Equity Stake</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}