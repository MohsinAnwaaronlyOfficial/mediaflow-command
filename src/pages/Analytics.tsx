import { useState, useMemo } from 'react';
import { generateViewsData, generateSubsData, topVideos, channelColors, channels } from '@/data/mockData';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Flame, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const periods = [
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
];

const chartTheme = {
  grid: 'hsl(216 45% 22%)',
  text: 'hsl(210 18% 60%)',
  bg: 'hsl(218 44% 18%)',
};

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

export default function Analytics() {
  const [period, setPeriod] = useState(30);
  const [selectedChannel, setSelectedChannel] = useState('all');
  const viewsData = useMemo(() => generateViewsData(period), [period]);
  const subsData = useMemo(() => generateSubsData(period), [period]);
  
  const channelNames = channels.map(c => c.name);
  const visibleChannels = selectedChannel === 'all' ? channelNames : [selectedChannel];

  // CTR data
  const ctrData = viewsData.map((d, i) => ({
    date: d.date,
    CTR: (4.2 + (i / viewsData.length) * 2.6 + (Math.random() - 0.5) * 0.8).toFixed(1),
  }));

  // Watch time data
  const watchTimeData = viewsData.map(d => ({
    date: d.date,
    hours: Math.floor((d.BenchDecoded + d.TechVault + d.TrialTales + d.VerdictVault + d.FoodFlicks + d.LawBites) / 600),
  }));

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm text-muted-foreground">Performance metrics across all channels</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedChannel} 
            onChange={e => setSelectedChannel(e.target.value)}
            className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-foreground"
          >
            <option value="all">All Channels</option>
            {channelNames.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <div className="flex bg-card border border-border rounded-lg overflow-hidden">
            {periods.map(p => (
              <button
                key={p.label}
                onClick={() => setPeriod(p.days)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${period === p.days ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Views Chart */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Views Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={viewsData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
            <XAxis dataKey="date" tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {visibleChannels.map(name => (
              <Line key={name} type="monotone" dataKey={name} stroke={channelColors[name]} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscriber Gains */}
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Daily Subscriber Gains</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="date" tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} />
              <YAxis tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              {visibleChannels.map(name => (
                <Bar key={name} dataKey={name} stackId="a" fill={channelColors[name]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Watch Time */}
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Watch Time (Hours/Day)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={watchTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="date" tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} />
              <YAxis tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="hours" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CTR Trend */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">CTR Trend (%)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={ctrData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
            <XAxis dataKey="date" tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fill: chartTheme.text, fontSize: 11 }} tickLine={false} domain={[3, 8]} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="CTR" stroke="#C85000" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Videos */}
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Top Videos</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {['','Title','Channel','Views','CTR','Watch Time','Revenue','Published'].map(h => (
                <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topVideos.map((v, i) => (
              <tr key={i} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-2">
                  <div className="w-16 h-10 bg-muted rounded flex items-center justify-center">
                    {v.viral && <Flame className="w-4 h-4 text-primary" />}
                  </div>
                </td>
                <td className="py-3 px-2 font-medium max-w-[250px]">
                  <div className="flex items-center gap-2">
                    {v.title}
                    {v.viral && <span className="pill-uploading text-[10px]"><Flame className="w-3 h-3" /> 3.2x</span>}
                  </div>
                </td>
                <td className="py-3 px-2 text-muted-foreground">{v.channel}</td>
                <td className="py-3 px-2 font-semibold">{v.views.toLocaleString()}</td>
                <td className="py-3 px-2">{v.ctr}%</td>
                <td className="py-3 px-2 text-muted-foreground">{v.watchTime}h</td>
                <td className="py-3 px-2 text-primary font-semibold">${v.revenue.toFixed(2)}</td>
                <td className="py-3 px-2 text-muted-foreground">{v.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* YPP Progress */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> YPP Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between"><span className="font-medium">TrialTales</span><span className="text-xs text-muted-foreground">Not Monetized</span></div>
            <div><div className="flex justify-between text-xs mb-1"><span>Subscribers</span><span>847 / 1,000</span></div><Progress value={84.7} className="h-2" /></div>
            <div><div className="flex justify-between text-xs mb-1"><span>Watch Hours</span><span>3,240 / 4,000</span></div><Progress value={81} className="h-2" /></div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between"><span className="font-medium">LawBites</span><span className="text-xs text-muted-foreground">Not Monetized</span></div>
            <div><div className="flex justify-between text-xs mb-1"><span>Subscribers</span><span>312 / 1,000</span></div><Progress value={31.2} className="h-2" /></div>
            <div><div className="flex justify-between text-xs mb-1"><span>Watch Hours</span><span>890 / 4,000</span></div><Progress value={22.25} className="h-2" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
