import { channels, editorAllocations, salaryPayments } from '@/data/mockData';

const month = '2026-02';

export default function EditorsPayroll() {
  const editors = channels.map(ch => ({
    name: ch.team.editorName,
    email: ch.team.editorEmail,
    salary: ch.team.editorSalary,
    currency: ch.team.salaryCurrency,
    channelName: ch.name,
    channelId: ch.id,
    status: ch.status,
  }));

  const allocations = editorAllocations.filter(a => a.month === month);
  const payments = salaryPayments.filter(s => s.month === month);
  const totalAllocated = allocations.reduce((s, a) => s + a.allocatedAmount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card"><span className="stat-label">Total Editors</span><div className="stat-value text-foreground">{editors.length}</div></div>
        <div className="stat-card"><span className="stat-label">Total Allocated (USD)</span><div className="stat-value text-primary">${totalAllocated.toLocaleString()}</div></div>
        <div className="stat-card"><span className="stat-label">Fully Paid</span><div className="stat-value text-success">{payments.filter(p => p.paid).length}/{payments.length}</div></div>
      </div>

      {/* Editors Table */}
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Editors — February 2026</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Editor', 'Email', 'Channel', 'Salary', 'Currency', 'Allocated (USD)', 'Allocation %', 'Payment Status'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {editors.map((ed, i) => {
              const alloc = allocations.find(a => a.editorName === ed.name);
              const payment = payments.find(p => p.editorName === ed.name);
              return (
                <tr key={i} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                  <td className="py-3 px-3 font-medium">{ed.name}</td>
                  <td className="py-3 px-3 text-xs text-muted-foreground">{ed.email}</td>
                  <td className="py-3 px-3">{ed.channelName}</td>
                  <td className="py-3 px-3 font-semibold">{ed.salary.toLocaleString()}</td>
                  <td className="py-3 px-3 text-muted-foreground">{ed.currency}</td>
                  <td className="py-3 px-3 font-semibold text-primary">${alloc?.allocatedAmount.toLocaleString() || '—'}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${(alloc?.allocationPercent || 0) === 100 ? 'bg-success' : 'bg-warning'}`} style={{ width: `${alloc?.allocationPercent || 0}%` }} />
                      </div>
                      <span className="text-xs">{alloc?.allocationPercent || 0}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    {payment?.paid
                      ? <span className="pill pill-published">Paid</span>
                      : <span className="pill pill-queued">Pending</span>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Allocation Rules */}
      <div className="stat-card p-4 bg-muted/10 border-dashed">
        <h4 className="text-sm font-semibold mb-2">Allocation Rules</h4>
        <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
          <li>Each editor's allocation across channels must sum to 100%</li>
          <li>System auto-generates derived expense lines per channel</li>
          <li>Cannot close month if any editor allocation ≠ 100%</li>
          <li>PKR converted at 280 PKR/USD, AED at 3.67 AED/USD</li>
        </ul>
      </div>
    </div>
  );
}