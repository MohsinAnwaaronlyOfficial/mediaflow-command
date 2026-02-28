import { useState, useEffect, useMemo } from 'react';
import { Zap, MonitorPlay, Video, Eye, UserPlus } from 'lucide-react';
import { channels, videoQueue, generateViewsData, channelColors } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SCREENS = 5;
const INTERVAL = 15000;

function TierBadge({ tier }: { tier: string }) {
  const cls = tier === 'T1' ? 'badge-t1' : tier === 'T2' ? 'badge-t2' : tier === 'T3' ? 'badge-t3' : 'badge-t4';
  return <span className={`${cls} rounded-full px-3 py-1 text-sm font-bold`}>{tier}</span>;
}

export default function ReceptionPage() {
  const [screen, setScreen] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setScreen(s => (s + 1) % SCREENS);
        setFade(true);
      }, 400);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const viewsData = useMemo(() => {
    return generateViewsData(7).map(d => ({
      date: d.date,
      BenchDecoded: d.BenchDecoded,
      TechVault: d.TechVault,
      TrialTales: d.TrialTales,
      VerdictVault: d.VerdictVault,
      FoodFlicks: d.FoodFlicks,
      LawBites: d.LawBites,
    }));
  }, []);

  const recentPublished = videoQueue.filter(v => v.status === 'PUBLISHED').slice(0, 8);
  const totalViews = channels.reduce((s, c) => s + c.todayViews, 0);
  const totalSubs = channels.reduce((s, c) => s + (c.tier === 'T1' ? 250 : c.tier === 'T2' ? 80 : c.tier === 'T3' ? 150 : 10), 0);

  return (
    <div className="h-screen w-screen bg-background overflow-hidden flex flex-col p-8" style={{ fontSize: '1.5em' }}>
      <div className={`flex-1 flex items-center justify-center transition-opacity duration-400 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Screen 1: Big Stats */}
        {screen === 0 && (
          <div className="text-center space-y-12 animate-fade-screen">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold">Unity Media Flow</h1>
            </div>
            <div className="grid grid-cols-4 gap-12">
              {[
                { icon: MonitorPlay, label: 'Channels Active', value: '6' },
                { icon: Video, label: 'Videos Today', value: '8' },
                { icon: Eye, label: 'Views Today', value: totalViews.toLocaleString() },
                { icon: UserPlus, label: 'Subs Today', value: totalSubs.toLocaleString() },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <s.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-5xl font-bold mb-2">{s.value}</div>
                  <div className="text-lg text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screen 2: Channel Cards */}
        {screen === 1 && (
          <div className="w-full animate-fade-screen">
            <h2 className="text-3xl font-bold text-center mb-8">Channel Performance</h2>
            <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
              {channels.map(ch => (
                <div key={ch.id} className="stat-card !p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold">{ch.name}</span>
                    <TierBadge tier={ch.tier} />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">{ch.todayViews.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">views today</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screen 3: Recent Publishes */}
        {screen === 2 && (
          <div className="w-full max-w-5xl animate-fade-screen">
            <h2 className="text-3xl font-bold text-center mb-8">Recent Publishes</h2>
            <div className="grid grid-cols-2 gap-4">
              {recentPublished.map(v => (
                <div key={v.id} className="stat-card !p-5 flex items-center gap-4">
                  <div className="w-16 h-12 bg-muted rounded-lg shrink-0" />
                  <div>
                    <div className="font-semibold text-base">{v.title}</div>
                    <div className="text-sm text-muted-foreground">{v.channel} · {v.publishTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screen 4: Views Chart */}
        {screen === 3 && (
          <div className="w-full max-w-6xl animate-fade-screen">
            <h2 className="text-3xl font-bold text-center mb-8">7-Day Views</h2>
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 45% 22%)" />
                <XAxis dataKey="date" tick={{ fill: 'hsl(210 18% 60%)', fontSize: 16 }} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(210 18% 60%)', fontSize: 16 }} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip />
                {Object.keys(channelColors).map(name => (
                  <Line key={name} type="monotone" dataKey={name} stroke={channelColors[name]} strokeWidth={3} dot={false} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Screen 5: Branding */}
        {screen === 4 && (
          <div className="text-center animate-fade-screen space-y-8">
            <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center mx-auto">
              <Zap className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-6xl font-bold">Unity Media Flow</h1>
            <p className="text-2xl text-muted-foreground">Professional YouTube Content Automation</p>
            <p className="text-lg text-muted-foreground">unitymediaflow.com</p>
          </div>
        )}
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-3 pt-6">
        {Array.from({ length: SCREENS }).map((_, i) => (
          <button
            key={i}
            onClick={() => setScreen(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === screen ? 'bg-primary w-8' : 'bg-muted'}`}
          />
        ))}
      </div>
    </div>
  );
}
