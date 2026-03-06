import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Download, AlertTriangle, Trash2 } from 'lucide-react';
import { systemApi } from '@/api/system';
import { toast } from 'sonner';

export default function Settings() {
  const handleTestConnection = async (name: string) => {
    try {
      if (name === 'Slack') await systemApi.testSlack();
      toast.success(`${name} connection OK`);
    } catch {
      toast.error(`${name} connection failed`);
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">System configuration & integrations</p>
      </div>

      <Tabs defaultValue="system">
        <TabsList className="bg-muted/30 h-auto p-1 flex-wrap gap-0.5">
          <TabsTrigger value="system" className="text-xs py-1.5">System</TabsTrigger>
          <TabsTrigger value="youtube" className="text-xs py-1.5">YouTube Defaults</TabsTrigger>
          <TabsTrigger value="integrations" className="text-xs py-1.5">Integrations</TabsTrigger>
          <TabsTrigger value="security" className="text-xs py-1.5">Security</TabsTrigger>
          <TabsTrigger value="backups" className="text-xs py-1.5">Backups</TabsTrigger>
          <TabsTrigger value="advanced" className="text-xs py-1.5">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-4 mt-4">
          <div className="stat-card space-y-4">
            <h3 className="text-sm font-semibold">System Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-xs">Company Name</Label><Input value="Unity Media Flow" readOnly className="mt-1" /></div>
              <div><Label className="text-xs">Default Timezone</Label><Input value="Asia/Karachi" readOnly className="mt-1" /></div>
              <div><Label className="text-xs">Default Upload Visibility</Label>
                <Select defaultValue="unlisted"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="unlisted">Unlisted</SelectItem><SelectItem value="private">Private</SelectItem></SelectContent></Select>
              </div>
              <div><Label className="text-xs">Upload Retry Attempts</Label><Input type="number" defaultValue={3} className="mt-1" /></div>
              <div><Label className="text-xs">Stale Upload Timeout (min)</Label><Input type="number" defaultValue={45} className="mt-1" /></div>
              <div><Label className="text-xs">Drive Cleanup Delay (hours)</Label><Input type="number" defaultValue={48} className="mt-1" /></div>
              <div><Label className="text-xs">Download Directory</Label><Input value="/home/umf/downloads" readOnly className="mt-1 font-mono text-xs" /></div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="youtube" className="space-y-4 mt-4">
          <div className="stat-card space-y-4">
            <h3 className="text-sm font-semibold">Global YouTube Defaults</h3>
            <p className="text-xs text-muted-foreground">Per-channel settings override these</p>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-xs">Default YouTube Category</Label>
                <Select defaultValue="Entertainment"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{['Entertainment','Education','News & Politics','Science & Technology','People & Blogs'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
              </div>
              <div><Label className="text-xs">Default Language</Label><Input defaultValue="English" className="mt-1" /></div>
              <div><Label className="text-xs">Default Location</Label><Input defaultValue="United States" className="mt-1" /></div>
              <div><Label className="text-xs">Default License</Label>
                <Select defaultValue="standard"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="standard">Standard YouTube License</SelectItem><SelectItem value="cc">Creative Commons</SelectItem></SelectContent></Select>
              </div>
              <div><Label className="text-xs">Comments Mode</Label>
                <Select defaultValue="all"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="review">Hold for review</SelectItem><SelectItem value="off">Off</SelectItem></SelectContent></Select>
              </div>
              <div><Label className="text-xs">Shorts Remixing</Label>
                <Select defaultValue="allow_all"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="allow_all">Allow all</SelectItem><SelectItem value="attribution">With attribution</SelectItem><SelectItem value="dont_allow">Don't allow</SelectItem></SelectContent></Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['End Screen Template', 'Cards Default', 'Auto Chapters', 'Notify Subscribers', 'Embedding Allowed', 'Paid Promotion'].map(label => (
                <div key={label} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <span className="text-xs">{label}</span>
                  <Switch defaultChecked={label.includes('End') || label.includes('Cards') || label.includes('Auto') || label.includes('Notify') || label.includes('Embedding')} />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'IXBrowser', color: '🟠', status: 'Connected (172.20.240.1:53200)', detail: '16 profiles detected • Last sync: 3 min ago' },
              { name: 'Google Drive & Sheets', color: '🟢', status: 'Authenticated as umf@gmail.com', detail: '16 channels configured' },
              { name: 'Slack', color: '🟣', status: '6/6 channels connected', detail: 'Last message: 15 min ago' },
            ].map(i => (
              <div key={i.name} className="stat-card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{i.color}</span>
                  <span className="text-sm font-semibold">{i.name}</span>
                </div>
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle className="w-3.5 h-3.5 text-success" />
                  <span className="text-xs text-foreground">{i.status}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{i.detail}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleTestConnection(i.name)} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-xs font-semibold">Test Connection</button>
                  <button className="px-3 py-1.5 bg-muted text-muted-foreground rounded-lg text-xs font-semibold">Settings</button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-4">
          <div className="stat-card space-y-4">
            <h3 className="text-sm font-semibold">Security Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-xs">Current Password</Label><Input type="password" placeholder="••••••••" className="mt-1" /></div>
              <div><Label className="text-xs">New Password</Label><Input type="password" placeholder="••••••••" className="mt-1" /></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div><span className="text-xs font-semibold">Two-Factor Authentication</span><p className="text-[10px] text-muted-foreground">Adds extra security to your account</p></div>
              <Switch />
            </div>
          </div>
          <div className="stat-card">
            <h3 className="text-sm font-semibold mb-3">Active Sessions</h3>
            <div className="space-y-2">
              {[{ device: 'Chrome on Windows', ip: '192.168.1.105', time: 'Current session' },
                { device: 'Firefox on macOS', ip: '10.0.0.42', time: '2 days ago' }
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div><span className="text-xs font-semibold">{s.device}</span><p className="text-[10px] text-muted-foreground">{s.ip} • {s.time}</p></div>
                  {i > 0 && <button className="text-xs text-destructive hover:underline">Revoke</button>}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="backups" className="space-y-4 mt-4">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold">Backup Management</h3>
                <p className="text-xs text-muted-foreground">Schedule: Daily 2:00 AM PKT</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
                Run Backup Now
              </button>
            </div>
            <div className="space-y-2">
              {[
                { date: '2026-03-06 02:00 AM', size: '2.3GB', status: '✅' },
                { date: '2026-03-05 02:00 AM', size: '2.2GB', status: '✅' },
                { date: '2026-03-04 02:00 AM', size: '2.1GB', status: '✅' },
                { date: '2026-03-03 02:00 AM', size: '2.3GB', status: '✅' },
                { date: '2026-03-02 02:00 AM', size: '2.0GB', status: '✅' },
              ].map((b, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{b.status}</span>
                    <span className="text-xs font-medium">{b.date}</span>
                    <span className="text-xs text-muted-foreground">{b.size}</span>
                  </div>
                  <button className="flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"><Download className="w-3 h-3" /> Download</button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-4">
          <div className="stat-card space-y-3">
            <h3 className="text-sm font-semibold">Advanced Controls</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-muted/20 rounded-lg text-left hover:bg-muted/30 transition-colors">
                <span className="text-xs font-semibold block">Clear Download Cache</span>
                <span className="text-[10px] text-muted-foreground">Remove temporary download files</span>
              </button>
              <button className="p-3 bg-muted/20 rounded-lg text-left hover:bg-muted/30 transition-colors">
                <span className="text-xs font-semibold block">Database Maintenance</span>
                <span className="text-[10px] text-muted-foreground">Vacuum and optimize SQLite</span>
              </button>
              <button className="p-3 bg-muted/20 rounded-lg text-left hover:bg-muted/30 transition-colors">
                <span className="text-xs font-semibold block">Export System Config</span>
                <span className="text-[10px] text-muted-foreground">Download full configuration</span>
              </button>
              <button className="p-3 bg-muted/20 rounded-lg text-left hover:bg-muted/30 transition-colors">
                <span className="text-xs font-semibold block">PM2 Dashboard</span>
                <span className="text-[10px] text-muted-foreground">Open PM2 monitoring</span>
              </button>
            </div>
          </div>
          <div className="stat-card border-destructive/30">
            <h3 className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Danger Zone</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-left hover:bg-destructive/20 transition-colors">
                <span className="text-xs font-semibold text-destructive block flex items-center gap-1"><Trash2 className="w-3 h-3" /> Reset All Statistics</span>
                <span className="text-[10px] text-muted-foreground">Clear all analytics data</span>
              </button>
              <button className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-left hover:bg-destructive/20 transition-colors">
                <span className="text-xs font-semibold text-destructive block flex items-center gap-1"><Trash2 className="w-3 h-3" /> Clear Video Queue</span>
                <span className="text-[10px] text-muted-foreground">Remove all pending uploads</span>
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
