import { useState } from 'react';
import { Play, Square, Loader2, RotateCcw, OctagonX } from 'lucide-react';
import { channels } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

const ixProfiles = [
  { name: 'BD-Main', id: 'IX-4821', status: 'open', channel: 'BenchDecoded', lastUsed: '2026-02-28 09:15' },
  { name: 'TT-Primary', id: 'IX-4822', status: 'open', channel: 'TrialTales', lastUsed: '2026-02-28 08:45' },
  { name: 'VV-Main', id: 'IX-4823', status: 'open', channel: 'VerdictVault', lastUsed: '2026-02-28 07:30' },
  { name: 'TV-Main', id: 'IX-4824', status: 'closed', channel: 'TechVault', lastUsed: '2026-02-27 18:00' },
  { name: 'FF-Main', id: 'IX-4825', status: 'closed', channel: 'FoodFlicks', lastUsed: '2026-02-27 16:00' },
  { name: 'LB-Main', id: 'IX-4826', status: 'closed', channel: 'LawBites', lastUsed: '2026-02-26 14:00' },
];

const activeSessions = [
  { channel: 'BenchDecoded', task: 'Warmup session', duration: '4:32', progress: null },
  { channel: 'TrialTales', task: 'Uploading video', duration: '2:18', progress: 78 },
  { channel: 'VerdictVault', task: 'Publishing', duration: '0:45', progress: 92 },
];

const cronJobs = [
  { name: 'Upload Worker', lastRun: '2026-02-28 08:45', nextRun: '2026-02-28 10:45', status: 'idle' },
  { name: 'Publish Worker', lastRun: '2026-02-28 09:00', nextRun: '2026-02-28 11:00', status: 'running' },
  { name: 'Warmup Scheduler', lastRun: '2026-02-28 07:00', nextRun: '2026-02-28 13:00', status: 'idle' },
  { name: 'Sheet Sync', lastRun: '2026-02-28 06:00', nextRun: '2026-02-28 12:00', status: 'idle' },
  { name: 'Analytics Collector', lastRun: '2026-02-28 09:30', nextRun: '2026-02-28 09:45', status: 'running' },
  { name: 'Backup', lastRun: '2026-02-28 03:00', nextRun: '2026-03-01 03:00', status: 'idle' },
];

const errorLogs = [
  { time: '09:30:12', level: 'ERROR', message: 'IXBrowser session crash — profile IX-4822 — TrialTales upload interrupted' },
  { time: '09:28:45', level: 'ERROR', message: 'Upload timeout after 180s — video "Man Refuses to Pay Child Support"' },
  { time: '08:15:33', level: 'WARN', message: 'Proxy latency >2000ms — 45.89.112.34 — BenchDecoded' },
  { time: '07:42:18', level: 'ERROR', message: 'Google API rate limit exceeded — retrying in 60s' },
  { time: '07:30:01', level: 'WARN', message: 'Disk usage at 45% — threshold warning at 80%' },
  { time: '06:55:22', level: 'ERROR', message: 'Redis connection dropped — auto-reconnected in 3s' },
  { time: '06:12:44', level: 'WARN', message: 'Cron job "Sheet Sync" took 45s (expected <10s)' },
  { time: '05:30:00', level: 'INFO', message: 'Daily backup completed — 2.3GB compressed' },
  { time: '04:15:33', level: 'ERROR', message: 'WhatsApp notification failed — API key expired' },
  { time: '03:00:01', level: 'INFO', message: 'System maintenance window completed' },
];

