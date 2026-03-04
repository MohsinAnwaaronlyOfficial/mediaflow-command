import { useState, useMemo } from 'react';
import { generateViewsData, generateSubsData, topVideos, channelColors, channels } from '@/data/mockData';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Flame, TrendingUp, Trophy, Target, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const chartTheme = { grid: 'hsl(216 45% 22%)', text: 'hsl(210 18% 60%)' };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-foreground">{p.dataKey}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  );
};

const abTestData = [
  { channel: 'Bench Report', video: 'Judge Rules Against...', titleA: 'Judge Rules Against Landlord', titleB: 'Shocking Ruling Stuns Court', winner: 'B', ctrA: 5.2, ctrB: 8.1, viewsA: 12400, viewsB: 32100 },
  { channel: 'Tech Vault', video: 'AI Robot Takes Over...', titleA: 'AI Robot Takes Over Factory', titleB: 'Workers React to AI Takeover', winner: 'A', ctrA: 7.1, ctrB: 5.8, viewsA: 28900, viewsB: 18200 },
  { channel: 'Verdict Vault', video: 'Judge Explodes...', titleA: 'Judge Explodes at Defendant', titleB: 'Courtroom Erupts in Chaos', winner: 'B', ctrA: 4.9, ctrB: 6.7, viewsA: 8600, viewsB: 19200 },
];

const competitors = [
  { name: 'Court Cam Official', subs: 2400000, recentVideo: 'Most Dramatic Arrests', uploadFreq: '5/week', estViews: '500K avg', niche: 'Judge/Courtroom' },
  { name: 'Judge Judy Cases', subs: 890000, recentVideo: 'Judge Judy Destroys Scammer', uploadFreq: '3/week', estViews: '200K avg', niche: 'Judge/Courtroom' },
  { name: 'Tech World', subs: 1200000, recentVideo: 'iPhone 17 Leak', uploadFreq: '7/week', estViews: '300K avg', niche: 'Technology' },
];

const trendingKeywords = [
  { keyword: 'judge courtroom', score: 95, trend: 'up', niches: ['Judge/Courtroom'] },
  { keyword: 'ai replacement', score: 88, trend: 'up', niches: ['Technology'] },
  { keyword: 'food challenge', score: 72, trend: 'down', niches: ['Food'] },
  { keyword: 'stock crash 2026', score: 91, trend: 'up', niches: ['Finance'] },
  { keyword: 'viral prank', score: 65, trend: 'stable', niches: ['Comedy'] },
  { keyword: 'last minute goal', score: 78, trend: 'up', niches: ['Sports'] },
];

