import { useState } from 'react';
import { Zap, Loader2, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      // Mock: always succeed for now
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="stat-card !p-8 space-y-6">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary to-[hsl(24,100%,50%)] flex items-center justify-center glow-orange">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Unity Media Flow</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Commander</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Username</label>
              <Input placeholder="Enter your username" className="bg-muted/30 border-border" defaultValue="mohsin" />
            </div>
            <div className="relative">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Password</label>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="bg-muted/30 border-border pr-10"
                defaultValue="password"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-xs text-destructive font-medium animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary to-[hsl(24,100%,50%)] text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 glow-orange"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating...</> : 'LOGIN →'}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground cursor-pointer hover:text-primary transition-colors">
            Forgot password?
          </p>
        </div>

        <p className="text-center text-[10px] text-muted-foreground mt-6">
          Unity Media Flow © 2026 — All Rights Reserved
        </p>
      </div>
    </div>
  );
}
