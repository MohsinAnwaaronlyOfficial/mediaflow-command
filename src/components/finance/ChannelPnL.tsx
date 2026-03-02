import { channels, revenueEntries, expenseEntries, channelPartnerships } from '@/data/mockData';
import { useState } from 'react';

const month = '2026-02';

export default function ChannelPnL() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const channelData = channels.map(ch => {
    const revenue = revenueEntries.filter(r => r.month === month && r.channelId === ch.id).reduce((s, r) => s + r.amount, 0);
    const directExp = expenseEntries.filter(e => e.month === month && e.channelId === ch.id).reduce((s, e) => s + e.amount, 0);
    const partnership = channelPartnerships.find(p => p.channelId === ch.id && !p.endMonth);
    const netProfit = revenue - directExp;
    const partnerEarning = partnership ? (partnership.partnerSharePercent / 100) * netProfit : 0;
    const companyEarning = partnership ? (partnership.companySharePercent / 100) * netProfit : netProfit;

    return {
      ...ch,
      revenue,
      directExpenses: directExp,
      netProfit,
      partnership,
      partnerEarning: Math.max(0, partnerEarning),
      companyEarning: Math.max(0, companyEarning),
    };
  });

  const selected = selectedChannel ? channelData.find(c => c.id === selectedChannel) : null;
  const selectedExpenses = selectedChannel ? expenseEntries.filter(e => e.month === month && e.channelId === selectedChannel) : [];
  const selectedRevenues = selectedChannel ? revenueEntries.filter(r => r.month === month && r.channelId === selectedChannel) : [];

  return (
    <div className="space-y-6">
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Channel P&L — February 2026</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Channel', 'Revenue', 'Direct Expenses', 'Net Profit', 'Partner Split', 'Company Share', 'Partner Share'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {channelData.map((ch, i) => (
              <tr key={ch.id}
                className={`table-row-hover border-b border-border/50 cursor-pointer ${i % 2 === 0 ? 'bg-background/20' : ''} ${selectedChannel === ch.id ? 'ring-1 ring-primary' : ''}`}
                onClick={() => setSelectedChannel(selectedChannel === ch.id ? null : ch.id)}
              >
                <td className="py-3 px-3 font-medium">{ch.name}</td>
                <td className="py-3 px-3 text-success font-semibold">${ch.revenue.toLocaleString()}</td>
                <td className="py-3 px-3 text-destructive">${ch.directExpenses.toLocaleString()}</td>
                <td className={`py-3 px-3 font-bold ${ch.netProfit >= 0 ? 'text-success' : 'text-destructive'}`}>${ch.netProfit.toLocaleString()}</td>
                <td className="py-3 px-3 text-xs text-muted-foreground">
                  {ch.partnership ? `${ch.partnership.partnerName} ${ch.partnership.partnerSharePercent}% / Co ${ch.partnership.companySharePercent}%` : '100% Company'}
                </td>
                <td className="py-3 px-3 font-semibold text-primary">${ch.companyEarning.toLocaleString()}</td>
                <td className="py-3 px-3 text-warning">${ch.partnerEarning.toLocaleString()}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-border font-bold">
              <td className="py-3 px-3">Total</td>
              <td className="py-3 px-3 text-success">${channelData.reduce((s, c) => s + c.revenue, 0).toLocaleString()}</td>
              <td className="py-3 px-3 text-destructive">${channelData.reduce((s, c) => s + c.directExpenses, 0).toLocaleString()}</td>
              <td className="py-3 px-3 text-success">${channelData.reduce((s, c) => s + c.netProfit, 0).toLocaleString()}</td>
              <td></td>
              <td className="py-3 px-3 text-primary">${channelData.reduce((s, c) => s + c.companyEarning, 0).toLocaleString()}</td>
              <td className="py-3 px-3 text-warning">${channelData.reduce((s, c) => s + c.partnerEarning, 0).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Drill-down */}
      {selected && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="stat-card">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{selected.name} — Revenue Ledger</h3>
            <div className="space-y-2">
              {selectedRevenues.map(r => (
                <div key={r.id} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg text-xs">
                  <span className="pill pill-published">{r.source}</span>
                  <span className="font-semibold text-success">${r.amount.toLocaleString()}</span>
                  <span className="text-muted-foreground">{r.notes || '—'}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="stat-card">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{selected.name} — Expense Ledger</h3>
            <div className="space-y-2">
              {selectedExpenses.map(e => (
                <div key={e.id} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg text-xs">
                  <span>{e.vendor}</span>
                  <span className="font-semibold text-destructive">${e.amount.toLocaleString()}</span>
                  <span className="text-muted-foreground">{e.notes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}