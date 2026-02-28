import { useEffect, useState, useMemo } from 'react';
import { Zap, MonitorPlay, Video, Eye, Users } from 'lucide-react';
import { generateViewsData } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{value.toLocaleString()}{suffix}</span>;
}

export default function ViewerPage() {
  const viewsData = useMemo(() => {
    return generateViewsData(30).map(d => ({
      date: d.date,
      views: d.BenchDecoded + d.TrialTales + d.VerdictVault + d.TechVault + d.FoodFlicks + d.LawBites,
    }));
  }, []);

  const [tickerIdx, setTickerIdx] = useState(0);
  const tickers = [
    'New video published 3 minutes ago',
    'BenchDecoded reached 124,500 subscribers',
    'TechVault video trending in Technology',
    '8 videos published today across all channels',
  ];
  useEffect(() => {
    const t = setInterval(() => setTickerIdx(i => (i + 1) % tickers.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Unity Media Flow</h1>
        </div>
        <p className="text-muted-foreground">Professional YouTube Content Automation</p>
      </header>

      {/* Stats */}
      <div className="max-w-4xl mx-auto w-full px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: MonitorPlay, label: 'Active Channels', value: 6 },
            { icon: Video, label: 'Videos Published', value: 847 },
            { icon: Eye, label: 'Total Views', value: 12400000, suffix: '' },
            { icon: Users, label: 'Countries Reached', value: 47 },
          ].map(s => (
            <div key={s.label} className="text-center animate-count-up">
              <s.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-4xl font-bold text-foreground mb-1">
                {s.value >= 1000000 ? <><AnimatedNumber target={12.4} />M</> : <AnimatedNumber target={s.value} suffix={s.suffix} />}
              </div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="stat-card mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Combined Views — Last 30 Days</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 45% 22%)" />
              <XAxis dataKey="date" tick={{ fill: 'hsl(210 18% 60%)', fontSize: 11 }} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(210 18% 60%)', fontSize: 11 }} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(218 44% 18%)', border: '1px solid hsl(216 45% 22%)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="views" stroke="#C85000" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ticker */}
      <div className="mt-auto border-t border-border py-4 text-center">
        <p className="text-sm text-muted-foreground animate-fade-screen" key={tickerIdx}>
          🔴 {tickers[tickerIdx]}
        </p>
      </div>
    </div>
  );
}
