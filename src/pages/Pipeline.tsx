import { useState } from 'react';
import { videoQueue, channels, managerChannels, type VideoStatus } from '@/data/mockData';
import { useRoleStore } from '@/stores/roleStore';
import { Search, Loader2, Eye, SkipForward, ExternalLink, Film, List, LayoutGrid, ChevronDown, ChevronRight, FileText, Image, HelpCircle, Check, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const stageConfig: Record<string, { label: string; icon: string; color: string }> = {
  DETECTED: { label: '📥 Detected', icon: '📥', color: 'text-muted-foreground' },
  DOWNLOADING: { label: '⬇️ Downloading', icon: '⬇️', color: 'text-secondary' },
  UPLOADING: { label: '⬆️ Uploading', icon: '⬆️', color: 'text-primary' },
  UNLISTED: { label: '🔒 Unlisted', icon: '🔒', color: 'text-[hsl(280,60%,70%)]' },
  SCHEDULED: { label: '📅 Scheduled', icon: '📅', color: 'text-warning' },
  PUBLISHED: { label: '✅ Published', icon: '✅', color: 'text-success' },
  ERROR: { label: '❌ Error', icon: '❌', color: 'text-destructive' },
};

function StatusBadge({ status }: { status: VideoStatus }) {
  const cls: Record<string, string> = {
    DETECTED: 'pill-editing', DOWNLOADING: 'pill-ready', UPLOADING: 'pill-uploading',
    UNLISTED: 'pill-unlisted', SCHEDULED: 'pill-queued', PUBLISHED: 'pill-published', ERROR: 'pill-error',
  };
  return (
    <span className={cls[status] || 'pill-editing'}>
      {status === 'UPLOADING' && <Loader2 className="w-3 h-3 animate-spin" />}
      {status === 'DOWNLOADING' && <Loader2 className="w-3 h-3 animate-spin" />}
      {status}
    </span>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const cls = tier === 'T1' ? 'badge-t1' : tier === 'T2' ? 'badge-t2' : tier === 'T3' ? 'badge-t3' : 'badge-t4';
  return <span className={`${cls} rounded px-1.5 py-0.5 text-[10px] font-bold`}>{tier}</span>;
}

function FileIcon({ name }: { name: string }) {
  if (name.endsWith('.mp4')) return <Film className="w-3 h-3 text-primary" />;
  if (name.endsWith('.jpg') || name.endsWith('.png')) return <Image className="w-3 h-3 text-accent-foreground" />;
  if (name === 'quiz.txt') return <HelpCircle className="w-3 h-3 text-warning" />;
  return <FileText className="w-3 h-3 text-muted-foreground" />;
}

export default function Pipeline() {
  const { role } = useRoleStore();
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const [channelFilter, setChannelFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const visibleChannels = role === 'manager' ? channels.filter(c => managerChannels.includes(c.id)) : channels;
  let filtered = role === 'manager' ? videoQueue.filter(v => managerChannels.includes(v.channelId)) : [...videoQueue];
  if (channelFilter !== 'all') filtered = filtered.filter(v => v.channelId === channelFilter);
  if (typeFilter !== 'all') filtered = filtered.filter(v => v.videoType === typeFilter);
  if (search) filtered = filtered.filter(v => v.title.toLowerCase().includes(search.toLowerCase()));

  const stages: VideoStatus[] = ['DETECTED', 'DOWNLOADING', 'UPLOADING', 'UNLISTED', 'SCHEDULED', 'PUBLISHED'];
  const stageCounts = stages.map(s => ({ status: s, count: filtered.filter(v => v.status === s).length, ...stageConfig[s] }));

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Stats Bar */}
      <div className="stat-card flex flex-wrap items-center gap-4">
        {stageCounts.map((s, i) => (
          <div key={s.status} className="flex items-center gap-2">
            <span className="text-sm">{s.icon}</span>
            <span className="text-xs text-muted-foreground">{s.label.split(' ')[1]}:</span>
            <span className={`text-sm font-bold ${s.color}`}>{s.count}</span>
            {i < stageCounts.length - 1 && <span className="text-muted-foreground ml-2">|</span>}
          </div>
        ))}
        {filtered.filter(v => v.status === 'ERROR').length > 0 && (
          <div className="flex items-center gap-2 ml-2">
            <span className="text-sm">❌</span>
            <span className="text-xs text-muted-foreground">Errors:</span>
            <span className="text-sm font-bold text-destructive">{filtered.filter(v => v.status === 'ERROR').length}</span>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Select value={channelFilter} onValueChange={setChannelFilter}>
          <SelectTrigger className="w-[180px] bg-card border-border"><SelectValue placeholder="All Channels" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Channels</SelectItem>
            {visibleChannels.map(ch => <SelectItem key={ch.id} value={ch.id}>{ch.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[130px] bg-card border-border"><SelectValue placeholder="All Types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Long">Long</SelectItem>
            <SelectItem value="Short">Short</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search videos..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-card border-border" />
        </div>
        <div className="flex bg-muted rounded-lg overflow-hidden">
          <button onClick={() => setView('kanban')} className={`p-2 ${view === 'kanban' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><LayoutGrid className="w-4 h-4" /></button>
          <button onClick={() => setView('table')} className={`p-2 ${view === 'table' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><List className="w-4 h-4" /></button>
        </div>
      </div>

      {view === 'kanban' ? (
        /* Kanban View */
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {stages.map(stage => (
            <div key={stage} className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase">{stageConfig[stage].label}</span>
                <span className="text-xs font-bold text-foreground">{filtered.filter(v => v.status === stage).length}</span>
              </div>
              <div className="space-y-2 max-h-[500px] overflow-y-auto scrollbar-thin">
                {filtered.filter(v => v.status === stage).slice(0, 8).map(v => (
                  <div key={v.id} className="stat-card !p-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[10px]">📺 {v.channelId}</span>
                      <TierBadge tier={v.tier} />
                    </div>
                    <p className="font-medium text-foreground leading-tight line-clamp-2">{v.title}</p>
                    {v.variant && <span className="text-[10px] text-warning">🧪 Variant {v.variant}</span>}
                    <p className="text-[10px] text-muted-foreground">📁 {v.folderName}</p>
                    {v.progress !== undefined && (
                      <div>
                        <Progress value={v.progress} className="h-1.5" />
                        <span className="text-[10px] text-muted-foreground">{v.progress}%</span>
                      </div>
                    )}
                    {stage === 'SCHEDULED' && <p className="text-[10px] text-warning">📅 {v.publishDate} {v.publishTime}</p>}
                    {v.error && <p className="text-[10px] text-destructive truncate">{v.error}</p>}
                    <div className="flex gap-1 pt-1 border-t border-border">
                      <button className="p-1 rounded hover:bg-muted"><Eye className="w-3 h-3 text-muted-foreground" /></button>
                      <button className="p-1 rounded hover:bg-muted"><SkipForward className="w-3 h-3 text-muted-foreground" /></button>
                      {v.youtubeUrl && <a href={v.youtubeUrl} target="_blank" rel="noreferrer" className="p-1 rounded hover:bg-muted"><ExternalLink className="w-3 h-3 text-muted-foreground" /></a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="stat-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="w-8"></th>
              {['Channel','Title','Type','Folder','Status','Publish','Time','Actions'].map(h => (
                <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.slice(0, 30).map((v, i) => (
                <tr key={v.id}>
                  <td colSpan={9} className="p-0">
                    <div className={`table-row-hover border-b border-border/50 cursor-pointer flex items-center ${i % 2 === 0 ? 'bg-background/20' : ''}`} onClick={() => setExpandedRow(expandedRow === v.id ? null : v.id)}>
                      <div className="py-3 px-2 w-8">{expandedRow === v.id ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}</div>
                      <div className="py-3 px-2 font-medium whitespace-nowrap flex-shrink-0 w-28">{v.channel}</div>
                      <div className="py-3 px-2 flex-1 truncate max-w-[250px]">{v.title}</div>
                      <div className="py-3 px-2 w-16"><span className={`text-xs font-semibold px-2 py-0.5 rounded ${v.videoType === 'Long' ? 'bg-secondary/30 text-secondary-foreground' : 'bg-primary/20 text-primary'}`}>{v.videoType}</span></div>
                      <div className="py-3 px-2 font-mono text-xs text-muted-foreground w-24">{v.folderName}</div>
                      <div className="py-3 px-2 w-28"><StatusBadge status={v.status} /></div>
                      <div className="py-3 px-2 text-muted-foreground text-xs w-24">{v.publishDate}</div>
                      <div className="py-3 px-2 text-muted-foreground text-xs w-20">{v.publishTime}</div>
                      <div className="py-3 px-2 w-24" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-1">
                          <button className="p-1 rounded hover:bg-muted"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                          <button className="p-1 rounded hover:bg-muted"><SkipForward className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        </div>
                      </div>
                    </div>
                    {expandedRow === v.id && (
                      <div className="p-4 bg-background/30 border-b border-border">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="stat-card !p-3">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">📁 Folder Structure</h4>
                            <div className="space-y-1">
                              {v.files.map(f => (
                                <div key={f.name} className="flex items-center gap-2 text-xs">
                                  <FileIcon name={f.name} />
                                  <span className={`font-mono ${f.present ? 'text-foreground' : 'text-destructive'}`}>{f.name}</span>
                                  <span className="ml-auto">{f.present ? <Check className="w-3 h-3 text-success" /> : <X className="w-3 h-3 text-destructive" />}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase">Description</h4>
                            <p className="text-xs text-foreground">{v.description}</p>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase mt-2">Tags</h4>
                            <div className="flex flex-wrap gap-1">{v.tags.map(t => <span key={t} className="px-2 py-0.5 bg-muted rounded text-[10px]">{t}</span>)}</div>
                          </div>
                          <div className="space-y-2">
                            {v.titleB && <div><h4 className="text-xs font-semibold text-muted-foreground uppercase">A/B Title</h4><p className="text-xs text-warning">{v.titleB}</p></div>}
                            {v.quiz && <div><h4 className="text-xs font-semibold text-muted-foreground uppercase">Quiz</h4><pre className="text-[10px] bg-muted/30 rounded p-2 font-mono whitespace-pre-wrap">{v.quiz}</pre></div>}
                            {v.error && <div><h4 className="text-xs font-semibold text-destructive uppercase">Error</h4><p className="text-xs text-destructive">{v.error}</p></div>}
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
