import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, MonitorPlay, ListVideo, BarChart3, 
  Cpu, DollarSign, Bell, Users, Settings, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';
import { useRoleStore, ROLE_LABELS, type Role } from '@/stores/roleStore';
import { alerts } from '@/data/mockData';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const navItems = [
  { path: '/', label: 'Command Center', icon: LayoutDashboard, roles: ['owner', 'manager'] },
  { path: '/channels', label: 'Channels', icon: MonitorPlay, roles: ['owner', 'manager'] },
  { path: '/queue', label: 'Video Queue', icon: ListVideo, roles: ['owner', 'manager'] },
  { path: '/analytics', label: 'Analytics', icon: BarChart3, roles: ['owner', 'manager'] },
  { path: '/system', label: 'System Control', icon: Cpu, roles: ['owner'] },
  { path: '/finance', label: 'Finance', icon: DollarSign, roles: ['owner', 'finance'] },
  { path: '/alerts', label: 'Alerts', icon: Bell, roles: ['owner', 'manager'], badge: alerts.filter(a => a.severity === 'critical').length },
  { path: '/team', label: 'Team', icon: Users, roles: ['owner'] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { role, setRole } = useRoleStore();
  const location = useLocation();
  const navigate = useNavigate();

  const visibleItems = navItems.filter(item => item.roles.includes(role));

  const handleRoleChange = (newRole: string) => {
    setRole(newRole as Role);
    if (newRole === 'viewer') navigate('/viewer');
    else if (newRole === 'reception') navigate('/reception');
    else navigate('/');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-[60px]' : 'w-[240px]'} bg-sidebar border-r border-border flex flex-col transition-all duration-300 shrink-0`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-3 border-b border-border gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-foreground leading-tight">Unity Media</div>
              <div className="text-xs text-muted-foreground leading-tight">Flow</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto scrollbar-thin">
          {visibleItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${
                  isActive
                    ? 'bg-sidebar-accent text-foreground before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[3px] before:bg-primary before:rounded-r'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && item.badge && item.badge > 0 && (
                  <span className="ml-auto bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-border p-2 space-y-2">
          {!collapsed && (
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full bg-sidebar-accent border-border text-xs h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(ROLE_LABELS) as Role[]).map(r => (
                  <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <div className="flex items-center gap-2 px-2">
            {!collapsed && (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">SM</span>
                </div>
                <span className="text-xs text-muted-foreground truncate">Sardar Mohsin</span>
              </div>
            )}
            <button 
              onClick={() => setCollapsed(!collapsed)} 
              className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors shrink-0"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
