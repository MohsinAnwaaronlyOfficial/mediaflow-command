import { 
  ArrowUp, ArrowDown, Eye, UserPlus, Video, DollarSign, Activity,
  Upload, Pause, OctagonX, RefreshCw, AlertTriangle, XCircle, Info, Zap, Flame
} from 'lucide-react';
import { channels, activityFeed, alerts } from '@/data/mockData';
import { useRoleStore } from '@/stores/roleStore';
import { managerChannels } from '@/data/mockData';

function StatCard({ label, value, change, positive, icon: Icon, color }: {
  label: string; value: string; change: string; positive: boolean; icon: any; color: string;
}) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-2">
        <span className="stat-label">{label}</span>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className={`stat-value ${color}`}>{value}</div>
      <div className="flex items-center gap-1 mt-1">
        {positive ? <ArrowUp className="w-3 h-3 text-success" /> : <ArrowDown className="w-3 h-3 text-destructive" />}
        <span className={`text-xs ${positive ? 'text-success' : 'text-destructive'}`}>{change} vs yesterday</span>
      </div>
    </div>
  );
}

function SystemHealthBar() {
  const items = [
    { label: 'VPS CPU', value: '34%', status: 'green' },
    { label: 'RAM', value: '67%', status: 'yellow' },
    { label: 'Disk', value: '45%', status: 'green' },
    { label: 'PostgreSQL', value: 'ONLINE', status: 'green' },
    { label: 'Redis', value: 'ONLINE', status: 'green' },
    { label: 'IXBrowser', value: 'ONLINE', status: 'green' },
  ];
  return (
    <div className="stat-card flex flex-wrap items-center gap-4">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">System Health</span>
      {items.map(item => (
        <div key={item.label} className="flex items-center gap-2">
          <span className={`status-dot ${item.status === 'green' ? 'status-dot-online' : item.status === 'yellow' ? 'status-dot-warning' : 'status-dot-error'}`} />
          <span className="text-xs text-muted-foreground">{item.label}</span>
          <span className="text-xs font-semibold text-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const cls = tier === 'T1' ? 'badge-t1' : tier === 'T2' ? 'badge-t2' : tier === 'T3' ? 'badge-t3' : 'badge-t4';
  return <span className={`${cls} rounded-full px-2 py-0.5 text-xs font-bold`}>{tier}</span>;
}

export default function CommandCenter() {
  const { role } = useRoleStore();
  const visibleChannels = role === 'manager' 
    ? channels.filter(c => managerChannels.includes(c.id)) 
    : channels;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
          <p className="text-sm text-muted-foreground">Real-time overview of all operations</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-dot-online" />
          <span className="text-xs text-muted-foreground">All systems operational</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard label="Total Views Today" value="847,293" change="+12.4%" positive icon={Eye} color="text-secondary" />
        <StatCard label="Subs Gained" value="1,247" change="+8.2%" positive icon={UserPlus} color="text-success" />
        <StatCard label="Videos Published" value="8" change="+2" positive icon={Video} color="text-foreground" />
        <StatCard label="Revenue Today" value="$342.50" change="+15.7%" positive icon={DollarSign} color="text-primary" />
        <StatCard label="Active Sessions" value="3" change="-1" positive={false} icon={Activity} color="text-warning" />
      </div>

      {/* System Health */}
      <SystemHealthBar />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Channel Grid */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Channels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {visibleChannels.map(ch => (
              <div key={ch.id} className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`status-dot ${ch.status === 'active' ? 'status-dot-online' : ch.status === 'error' ? 'status-dot-error' : 'status-dot-offline'}`} />
                    <span className="font-semibold text-sm">{ch.name}</span>
                  </div>
                  <TierBadge tier={ch.tier} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-muted-foreground">Views today</span><div className="font-bold text-foreground">{ch.todayViews.toLocaleString()}</div></div>
                  <div><span className="text-muted-foreground">Subscribers</span><div className="font-bold text-foreground">{ch.subscribers.toLocaleString()}</div></div>
                  <div><span className="text-muted-foreground">Queue</span><div className="font-bold text-foreground">{ch.uploadQueue} videos</div></div>
                  <div><span className="text-muted-foreground">Today</span><div className="font-bold text-foreground">{ch.videosToday}/{ch.dailyLimit}</div></div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
              <Upload className="w-4 h-4" /> Upload Now
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
              <Pause className="w-4 h-4" /> Pause All
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
              <OctagonX className="w-4 h-4" /> Emergency Stop
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
              <RefreshCw className="w-4 h-4" /> Sync Sheets
            </button>
          </div>

          {/* Alerts */}
          <div className="stat-card space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Alerts</h3>
            {alerts.slice(0, 3).map(alert => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                {alert.severity === 'critical' ? <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" /> 
                  : alert.severity === 'warning' ? <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" /> 
                  : <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="stat-card h-fit">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Live Activity</h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin">
            {activityFeed.map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  item.type === 'publish' ? 'bg-success' : item.type === 'upload' ? 'bg-primary' : item.type === 'error' ? 'bg-destructive' : 'bg-muted-foreground'
                }`} />
                <div>
                  <p className="text-sm text-foreground">{item.message}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
