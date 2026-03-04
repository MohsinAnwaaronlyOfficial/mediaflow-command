import { teamMembers, teamActivityLog, partners, channels } from '@/data/mockData';
import { Plus, Edit, UserCheck, UserX } from 'lucide-react';

const roleBadgeColors: Record<string, string> = {
  Owner: 'pill-uploading',
  Editor: 'pill-ready',
  Manager: 'pill-published',
};

export default function Team() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-sm text-muted-foreground">{teamMembers.length} team members</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {partners.map(p => (
          <div key={p.id} className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{p.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div>
                <span className="font-semibold text-sm block">{p.name}</span>
                <span className="text-xs text-muted-foreground">{p.title}</span>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Equity</span><span className="font-bold text-primary">{p.equity}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">This Month</span><span className="font-bold text-success">${p.allTimeEarnings > 0 ? Math.floor(p.allTimeEarnings / 12) : 0}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">All-Time</span><span className="font-semibold">${p.allTimeEarnings.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Last Login</span><span>{p.lastLogin}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Channels</span><span>{p.channelsManaged}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Management */}
      <div className="stat-card overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Editor Management</h3>
          <button className="px-3 py-1.5 bg-success/20 text-success rounded-lg text-xs font-semibold hover:bg-success/30 transition-colors">
            Process Salaries
          </button>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Name','Role','Channels','Salary/mo','Status','Last Login','Actions'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {teamMembers.map((m, i) => (
              <tr key={m.id} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-primary">{m.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <span className="font-medium">{m.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3"><span className={roleBadgeColors[m.role] || 'pill-editing'}>{m.role}</span></td>
                <td className="py-3 px-3 text-xs text-muted-foreground max-w-[200px]">{m.channels}</td>
                <td className="py-3 px-3 text-xs">
                  {m.role === 'Editor' ? (
                    <span className="font-semibold text-primary">
                      ${channels.find(c => c.team.editorName === m.name)?.team.editorSalary || '—'}
                    </span>
                  ) : '—'}
                </td>
                <td className="py-3 px-3">
                  <span className="flex items-center gap-1.5">
                    {m.status === 'online' ? <><UserCheck className="w-3.5 h-3.5 text-success" /><span className="text-xs text-success">Online</span></> : <><UserX className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-xs text-muted-foreground">Offline</span></>}
                  </span>
                </td>
                <td className="py-3 px-3 text-xs text-muted-foreground">{m.lastLogin}</td>
                <td className="py-3 px-3"><button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Edit className="w-4 h-4 text-muted-foreground" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Activity Log */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Activity Log</h3>
        <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin">
          {teamActivityLog.map((log, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
              <span className="text-xs text-muted-foreground w-36 shrink-0 font-mono">{log.time}</span>
              <span className="text-xs font-semibold text-primary w-32 shrink-0">{log.user}</span>
              <span className="text-sm text-foreground">{log.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
