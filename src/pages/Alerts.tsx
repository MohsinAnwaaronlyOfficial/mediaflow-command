import { useState } from 'react';
import { alerts, resolvedAlerts } from '@/data/mockData';
import { AlertTriangle, XCircle, Info, CheckCircle, Bell, X } from 'lucide-react';

const severityConfig = {
  critical: { icon: XCircle, bg: 'bg-destructive/10', border: 'border-destructive/30', text: 'text-destructive', label: 'CRITICAL' },
  warning: { icon: AlertTriangle, bg: 'bg-warning/10', border: 'border-warning/30', text: 'text-warning', label: 'WARNING' },
  info: { icon: Info, bg: 'bg-secondary/20', border: 'border-secondary/30', text: 'text-[hsl(210,80%,70%)]', label: 'INFO' },
};

const slackChannels = [
  { name: '#uploads', connected: true, messages: 8 },
  { name: '#errors', connected: true, messages: 1 },
  { name: '#reports', connected: true, messages: 1 },
  { name: '#finance', connected: true, messages: 0 },
  { name: '#alerts', connected: true, messages: 3 },
  { name: '#health', connected: false, messages: 0 },
];

export default function Alerts() {
  const [filter, setFilter] = useState('all');
  const [dismissed, setDismissed] = useState<string[]>([]);

  const filteredAlerts = alerts.filter(a => {
    if (dismissed.includes(a.id)) return false;
    if (filter === 'all') return true;
    if (filter === 'errors') return a.severity === 'critical';
    if (filter === 'warnings') return a.severity === 'warning';
    if (filter === 'info') return a.severity === 'info';
    if (a.type && filter === a.type) return true;
    return false;
  });

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Alerts Center</h1>
          <p className="text-sm text-muted-foreground">{alerts.length - dismissed.length} active alerts</p>
        </div>
        <button onClick={() => setDismissed(alerts.map(a => a.id))} className="px-3 py-1.5 bg-muted text-muted-foreground rounded-lg text-xs font-semibold hover:bg-muted/80">
          Dismiss All
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', 'errors', 'warnings', 'info', 'upload', 'health', 'finance'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Active Alerts */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="stat-card text-center py-12">
            <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No alerts to show</p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;
            return (
              <div key={alert.id} className={`stat-card ${config.bg} border ${config.border} !border`}>
                <div className="flex items-start gap-4">
                  <Icon className={`w-5 h-5 ${config.text} shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold ${config.text} uppercase`}>{config.label}</span>
                      {alert.channel && <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">{alert.channel}</span>}
                      <span className="text-[10px] text-muted-foreground ml-auto">{alert.time}</span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{alert.title}</h3>
                    <p className="text-xs text-muted-foreground">{alert.description}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:scale-[1.02] transition-transform">
                      {alert.action}
                    </button>
                    <button onClick={() => setDismissed([...dismissed, alert.id])} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Slack Channels */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Slack Channels</h3>
          <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-xs font-semibold">Test All Channels</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {slackChannels.map(s => (
            <div key={s.name} className="stat-card !p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className={`status-dot ${s.connected ? 'status-dot-online' : 'status-dot-error'}`} />
                <span className="text-xs font-semibold">{s.name}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{s.connected ? `● Connected • ↑ ${s.messages} today` : '● Disconnected'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resolved History */}
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
