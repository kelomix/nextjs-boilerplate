import { useState, useEffect, useCallback } from 'react';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { EmptyState, timeAgo } from '@/components/ui';

interface AnalyticsEvent {
  id: string;
  event: string;
  value: number | null;
  recorded_at: string;
  created_at: string;
}

export function AnalyticsModule() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('analytics').select('*').order('recorded_at', { ascending: false }).limit(20);
    setEvents((data ?? []) as AnalyticsEvent[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2.5 pt-2">
        <div className="w-10 h-10 rounded-xl bg-accent-500/15 border border-accent-500/20 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-accent-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Analytics</h1>
          <p className="text-slate-500 text-xs">Performance metrics and events</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          <div className="h-16 glass-card shimmer-bg" />
          <div className="h-16 glass-card shimmer-bg" />
        </div>
      ) : events.length > 0 ? (
        <div className="glass-card p-4 space-y-3">
          {events.map((evt) => (
            <div key={evt.id} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-400 mt-1.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-slate-300 text-sm">{evt.event}</p>
                {evt.value !== null && <p className="text-accent-400 text-xs font-medium mt-0.5">{evt.value}</p>}
                <p className="text-slate-600 text-[10px] mt-0.5">{timeAgo(evt.recorded_at)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState icon={TrendingUp} title="No analytics data yet" description="Performance metrics will be tracked here as Kelo monitors your channels." />
      )}
    </div>
  );
}
