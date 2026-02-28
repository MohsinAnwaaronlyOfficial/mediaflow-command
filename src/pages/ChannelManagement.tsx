import { useState } from 'react';
import { channels, managerChannels } from '@/data/mockData';
import { useRoleStore } from '@/stores/roleStore';
import { Edit, Pause, Play, Plus, X, Check } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

export default function ChannelManagement() {
  const { role } = useRoleStore();
  const [sheetOpen, setSheetOpen] = useState(false);
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
          <SheetContent className="bg-card border-border w-[400px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Add New Channel</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
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
              <div><Label>Proxy</Label><Input placeholder="ip:port" className="mt-1" /></div>
              <div><Label>Daily Upload Limit</Label><Input type="number" placeholder="2" className="mt-1" /></div>
              <div><Label>Publish Times</Label><Input placeholder="09:00, 15:00" className="mt-1" /></div>
              <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-[1.02] transition-transform" onClick={() => setSheetOpen(false)}>
                Save Channel
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="stat-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {['Channel Name','Niche','Tier','IXBrowser Profile','Proxy','Daily Limit','Videos/Day','Status','Actions'].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleChannels.map((ch, i) => (
              <tr key={ch.id} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
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
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                    <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                      {ch.status === 'paused' ? <Play className="w-4 h-4 text-success" /> : <Pause className="w-4 h-4 text-warning" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