export default function Analytics() {
  const [period, setPeriod] = useState(30);
  const [selectedChannel, setSelectedChannel] = useState('all');
  const viewsData = useMemo(() => generateViewsData(period), [period]);
  const subsData = useMemo(() => generateSubsData(period), [period]);
  const channelNames = channels.filter(c => c.status === 'active').map(c => c.name);
  const visibleChannels = selectedChannel === 'all' ? channelNames : [selectedChannel];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm text-muted-foreground">Performance metrics across all channels</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={selectedChannel} onChange={e => setSelectedChannel(e.target.value)}
            className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-foreground">
            <option value="all">All Channels</option>
            {channelNames.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <div className="flex bg-card border border-border rounded-lg overflow-hidden">
            {[{ label: '7D', days: 7 }, { label: '30D', days: 30 }, { label: '90D', days: 90 }].map(p => (
              <button key={p.label} onClick={() => setPeriod(p.days)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${period === p.days ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="bg-muted/30 h-auto p-1 flex-wrap gap-0.5">
          <TabsTrigger value="overview" className="text-xs py-1.5">Overview</TabsTrigger>
          <TabsTrigger value="channels" className="text-xs py-1.5">Channel Performance</TabsTrigger>
          <TabsTrigger value="abtesting" className="text-xs py-1.5">A/B Testing</TabsTrigger>
          <TabsTrigger value="competitors" className="text-xs py-1.5">Competitors</TabsTrigger>
          <TabsTrigger value="trends" className="text-xs py-1.5">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-4">
          <div className="stat-card">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Views Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                <XAxis dataKey="date" tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} />
                <YAxis tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                {visibleChannels.slice(0, 6).map(name => (
                  <Line key={name} type="monotone" dataKey={name} stroke={channelColors[name]} strokeWidth={2} dot={false} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="stat-card">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Subscriber Gains</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={subsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                  <XAxis dataKey="date" tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  {visibleChannels.slice(0, 6).map(name => (
                    <Bar key={name} dataKey={name} stackId="a" fill={channelColors[name]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="stat-card">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={viewsData.map(d => ({ date: d.date, revenue: Math.floor(Object.values(d).filter(v => typeof v === 'number').reduce((s: number, v) => s + (v as number), 0) / 500) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                  <XAxis dataKey="date" tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} tickFormatter={v => `$${v}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(24 100% 39%)" fill="hsl(24 100% 39%)" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stat-card overflow-x-auto">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Top Videos</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                {['','Title','Channel','Views','CTR','Watch Time','Revenue'].map(h => (
                  <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {topVideos.map((v, i) => (
                  <tr key={i} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                    <td className="py-3 px-2">{v.viral && <Flame className="w-4 h-4 text-primary" />}</td>
                    <td className="py-3 px-2 font-medium max-w-[250px]">{v.title}</td>
                    <td className="py-3 px-2 text-muted-foreground">{v.channel}</td>
                    <td className="py-3 px-2 font-semibold">{v.views.toLocaleString()}</td>
                    <td className="py-3 px-2">{v.ctr}%</td>
                    <td className="py-3 px-2 text-muted-foreground">{v.watchTime}h</td>
                    <td className="py-3 px-2 text-primary font-semibold">${v.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6 mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {channels.filter(c => c.status === 'active').map(ch => (
              <div key={ch.id} className="stat-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">{ch.name}</span>
                  <span className={`text-xs font-bold ${ch.tier === 'T1' ? 'badge-t1' : ch.tier === 'T2' ? 'badge-t2' : 'badge-t3'} rounded-full px-2 py-0.5`}>{ch.tier}</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Views</span><span className="font-semibold">{ch.todayViews.toLocaleString()}/day</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Subscribers</span><span className="font-semibold">{ch.subscribers.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Revenue</span><span className="font-semibold text-primary">${ch.monthRevenue}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Published</span><span className="font-semibold">{ch.totalPublished}</span></div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Health</span><span>85%</span></div>
                  <Progress value={85} className="h-1.5" />
                </div>
              </div>
            ))}
          </div>

          <div className="stat-card">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> YPP Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[{ name: 'Game Time', subs: 15600, subTarget: 1000, hours: 3240, hourTarget: 4000 },
                { name: 'Beat Drop', subs: 8200, subTarget: 1000, hours: 890, hourTarget: 4000 }
              ].map(ch => (
                <div key={ch.name} className="space-y-3">
                  <div className="flex items-center justify-between"><span className="font-medium">{ch.name}</span><span className="text-xs text-warning">Not Monetized</span></div>
                  <div><div className="flex justify-between text-xs mb-1"><span>Subscribers</span><span>{ch.subs.toLocaleString()} / {ch.subTarget.toLocaleString()}</span></div><Progress value={Math.min(100, (ch.subs/ch.subTarget)*100)} className="h-2" /></div>
                  <div><div className="flex justify-between text-xs mb-1"><span>Watch Hours</span><span>{ch.hours.toLocaleString()} / {ch.hourTarget.toLocaleString()}</span></div><Progress value={Math.min(100, (ch.hours/ch.hourTarget)*100)} className="h-2" /></div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="abtesting" className="space-y-6 mt-4">
          <div className="stat-card overflow-x-auto">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">A/B Test Results</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                {['Channel','Video','Title A','Title B','Winner','CTR A','CTR B','Views A','Views B'].map(h => (
                  <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {abTestData.map((test, i) => (
                  <tr key={i} className="table-row-hover border-b border-border/50">
                    <td className="py-3 px-2 font-medium">{test.channel}</td>
                    <td className="py-3 px-2 text-xs text-muted-foreground max-w-[120px] truncate">{test.video}</td>
                    <td className={`py-3 px-2 text-xs ${test.winner === 'A' ? 'text-success font-semibold' : ''}`}>{test.titleA}</td>
                    <td className={`py-3 px-2 text-xs ${test.winner === 'B' ? 'text-success font-semibold' : ''}`}>{test.titleB}</td>
                    <td className="py-3 px-2"><span className="flex items-center gap-1 text-success text-xs font-bold"><Trophy className="w-3 h-3" /> Variant {test.winner}</span></td>
                    <td className="py-3 px-2">{test.ctrA}%</td>
                    <td className="py-3 px-2">{test.ctrB}%</td>
                    <td className="py-3 px-2">{test.viewsA.toLocaleString()}</td>
                    <td className="py-3 px-2">{test.viewsB.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {competitors.map(c => (
              <div key={c.name} className="stat-card">
                <h4 className="font-semibold text-sm mb-1">{c.name}</h4>
                <p className="text-xs text-muted-foreground mb-3">{c.niche}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subscribers</span><span className="font-semibold">{(c.subs/1000000).toFixed(1)}M</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Upload Freq</span><span>{c.uploadFreq}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Est Views</span><span>{c.estViews}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Recent</span><span className="truncate max-w-[140px]">{c.recentVideo}</span></div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6 mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {trendingKeywords.map(t => (
              <div key={t.keyword} className="stat-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">{t.keyword}</span>
                  <span className={`text-xs font-bold ${t.trend === 'up' ? 'text-success' : t.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {t.trend === 'up' ? '📈' : t.trend === 'down' ? '📉' : '➡️'} {t.score}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {t.niches.map(n => <span key={n} className="px-2 py-0.5 bg-muted rounded text-[10px] text-muted-foreground">{n}</span>)}
                </div>
                <button className="text-xs text-primary hover:underline flex items-center gap-1"><Target className="w-3 h-3" /> Alert me</button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
