import { budgetEntries, EXPENSE_CATEGORY_LABELS, type ExpenseCategory } from '@/data/mockData';

const month = '2026-02';

export default function MonthlyBudget() {
  const data = budgetEntries.filter(b => b.month === month);
  const total = data.find(b => b.category === 'TOTAL');
  const items = data.filter(b => b.category !== 'TOTAL');

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card">
          <span className="stat-label">Total Budget</span>
          <div className="stat-value text-foreground">${total?.budgetAmount.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Actual</span>
          <div className="stat-value text-primary">${total?.actualAmount.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Variance</span>
          <div className="stat-value text-success">
            ${((total?.budgetAmount || 0) - (total?.actualAmount || 0)).toLocaleString()}
            <span className="text-xs ml-1 text-muted-foreground">under budget</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Budget vs Actual — February 2026</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {['Category', 'Budget', 'Actual', 'Variance', 'Variance %', 'Status'].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((b, i) => {
              const variance = b.budgetAmount - b.actualAmount;
              const variancePct = b.budgetAmount > 0 ? ((variance / b.budgetAmount) * 100).toFixed(1) : '0';
              const isOver = variance < 0;
              return (
                <tr key={b.id} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                  <td className="py-3 px-3 font-medium">{EXPENSE_CATEGORY_LABELS[b.category as ExpenseCategory] || b.category}</td>
                  <td className="py-3 px-3 text-muted-foreground">${b.budgetAmount.toLocaleString()}</td>
                  <td className="py-3 px-3 font-semibold text-primary">${b.actualAmount.toLocaleString()}</td>
                  <td className={`py-3 px-3 font-semibold ${isOver ? 'text-destructive' : 'text-success'}`}>
                    {isOver ? '-' : '+'}${Math.abs(variance).toLocaleString()}
                  </td>
                  <td className={`py-3 px-3 ${isOver ? 'text-destructive' : 'text-success'}`}>{variancePct}%</td>
                  <td className="py-3 px-3">
                    <span className={`pill ${isOver ? 'pill-error' : 'pill-published'}`}>{isOver ? 'Over' : 'Under'}</span>
                  </td>
                </tr>
              );
            })}
            <tr className="border-t-2 border-border font-bold">
              <td className="py-3 px-3">Total</td>
              <td className="py-3 px-3">${total?.budgetAmount.toLocaleString()}</td>
              <td className="py-3 px-3 text-primary">${total?.actualAmount.toLocaleString()}</td>
              <td className="py-3 px-3 text-success">+${((total?.budgetAmount || 0) - (total?.actualAmount || 0)).toLocaleString()}</td>
              <td className="py-3 px-3 text-success">{total ? ((1 - total.actualAmount / total.budgetAmount) * 100).toFixed(1) : 0}%</td>
              <td className="py-3 px-3"><span className="pill pill-published">Under</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Visual bars */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Budget Utilization</h3>
        <div className="space-y-3">
          {items.map(b => {
            const pct = b.budgetAmount > 0 ? Math.min((b.actualAmount / b.budgetAmount) * 100, 150) : 0;
            const isOver = b.actualAmount > b.budgetAmount;
            return (
              <div key={b.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{EXPENSE_CATEGORY_LABELS[b.category as ExpenseCategory]}</span>
                  <span>${b.actualAmount} / ${b.budgetAmount} ({pct.toFixed(0)}%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all ${isOver ? 'bg-destructive' : pct > 80 ? 'bg-warning' : 'bg-primary'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}