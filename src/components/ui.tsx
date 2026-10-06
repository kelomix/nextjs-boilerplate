import { type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingScreen({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-900">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center animate-pulse-glow">
          <span className="text-3xl font-black bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">K</span>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2 text-slate-400 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" />
        {message}
      </div>
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-slate-500" />
      </div>
      <h3 className="text-slate-300 font-semibold text-base mb-1">{title}</h3>
      {description && <p className="text-slate-500 text-sm max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: 'bg-warning-500/15 text-warning-400',
    approved: 'bg-success-500/15 text-success-400',
    rejected: 'bg-error-500/15 text-error-400',
    expired: 'bg-slate-700 text-slate-400',
    active: 'bg-success-500/15 text-success-400',
    completed: 'bg-success-500/15 text-success-400',
    'in-progress': 'bg-primary-500/15 text-primary-400',
    new: 'bg-secondary-500/15 text-secondary-400',
    idle: 'bg-slate-700 text-slate-400',
    running: 'bg-primary-500/15 text-primary-400',
    paused: 'bg-warning-500/15 text-warning-400',
    error: 'bg-error-500/15 text-error-400',
    shipped: 'bg-accent-500/15 text-accent-400',
    exploring: 'bg-secondary-500/15 text-secondary-400',
    planning: 'bg-warning-500/15 text-warning-400',
    archived: 'bg-slate-700 text-slate-400',
    blocked: 'bg-error-500/15 text-error-400',
    cancelled: 'bg-slate-700 text-slate-400',
    disconnected: 'bg-slate-700 text-slate-400',
    connected: 'bg-success-500/15 text-success-400',
  };

  return (
    <span className={`badge ${colors[status] ?? 'bg-slate-700 text-slate-400'}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status.replace(/-/g, ' ')}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    low: 'bg-slate-700 text-slate-300',
    medium: 'bg-secondary-500/15 text-secondary-400',
    high: 'bg-warning-500/15 text-warning-400',
    critical: 'bg-error-500/15 text-error-400',
  };

  return (
    <span className={`badge ${colors[priority] ?? colors.medium}`}>
      {priority}
    </span>
  );
}

export function formatDate(date: string | null): string {
  if (!date) return '—';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatTime(date: string | null): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function timeAgo(date: string | null): string {
  if (!date) return '—';
  const now = new Date();
  const d = new Date(date);
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(date);
}
