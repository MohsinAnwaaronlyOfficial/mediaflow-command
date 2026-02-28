import { useState } from 'react';
import { videoQueue, channels, type VideoStatus } from '@/data/mockData';
import { useRoleStore } from '@/stores/roleStore';
import { managerChannels } from '@/data/mockData';
import { Search, ChevronDown, ChevronRight, RotateCcw, SkipForward, ExternalLink, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

function StatusBadge({ status }: { status: VideoStatus }) {
  const cls: Record<VideoStatus, string> = {
    EDITING: 'pill-editing', READY_TO_UPLOAD: 'pill-ready', QUEUED: 'pill-queued',
    UPLOADING: 'pill-uploading', UPLOADED_UNLISTED: 'pill-unlisted', PUBLISHED: 'pill-published', ERROR: 'pill-error'
  };
  return (
    <span className={cls[status]}>
      {status === 'UPLOADING' && <Loader2 className="w-3 h-3 animate-spin" />}
      {status.replace(/_/g, ' ')}
    </span>
  );
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
    : videoQueue;
  
  if (channelFilter !== 'all') filtered = filtered.filter(v => v.channel === channelFilter);
  if (statusFilter !== 'all') filtered = filtered.filter(v => v.status === statusFilter);
  if (search) filtered = filtered.filter(v => v.title.toLowerCase().includes(search.toLowerCase()));

  // Daily limit progress
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
              {['Channel','Title','Status','Publish Date','Time','Tier','Uploaded At','YouTube URL','Error','Actions'].map(h => (
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
                  <td className="py-3 px-2"><StatusBadge status={v.status} /></td>
                  <td className="py-3 px-2 text-muted-foreground whitespace-nowrap">{v.publishDate}</td>
                  <td className="py-3 px-2 text-muted-foreground">{v.publishTime}</td>
                  <td className="py-3 px-2"><span className={`text-xs font-bold ${v.tier === 'T1' ? 'text-primary' : 'text-muted-foreground'}`}>{v.tier}</span></td>
                  <td className="py-3 px-2 text-xs text-muted-foreground whitespace-nowrap">{v.uploadedAt || '—'}</td>
                  <td className="py-3 px-2">{v.youtubeUrl ? <a href={v.youtubeUrl} className="text-secondary hover:underline text-xs" target="_blank" rel="noreferrer">Link</a> : '—'}</td>
                  <td className="py-3 px-2 text-xs text-destructive max-w-[150px] truncate">{v.error || '—'}</td>
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
                    <td colSpan={11} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div>
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Thumbnail</h4>
                          <div className="w-40 h-24 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">Preview</div>
                        </div>
                        {v.error && (
                          <div>
                            <h4 className="text-xs font-semibold text-destructive uppercase mb-1">Error Details</h4>
                            <p className="text-sm text-destructive">{v.error}</p>
                          </div>
                        )}
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
