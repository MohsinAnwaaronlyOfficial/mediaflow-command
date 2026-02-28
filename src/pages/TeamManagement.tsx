import { teamMembers, teamActivityLog } from '@/data/mockData';
import { Plus, Edit, UserCheck, UserX } from 'lucide-react';

const roleBadgeColors: Record<string, string> = {
  Owner: 'pill-uploading',
  Manager: 'pill-ready',
  Finance: 'pill-published',
  Viewer: 'pill-editing',
};

export default function TeamManagement() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team Management</h1>
          <p className="text-sm text-muted-foreground">{teamMembers.length} team members</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* Team Table */}
      <div className="stat-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            {['Name','Role','Email','Channels','Last Login','Status','Actions'].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {teamMembers.map((m, i) => (
              <tr key={m.id} className={`table-row-hover border-b border-border/50 ${i % 2 === 0 ? 'bg-background/20' : ''}`}>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{m.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <span className="font-medium">{m.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3"><span className={roleBadgeColors[m.role]}>{m.role}</span></td>
                <td className="py-3 px-3 text-muted-foreground text-xs">{m.email}</td>
                <td className="py-3 px-3 text-xs text-muted-foreground max-w-[200px]">{m.channels}</td>
                <td className="py-3 px-3 text-xs text-muted-foreground">{m.lastLogin}</td>
                <td className="py-3 px-3">
                  <span className="flex items-center gap-1.5">
                    {m.status === 'online' ? <><UserCheck className="w-3.5 h-3.5 text-success" /><span className="text-xs text-success">Online</span></> : <><UserX className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-xs text-muted-foreground">Offline</span></>}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                </td>
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
              <span className="text-xs text-muted-foreground w-28 shrink-0">{log.time}</span>
              <span className="text-xs font-semibold text-primary w-32 shrink-0">{log.user}</span>
              <span className="text-sm text-foreground">{log.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
