import { NavLink, useLocation } from 'react-router-dom';
import {
  Zap, LayoutDashboard, MonitorPlay, Film, BarChart3,
  DollarSign, HeartPulse, Users, Bell, Settings, ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useRoleStore, ROLE_LABELS, type Role } from '@/stores/roleStore';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard, roles: ['owner', 'manager'] },
  { path: '/channels', label: 'Channels', icon: MonitorPlay, roles: ['owner', 'manager'] },
  { path: '/pipeline', label: 'Pipeline', icon: Film, roles: ['owner', 'manager'] },
  { path: '/analytics', label: 'Analytics', icon: BarChart3, roles: ['owner', 'manager'] },
  { path: '/finance', label: 'Finance', icon: DollarSign, roles: ['owner', 'finance'] },
  { path: '/health', label: 'System Health', icon: HeartPulse, roles: ['owner'] },
  { path: '/team', label: 'Team', icon: Users, roles: ['owner'] },
  { path: '/alerts', label: 'Alerts', icon: Bell, roles: ['owner', 'manager'] },
  { path: '/settings', label: 'Settings', icon: Settings, roles: ['owner'] },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { role, setRole } = useRoleStore();
  const { logout } = useAuth();
  const location = useLocation();

  const visibleItems = navItems.filter(item => item.roles.includes(role));

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-60'} bg-sidebar border-r border-border flex flex-col transition-all duration-300 shrink-0`}>
      {/* Logo */}
      <div className="h-16 flex items-center px-3 border-b border-border gap-2">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-[hsl(24,100%,50%)] flex items-center justify-center shrink-0 glow-orange">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-foreground leading-tight tracking-tight">UMF</div>
            <div className="text-[10px] text-muted-foreground leading-tight">Unity Media Flow</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto scrollbar-thin">
        {visibleItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative group ${
                isActive
                  ? 'bg-primary/10 text-primary before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[3px] before:bg-primary before:rounded-r'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground'
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : ''}`} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border p-2 space-y-2">
        {!collapsed && (
          <Select value={role} onValueChange={(v) => setRole(v as Role)}>
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
            <button onClick={logout} className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-primary">SM</span>
              </div>
              <div className="min-w-0">
                <span className="text-xs text-foreground font-medium truncate block">Sardar Mohsin</span>
                <span className="text-[10px] text-muted-foreground">Owner</span>
              </div>
            </button>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors shrink-0"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
