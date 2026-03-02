import { revenueEntries, expenseEntries, monthlySummaries } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-foreground">{p.name}: ${p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default function CompanyPnL() {
  const months = ['2026-02', '2026-01'];

  const monthlyData = months.map(m => {
    const revenue = revenueEntries.filter(r => r.month === m).reduce((s, r) => s + r.amount, 0);
    const expenses = expenseEntries.filter(e => e.month === m).reduce((s, e) => s + e.amount, 0);
    return { month: m, revenue, expenses, profit: revenue - expenses, margin: revenue > 0 ? ((revenue - expenses) / revenue * 100).toFixed(1) : '0' };
  });

  const trendData = monthlySummaries.slice().reverse().map(m => ({
    month: m.month.substring(5),
    revenue: m.totalRevenue,
    expenses: m.totalSalaryCost + m.totalProxyCost,
    profit: m.grossProfit,
  }));

  const current = monthlyData[0];
  const prev = monthlyData[1];

  return (
    <div className="space-y-6">
      {/* Income Statement */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Company Income Statement — February 2026</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
            <span className="font-semibold">Total Revenue</span>
            <span className="text-xl font-bold text-success">${current.revenue.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
            <span className="font-semibold">Total Expenses</span>
            <span className="text-xl font-bold text-destructive">${current.expenses.toLocaleString()}</span>
          </div>
          <div className="border-t-2 border-border pt-3">
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
              <span className="font-bold text-lg">Net Profit</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">${current.profit.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground ml-2">({current.margin}% margin)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Month over Month */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Revenue MoM', current: current.revenue, prev: prev?.revenue || 0 },
          { label: 'Expenses MoM', current: current.expenses, prev: prev?.expenses || 0 },
          { label: 'Profit MoM', current: current.profit, prev: prev?.profit || 0 },
        ].map(item => {
          const change = item.prev > 0 ? ((item.current - item.prev) / item.prev * 100).toFixed(1) : '0';
          const isUp = item.current >= item.prev;
          return (
            <div key={item.label} className="stat-card">
              <span className="stat-label">{item.label}</span>
              <div className={`stat-value ${item.label.includes('Expense') ? (isUp ? 'text-destructive' : 'text-success') : (isUp ? 'text-success' : 'text-destructive')}`}>
                {isUp ? '▲' : '▼'} {change}%
              </div>
              <span className="text-xs text-muted-foreground">${item.prev.toLocaleString()} → ${item.current.toLocaleString()}</span>
            </div>
          );
        })}
      </div>

      {/* Trend */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">6-Month P&L Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 45% 22%)" />
            <XAxis dataKey="month" tick={{ fill: 'hsl(210 18% 60%)', fontSize: 11 }} />
            <YAxis tick={{ fill: 'hsl(210 18% 60%)', fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#C85000" fill="#C85000" fillOpacity={0.15} strokeWidth={2} name="Revenue" />
            <Area type="monotone" dataKey="profit" stroke="#1A5C35" fill="#1A5C35" fillOpacity={0.15} strokeWidth={2} name="Profit" />
            <Area type="monotone" dataKey="expenses" stroke="#7A1515" fill="#7A1515" fillOpacity={0.1} strokeWidth={1.5} name="Expenses" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}