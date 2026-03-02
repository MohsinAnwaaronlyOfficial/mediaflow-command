import { partners, channelPartnerships, revenueEntries, expenseEntries } from '@/data/mockData';

const month = '2026-02';

export default function PartnerEarnings() {
  const partnerData = partners.map(p => {
    const partnerships = channelPartnerships.filter(cp => cp.partnerId === p.id && !cp.endMonth);
    const earnings = partnerships.map(cp => {
      const revenue = revenueEntries.filter(r => r.month === month && r.channelId === cp.channelId).reduce((s, r) => s + r.amount, 0);
      const expenses = expenseEntries.filter(e => e.month === month && e.channelId === cp.channelId).reduce((s, e) => s + e.amount, 0);
      const netProfit = revenue - expenses;
      const earning = (cp.partnerSharePercent / 100) * Math.max(0, netProfit);
      return { channelName: cp.channelName, sharePercent: cp.partnerSharePercent, netProfit, earning };
    });
    const totalEarning = earnings.reduce((s, e) => s + e.earning, 0);
    return { ...p, partnerships, earnings, totalEarning };
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {partnerData.map(p => (
          <div key={p.id} className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{p.name[0]}</span>
              </div>
              <div>
                <span className="text-sm font-semibold">{p.name}</span>
                <p className="text-xs text-muted-foreground">{p.title}</p>
              </div>
            </div>
            <div className="stat-value text-warning">${p.totalEarning.toLocaleString()}</div>
            <span className="text-xs text-muted-foreground">Feb 2026 earnings</span>
          </div>
        ))}
      </div>

      {/* Detail per partner */}
      {partnerData.filter(p => p.earnings.length > 0 && p.totalEarning > 0).map(p => (
        <div key={p.id} className="stat-card">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{p.name} — Channel Earnings Breakdown</h3>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              {['Channel', 'Share %', 'Channel Net Profit', 'Partner Earning'].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {p.earnings.map((e, i) => (
                <tr key={e.channelName} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                  <td className="py-3 px-3 font-medium">{e.channelName}</td>
                  <td className="py-3 px-3 text-muted-foreground">{e.sharePercent}%</td>
                  <td className={`py-3 px-3 ${e.netProfit >= 0 ? 'text-success' : 'text-destructive'}`}>${e.netProfit.toLocaleString()}</td>
                  <td className="py-3 px-3 font-semibold text-warning">${e.earning.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-border font-bold">
                <td className="py-3 px-3">Total</td>
                <td></td>
                <td></td>
                <td className="py-3 px-3 text-warning">${p.totalEarning.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      <div className="stat-card p-4 bg-muted/10 border-dashed">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> Partner earnings are based on <em>ChannelNetProfit × PartnerShare%</em>. Equity-based dividends are tracked separately (future module).
        </p>
      </div>
    </div>
  );
}