import { useState, useEffect } from 'react';
import { channelsApi } from '@/api/channels';
import { systemApi } from '@/api/system';
import { channels as fallbackChannels } from '@/data/mockData';
import type { Channel, PM2Worker, CronJob, ErrorLog } from '@/types';
import { SkeletonCard, SkeletonTable } from '@/components/shared/SkeletonCard';
import { Progress } from '@/components/ui/progress';
import { Loader2, CheckCircle, AlertTriangle, XCircle, RefreshCw, HardDrive, Cpu, MemoryStick, Download } from 'lucide-react';

const defaultCronJobs: CronJob[] = [
  { name: 'drive-watcher', interval: 'Every 10min', last: '3 min ago', status: 'ok' },
  { name: 'upload-worker', interval: 'Every 15min', last: '8 min ago', status: 'ok' },
  { name: 'publish-scheduler', interval: 'Every 30min', last: '12 min ago', status: 'ok' },
  { name: 'health-monitor', interval: 'Every 2h', last: '1h ago', status: 'ok' },
  { name: 'analytics-collector', interval: 'Every 6h', last: '2h ago', status: 'running' },
  { name: 'sheet-sync', interval: 'Every 1h', last: '45 min ago', status: 'ok' },
  { name: 'proxy-checker', interval: 'Every 4h', last: '3h ago', status: 'ok' },
  { name: 'daily-backup', interval: '2AM PKT', last: 'Yesterday', status: 'ok' },
  { name: 'drive-cleanup', interval: 'Every 6h', last: '4h ago', status: 'ok' },
  { name: 'ab-test-evaluator', interval: 'Every 12h', last: '6h ago', status: 'ok' },
];

const defaultWorkers: PM2Worker[] = [
  { name: 'umf-api', status: 'online', cpu: '2%', memory: '44MB', restarts: 96, uptime: '14d' },
  { name: 'umf-scheduler', status: 'online', cpu: '1%', memory: '38MB', restarts: 2, uptime: '14d' },
  { name: 'umf-upload', status: 'online', cpu: '8%', memory: '120MB', restarts: 12, uptime: '7d' },
  { name: 'umf-analytics', status: 'online', cpu: '3%', memory: '56MB', restarts: 0, uptime: '14d' },
];

const defaultErrorLogs: ErrorLog[] = [
  { time: '09:30:12', level: 'ERROR', message: 'IXBrowser session crash — profile IX-4822 — upload interrupted', channel: 'BENCH02' },
  { time: '09:28:45', level: 'ERROR', message: 'Upload timeout after 180s — video "Man Refuses to Pay"', channel: 'BENCH02' },
  { time: '08:15:33', level: 'WARN', message: 'Proxy latency >2000ms — NEWS02', channel: 'NEWS02' },
  { time: '07:42:18', level: 'ERROR', message: 'Google API rate limit exceeded — retrying in 60s', channel: '' },
  { time: '07:30:01', level: 'WARN', message: 'Disk usage at 45% — threshold warning at 80%', channel: '' },
  { time: '06:55:22', level: 'ERROR', message: 'Redis connection dropped — auto-reconnected in 3s', channel: '' },
  { time: '06:12:44', level: 'WARN', message: 'Cron job "Sheet Sync" took 45s (expected <10s)', channel: '' },
  { time: '05:30:00', level: 'INFO', message: 'Daily backup completed — 2.3GB compressed', channel: '' },
];

