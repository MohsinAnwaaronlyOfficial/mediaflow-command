import { Loader2 } from 'lucide-react';

type Status = 'active' | 'frozen' | 'uploading' | 'error' | 'paused' | 'inactive' | 'setup_required';

const config: Record<Status, { dot: string; pill: string; label: string; animate?: boolean }> = {
  active: { dot: 'status-dot-online', pill: 'pill-published', label: 'ACTIVE' },
  frozen: { dot: 'status-dot-error', pill: 'pill-error', label: 'FROZEN' },
  uploading: { dot: 'status-dot-online animate-pulse-glow', pill: 'pill-uploading', label: 'UPLOADING', animate: true },
  error: { dot: 'status-dot-error', pill: 'pill-error', label: 'ERROR' },
  paused: { dot: 'status-dot-warning', pill: 'pill-queued', label: 'PAUSED' },
  inactive: { dot: 'status-dot-offline', pill: 'pill-editing', label: 'INACTIVE' },
  setup_required: { dot: 'status-dot-warning', pill: 'pill-queued', label: 'SETUP' },
};

export default function StatusBadge({ status }: { status: string }) {
  const c = config[status as Status] || config.inactive;
  return (
    <span className={`${c.pill} flex items-center gap-1.5`}>
      {c.animate && <Loader2 className="w-3 h-3 animate-spin" />}
      <span className={`status-dot ${c.dot}`} />
      {c.label}
    </span>
  );
}
