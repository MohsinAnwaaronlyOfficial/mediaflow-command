import { useState } from 'react';
import { videoQueue, channels, type VideoStatus, managerChannels } from '@/data/mockData';
import { useRoleStore } from '@/stores/roleStore';
import { Search, ChevronDown, ChevronRight, RotateCcw, SkipForward, ExternalLink, Loader2, FileText, Image, Film, HelpCircle, Check, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

function StatusBadge({ status }: { status: VideoStatus }) {
  const cls: Record<VideoStatus, string> = {
    EDITING: 'pill-editing', READY_TO_UPLOAD: 'pill-ready', QUEUED: 'pill-queued',
    UPLOADING: 'pill-uploading', UPLOADED_UNLISTED: 'pill-unlisted', PUBLISHED: 'pill-published', ERROR: 'pill-error',
    DETECTED: 'pill-editing', DOWNLOADING: 'pill-ready', UNLISTED: 'pill-unlisted', SCHEDULED: 'pill-queued'
  };
  return (
    <span className={cls[status]}>
      {status === 'UPLOADING' && <Loader2 className="w-3 h-3 animate-spin" />}
      {status.replace(/_/g, ' ')}
    </span>
  );
}

function FileIcon({ name }: { name: string }) {
  if (name.endsWith('.mp4')) return <Film className="w-3.5 h-3.5 text-primary" />;
  if (name.endsWith('.jpg') || name.endsWith('.png')) return <Image className="w-3.5 h-3.5 text-accent-foreground" />;
  if (name === 'quiz.txt') return <HelpCircle className="w-3.5 h-3.5 text-warning" />;
  return <FileText className="w-3.5 h-3.5 text-muted-foreground" />;
}

export default function VideoQueue() {
  const { role } = useRoleStore();
  const [channelFilter, setChannelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const visibleChannels = role === 'manager' ? channels.filter(c => managerChannels.includes(c.id)) : channels;
  
  let filtered = role === 'manager' 
    ? videoQueue.filter(v => managerChannels.includes(v.channelId)) 
    : [...videoQueue];
  
  if (channelFilter !== 'all') filtered = filtered.filter(v => v.channel === channelFilter);
  if (statusFilter !== 'all') filtered = filtered.filter(v => v.status === statusFilter);
  if (search) filtered = filtered.filter(v => v.title.toLowerCase().includes(search.toLowerCase()));

  const dailyProgress = visibleChannels.map(ch => {
    const todayCount = videoQueue.filter(v => v.channelId === ch.id && v.status === 'PUBLISHED' && v.publishDate === '2026-02-28').length;
    return { ...ch, todayCount };
  });

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold">Video Queue</h1>
        <p className="text-sm text-muted-foreground">{filtered.length} videos</p>
      </div>

      {/* Daily Limits */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {dailyProgress.map(ch => (
          <div key={ch.id} className="stat-card !p-3">
            <div className="text-xs font-medium mb-1">{ch.name}</div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>{ch.todayCount}/{ch.dailyLimit} today</span>
            </div>
            <Progress value={(ch.todayCount / ch.dailyLimit) * 100} className="h-1.5" />
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={channelFilter} onValueChange={setChannelFilter}>
          <SelectTrigger className="w-[180px] bg-card border-border"><SelectValue placeholder="All Channels" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Channels</SelectItem>
            {visibleChannels.map(ch => <SelectItem key={ch.id} value={ch.name}>{ch.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-card border-border"><SelectValue placeholder="All Statuses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {['EDITING','READY_TO_UPLOAD','QUEUED','UPLOADING','UPLOADED_UNLISTED','PUBLISHED','ERROR'].map(s => (
              <SelectItem key={s} value={s}>{s.replace(/_/g, ' ')}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search videos..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-card border-border" />
        </div>
      </div>

      {/* Table */}
      <div className="stat-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="w-8"></th>
              {['Channel','Title','Type','Folder','Status','Publish Date','Time','Tier','Actions'].map(h => (
                <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => (
              <>
                <tr key={v.id} className={`table-row-hover border-b border-border/50 cursor-pointer ${i % 2 === 0 ? 'bg-background/20' : ''}`} onClick={() => setExpandedRow(expandedRow === v.id ? null : v.id)}>
                  <td className="py-3 px-2">{expandedRow === v.id ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}</td>
                  <td className="py-3 px-2 font-medium whitespace-nowrap">{v.channel}</td>
                  <td className="py-3 px-2 max-w-[250px] truncate">{v.title}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${v.videoType === 'Long' ? 'bg-secondary/30 text-secondary-foreground' : 'bg-primary/20 text-primary'}`}>
                      {v.videoType}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-mono text-xs text-muted-foreground">{v.folderName}</td>
                  <td className="py-3 px-2"><StatusBadge status={v.status} /></td>
                  <td className="py-3 px-2 text-muted-foreground whitespace-nowrap">{v.publishDate}</td>
                  <td className="py-3 px-2 text-muted-foreground">{v.publishTime}</td>
                  <td className="py-3 px-2"><span className={`text-xs font-bold ${v.tier === 'T1' ? 'text-primary' : 'text-muted-foreground'}`}>{v.tier}</span></td>
                  <td className="py-3 px-2" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button className="p-1 rounded hover:bg-muted" title="Re-queue"><RotateCcw className="w-3.5 h-3.5 text-muted-foreground" /></button>
                      <button className="p-1 rounded hover:bg-muted" title="Skip"><SkipForward className="w-3.5 h-3.5 text-muted-foreground" /></button>
                      {v.youtubeUrl && <a href={v.youtubeUrl} className="p-1 rounded hover:bg-muted" target="_blank" rel="noreferrer" title="Open in Studio"><ExternalLink className="w-3.5 h-3.5 text-muted-foreground" /></a>}
                    </div>
                  </td>
                </tr>
                {expandedRow === v.id && (
                  <tr key={`${v.id}-exp`} className="bg-background/30">
                    <td colSpan={10} className="p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Folder Structure */}
                        <div className="stat-card !p-3">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                            📁 {v.channel}/{v.videoType === 'Long' ? 'Longs' : 'Shorts'}/{v.folderName}/
                          </h4>
                          <div className="space-y-1">
                            {v.files.map(f => (
                              <div key={f.name} className={`flex items-center gap-2 p-1.5 rounded text-xs ${f.present ? 'bg-muted/20' : 'bg-destructive/10'}`}>
                                <FileIcon name={f.name} />
                                <span className={`font-mono ${f.present ? 'text-foreground' : 'text-destructive'}`}>{f.name}</span>
                                {f.required && <span className="text-[10px] text-muted-foreground">(req)</span>}
                                <span className="ml-auto">
                                  {f.present ? (
                                    <span className="flex items-center gap-1 text-success"><Check className="w-3 h-3" />{f.size}</span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-destructive"><X className="w-3 h-3" />Missing</span>
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Description & Tags */}
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Description</h4>
                            <p className="text-sm text-foreground">{v.description}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Tags</h4>
                            <div className="flex flex-wrap gap-1">
                              {v.tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">{tag}</span>)}
                            </div>
                          </div>
                          {v.error && (
                            <div>
                              <h4 className="text-xs font-semibold text-destructive uppercase mb-1">Error Details</h4>
                              <p className="text-sm text-destructive">{v.error}</p>
                            </div>
                          )}
                        </div>

                        {/* A/B Testing & Quiz */}
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Thumbnail</h4>
                            <div className="flex gap-2">
                              <div className="w-32 h-20 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">Main</div>
                              {v.thumbnailB && <div className="w-32 h-20 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground border border-warning/30">A/B Test</div>}
                            </div>
                          </div>
                          {v.titleB && (
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">A/B Title Variant</h4>
                              <p className="text-sm text-warning">{v.titleB}</p>
                            </div>
                          )}
                          {v.quiz && (
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Quiz Card</h4>
                              <pre className="text-xs bg-muted/30 rounded-lg p-2 whitespace-pre-wrap font-mono text-muted-foreground">{v.quiz}</pre>
                            </div>
                          )}
                          {v.youtubeUrl && (
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">YouTube URL</h4>
                              <a href={v.youtubeUrl} className="text-xs text-secondary hover:underline" target="_blank" rel="noreferrer">{v.youtubeUrl}</a>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
