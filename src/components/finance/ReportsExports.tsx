import { Download, FileText } from 'lucide-react';
import { monthStatuses } from '@/data/mockData';

const reports = [
  { name: 'Company P&L Statement', description: 'Complete income statement with revenue, expenses, and net profit', format: 'CSV' },
  { name: 'Channel P&L Report', description: 'Profit/loss breakdown per channel with partner splits', format: 'CSV' },
  { name: 'Partner Earnings Report', description: 'Monthly earnings per partner from channel partnerships', format: 'CSV' },
  { name: 'Expense Ledger', description: 'All expense entries with categories, types, and vendors', format: 'CSV' },
  { name: 'Revenue Ledger', description: 'All revenue entries by channel and source', format: 'CSV' },
  { name: 'Editor Payroll Report', description: 'Editor salaries, allocations, and payment status', format: 'CSV' },
  { name: 'Budget vs Actual', description: 'Budget utilization report with variance analysis', format: 'CSV' },
];

export default function ReportsExports() {
  return (
    <div className="space-y-6">
      {/* Month Status */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Month Status</h3>
        <div className="grid grid-cols-3 gap-4">
          {monthStatuses.map(ms => (
            <div key={ms.month} className={`p-4 rounded-lg border ${ms.isClosed ? 'bg-success/5 border-success/20' : 'bg-warning/5 border-warning/20'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{ms.month}</span>
                <span className={`pill ${ms.isClosed ? 'pill-published' : 'pill-queued'}`}>{ms.isClosed ? 'Closed' : 'Open'}</span>
              </div>
              {ms.isClosed ? (
                <p className="text-xs text-muted-foreground">Closed by {ms.closedBy} on {ms.closedAt}</p>
              ) : (
                <button className="text-xs px-3 py-1.5 bg-warning text-warning-foreground rounded-lg font-semibold hover:scale-[1.02] transition-transform mt-1">
                  Close Month
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Export Reports */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Available Reports</h3>
        <div className="space-y-3">
          {reports.map(report => (
            <div key={report.name} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-semibold">{report.name}</h4>
                  <p className="text-xs text-muted-foreground">{report.description}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg text-xs font-semibold hover:bg-primary/30 transition-colors">
                <Download className="w-3.5 h-3.5" /> Export {report.format}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Notes */}
      <div className="stat-card p-4 bg-muted/10 border-dashed">
        <h4 className="text-sm font-semibold mb-2">Audit & Controls</h4>
        <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
          <li>Closed months cannot be edited except by Admin</li>
          <li>All derived allocations are traceable to base records</li>
          <li>Revision history tracks who changed what</li>
          <li>No negative amounts unless refund/chargeback type</li>
        </ul>
      </div>
    </div>
  );
}