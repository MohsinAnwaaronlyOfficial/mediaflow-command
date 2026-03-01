import { useState } from 'react';
import { channels, managerChannels, youtubeCategories } from '@/data/mockData';
import { useRoleStore } from '@/stores/roleStore';
import { Edit, Pause, Play, Plus, RefreshCw, ChevronDown, ChevronRight, ShoppingCart, Settings, Users, Globe, Video } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function TierBadge({ tier }: { tier: string }) {
  const cls = tier === 'T1' ? 'badge-t1' : tier === 'T2' ? 'badge-t2' : tier === 'T3' ? 'badge-t3' : 'badge-t4';
  return <span className={`${cls} rounded-full px-2 py-0.5 text-xs font-bold`}>{tier}</span>;
}

const ixProfiles = [
  { name: 'BD-Main', id: 'IX-4821', status: 'open' },
  { name: 'TT-Primary', id: 'IX-4822', status: 'open' },
  { name: 'VV-Main', id: 'IX-4823', status: 'open' },
  { name: 'TV-Main', id: 'IX-4824', status: 'closed' },
  { name: 'FF-Main', id: 'IX-4825', status: 'closed' },
  { name: 'LB-Main', id: 'IX-4826', status: 'closed' },
];

function ChannelDetailPanel({ channelId }: { channelId: string }) {
  const ch = channels.find(c => c.id === channelId);
  if (!ch) return null;

  return (
    <Tabs defaultValue="identity" className="mt-4">
      <TabsList className="grid grid-cols-5 bg-muted/30 h-auto p-1">
        <TabsTrigger value="identity" className="text-xs py-1.5 gap-1"><Globe className="w-3 h-3" />Identity</TabsTrigger>
        <TabsTrigger value="team" className="text-xs py-1.5 gap-1"><Users className="w-3 h-3" />Team</TabsTrigger>
        <TabsTrigger value="proxy" className="text-xs py-1.5 gap-1"><Settings className="w-3 h-3" />Proxy</TabsTrigger>
        <TabsTrigger value="shopping" className="text-xs py-1.5 gap-1"><ShoppingCart className="w-3 h-3" />Shopping</TabsTrigger>
        <TabsTrigger value="defaults" className="text-xs py-1.5 gap-1"><Video className="w-3 h-3" />YT Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="identity" className="space-y-3 mt-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Channel Identity</h4>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-xs font-semibold hover:bg-primary/30 transition-colors">
            <RefreshCw className="w-3 h-3" /> Sync from IXBrowser
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="stat-card !p-3">
            <span className="text-xs text-muted-foreground">Channel Name</span>
            <p className="font-medium text-sm mt-0.5">{ch.name}</p>
          </div>
          <div className="stat-card !p-3">
            <span className="text-xs text-muted-foreground">YouTube Channel ID</span>
            <p className="font-mono text-xs mt-0.5">{ch.youtubeChannelId}</p>
          </div>
          <div className="stat-card !p-3">
            <span className="text-xs text-muted-foreground">Proxy Info</span>
            <p className="font-mono text-xs mt-0.5">{ch.proxy}</p>
          </div>
          <div className="stat-card !p-3">
            <span className="text-xs text-muted-foreground">IXBrowser Profile</span>
            <p className="text-sm mt-0.5">{ch.ixProfile} ({ch.ixProfileId})</p>
          </div>
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
          <div><Label className="text-xs">Salary Currency</Label>
            <Select value={ch.team.salaryCurrency} disabled>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>{['USD','PKR','AED'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label className="text-xs">Salary Pay Date</Label><Input value={`Day ${ch.team.salaryPayDate} of month`} readOnly className="mt-1" /></div>
        </div>
      </TabsContent>

      <TabsContent value="proxy" className="space-y-3 mt-3">
        <h4 className="text-sm font-semibold">Proxy Settings</h4>
        <div className="grid grid-cols-2 gap-3">
          <div><Label className="text-xs">Proxy Address</Label><Input value={ch.proxyDetails.address} readOnly className="mt-1 font-mono text-xs" /></div>
          <div><Label className="text-xs">Username</Label><Input value={ch.proxyDetails.username} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">Password</Label><Input value={ch.proxyDetails.password} type="password" readOnly className="mt-1" /></div>
          <div><Label className="text-xs">Provider</Label><Input value={ch.proxyDetails.provider} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">Proxy Type</Label>
            <Select value={ch.proxyDetails.type} disabled>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>{['residential','datacenter','mobile'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label className="text-xs">Price (USD/mo)</Label><Input value={`$${ch.proxyDetails.price}`} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">Buy Date</Label><Input value={ch.proxyDetails.buyDate} readOnly className="mt-1" /></div>
          <div>
            <Label className="text-xs">Expiry Date</Label>
            <Input value={ch.proxyDetails.expiryDate} readOnly className="mt-1" />
            {(() => {
              const days = Math.ceil((new Date(ch.proxyDetails.expiryDate).getTime() - new Date('2026-03-01').getTime()) / 86400000);
              return days <= 7 ? <p className="text-xs text-destructive mt-1 font-semibold">⚠️ Expires in {days} days!</p> : null;
            })()}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="shopping" className="space-y-3 mt-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Shopping / Monetization</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Enabled</span>
            <Switch checked={ch.shopping.enabled} disabled />
          </div>
        </div>
        {ch.shopping.enabled ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Product Category</Label><Input value={ch.shopping.category} readOnly className="mt-1" /></div>
              <div><Label className="text-xs">Amazon Store ID</Label><Input value={ch.shopping.amazonStoreId} readOnly className="mt-1 font-mono text-xs" /></div>
              <div><Label className="text-xs">Commission Rate</Label><Input value={`${ch.shopping.commissionRate}%`} readOnly className="mt-1" /></div>
            </div>
            <div>
              <Label className="text-xs">Products ({ch.shopping.products.length})</Label>
              <div className="space-y-1.5 mt-1.5">
                {ch.shopping.products.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg text-xs">
                    <ShoppingCart className="w-3 h-3 text-muted-foreground" />
                    <span className="font-medium">{p.name}</span>
                    <span className="text-muted-foreground ml-auto truncate max-w-[180px]">{p.link}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Shopping is disabled for this channel.</p>
        )}
      </TabsContent>

      <TabsContent value="defaults" className="space-y-3 mt-3">
        <h4 className="text-sm font-semibold">Video Defaults (17 YouTube Settings)</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '1. Made for Kids', value: ch.videoDefaults.madeForKids },
            { label: '2. Age Restriction', value: ch.videoDefaults.ageRestriction },
            { label: '3. Altered Content (AI)', value: ch.videoDefaults.alteredContent },
            { label: '4. Automatic Chapters', value: ch.videoDefaults.automaticChapters },
            { label: '5. Featured Places', value: ch.videoDefaults.featuredPlaces },
            { label: '6. Automatic Concepts', value: ch.videoDefaults.automaticConcepts },
            { label: '10. Shorts Remixing', value: ch.videoDefaults.shortsRemixing },
            { label: '13. Ratings Visible', value: ch.videoDefaults.ratingsVisible },
            { label: '14. Add End Screen', value: ch.videoDefaults.addEndScreen },
            { label: '15. Add Cards', value: ch.videoDefaults.addCards },
            { label: '16. A/B Testing', value: ch.videoDefaults.abTesting },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
              <span className="text-xs">{item.label}</span>
              <Switch checked={item.value} disabled className="scale-75" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div><Label className="text-xs">7. Caption Certification</Label><Input value={ch.videoDefaults.captionCertification} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">8. Video Location</Label><Input value={ch.videoDefaults.videoLocation || '—'} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">9. License</Label><Input value={ch.videoDefaults.license} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">11. Category</Label><Input value={ch.videoDefaults.category} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">12. Comments Mode</Label><Input value={ch.videoDefaults.commentsMode} readOnly className="mt-1" /></div>
          <div><Label className="text-xs">17. Default Playlist</Label><Input value={ch.videoDefaults.defaultPlaylist} readOnly className="mt-1" /></div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default function ChannelManagement() {
  const { role } = useRoleStore();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null);
  const visibleChannels = role === 'manager' ? channels.filter(c => managerChannels.includes(c.id)) : channels;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Channel Management</h1>
          <p className="text-sm text-muted-foreground">{visibleChannels.length} channels configured</p>
        </div>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
              <Plus className="w-4 h-4" /> Add Channel
            </button>
          </SheetTrigger>
          <SheetContent className="bg-card border-border w-[500px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Add New Channel</SheetTitle>
            </SheetHeader>
            <Tabs defaultValue="basic" className="mt-4">
              <TabsList className="grid grid-cols-4 bg-muted/30 h-auto p-1">
                <TabsTrigger value="basic" className="text-xs py-1.5">Basic</TabsTrigger>
                <TabsTrigger value="team" className="text-xs py-1.5">Team</TabsTrigger>
                <TabsTrigger value="proxy" className="text-xs py-1.5">Proxy</TabsTrigger>
                <TabsTrigger value="defaults" className="text-xs py-1.5">YT Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-3 mt-3">
                <div><Label>Channel Name</Label><Input placeholder="e.g. BenchDecoded" className="mt-1" /></div>
                <div><Label>Niche</Label><Input placeholder="e.g. Judge, Tech, Food" className="mt-1" /></div>
                <div><Label>Tier</Label>
                  <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select tier" /></SelectTrigger>
                  <SelectContent>{['T1','T2','T3','T4'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
                </div>
                <div><Label>Google Sheet URL</Label>
                  <div className="flex gap-2 mt-1"><Input placeholder="https://docs.google.com/spreadsheets/..." className="flex-1" /><button className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-xs font-semibold">Validate</button></div>
                </div>
                <div><Label>Video Folder Path</Label><Input placeholder="/media/channel-name" className="mt-1" /></div>
                <div><Label>IXBrowser Profile</Label>
                  <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select profile" /></SelectTrigger>
                  <SelectContent>{ixProfiles.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      <div className="flex items-center gap-2"><span className={`status-dot ${p.status === 'open' ? 'status-dot-online' : 'status-dot-offline'}`} />{p.name} ({p.id})</div>
                    </SelectItem>
                  ))}</SelectContent></Select>
                </div>
                <div><Label>Daily Upload Limit</Label><Input type="number" placeholder="2" className="mt-1" /></div>
                <div><Label>Publish Times</Label><Input placeholder="09:00, 15:00" className="mt-1" /></div>
                <div><Label>Drive Longs Folder ID</Label><Input placeholder="drive_folder_id" className="mt-1 font-mono text-xs" /></div>
                <div><Label>Drive Shorts Folder ID</Label><Input placeholder="drive_folder_id" className="mt-1 font-mono text-xs" /></div>
              </TabsContent>

              <TabsContent value="team" className="space-y-3 mt-3">
                <div><Label>Manager Name</Label><Input placeholder="e.g. Ahmed" className="mt-1" /></div>
                <div><Label>Editor Name</Label><Input placeholder="e.g. Ali Raza" className="mt-1" /></div>
                <div><Label>Editor Email</Label><Input type="email" placeholder="editor@email.com" className="mt-1" /></div>
                <div><Label>Editor Salary</Label><Input type="number" placeholder="400" className="mt-1" /></div>
                <div><Label>Salary Currency</Label>
                  <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select currency" /></SelectTrigger>
                  <SelectContent>{['USD','PKR','AED'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
                </div>
                <div><Label>Salary Pay Date (1–28)</Label><Input type="number" min={1} max={28} placeholder="1" className="mt-1" /></div>
              </TabsContent>

              <TabsContent value="proxy" className="space-y-3 mt-3">
                <div><Label>Proxy Address</Label><Input placeholder="ip:port" className="mt-1 font-mono text-xs" /></div>
                <div><Label>Username</Label><Input placeholder="proxy_user" className="mt-1" /></div>
                <div><Label>Password</Label><Input type="password" placeholder="••••••" className="mt-1" /></div>
                <div><Label>Provider</Label>
                  <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select provider" /></SelectTrigger>
                  <SelectContent>{['Bright Data','DataImpulse','Oxylabs','IPRoyal','Smartproxy'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select>
                </div>
                <div><Label>Proxy Type</Label>
                  <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>{['residential','datacenter','mobile'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
                </div>
                <div><Label>Buy Date</Label><Input type="date" className="mt-1" /></div>
                <div><Label>Price (USD/mo)</Label><Input type="number" placeholder="15" className="mt-1" /></div>
                <div><Label>Expiry Date</Label><Input type="date" className="mt-1" /></div>
              </TabsContent>

              <TabsContent value="defaults" className="space-y-3 mt-3">
                <p className="text-xs text-muted-foreground mb-2">These settings apply to every video uploaded on this channel.</p>
                {[
                  'Made for Kids', 'Age Restriction', 'Altered Content (AI)', 'Automatic Chapters',
                  'Featured Places', 'Automatic Concepts', 'Shorts Remixing', 'Ratings Visible',
                  'Add End Screen', 'Add Cards', 'A/B Testing',
                ].map(label => (
                  <div key={label} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
                    <span className="text-xs">{label}</span>
                    <Switch className="scale-75" />
                  </div>
                ))}
                <div><Label>Caption Certification</Label>
                  <Select><SelectTrigger className="mt-1"><SelectValue placeholder="None" /></SelectTrigger>
                  <SelectContent>{['None','DWMRS','EIA-608'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
                </div>
                <div><Label>Video Location</Label><Input placeholder="City name" className="mt-1" /></div>
                <div><Label>License</Label>
                  <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Standard" /></SelectTrigger>
                  <SelectContent>{['Standard','Creative Commons'].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select>
                </div>
                <div><Label>Category</Label>
                  <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Entertainment" /></SelectTrigger>
                  <SelectContent>{youtubeCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
                </div>
                <div><Label>Comments Mode</Label>
                  <Select><SelectTrigger className="mt-1"><SelectValue placeholder="All" /></SelectTrigger>
                  <SelectContent>{['All','Hold for review','Off'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select>
                </div>
                <div><Label>Default Playlist</Label><Input placeholder="Playlist name" className="mt-1" /></div>
              </TabsContent>
            </Tabs>
            <button className="w-full py-2.5 mt-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-[1.02] transition-transform" onClick={() => setSheetOpen(false)}>
              Save Channel
            </button>
          </SheetContent>
        </Sheet>
      </div>

      <div className="stat-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="w-8"></th>
              {['Channel Name','Niche','Tier','IXBrowser Profile','Proxy','Daily Limit','Videos/Day','Status','Actions'].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleChannels.map((ch, i) => (
              <>
                <tr key={ch.id} className={`table-row-hover border-b border-border/50 cursor-pointer ${i % 2 === 0 ? 'bg-background/20' : ''}`} onClick={() => setExpandedChannel(expandedChannel === ch.id ? null : ch.id)}>
                  <td className="py-3 px-2">{expandedChannel === ch.id ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}</td>
                  <td className="py-3 px-3 font-medium">{ch.name}</td>
                  <td className="py-3 px-3 text-muted-foreground">{ch.niche}</td>
                  <td className="py-3 px-3"><TierBadge tier={ch.tier} /></td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className={`status-dot ${ch.ixStatus === 'open' ? 'status-dot-online' : 'status-dot-offline'}`} />
                      <span className="text-muted-foreground">{ch.ixProfile} ({ch.ixProfileId})</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{ch.proxy}</td>
                  <td className="py-3 px-3">{ch.dailyLimit}</td>
                  <td className="py-3 px-3">{ch.videosToday}/{ch.dailyLimit}</td>
                  <td className="py-3 px-3">
                    <span className={`pill ${ch.status === 'active' ? 'pill-published' : ch.status === 'paused' ? 'pill-queued' : 'pill-error'}`}>
                      {ch.status}
                    </span>
                  </td>
                  <td className="py-3 px-3" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                      <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                        {ch.status === 'paused' ? <Play className="w-4 h-4 text-success" /> : <Pause className="w-4 h-4 text-warning" />}
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedChannel === ch.id && (
                  <tr key={`${ch.id}-detail`} className="bg-background/30">
                    <td colSpan={10} className="p-4">
                      <ChannelDetailPanel channelId={ch.id} />
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
