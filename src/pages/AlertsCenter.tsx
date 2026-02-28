import { alerts, resolvedAlerts } from '@/data/mockData';
import { AlertTriangle, XCircle, Info, CheckCircle } from 'lucide-react';

const severityConfig = {
  critical: { icon: XCircle, bg: 'bg-destructive/10', border: 'border-destructive/30', text: 'text-destructive', label: 'CRITICAL' },
  warning: { icon: AlertTriangle, bg: 'bg-warning/10', border: 'border-warning/30', text: 'text-warning', label: 'WARNING' },
  info: { icon: Info, bg: 'bg-secondary/20', border: 'border-secondary/30', text: 'text-[hsl(210,80%,70%)]', label: 'INFO' },
};

export default function AlertsCenter() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold">Alerts Center</h1>
        <p className="text-sm text-muted-foreground">{alerts.length} active alerts</p>
      </div>

      {/* Active Alerts */}
      <div className="space-y-3">
        {alerts.map(alert => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          return (
            <div key={alert.id} className={`stat-card ${config.bg} border ${config.border} !border`}>
              <div className="flex items-start gap-4">
                <Icon className={`w-5 h-5 ${config.text} shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold ${config.text} uppercase`}>{config.label}</span>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{alert.title}</h3>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:scale-[1.02] transition-transform">
                    {alert.action}
                  </button>
                  <button className="px-3 py-1.5 bg-muted text-muted-foreground rounded-lg text-xs font-semibold hover:bg-muted/80 transition-colors">
                    Resolve
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alert History */}
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Alert History (Resolved)</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['','Alert','Resolved At','Resolution Time'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {resolvedAlerts.map((a, i) => (
              <tr key={a.id} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-3"><CheckCircle className="w-4 h-4 text-success" /></td>
                <td className="py-3 px-3 font-medium">{a.title}</td>
                <td className="py-3 px-3 text-muted-foreground">{a.resolvedAt}</td>
                <td className="py-3 px-3 text-muted-foreground">{a.resolutionTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
