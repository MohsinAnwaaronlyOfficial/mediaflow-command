type HealthStatus = 'ok' | 'warning' | 'error' | 'unknown';

const dotClass: Record<HealthStatus, string> = {
  ok: 'status-dot-online',
  warning: 'status-dot-warning',
  error: 'status-dot-error',
  unknown: 'status-dot-offline',
};

interface HealthDotProps {
  status?: HealthStatus;
  ok?: boolean; // shorthand: true = ok, false = error
}

export default function HealthDot({ status, ok }: HealthDotProps) {
  const resolved = status || (ok === undefined ? 'unknown' : ok ? 'ok' : 'error');
  return <span className={`status-dot ${dotClass[resolved as HealthStatus] || dotClass.unknown}`} />;
}
