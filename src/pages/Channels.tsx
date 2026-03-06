import { useState, useEffect } from 'react';
import { useRoleStore } from '@/stores/roleStore';
import { channelsApi } from '@/api/channels';
import { channels as fallbackChannels, managerChannels, youtubeCategories } from '@/data/mockData';
import WarmupCookieSection from '@/components/channels/WarmupCookieSection';
import type { Channel } from '@/types';
import TierBadge from '@/components/shared/TierBadge';
import HealthDot from '@/components/shared/HealthDot';
import { SkeletonCard } from '@/components/shared/SkeletonCard';
import {
  Plus, RefreshCw, ShoppingCart, Settings, Users, Globe, Video,
  Search, Grid3x3, List, Snowflake, CheckCircle, Flame
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

function ChannelDetailPanel({ ch }: { ch: Channel }) {
  return (
    <Tabs defaultValue="identity" className="mt-4">
      <TabsList className="grid grid-cols-6 bg-muted/30 h-auto p-1">
        <TabsTrigger value="identity" className="text-xs py-1.5 gap-1"><Globe className="w-3 h-3" />Identity</TabsTrigger>
        <TabsTrigger value="team" className="text-xs py-1.5 gap-1"><Users className="w-3 h-3" />Team</TabsTrigger>
        <TabsTrigger value="proxy" className="text-xs py-1.5 gap-1"><Settings className="w-3 h-3" />Proxy</TabsTrigger>
        <TabsTrigger value="shopping" className="text-xs py-1.5 gap-1"><ShoppingCart className="w-3 h-3" />Shopping</TabsTrigger>
        <TabsTrigger value="warmup" className="text-xs py-1.5 gap-1"><Flame className="w-3 h-3" />Warmup</TabsTrigger>
        <TabsTrigger value="defaults" className="text-xs py-1.5 gap-1"><Video className="w-3 h-3" />YT Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="identity" className="space-y-3 mt-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Channel Identity</h4>
          <button onClick={() => channelsApi.syncIXProfiles().then(() => toast.success('IXBrowser synced')).catch(() => toast.error('Sync failed'))}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-xs font-semibold hover:bg-primary/30 transition-colors">
            <RefreshCw className="w-3 h-3" /> Sync from IXBrowser
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="stat-card !p-3"><span className="text-xs text-muted-foreground">Channel Name</span><p className="font-medium text-sm mt-0.5">{ch.name}</p></div>
          <div className="stat-card !p-3"><span className="text-xs text-muted-foreground">YouTube Channel ID</span><p className="font-mono text-xs mt-0.5">{ch.youtubeChannelId}</p></div>
          <div className="stat-card !p-3"><span className="text-xs text-muted-foreground">Proxy</span><p className="font-mono text-xs mt-0.5">{ch.proxy} ({ch.proxyLatency}ms)</p></div>
          <div className="stat-card !p-3"><span className="text-xs text-muted-foreground">IXBrowser Profile</span><p className="text-sm mt-0.5">{ch.ixProfile} ({ch.ixProfileId})</p></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label className="text-xs">Drive Longs Folder ID</Label><Input value={ch.driveLongsFolderId} readOnly className="mt-1 text-xs font-mono" /></div>
          <div><Label className="text-xs">Drive Shorts Folder ID</Label><Input value={ch.driveShortsFolderId} readOnly className="mt-1 text-xs font-mono" /></div>
        </div>
      </TabsContent>

      <TabsContent value="team" className="space-y-3 mt-3">
        <h4 className="text-sm font-semibold">Team / HR Settings</h4>
        <div className="grid grid-cols-2 gap-3">
          <div><Label className="text-xs">Manager Name</Label><Input value={ch.team.managerName} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">Editor Name</Label><Input value={ch.team.editorName} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">Editor Email</Label><Input value={ch.team.editorEmail} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">Editor Salary</Label><Input value={`${ch.team.editorSalary} ${ch.team.salaryCurrency}`} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">Salary Pay Date</Label><Input value={`Day ${ch.team.salaryPayDate}`} readOnly className="mt-1" /></div>
        </div>
      </TabsContent>

      <TabsContent value="proxy" className="space-y-3 mt-3">
        <h4 className="text-sm font-semibold">Proxy Settings</h4>
        <div className="grid grid-cols-2 gap-3">
          <div><Label className="text-xs">Address</Label><Input value={ch.proxyDetails.address} readOnly className="mt-1 font-mono text-xs" /></div>
          <div><Label className="text-xs">Provider</Label><Input value={ch.proxyDetails.provider} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">Type</Label><Input value={ch.proxyDetails.type} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">Price (USD/mo)</Label><Input value={`$${ch.proxyDetails.price}`} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">Buy Date</Label><Input value={ch.proxyDetails.buyDate} readOnly className="mt-1" /></div>
          <div>
            <Label className="text-xs">Expiry Date</Label>
            <Input value={ch.proxyDetails.expiryDate} readOnly className="mt-1" />
            {(() => {
              const days = Math.ceil((new Date(ch.proxyDetails.expiryDate).getTime() - Date.now()) / 86400000);
              return days <= 7 ? <p className="text-xs text-destructive mt-1 font-semibold">⚠️ Expires in {days} days!</p> : null;
            })()}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="shopping" className="space-y-3 mt-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Shopping / Monetization</h4>
          <Switch checked={ch.shopping.enabled} disabled />
        </div>
        {ch.shopping.enabled ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Category</Label><Input value={ch.shopping.category} readOnly className="mt-1" /></div>
              <div><Label className="text-xs">Amazon Store ID</Label><Input value={ch.shopping.amazonStoreId} readOnly className="mt-1 font-mono text-xs" /></div>
              <div><Label className="text-xs">Commission</Label><Input value={`${ch.shopping.commissionRate}%`} readOnly className="mt-1" /></div>
            </div>
            <div>
              <Label className="text-xs">Products ({ch.shopping.products.length})</Label>
              <div className="space-y-1 mt-1">
                {ch.shopping.products.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-muted/30 rounded text-xs">
                    <ShoppingCart className="w-3 h-3 text-muted-foreground" />
                    <span className="font-medium">{p.name}</span>
                    <span className="text-muted-foreground ml-auto truncate max-w-[180px]">{p.link}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : <p className="text-sm text-muted-foreground">Shopping disabled.</p>}
      </TabsContent>

      <TabsContent value="warmup" className="mt-3">
        <WarmupCookieSection channelId={ch.id} niche={ch.niche} />
      </TabsContent>

      <TabsContent value="defaults" className="space-y-3 mt-3">
        <h4 className="text-sm font-semibold">Video Defaults (17 Settings)</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Made for Kids', value: ch.videoDefaults.madeForKids },
            { label: 'Age Restriction', value: ch.videoDefaults.ageRestriction },
            { label: 'Altered Content (AI)', value: ch.videoDefaults.alteredContent },
            { label: 'Auto Chapters', value: ch.videoDefaults.automaticChapters },
            { label: 'Featured Places', value: ch.videoDefaults.featuredPlaces },
            { label: 'Auto Concepts', value: ch.videoDefaults.automaticConcepts },
            { label: 'Shorts Remixing', value: ch.videoDefaults.shortsRemixing },
            { label: 'Ratings Visible', value: ch.videoDefaults.ratingsVisible },
            { label: 'End Screen', value: ch.videoDefaults.addEndScreen },
            { label: 'Cards', value: ch.videoDefaults.addCards },
            { label: 'A/B Testing', value: ch.videoDefaults.abTesting },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
              <span className="text-xs">{item.label}</span>
              <Switch checked={item.value} disabled className="scale-75" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label className="text-xs">Category</Label><Input value={ch.videoDefaults.category} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">License</Label><Input value={ch.videoDefaults.license} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">Comments</Label><Input value={ch.videoDefaults.commentsMode} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">Playlist</Label><Input value={ch.videoDefaults.defaultPlaylist} readOnly className="mt-1" /></div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default function Channels() {
  const { role } = useRoleStore();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    channelsApi.getChannels()
      .then(res => setChannels(res.data))
      .catch(() => setChannels(fallbackChannels))
      .finally(() => setLoading(false));
  }, []);

  const visibleChannels = role === 'manager'
    ? channels.filter(c => managerChannels.includes(c.id))
    : channels;

  const filtered = visibleChannels.filter(ch => {
    if (filter === 'active' && ch.status !== 'active') return false;
    if (filter === 'frozen' && ch.status !== 'frozen' && ch.status !== 'inactive') return false;
    if (filter === 'setup' && ch.status !== 'setup_required') return false;
    if (search && !ch.name.toLowerCase().includes(search.toLowerCase()) && !ch.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeCount = visibleChannels.filter(c => c.status === 'active').length;
  const frozenCount = visibleChannels.filter(c => c.status === 'frozen' || c.status === 'inactive').length;
  const setupCount = visibleChannels.filter(c => c.status === 'setup_required').length;

  const handleFreeze = async (channelId: string) => {
    try {
      await channelsApi.freezeChannel(channelId);
      setChannels(prev => prev.map(c => c.id === channelId ? { ...c, status: 'frozen' as const } : c));
      toast.success(`${channelId} frozen`);
    } catch {
      toast.error('Failed to freeze channel');
    }
  };

  const handleUnfreeze = async (channelId: string) => {
    try {
      await channelsApi.unfreezeChannel(channelId);
      setChannels(prev => prev.map(c => c.id === channelId ? { ...c, status: 'active' as const } : c));
      toast.success(`${channelId} activated`);
    } catch {
      toast.error('Failed to unfreeze channel');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Channels ({visibleChannels.length})</h1>
          <p className="text-sm text-muted-foreground">Manage all YouTube channels</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => channelsApi.syncIXProfiles().then(() => toast.success('IXBrowser synced')).catch(() => toast.error('Sync failed'))}
            className="flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
            <RefreshCw className="w-4 h-4" /> Sync IXBrowser
          </button>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
                <Plus className="w-4 h-4" /> Add Channel
              </button>
            </SheetTrigger>
            <SheetContent className="bg-card border-border w-[500px] overflow-y-auto">
              <SheetHeader><SheetTitle>Channel Setup Wizard</SheetTitle></SheetHeader>
              <div className="mt-4 space-y-4">
                <div><Label>Channel Name</Label><Input placeholder="e.g. BenchDecoded" className="mt-1" /></div>
                <div><Label>Niche</Label><Input placeholder="e.g. Judge, Tech, Food" className="mt-1" /></div>
                <div><Label>Tier</Label>
                  <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select tier" /></SelectTrigger>
                  <SelectContent>{['T1','T2','T3','T4'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
                </div>
                <div><Label>Google Drive Folder URL (Longs)</Label>
                  <div className="flex gap-2 mt-1"><Input placeholder="Paste Drive folder URL" className="flex-1" /><button className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-xs font-semibold">✓ Verify</button></div>
                </div>
                <div><Label>Google Sheet URL</Label>
                  <div className="flex gap-2 mt-1"><Input placeholder="Paste Sheet URL" className="flex-1" /><button className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-xs font-semibold">✓ Verify</button></div>
                </div>
                <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
                  🚀 ACTIVATE CHANNEL
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {[
          { key: 'all', label: `All (${visibleChannels.length})` },
          { key: 'active', label: `Active (${activeCount})` },
          { key: 'frozen', label: `Frozen (${frozenCount})` },
          { key: 'setup', label: `Setup Required (${setupCount})` },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === f.key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
            {f.label}
          </button>
        ))}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search channels..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-card border-border" />
        </div>
        <div className="flex bg-muted rounded-lg overflow-hidden">
          <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><Grid3x3 className="w-4 h-4" /></button>
          <button onClick={() => setView('table')} className={`p-2 ${view === 'table' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><List className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(ch => (
            <div key={ch.id} className={`stat-card space-y-3 ${ch.status === 'frozen' || ch.status === 'inactive' ? 'border-destructive/20' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TierBadge tier={ch.tier} />
                  <span className="font-semibold text-sm">{ch.id} — {ch.name}</span>
                </div>
                <button
                  onClick={() => ch.status === 'active' ? handleFreeze(ch.id) : handleUnfreeze(ch.id)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold transition-colors ${
                    ch.status === 'active' ? 'bg-success/20 text-success hover:bg-success/30'
                    : ch.status === 'frozen' || ch.status === 'inactive' ? 'bg-destructive/20 text-destructive hover:bg-destructive/30'
                    : 'bg-warning/20 text-warning'
                  }`}
                >
                  {ch.status === 'active' ? <><CheckCircle className="w-3 h-3" /> ACTIVE</> : <><Snowflake className="w-3 h-3" /> FROZEN</>}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">{ch.niche} • IXBrowser {ch.ixProfileId}</p>

              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="flex items-center gap-1"><HealthDot ok={ch.youtubeLogin} /> YT Login</div>
                <div className="flex items-center gap-1"><HealthDot ok={ch.gmailLogin} /> Gmail</div>
                <div className="flex items-center gap-1"><HealthDot ok={ch.proxyHealth} /> Proxy ({ch.proxyLatency}ms)</div>
                <div className="flex items-center gap-1"><HealthDot ok={ch.driveAccess} /> Drive</div>
                <div className="flex items-center gap-1"><HealthDot ok={ch.sheetAccess} /> Sheet</div>
                <div className="flex items-center gap-1"><HealthDot ok={ch.ixBrowserProfile} /> IXBrowser</div>
              </div>

              <div className="border-t border-border pt-2 text-xs space-y-1">
                <div className="flex justify-between"><span className="text-muted-foreground">Schedule</span><span>Long: {ch.longFormPerDay}/day • Shorts: {ch.shortsPerDay}/day</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Times</span><span>{ch.publishTimes.join(', ')}</span></div>
              </div>

              <div className="border-t border-border pt-2 grid grid-cols-3 gap-2 text-xs text-center">
                <div><div className="font-bold text-primary">${ch.monthRevenue}</div><div className="text-[10px] text-muted-foreground">Revenue</div></div>
                <div><div className="font-bold">{((ch.monthViews || 0)/1000).toFixed(0)}K</div><div className="text-[10px] text-muted-foreground">Views</div></div>
                <div><div className="font-bold">{ch.totalPublished}</div><div className="text-[10px] text-muted-foreground">Uploads</div></div>
              </div>

              <div className="flex gap-2 border-t border-border pt-2">
                <button onClick={() => setExpandedChannel(expandedChannel === ch.id ? null : ch.id)}
                  className="flex-1 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-xs font-semibold hover:bg-secondary/80 transition-colors text-center">
                  ⚙️ Settings
                </button>
                <button className="flex-1 px-3 py-1.5 bg-muted text-muted-foreground rounded-lg text-xs font-semibold hover:bg-muted/80 text-center">
                  📊 Analytics
                </button>
                <button className="flex-1 px-3 py-1.5 bg-muted text-muted-foreground rounded-lg text-xs font-semibold hover:bg-muted/80 text-center">
                  🎬 Queue
                </button>
              </div>

              {expandedChannel === ch.id && <ChannelDetailPanel ch={ch} />}
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="stat-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              {['Channel','Tier','Niche','Status','Profile','Long/day','Shorts/day','Health','Queue','Revenue'].map(h => (
                <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map((ch, i) => (
                <tr key={ch.id} className={`table-row-hover border-b border-border/50 cursor-pointer ${i % 2 === 0 ? 'bg-background/20' : ''}`}
                  onClick={() => setExpandedChannel(expandedChannel === ch.id ? null : ch.id)}>
                  <td className="py-3 px-2 font-medium">{ch.id} — {ch.name}</td>
                  <td className="py-3 px-2"><TierBadge tier={ch.tier} /></td>
                  <td className="py-3 px-2 text-muted-foreground text-xs">{ch.niche}</td>
                  <td className="py-3 px-2"><span className={`text-xs font-semibold ${ch.status === 'active' ? 'text-success' : 'text-destructive'}`}>{ch.status.toUpperCase()}</span></td>
                  <td className="py-3 px-2 text-xs font-mono">{ch.ixProfileId}</td>
                  <td className="py-3 px-2">{ch.longFormPerDay}</td>
                  <td className="py-3 px-2">{ch.shortsPerDay}</td>
                  <td className="py-3 px-2">
                    <div className="flex gap-1">
                      <HealthDot ok={ch.youtubeLogin} />
                      <HealthDot ok={ch.proxyHealth} />
                      <HealthDot ok={ch.driveAccess} />
                      <HealthDot ok={ch.sheetAccess} />
                    </div>
                  </td>
                  <td className="py-3 px-2">{ch.uploadQueue}</td>
                  <td className="py-3 px-2 text-primary font-semibold">${ch.monthRevenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
