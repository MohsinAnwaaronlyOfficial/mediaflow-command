import { useEffect, useState, useMemo } from 'react';
import { ArrowUp, ArrowDown, Activity, Video, DollarSign } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useRoleStore } from '@/stores/roleStore';
import { channelsApi } from '@/api/channels';
import { SkeletonStats, SkeletonCard } from '@/components/shared/SkeletonCard';
import TierBadge from '@/components/shared/TierBadge';
import type { Channel, VideoItem, ActivityItem } from '@/types';
import { channels as fallbackChannels, videoQueue as fallbackQueue, activityFeed as fallbackFeed, generateViewsData, channelColors, managerChannels } from '@/data/mockData';

function StatCard({ label, value, change, positive, icon: Icon, color }: {
  label: string; value: string; change: string; positive: boolean; icon: React.ElementType; color: string;
}) {
  return (
    <div className="stat-card group">
      <div className="flex items-center justify-between mb-2">
        <span className="stat-label">{label}</span>
        <div className={`w-9 h-9 rounded-lg ${color} bg-opacity-10 flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
      </div>
      <div className="stat-value animate-count-up">{value}</div>
      <div className="flex items-center gap-1 mt-1">
        {positive ? <ArrowUp className="w-3 h-3 text-success" /> : <ArrowDown className="w-3 h-3 text-destructive" />}
        <span className={`text-xs ${positive ? 'text-success' : 'text-destructive'}`}>{change}</span>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ dataKey: string; color: string; value: number }>; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.slice(0, 4).map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-foreground">{p.dataKey}: {p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default function Overview() {
  const { role } = useRoleStore();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [videoQueue, setVideoQueue] = useState<VideoItem[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [chRes, vqRes] = await Promise.all([
          channelsApi.getChannels(),
          channelsApi.getVideoQueue(),
        ]);
        setChannels(chRes.data);
        setVideoQueue(vqRes.data);
        setActivity([]);
      } catch {
        // Fallback to local data
        setChannels(fallbackChannels);
        setVideoQueue(fallbackQueue);
        setActivity(fallbackFeed);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const visibleChannels = role === 'manager'
    ? channels.filter(c => managerChannels.includes(c.id))
    : channels;

  const activeCount = visibleChannels.filter(c => c.status === 'active').length;
  const totalRevenue = visibleChannels.reduce((s, c) => s + (c.monthRevenue || 0), 0);
  const todayVideos = videoQueue.filter(v => v.status === 'PUBLISHED').length;
  const publishing = videoQueue.filter(v => v.status === 'UPLOADING').length;
  const allHealthy = visibleChannels.every(c => c.status === 'active');
  const viewsData = useMemo(() => generateViewsData(30), []);

  const pipelineStages = [
    { label: 'DETECTED', count: videoQueue.filter(v => v.status === 'DETECTED').length, color: 'text-muted-foreground', icon: '📥' },
    { label: 'DOWNLOADING', count: videoQueue.filter(v => v.status === 'DOWNLOADING').length, color: 'text-secondary', icon: '⬇️' },
    { label: 'UPLOADING', count: videoQueue.filter(v => v.status === 'UPLOADING').length, color: 'text-primary', icon: '⬆️' },
    { label: 'UNLISTED', count: videoQueue.filter(v => v.status === 'UNLISTED').length, color: 'text-[hsl(280,60%,70%)]', icon: '🔒' },
    { label: 'SCHEDULED', count: videoQueue.filter(v => v.status === 'SCHEDULED').length, color: 'text-warning', icon: '📅' },
    { label: 'PUBLISHED', count: videoQueue.filter(v => v.status === 'PUBLISHED').length, color: 'text-success', icon: '✅' },
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-slide-up">
        <SkeletonStats count={4} />
        <SkeletonCard />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><SkeletonCard /></div>
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Channels" value={`${activeCount} / ${visibleChannels.length}`} change="↑ 2 this week" positive icon={Activity} color="text-primary" />
        <StatCard label="Videos Today" value={`${todayVideos} uploaded`} change={`${publishing} publishing`} positive icon={Video} color="text-success" />
        <StatCard label="Month Revenue" value={`$${totalRevenue.toLocaleString()}`} change="↑ 12% vs last" positive icon={DollarSign} color="text-primary" />
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <span className="stat-label">System Status</span>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${allHealthy ? 'bg-success/10' : 'bg-destructive/10'}`}>
              <Activity className={`w-4 h-4 ${allHealthy ? 'text-success' : 'text-destructive'}`} />
            </div>
          </div>
          <div className={`stat-value ${allHealthy ? 'text-success' : 'text-destructive'}`}>
            {allHealthy ? '✅ ALL GREEN' : '⚠️ ISSUES'}
          </div>
          <span className="text-xs text-muted-foreground">{activeCount}/{visibleChannels.length} healthy</span>
        </div>
      </div>

      {/* Upload Pipeline */}
      <NavLink to="/pipeline" className="block">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Upload Pipeline</h3>
            <span className="flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success text-[10px] font-semibold rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" /> Live
            </span>
          </div>
          <div className="flex items-center gap-1">
            {pipelineStages.map((stage, i) => (
              <div key={stage.label} className="flex items-center gap-1 flex-1">
                <div className="flex-1 text-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className={`text-2xl font-bold ${stage.color}`}>{stage.count}</div>
                  <div className="text-[10px] text-muted-foreground uppercase mt-1">{stage.label}</div>
                </div>
                {i < pipelineStages.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
              </div>
            ))}
          </div>
        </div>
      </NavLink>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Channel Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Live Channel Monitor</h2>
            <span className="flex items-center gap-1.5 px-2 py-1 bg-muted/30 rounded-full text-[10px] text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" /> Auto-refreshes every 60s
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
            {visibleChannels.map(ch => (
              <NavLink key={ch.id} to="/channels" className="stat-card hover:border-primary/40 transition-all group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TierBadge tier={ch.tier} />
                    <span className="font-semibold text-xs truncate">{ch.id}</span>
                  </div>
                  <span className={`flex items-center gap-1 text-[10px] font-semibold ${
                    ch.status === 'active' ? 'text-success' : ch.status === 'error' ? 'text-destructive' : 'text-warning'
                  }`}>
                    <span className={`status-dot ${ch.status === 'active' ? 'status-dot-online' : ch.status === 'error' ? 'status-dot-error' : 'status-dot-warning'}`} />
                    {ch.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mb-2">{ch.niche}</p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] border-t border-border pt-2">
                  <div className="flex items-center gap-1"><span className="text-muted-foreground">🔐 Login</span><span className={ch.youtubeLogin ? 'text-success' : 'text-destructive'}>{ch.youtubeLogin ? '✅' : '❌'}</span></div>
                  <div className="flex items-center gap-1"><span className="text-muted-foreground">🌐 Proxy</span><span className={ch.proxyHealth ? 'text-success' : 'text-destructive'}>{ch.proxyHealth ? '✅' : '❌'}</span></div>
                  <div className="flex items-center gap-1"><span className="text-muted-foreground">📁 Drive</span><span className={ch.driveAccess ? 'text-success' : 'text-destructive'}>{ch.driveAccess ? '✅' : '❌'}</span></div>
                  <div className="flex items-center gap-1"><span className="text-muted-foreground">📊 Sheet</span><span className={ch.sheetAccess ? 'text-success' : 'text-destructive'}>{ch.sheetAccess ? '✅' : '❌'}</span></div>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] border-t border-border pt-2 mt-2">
                  <div><span className="text-muted-foreground">Queue:</span> <span className="font-semibold">{ch.uploadQueue} pending</span></div>
                  <div><span className="text-muted-foreground">Published:</span> <span className="font-semibold">{ch.totalPublished}</span></div>
                  <div><span className="text-muted-foreground">Rev:</span> <span className="font-semibold text-primary">${ch.monthRevenue}</span></div>
                  <div><span className="text-muted-foreground">Views:</span> <span className="font-semibold">{((ch.monthViews || 0) / 1000).toFixed(0)}K</span></div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="stat-card h-fit">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Today's Activity</h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto scrollbar-thin">
            {activity.length > 0 ? activity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
                <span className="text-sm shrink-0">{item.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-foreground leading-relaxed">{item.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            )) : (
              <p className="text-xs text-muted-foreground text-center py-4">Activity will appear here from API</p>
            )}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Revenue — Last 30 Days</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={viewsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 45% 22%)" />
            <XAxis dataKey="date" tick={{ fill: 'hsl(210 18% 60%)', fontSize: 10 }} tickLine={false} />
            <YAxis tick={{ fill: 'hsl(210 18% 60%)', fontSize: 10 }} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            {visibleChannels.filter(c => c.status === 'active').slice(0, 6).map(ch => (
              <Line key={ch.name} type="monotone" dataKey={ch.name} stroke={channelColors[ch.name]} strokeWidth={1.5} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
