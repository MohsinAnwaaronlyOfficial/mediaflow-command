import { useState } from 'react';
import { generateRevenueData } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const revenueBreakdown = [
  { name: 'YouTube Ads', value: 8608, pct: 67, color: '#C85000' },
  { name: 'Affiliate', value: 2698, pct: 21, color: '#3B82F6' },
  { name: 'Shopping', value: 1028, pct: 8, color: '#1A5C35' },
  { name: 'Sponsored', value: 513, pct: 4, color: '#B8860B' },
];

const toolSubs = [
  { name: 'IXBrowser', cost: 49, renews: 'Mar 15, 2026', warning: true },
  { name: 'Claude API', cost: 120, renews: 'Apr 1, 2026', warning: false },
  { name: 'VPS Contabo', cost: 35, renews: 'Mar 20, 2026', warning: false },
  { name: 'WhatsApp API', cost: 30, renews: 'Apr 5, 2026', warning: false },
];

const proxies = [
  { provider: 'DataImpulse', channels: 'BenchDecoded', expiry: 'Mar 5, 2026', cost: 15, daysLeft: 5 },
  { provider: 'DataImpulse', channels: 'TrialTales', expiry: 'Apr 12, 2026', cost: 15, daysLeft: 43 },
  { provider: 'BrightData', channels: 'VerdictVault', expiry: 'Mar 28, 2026', cost: 20, daysLeft: 28 },
  { provider: 'DataImpulse', channels: 'TechVault', expiry: 'Apr 5, 2026', cost: 15, daysLeft: 36 },
  { provider: 'BrightData', channels: 'FoodFlicks', expiry: 'Mar 30, 2026', cost: 20, daysLeft: 30 },
  { provider: 'DataImpulse', channels: 'LawBites', expiry: 'Apr 15, 2026', cost: 10, daysLeft: 46 },
];

const budgetItems = [
  { label: 'Tools', pct: 8, amount: 234 },
  { label: 'Proxies', pct: 5, amount: 95 },
  { label: 'Staff', pct: 45, amount: 1350 },
  { label: 'VPS', pct: 1, amount: 35 },
  { label: 'Other', pct: 2, amount: 60 },
];

const chartTheme = { grid: 'hsl(216 45% 22%)', text: 'hsl(210 18% 60%)' };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-foreground">{p.dataKey}: ${p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default function Finance() {
  const revenueData = generateRevenueData();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Company Finance</h1>
          <p className="text-sm text-muted-foreground">February 2026 Overview</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
              <Plus className="w-4 h-4" /> Add Expense
            </button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader><DialogTitle>Add Expense</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>Category</Label>
                <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>{['Tools','Proxies','Staff','VPS','Other'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
              </div>
              <div><Label>Amount ($)</Label><Input type="number" placeholder="0.00" className="mt-1" /></div>
              <div><Label>Description</Label><Input placeholder="e.g. IXBrowser renewal" className="mt-1" /></div>
              <div><Label>Date</Label><Input type="date" className="mt-1" /></div>
              <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold" onClick={() => setDialogOpen(false)}>Save Expense</button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Top Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Revenue', value: '$12,847', icon: DollarSign, color: 'text-primary' },
          { label: 'Expenses', value: '$2,340', icon: TrendingDown, color: 'text-destructive' },
          { label: 'Net Profit', value: '$10,507', icon: TrendingUp, color: 'text-success' },
          { label: 'Profit Margin', value: '81%', icon: TrendingUp, color: 'text-success' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <span className="stat-label">{s.label}</span>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className={`stat-value ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Revenue Breakdown</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={revenueBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                  {revenueBreakdown.map(entry => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {revenueBreakdown.map(item => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-semibold ml-auto">{item.pct}%</span>
                  <span className="text-xs text-muted-foreground">(${item.value.toLocaleString()})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue vs Expenses */}
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Revenue vs Expenses (6 Months)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="month" tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} />
              <YAxis tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="revenue" stroke="#C85000" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="expenses" stroke="#7A1515" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tool Subscriptions */}
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Tool Subscriptions</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Tool','Monthly Cost','Renews','Status'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {toolSubs.map((t, i) => (
              <tr key={t.name} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-3 font-medium">{t.name}</td>
                <td className="py-3 px-3 text-primary font-semibold">${t.cost}/mo</td>
                <td className="py-3 px-3 text-muted-foreground">{t.renews}</td>
                <td className="py-3 px-3">{t.warning ? <span className="pill-queued">Renewing Soon</span> : <span className="pill-published">Active</span>}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-border">
              <td className="py-3 px-3 font-bold">Total</td>
              <td className="py-3 px-3 font-bold text-primary">${toolSubs.reduce((s, t) => s + t.cost, 0)}/mo</td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Proxy Tracker */}
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Proxy Tracker</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Provider','Channels','Expiry','Cost','Days Left'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {proxies.map((p, i) => (
              <tr key={i} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-3">{p.provider}</td>
                <td className="py-3 px-3 font-medium">{p.channels}</td>
                <td className="py-3 px-3 text-muted-foreground">{p.expiry}</td>
                <td className="py-3 px-3 text-primary">${p.cost}/mo</td>
                <td className="py-3 px-3">
                  <span className={`font-bold ${p.daysLeft <= 7 ? 'text-destructive' : p.daysLeft <= 14 ? 'text-warning' : 'text-success'}`}>
                    {p.daysLeft} days
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Budget Tracker */}
      <div className="stat-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Budget Tracker ($3,000/mo)</h3>
          <span className="text-sm font-bold text-success">${budgetItems.reduce((s, b) => s + b.amount, 0).toLocaleString()} / $3,000 (61%)</span>
        </div>
        <div className="space-y-3">
          {budgetItems.map(b => (
            <div key={b.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{b.label}</span>
                <span>${b.amount} ({b.pct}%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
