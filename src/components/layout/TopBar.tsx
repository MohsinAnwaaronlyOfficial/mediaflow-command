import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Bell, Clock, Command, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

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

export default function TopBar() {
  const location = useLocation();
  const { logout } = useAuth();
  const currentLabel = pageLabels[location.pathname] || 'Dashboard';

  return (
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
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse-glow" />
        </NavLink>
        <button onClick={logout} className="p-2 rounded-lg hover:bg-muted transition-colors">
          <LogOut className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