export default function Health() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [workers, setWorkers] = useState<PM2Worker[]>(defaultWorkers);
  const [cronJobs, setCronJobs] = useState<CronJob[]>(defaultCronJobs);
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>(defaultErrorLogs);
  const [loading, setLoading] = useState(true);
  const [loadingWorker, setLoadingWorker] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      channelsApi.getChannels().catch(() => ({ data: fallbackChannels })),
      systemApi.getWorkers().catch(() => ({ data: defaultWorkers })),
      systemApi.getCrons().catch(() => ({ data: defaultCronJobs })),
      systemApi.getLogs().catch(() => ({ data: defaultErrorLogs })),
    ]).then(([chRes, wRes, cRes, lRes]) => {
      setChannels(chRes.data);
      setWorkers(wRes.data);
      setCronJobs(cRes.data);
      setErrorLogs(lRes.data);
    }).finally(() => setLoading(false));
  }, []);

  const handleRestart = async (name: string) => {
    setLoadingWorker(name);
    try {
      await systemApi.restartWorker(name);
    } catch { /* fallback */ }
    setTimeout(() => setLoadingWorker(null), 2000);
  };

  const healthyCount = channels.filter(c => c.youtubeLogin && c.proxyHealth && c.driveAccess && c.sheetAccess).length;
  const issueCount = channels.length - healthyCount;
  const allGreen = issueCount === 0;

  if (loading) {
    return <div className="space-y-6 animate-slide-up"><SkeletonCard /><SkeletonTable rows={8} cols={9} /></div>;
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Status Banner */}
      <div className={`stat-card flex items-center justify-between ${allGreen ? 'border-success/30' : 'border-destructive/30'}`}>
        <div className="flex items-center gap-3">
          {allGreen ? <CheckCircle className="w-6 h-6 text-success" /> : <AlertTriangle className="w-6 h-6 text-destructive" />}
          <div>
            <span className={`text-lg font-bold ${allGreen ? 'text-success' : 'text-destructive'}`}>
              {allGreen ? '✅ ALL SYSTEMS OPERATIONAL' : `⚠️ ${issueCount} ISSUES DETECTED`}
            </span>
            <p className="text-xs text-muted-foreground">Last check: 5 min ago</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
          <RefreshCw className="w-4 h-4" /> Run Manual Check
        </button>
      </div>

      {/* Health Grid */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Channel Health Grid</h3>
        <div className="flex flex-wrap gap-2">
          {channels.map(ch => {
            const healthy = ch.youtubeLogin && ch.proxyHealth && ch.driveAccess && ch.sheetAccess;
            const hasWarning = ch.proxyLatency > 1500;
            return (
              <div key={ch.id} className={`px-3 py-2 rounded-lg border text-xs font-semibold cursor-pointer transition-all hover:scale-105 ${
                healthy && !hasWarning ? 'bg-success/10 border-success/30 text-success' :
                hasWarning ? 'bg-warning/10 border-warning/30 text-warning' :
                'bg-destructive/10 border-destructive/30 text-destructive'
              }`}>
                {ch.id} {healthy && !hasWarning ? '✅' : hasWarning ? '⚠️' : '❌'}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Health Table */}
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Detailed Health Status</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Channel','YT Login','Gmail','Proxy','Latency','Drive','Sheet','IXBrowser','Last Check'].map(h => (
              <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {channels.map((ch, i) => (
              <tr key={ch.id} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-2 font-medium">{ch.id}</td>
                {[ch.youtubeLogin, ch.gmailLogin, ch.proxyHealth].map((v, j) => (
                  <td key={j} className="py-3 px-2">{v ? <CheckCircle className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-destructive" />}</td>
                ))}
                <td className="py-3 px-2"><span className={`text-xs font-mono ${ch.proxyLatency > 2000 ? 'text-destructive' : ch.proxyLatency > 1000 ? 'text-warning' : 'text-success'}`}>{ch.proxyLatency}ms</span></td>
                <td className="py-3 px-2">{ch.driveAccess ? <CheckCircle className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-destructive" />}</td>
                <td className="py-3 px-2">{ch.sheetAccess ? <CheckCircle className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-destructive" />}</td>
                <td className="py-3 px-2">{ch.ixBrowserProfile ? <CheckCircle className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-destructive" />}</td>
                <td className="py-3 px-2 text-xs text-muted-foreground">{ch.lastHealthCheck}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Disk Space', value: 45, max: '500GB', used: '45GB', icon: HardDrive },
          { label: 'Memory', value: 26, max: '8GB', used: '2.1GB', icon: MemoryStick },
          { label: 'CPU', value: 12, max: '100%', used: '12%', icon: Cpu },
          { label: 'Downloads', value: 15, max: '8GB', used: '1.2GB', icon: Download },
        ].map(r => (
          <div key={r.label} className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <r.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{r.label}</span>
            </div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">{r.used} / {r.max}</span>
              <span className="font-semibold">{r.value}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className={`h-2.5 rounded-full transition-all ${r.value > 80 ? 'bg-destructive' : r.value > 60 ? 'bg-warning' : 'bg-success'}`} style={{ width: `${r.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* PM2 Workers */}
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">PM2 Workers</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Worker','Status','CPU','Memory','Restarts','Uptime','Action'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {workers.map((w, i) => (
              <tr key={w.name} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-3 font-medium font-mono">{w.name}</td>
                <td className="py-3 px-3"><span className="pill-published text-[10px]">✅ {w.status}</span></td>
                <td className="py-3 px-3 font-mono text-xs">{w.cpu}</td>
                <td className="py-3 px-3 font-mono text-xs">{w.memory}</td>
                <td className="py-3 px-3">{w.restarts}</td>
                <td className="py-3 px-3 text-muted-foreground">{w.uptime}</td>
                <td className="py-3 px-3">
                  <button onClick={() => handleRestart(w.name)} disabled={loadingWorker === w.name}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-warning/20 text-warning hover:bg-warning/30 transition-colors disabled:opacity-50">
                    {loadingWorker === w.name ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Restart'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cron Jobs */}
      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Cron Jobs ({cronJobs.length})</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {cronJobs.map(j => (
            <div key={j.name} className="p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`status-dot ${j.status === 'running' ? 'status-dot-online animate-pulse-glow' : 'status-dot-online'}`} />
                <span className="text-xs font-semibold">{j.name}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{j.interval}</p>
              <p className="text-[10px] text-muted-foreground">Last: {j.last}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Error Log */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Recent Error Log</h3>
        <div className="bg-background rounded-lg p-4 font-mono text-xs space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin">
          {errorLogs.map((log, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-muted-foreground shrink-0">[{log.time}]</span>
              <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                log.level === 'ERROR' ? 'bg-destructive/20 text-destructive' : log.level === 'WARN' ? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
              }`}>{log.level}</span>
              {log.channel && <span className="text-primary shrink-0">[{log.channel}]</span>}
              <span className="text-foreground/80">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
