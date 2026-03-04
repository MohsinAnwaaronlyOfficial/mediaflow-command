import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Zap, LayoutDashboard, MonitorPlay, Film, BarChart3,
  DollarSign, HeartPulse, Users, Bell, Settings, ChevronLeft,
  ChevronRight, Search, LogOut, Clock, Command
} from 'lucide-react';
import { useRoleStore, ROLE_LABELS, type Role } from '@/stores/roleStore';
import { alerts } from '@/data/mockData';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard, roles: ['owner', 'manager'] },
  { path: '/channels', label: 'Channels', icon: MonitorPlay, roles: ['owner', 'manager'] },
  { path: '/pipeline', label: 'Video Pipeline', icon: Film, roles: ['owner', 'manager'] },
  { path: '/analytics', label: 'Analytics', icon: BarChart3, roles: ['owner', 'manager'] },
  { path: '/finance', label: 'Finance', icon: DollarSign, roles: ['owner', 'finance'] },
  { path: '/health', label: 'System Health', icon: HeartPulse, roles: ['owner'] },
  { path: '/team', label: 'Team', icon: Users, roles: ['owner'] },
  { path: '/alerts', label: 'Alerts', icon: Bell, roles: ['owner', 'manager'], badge: alerts.filter(a => a.severity === 'critical').length },
  { path: '/settings', label: 'Settings', icon: Settings, roles: ['owner'] },
];

const pageLabels: Record<string, string> = {
  '/': 'Overview', '/channels': 'Channels', '/pipeline': 'Video Pipeline',
  '/analytics': 'Analytics', '/finance': 'Finance', '/health': 'System Health',
  '/team': 'Team', '/alerts': 'Alerts', '/settings': 'Settings',
};

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-xs text-muted-foreground">{time} PKT</span>;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { role, setRole } = useRoleStore();
  const location = useLocation();
  const navigate = useNavigate();

  const visibleItems = navItems.filter(item => item.roles.includes(role));
  const currentLabel = pageLabels[location.pathname] || 'Dashboard';

  const handleRoleChange = (newRole: string) => {
    setRole(newRole as Role);
    if (newRole === 'finance') navigate('/finance');
    else navigate('/');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
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
                {!collapsed && item.badge && item.badge > 0 && (
                  <span className="ml-auto bg-destructive text-destructive-foreground text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse-glow">
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
                  <span className="text-[10px] font-bold text-primary">SM</span>
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-foreground font-medium truncate block">Sardar Mohsin</span>
                  <span className="text-[10px] text-muted-foreground">Owner</span>
                </div>
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 shrink-0 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-foreground">{currentLabel}</h1>
            <span className="text-xs text-muted-foreground">/ {currentLabel}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-lg text-xs text-muted-foreground cursor-pointer hover:bg-muted transition-colors">
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="ml-2 px-1.5 py-0.5 bg-background rounded text-[10px] border border-border flex items-center gap-0.5"><Command className="w-2.5 h-2.5" />K</kbd>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <LiveClock />
            </div>
            <NavLink to="/alerts" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              {alerts.filter(a => a.severity === 'critical').length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse-glow" />
              )}
            </NavLink>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors">
              <LogOut className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
