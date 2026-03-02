import { revenueEntries, expenseEntries, budgetEntries, channels, channelPartnerships, EXPENSE_CATEGORY_LABELS, type ExpenseCategory } from '@/data/mockData';
import { DollarSign, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const month = '2026-02';

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

export default function FinanceOverview() {
  const totalRevenue = revenueEntries.filter(r => r.month === month).reduce((s, r) => s + r.amount, 0);
  const totalExpenses = expenseEntries.filter(e => e.month === month).reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const margin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : '0';

  // Top channels by profit
  const channelProfits = channels.map(ch => {
    const rev = revenueEntries.filter(r => r.month === month && r.channelId === ch.id).reduce((s, r) => s + r.amount, 0);
    const exp = expenseEntries.filter(e => e.month === month && e.channelId === ch.id).reduce((s, e) => s + e.amount, 0);
    return { name: ch.name, revenue: rev, expenses: exp, profit: rev - exp };
  }).sort((a, b) => b.profit - a.profit);

  // Expense breakdown by category
  const expByCategory = Object.entries(
    expenseEntries.filter(e => e.month === month).reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>)
  ).map(([cat, amount]) => ({
    name: EXPENSE_CATEGORY_LABELS[cat as ExpenseCategory] || cat,
    value: amount,
  }));

  const categoryColors = ['#C85000', '#3B82F6', '#1A5C35', '#B8860B', '#8B5CF6', '#EC4899', '#6366F1', '#F59E0B'];

  // Budget vs Actual
  const budgetData = budgetEntries.filter(b => b.month === month && b.category !== 'TOTAL').map(b => ({
    category: EXPENSE_CATEGORY_LABELS[b.category as ExpenseCategory] || b.category,
    budget: b.budgetAmount,
    actual: b.actualAmount,
  }));

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-primary' },
          { label: 'Total Expenses', value: `$${totalExpenses.toLocaleString()}`, icon: TrendingDown, color: 'text-destructive' },
          { label: 'Net Profit', value: `$${netProfit.toLocaleString()}`, icon: TrendingUp, color: 'text-success' },
          { label: 'Profit Margin', value: `${margin}%`, icon: BarChart3, color: 'text-success' },
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
        {/* Top Channels by Profit */}
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Top Channels by Profit — Feb 2026</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={channelProfits} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 45% 22%)" />
              <XAxis type="number" tick={{ fill: 'hsl(210 18% 60%)', fontSize: 11 }} tickFormatter={v => `$${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(210 18% 60%)', fontSize: 10 }} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="profit" fill="hsl(var(--success))" radius={[0, 4, 4, 0]} name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Expense Breakdown</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={expByCategory} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                  {expByCategory.map((_, i) => <Cell key={i} fill={categoryColors[i % categoryColors.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 flex-1">
              {expByCategory.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: categoryColors[i % categoryColors.length] }} />
                  <span className="text-muted-foreground truncate">{item.name}</span>
                  <span className="font-semibold ml-auto">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Budget vs Actual */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Budget vs Actual — Feb 2026</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={budgetData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 45% 22%)" />
            <XAxis dataKey="category" tick={{ fill: 'hsl(210 18% 60%)', fontSize: 9 }} tickLine={false} angle={-20} textAnchor="end" height={60} />
            <YAxis tick={{ fill: 'hsl(210 18% 60%)', fontSize: 11 }} tickFormatter={v => `$${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="budget" fill="hsl(var(--secondary))" name="Budget" radius={[4, 4, 0, 0]} />
            <Bar dataKey="actual" fill="hsl(var(--primary))" name="Actual" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}