export default function SystemControl() {
  const [loadingWorker, setLoadingWorker] = useState<string | null>(null);

  const handleWorker = (name: string) => {
    setLoadingWorker(name);
    setTimeout(() => setLoadingWorker(null), 2000);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold">System Control</h1>
        <p className="text-sm text-muted-foreground">Infrastructure & automation management</p>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'CPU', value: 34, color: 'bg-success' },
          { label: 'RAM', value: 67, color: 'bg-warning' },
          { label: 'Disk', value: 45, color: 'bg-success' },
        ].map(r => (
          <div key={r.label} className="stat-card">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{r.label}</span>
              <span className="text-sm font-bold">{r.value}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div className={`${r.color} h-3 rounded-full transition-all`} style={{ width: `${r.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Job Queue Stats + Worker Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Job Queue</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Pending', value: 3, cls: 'text-warning' },
              { label: 'Running', value: 2, cls: 'text-primary' },
              { label: 'Completed', value: 14, cls: 'text-success' },
              { label: 'Failed', value: 1, cls: 'text-destructive' },
            ].map(j => (
              <div key={j.label} className="stat-card text-center">
                <div className={`text-2xl font-bold ${j.cls}`}>{j.value}</div>
                <div className="text-xs text-muted-foreground">{j.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Worker Controls</h3>
          <div className="flex flex-wrap gap-3">
            {['Upload Worker', 'Publish Worker', 'Warmup'].map(w => (
              <button key={w} onClick={() => handleWorker(w)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50"
                disabled={loadingWorker === w}>
                {loadingWorker === w ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                Run {w}
              </button>
            ))}
            <button onClick={() => handleWorker('STOP')}
              className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
              <OctagonX className="w-4 h-4" /> STOP ALL
            </button>
          </div>
        </div>
      </div>

      {/* IXBrowser Profiles */}
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">IXBrowser Profiles</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Name','ID','Status','Channel','Last Used','Action'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {ixProfiles.map((p, i) => (
              <tr key={p.id} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-3 font-medium">{p.name}</td>
                <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                <td className="py-3 px-3"><span className="flex items-center gap-2"><span className={`status-dot ${p.status === 'open' ? 'status-dot-online' : 'status-dot-offline'}`} />{p.status}</span></td>
                <td className="py-3 px-3">{p.channel}</td>
                <td className="py-3 px-3 text-muted-foreground">{p.lastUsed}</td>
                <td className="py-3 px-3">
                  <button className={`px-3 py-1 rounded-lg text-xs font-semibold ${p.status === 'open' ? 'bg-destructive/20 text-destructive hover:bg-destructive/30' : 'bg-success/20 text-success hover:bg-success/30'} transition-colors`}>
                    {p.status === 'open' ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Active Sessions */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Active Sessions</h3>
        <div className="space-y-3">
          {activeSessions.map(s => (
            <div key={s.channel} className="flex items-center gap-4 p-3 bg-background/30 rounded-lg">
              <span className="status-dot-online" />
              <div className="flex-1">
                <span className="font-medium text-sm">{s.channel}: {s.task}</span>
                <span className="text-xs text-muted-foreground ml-2">({s.duration} running)</span>
              </div>
              {s.progress && (
                <div className="w-32">
                  <Progress value={s.progress} className="h-2" />
                  <span className="text-xs text-muted-foreground">{s.progress}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cron Scheduler */}
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Cron Scheduler</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Job','Last Run','Next Run','Status'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {cronJobs.map((j, i) => (
              <tr key={j.name} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-3 font-medium">{j.name}</td>
                <td className="py-3 px-3 text-muted-foreground">{j.lastRun}</td>
                <td className="py-3 px-3 text-muted-foreground">{j.nextRun}</td>
                <td className="py-3 px-3">
                  <span className={`pill ${j.status === 'running' ? 'pill-uploading' : 'pill-editing'}`}>
                    {j.status === 'running' && <Loader2 className="w-3 h-3 animate-spin" />}{j.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Error Log */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Error Log</h3>
        <div className="bg-background rounded-lg p-4 font-mono text-xs space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin">
          {errorLogs.map((log, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-muted-foreground shrink-0">[{log.time}]</span>
              <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                log.level === 'ERROR' ? 'bg-destructive/20 text-destructive' : log.level === 'WARN' ? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
              }`}>{log.level}</span>
              <span className="text-foreground/80">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
