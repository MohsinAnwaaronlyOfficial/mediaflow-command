import { useState } from 'react';
import { channels, generateRevenueData, monthlyRevenueData, salaryPayments, proxyCosts, shoppingEvents, monthlySummaries, ytdSummary, productionReport, channelColors } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Plus, Users, Globe, ShoppingCart, BarChart3, Calendar, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

// ═══ SUB-VIEW COMPONENTS ═══

function PnLView() {
  const revenueData = generateRevenueData();
  const febData = monthlySummaries[0];
  const janData = monthlySummaries[1];
  const revGrowth = ((febData.totalRevenue - janData.totalRevenue) / janData.totalRevenue * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Revenue', value: `$${febData.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-primary', delta: `+${revGrowth}%` },
          { label: 'Expenses', value: `$${(febData.totalSalaryCost + febData.totalProxyCost).toLocaleString()}`, icon: TrendingDown, color: 'text-destructive' },
          { label: 'Gross Profit', value: `$${febData.grossProfit.toLocaleString()}`, icon: TrendingUp, color: 'text-success' },
          { label: 'Margin', value: `${febData.marginPct}%`, icon: TrendingUp, color: 'text-success' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <span className="stat-label">{s.label}</span>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className={`stat-value ${s.color}`}>{s.value}</div>
            {s.delta && <span className="text-xs text-success mt-1">▲ {s.delta} vs last month</span>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Revenue Breakdown</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart><Pie data={revenueBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>{revenueBreakdown.map(e => <Cell key={e.name} fill={e.color} />)}</Pie></PieChart>
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

      {/* Channel Revenue Breakdown */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Revenue by Channel (Feb 2026)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyRevenueData.filter(d => d.month === '2026-02')}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
            <XAxis dataKey="channelName" tick={{ fill: chartTheme.text, fontSize: 10 }} tickLine={false} />
            <YAxis tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} tickFormatter={v => `$${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="#C85000" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TeamCostsView() {
  const febSalaries = salaryPayments.filter(s => s.month === '2026-02');
  const totalUSD = febSalaries.reduce((sum, s) => {
    if (s.currency === 'USD') return sum + s.amount;
    if (s.currency === 'PKR') return sum + s.amount / 280;
    if (s.currency === 'AED') return sum + s.amount / 3.67;
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card"><span className="stat-label">Total Editors</span><div className="stat-value text-foreground">{febSalaries.length}</div></div>
        <div className="stat-card"><span className="stat-label">Total Salary Cost (USD)</span><div className="stat-value text-primary">${Math.round(totalUSD).toLocaleString()}</div></div>
        <div className="stat-card"><span className="stat-label">Avg Cost/Editor</span><div className="stat-value text-warning">${Math.round(totalUSD / febSalaries.length)}</div></div>
      </div>
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Editor Salaries — February 2026</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Editor','Channel','Amount','Currency','Pay Date','Paid','Videos This Month','Revenue Generated'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {febSalaries.map((s, i) => {
              const ch = channels.find(c => c.id === s.channelId);
              const rev = monthlyRevenueData.find(r => r.channelId === s.channelId && r.month === '2026-02');
              return (
                <tr key={i} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                  <td className="py-3 px-3 font-medium">{s.editorName}</td>
                  <td className="py-3 px-3 text-muted-foreground">{ch?.name}</td>
                  <td className="py-3 px-3 font-semibold text-primary">{s.amount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-muted-foreground">{s.currency}</td>
                  <td className="py-3 px-3 text-muted-foreground">Day {s.payDate}</td>
                  <td className="py-3 px-3">{s.paid ? <span className="pill-published">Paid</span> : <span className="pill-queued">Pending</span>}</td>
                  <td className="py-3 px-3">{rev?.videosPublished || 0}</td>
                  <td className="py-3 px-3 text-success">${rev?.revenue.toLocaleString() || 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProxyTrackerView() {
  return (
    <div className="stat-card overflow-x-auto">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Proxy Tracker</h3>
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border">
          {['Channel','Provider','Cost','Buy Date','Expiry','Days Left','Type'].map(h => (
            <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {proxyCosts.map((p, i) => (
            <tr key={i} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
              <td className="py-3 px-3 font-medium">{p.channelName}</td>
              <td className="py-3 px-3 text-muted-foreground">{p.provider}</td>
              <td className="py-3 px-3 text-primary">${p.amount}/mo</td>
              <td className="py-3 px-3 text-muted-foreground">{p.buyDate}</td>
              <td className="py-3 px-3 text-muted-foreground">{p.expiryDate}</td>
              <td className="py-3 px-3">
                <span className={`font-bold ${p.daysLeft <= 7 ? 'text-destructive' : p.daysLeft <= 14 ? 'text-warning' : 'text-success'}`}>
                  {p.daysLeft <= 7 && '⚠️ '}{p.daysLeft} days
                </span>
              </td>
              <td className="py-3 px-3">{channels.find(c => c.id === p.channelId)?.proxyDetails.type || '—'}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-border">
            <td className="py-3 px-3 font-bold">Total</td>
            <td></td>
            <td className="py-3 px-3 font-bold text-primary">${proxyCosts.reduce((s, p) => s + p.amount, 0)}/mo</td>
            <td colSpan={4}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ProductionReportView() {
  return (
    <div className="space-y-6">
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Production Report — February 2026</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Channel','Editor','Longs/Week','Shorts/Week','Longs/Month','Shorts/Month','Editor Output'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {productionReport.map((p, i) => (
              <tr key={i} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-3 font-medium">{p.channelName}</td>
                <td className="py-3 px-3 text-muted-foreground">{p.editorName}</td>
                <td className="py-3 px-3">{p.longsThisWeek}</td>
                <td className="py-3 px-3">{p.shortsThisWeek}</td>
                <td className="py-3 px-3 font-semibold">{p.longsThisMonth}</td>
                <td className="py-3 px-3 font-semibold">{p.shortsThisMonth}</td>
                <td className="py-3 px-3">
                  <span className={`font-bold ${p.editorOutput >= 15 ? 'text-success' : p.editorOutput >= 10 ? 'text-warning' : 'text-destructive'}`}>
                    {p.editorOutput} videos
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RevenueTrackerView() {
  const febData = monthlyRevenueData.filter(d => d.month === '2026-02');
  return (
    <div className="space-y-6">
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Revenue per Channel — February 2026</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Channel','Revenue','Views','Subs Gained','Videos Published','Rev/Video'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {febData.map((d, i) => (
              <tr key={i} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-3 font-medium">{d.channelName}</td>
                <td className="py-3 px-3 font-semibold text-primary">${d.revenue.toLocaleString()}</td>
                <td className="py-3 px-3 text-muted-foreground">{(d.views / 1000000).toFixed(1)}M</td>
                <td className="py-3 px-3 text-success">+{d.subsGained.toLocaleString()}</td>
                <td className="py-3 px-3">{d.videosPublished}</td>
                <td className="py-3 px-3 text-warning">${(d.revenue / d.videosPublished).toFixed(2)}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-border">
              <td className="py-3 px-3 font-bold">Total</td>
              <td className="py-3 px-3 font-bold text-primary">${febData.reduce((s, d) => s + d.revenue, 0).toLocaleString()}</td>
              <td className="py-3 px-3 font-bold">{(febData.reduce((s, d) => s + d.views, 0) / 1000000).toFixed(1)}M</td>
              <td className="py-3 px-3 font-bold text-success">+{febData.reduce((s, d) => s + d.subsGained, 0).toLocaleString()}</td>
              <td className="py-3 px-3 font-bold">{febData.reduce((s, d) => s + d.videosPublished, 0)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* YPP Progress */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">YPP Eligibility Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'TrialTales', subs: 847, subsGoal: 1000, hours: 3240, hoursGoal: 4000 },
            { name: 'LawBites', subs: 312, subsGoal: 1000, hours: 890, hoursGoal: 4000 },
          ].map(ch => (
            <div key={ch.name} className="p-4 bg-muted/20 rounded-lg">
              <h4 className="font-semibold mb-3">{ch.name}</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span>Subscribers</span><span>{ch.subs}/{ch.subsGoal}</span></div>
                  <div className="w-full bg-muted rounded-full h-2"><div className="bg-primary h-2 rounded-full" style={{ width: `${(ch.subs / ch.subsGoal) * 100}%` }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span>Watch Hours</span><span>{ch.hours}/{ch.hoursGoal}</span></div>
                  <div className="w-full bg-muted rounded-full h-2"><div className="bg-success h-2 rounded-full" style={{ width: `${(ch.hours / ch.hoursGoal) * 100}%` }} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShoppingReportView() {
  const totalCommission = shoppingEvents.reduce((s, e) => s + e.estimatedCommission, 0);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card"><span className="stat-label">Shopping Events</span><div className="stat-value text-foreground">{shoppingEvents.length}</div></div>
        <div className="stat-card"><span className="stat-label">Est. Commission</span><div className="stat-value text-primary">${totalCommission.toFixed(2)}</div></div>
        <div className="stat-card"><span className="stat-label">Channels with Shopping</span><div className="stat-value text-success">{channels.filter(c => c.shopping.enabled).length}</div></div>
      </div>
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Shopping Events Log</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Channel','Video Folder','Product','Link','Added At','Est. Commission'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {shoppingEvents.map((e, i) => (
              <tr key={i} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-3 font-medium">{e.channelName}</td>
                <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{e.videoFolder}</td>
                <td className="py-3 px-3">{e.productName}</td>
                <td className="py-3 px-3"><a href={e.productLink} className="text-xs text-secondary hover:underline" target="_blank" rel="noreferrer">{e.productLink}</a></td>
                <td className="py-3 px-3 text-xs text-muted-foreground">{e.addedAt}</td>
                <td className="py-3 px-3 text-success font-semibold">${e.estimatedCommission.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function YTDSummaryView() {
  const profitData = monthlySummaries.slice().reverse().map(m => ({
    month: m.month.substring(5),
    revenue: m.totalRevenue,
    costs: m.totalSalaryCost + m.totalProxyCost,
    profit: m.grossProfit,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'YTD Revenue', value: `$${ytdSummary.totalRevenue.toLocaleString()}`, color: 'text-primary' },
          { label: 'YTD Costs', value: `$${ytdSummary.totalCosts.toLocaleString()}`, color: 'text-destructive' },
          { label: 'YTD Profit', value: `$${ytdSummary.totalProfit.toLocaleString()}`, color: 'text-success' },
          { label: 'Growth', value: `+${ytdSummary.growthPct}%`, color: 'text-success' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <span className="stat-label">{s.label}</span>
            <div className={`stat-value ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="stat-card"><span className="stat-label">Total Videos</span><div className="stat-value text-foreground">{ytdSummary.totalVideos.toLocaleString()}</div></div>
        <div className="stat-card"><span className="stat-label">Active Channels</span><div className="stat-value text-foreground">{ytdSummary.channelsActive}</div></div>
        <div className="stat-card"><span className="stat-label">Avg Revenue/Video</span><div className="stat-value text-warning">${ytdSummary.avgRevenuePerVideo}</div></div>
      </div>
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Monthly Profit Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={profitData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
            <XAxis dataKey="month" tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#C85000" fill="#C85000" fillOpacity={0.15} strokeWidth={2} />
            <Area type="monotone" dataKey="profit" stroke="#1A5C35" fill="#1A5C35" fillOpacity={0.15} strokeWidth={2} />
            <Area type="monotone" dataKey="costs" stroke="#7A1515" fill="#7A1515" fillOpacity={0.1} strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tool Subs + Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Budget Tracker ($3,000/mo)</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Tools', pct: 8, amount: 234 },
              { label: 'Proxies', pct: 5, amount: 100 },
              { label: 'Staff', pct: 55, amount: 1650 },
              { label: 'VPS', pct: 1, amount: 35 },
              { label: 'Other', pct: 2, amount: 60 },
            ].map(b => (
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
    </div>
  );
}

// ═══ MAIN FINANCE PAGE ═══

export default function Finance() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Company Finance</h1>
          <p className="text-sm text-muted-foreground">CXO Dashboard — Real-time P&L</p>
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

      <Tabs defaultValue="pnl">
        <TabsList className="bg-muted/30 h-auto p-1 flex-wrap">
          <TabsTrigger value="pnl" className="text-xs py-1.5 gap-1"><BarChart3 className="w-3 h-3" />Monthly P&L</TabsTrigger>
          <TabsTrigger value="team" className="text-xs py-1.5 gap-1"><Users className="w-3 h-3" />Team Costs</TabsTrigger>
          <TabsTrigger value="proxy" className="text-xs py-1.5 gap-1"><Globe className="w-3 h-3" />Proxy Tracker</TabsTrigger>
          <TabsTrigger value="production" className="text-xs py-1.5 gap-1"><FileText className="w-3 h-3" />Production</TabsTrigger>
          <TabsTrigger value="revenue" className="text-xs py-1.5 gap-1"><DollarSign className="w-3 h-3" />Revenue</TabsTrigger>
          <TabsTrigger value="shopping" className="text-xs py-1.5 gap-1"><ShoppingCart className="w-3 h-3" />Shopping</TabsTrigger>
          <TabsTrigger value="ytd" className="text-xs py-1.5 gap-1"><Calendar className="w-3 h-3" />YTD Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="pnl"><PnLView /></TabsContent>
        <TabsContent value="team"><TeamCostsView /></TabsContent>
        <TabsContent value="proxy"><ProxyTrackerView /></TabsContent>
        <TabsContent value="production"><ProductionReportView /></TabsContent>
        <TabsContent value="revenue"><RevenueTrackerView /></TabsContent>
        <TabsContent value="shopping"><ShoppingReportView /></TabsContent>
        <TabsContent value="ytd"><YTDSummaryView /></TabsContent>
      </Tabs>
    </div>
  );
}
