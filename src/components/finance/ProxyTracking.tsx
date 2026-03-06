import { useState } from 'react';
import { channels } from '@/data/mockData';
import { Plus, Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import TierBadge from '@/components/shared/TierBadge';

interface ProxyRecord {
  id: number;
  channelId: string;
  channelName: string;
  provider: string;
  host: string;
  port: number;
  username: string;
  password: string;
  proxyType: 'Residential' | 'Datacenter' | 'Mobile' | 'ISP';
  amount: number;
  currency: string;
  buyDate: string;
  expiryDate: string;
  autoRenew: boolean;
  notes: string;
}

const initialProxies: ProxyRecord[] = channels
  .filter(c => c.proxyDetails.address)
  .map((c, i) => ({
    id: i + 1,
    channelId: c.id,
    channelName: c.name,
    provider: c.proxyDetails.provider,
    host: c.proxyDetails.address.split(':')[0],
    port: parseInt(c.proxyDetails.address.split(':')[1]) || 8080,
    username: c.proxyDetails.username,
    password: c.proxyDetails.password,
    proxyType: (c.proxyDetails.type === 'residential' ? 'Residential' : c.proxyDetails.type === 'datacenter' ? 'Datacenter' : 'Mobile') as ProxyRecord['proxyType'],
    amount: c.proxyDetails.price,
    currency: 'USD',
    buyDate: c.proxyDetails.buyDate,
    expiryDate: c.proxyDetails.expiryDate,
    autoRenew: true,
    notes: '',
  }));

function getDaysLeft(expiryDate: string): number {
  return Math.ceil((new Date(expiryDate).getTime() - Date.now()) / 86400000);
}

function getDaysLeftColor(days: number): string {
  if (days <= 0) return 'text-muted-foreground';
  if (days <= 7) return 'text-destructive';
  if (days <= 30) return 'text-warning';
  return 'text-success';
}

function getDaysLeftStatus(days: number): string {
  if (days <= 0) return '⚫ Expired';
  if (days <= 7) return '🔴 Expiring Soon';
  if (days <= 30) return '🟡 Active';
  return '🟢 Active';
}

export default function ProxyTracking() {
  const [proxies] = useState<ProxyRecord[]>(initialProxies);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<number, boolean>>({});
  const [channelSearch, setChannelSearch] = useState('');

  const activeChannels = channels.filter(c => c.status === 'active');
  const frozenChannels = channels.filter(c => c.status !== 'active');
  const filteredChannels = [...activeChannels, ...frozenChannels].filter(c =>
    !channelSearch || c.name.toLowerCase().includes(channelSearch.toLowerCase()) || c.id.toLowerCase().includes(channelSearch.toLowerCase())
  );

  const totalSpend = proxies.reduce((s, p) => s + p.amount, 0);
  const expiringSoon = proxies.filter(p => { const d = getDaysLeft(p.expiryDate); return d > 0 && d <= 7; }).length;
  const expired = proxies.filter(p => getDaysLeft(p.expiryDate) <= 0).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card"><span className="stat-label">Total Proxies</span><div className="stat-value">{proxies.length}</div></div>
        <div className="stat-card"><span className="stat-label">Monthly Spend</span><div className="stat-value text-primary">${totalSpend}</div></div>
        <div className="stat-card"><span className="stat-label">Expiring Soon</span><div className="stat-value text-warning">{expiringSoon}</div></div>
        <div className="stat-card"><span className="stat-label">Expired</span><div className="stat-value text-destructive">{expired}</div></div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Proxy Records</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
              <Plus className="w-4 h-4" /> Add Proxy Record
            </button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Add Proxy Record</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-xs">Channel</Label>
                <Input placeholder="Search channels..." value={channelSearch} onChange={e => setChannelSearch(e.target.value)} className="mt-1 mb-1" />
                <Select>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select channel" /></SelectTrigger>
                  <SelectContent>
                    {filteredChannels.map(c => (
                      <SelectItem key={c.id} value={c.id}>
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'active' ? 'bg-success' : 'bg-destructive'}`} />
                          {c.id} — {c.name}
                          <TierBadge tier={c.tier} />
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-xs">Provider</Label><Input placeholder="e.g. Bright Data" className="mt-1" /></div>
                <div><Label className="text-xs">Proxy Type</Label>
                  <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      {['Residential', 'Datacenter', 'Mobile', 'ISP'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-xs">Host</Label><Input placeholder="45.89.112.34" className="mt-1 font-mono text-xs" /></div>
                <div><Label className="text-xs">Port</Label><Input type="number" placeholder="8080" className="mt-1 font-mono text-xs" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-xs">Username</Label><Input placeholder="user" className="mt-1 font-mono text-xs" /></div>
                <div><Label className="text-xs">Password</Label><Input type="password" placeholder="••••••" className="mt-1 font-mono text-xs" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-xs">Amount Paid</Label>
                  <div className="flex gap-2 mt-1">
                    <Input type="number" placeholder="20.00" className="flex-1" />
                    <Select defaultValue="USD"><SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="USD">USD</SelectItem><SelectItem value="EUR">EUR</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-xs">Buy Date</Label><Input type="date" className="mt-1" /></div>
                <div><Label className="text-xs">Expiry Date</Label><Input type="date" className="mt-1" /></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <span className="text-xs">Auto Renew</span>
                <Switch />
              </div>
              <div><Label className="text-xs">Notes (optional)</Label><Input placeholder="Additional info" className="mt-1" /></div>
              <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold" onClick={() => setDialogOpen(false)}>Save Proxy Record</button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="stat-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Channel', 'Provider', 'Host:Port', 'Type', 'Amount', 'Buy Date', 'Expiry', 'Days Left', 'Status', 'Actions'].map(h => (
              <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {proxies.map((p, i) => {
              const daysLeft = getDaysLeft(p.expiryDate);
              return (
                <tr key={p.id} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-xs">{p.channelId}</span>
                      <span className="text-[10px] text-muted-foreground">{p.channelName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-xs">{p.provider}</td>
                  <td className="py-3 px-2 font-mono text-xs">
                    <div className="flex items-center gap-1">
                      {p.host}:{p.port}
                      <button onClick={() => setShowPasswords(prev => ({ ...prev, [p.id]: !prev[p.id] }))} className="text-muted-foreground hover:text-foreground">
                        {showPasswords[p.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </div>
                    {showPasswords[p.id] && <div className="text-[10px] text-muted-foreground mt-0.5">{p.username} / {p.password}</div>}
                  </td>
                  <td className="py-3 px-2"><span className="pill pill-editing text-[10px]">{p.proxyType}</span></td>
                  <td className="py-3 px-2 font-semibold text-primary">${p.amount}</td>
                  <td className="py-3 px-2 text-xs text-muted-foreground">{p.buyDate}</td>
                  <td className="py-3 px-2 text-xs text-muted-foreground">{p.expiryDate}</td>
                  <td className={`py-3 px-2 text-xs font-bold ${getDaysLeftColor(daysLeft)}`}>
                    {daysLeft <= 0 ? 'Expired' : `${daysLeft}d`}
                  </td>
                  <td className="py-3 px-2 text-xs">{getDaysLeftStatus(daysLeft)}</td>
                  <td className="py-3 px-2">
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-muted/50 rounded"><Pencil className="w-3 h-3 text-muted-foreground" /></button>
                      <button className="p-1 hover:bg-destructive/20 rounded"><Trash2 className="w-3 h-3 text-destructive" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
