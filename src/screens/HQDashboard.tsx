import { useState, useEffect, useCallback } from 'react';
import {
  Sun, Moon, AlertTriangle, Target, CheckCircle2, TrendingUp,
  Zap, Activity, ArrowRight, RefreshCw, Sparkles, ListTodo,
  Film, Radar, DollarSign, ShoppingBag, Trophy, BarChart3,
  Handshake, Brain, Cpu, Lightbulb
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { StatusBadge, PriorityBadge, timeAgo, EmptyState } from '@/components/ui';
import type { KeloAlert, KeloTask, KeloOpportunity, AgentActivity, DailyBrief } from '@/lib/types';

type Tab = 'hq' | 'kelo' | 'ideas' | 'memory' | 'security';

export function HQDashboard({
  onOpenModule,
  onNavigate,
}: {
  onOpenModule: (id: string) => void;
  onNavigate: (tab: Tab) => void;
}) {
  const { user } = useAuth();
  const [brief, setBrief] = useState<DailyBrief | null>(null);
  const [alerts, setAlerts] = useState<KeloAlert[]>([]);
  const [tasks, setTasks] = useState<KeloTask[]>([]);
  const [opportunities, setOpportunities] = useState<KeloOpportunity[]>([]);
  const [activity, setActivity] = useState<AgentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [alertsRes, tasksRes, oppsRes, activityRes, briefRes] = await Promise.all([
      supabase.from('kelo_alerts').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('kelo_tasks').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('kelo_opportunities').select('*').order('created_at', { ascending: false }).limit(3),
      supabase.from('agent_activity').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('kelo_daily_briefs').select('*').eq('brief_date', new Date().toISOString().split('T')[0]).maybeSingle(),
    ]);

    setAlerts(alertsRes.data ?? []);
    setTasks(tasksRes.data ?? []);
    setOpportunities(oppsRes.data ?? []);
    setActivity(activityRes.data ?? []);
    setBrief(briefRes.data ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const GreetingIcon = hour < 18 ? Sun : Moon;

  const quickActions: { label: string; icon: React.ElementType; moduleId?: string; tab?: Tab; color: string }[] = [
    { label: 'Content', icon: Film, moduleId: 'content', color: 'text-primary-400' },
    { label: 'Viral Radar', icon: Radar, moduleId: 'viral-radar', color: 'text-secondary-400' },
    { label: 'Money', icon: DollarSign, moduleId: 'money', color: 'bg-accent-400' },
    { label: 'Shopify', icon: ShoppingBag, moduleId: 'shopify', color: 'text-success-400' },
    { label: 'Sports AI', icon: Trophy, moduleId: 'sports-ai', color: 'text-warning-400' },
    { label: 'Kalshi AI', icon: TrendingUp, moduleId: 'kalshi-ai', color: 'text-primary-400' },
    { label: 'Sponsors', icon: Handshake, moduleId: 'sponsors', color: 'text-secondary-400' },
    { label: 'Analytics', icon: BarChart3, moduleId: 'analytics', color: 'text-accent-400' },
    { label: 'Mission Control', icon: Cpu, tab: undefined, moduleId: undefined, color: 'text-primary-400' },
    { label: 'Ideas', icon: Lightbulb, tab: 'ideas', color: 'text-warning-400' },
    { label: 'Memory', icon: Brain, tab: 'memory', color: 'text-secondary-400' },
    { label: 'Security', icon: AlertTriangle, tab: 'security', color: 'text-error-400' },
  ];

  const handleAction = (action: typeof quickActions[number]) => {
    if (action.moduleId) onOpenModule(action.moduleId);
    else if (action.tab) onNavigate(action.tab);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Greeting */}
      <div className="pt-2">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
          <GreetingIcon className="w-4 h-4 text-warning-400" />
          <span>{greeting}, Owner — welcome back</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {user?.email?.split('@')[0] ?? 'Owner'}
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Kelo Daily Briefing */}
      <section>
        <div className="glass-card p-5 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-400" />
                <h2 className="section-title text-primary-400">Kelo Daily Briefing</h2>
              </div>
              <button onClick={loadData} className="text-slate-500 hover:text-slate-300 transition-colors">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 rounded shimmer-bg" />
                <div className="h-4 rounded shimmer-bg w-3/4" />
              </div>
            ) : brief ? (
              <p className="text-slate-300 text-sm leading-relaxed">{brief.summary}</p>
            ) : (
              <div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  No briefing has been generated yet for today. Kelo will prepare your daily briefing once there's enough activity to summarize.
                </p>
                <button
                  onClick={() => onNavigate('kelo')}
                  className="mt-3 inline-flex items-center gap-1.5 text-primary-400 text-sm font-medium hover:gap-2.5 transition-all"
                >
                  Ask Kelo for a briefing
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Today's Priorities */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-secondary-400" />
          <h2 className="section-title">Today's Priorities</h2>
        </div>
        <div className="space-y-2">
          {loading ? (
            <>
              <div className="h-14 glass-card shimmer-bg" />
              <div className="h-14 glass-card shimmer-bg" />
            </>
          ) : tasks.length > 0 ? (
            tasks.slice(0, 3).map((task) => (
              <div key={task.id} className="glass-card-hover p-3.5 flex items-center gap-3">
                <div className={`w-2 h-10 rounded-full ${
                  task.priority === 'critical' ? 'bg-error-500' :
                  task.priority === 'high' ? 'bg-warning-500' :
                  task.priority === 'medium' ? 'bg-secondary-500' : 'bg-slate-600'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge status={task.status} />
                    <PriorityBadge priority={task.priority} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              icon={ListTodo}
              title="No priorities yet"
              description="Tasks assigned to Kelo agents will appear here."
            />
          )}
        </div>
      </section>

      {/* Alerts */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-warning-400" />
          <h2 className="section-title">Alerts</h2>
          {alerts.length > 0 && (
            <span className="badge bg-warning-500/15 text-warning-400 ml-auto">{alerts.length}</span>
          )}
        </div>
        <div className="space-y-2">
          {loading ? (
            <div className="h-14 glass-card shimmer-bg" />
          ) : alerts.length > 0 ? (
            alerts.map((alert) => (
              <div key={alert.id} className="glass-card-hover p-3.5 flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  alert.severity === 'critical' ? 'bg-error-500/15' :
                  alert.severity === 'high' ? 'bg-warning-500/15' : 'bg-secondary-500/15'
                }`}>
                  <AlertTriangle className={`w-4 h-4 ${
                    alert.severity === 'critical' ? 'text-error-400' :
                    alert.severity === 'high' ? 'text-warning-400' : 'text-secondary-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{alert.title}</p>
                  {alert.message && <p className="text-slate-400 text-xs mt-0.5 line-clamp-2">{alert.message}</p>}
                  <p className="text-slate-600 text-[10px] mt-1">{timeAgo(alert.created_at)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-card p-3.5 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success-400 flex-shrink-0" />
              <p className="text-slate-400 text-sm">All clear — no active alerts.</p>
            </div>
          )}
        </div>
      </section>

      {/* Opportunities */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-accent-400" />
          <h2 className="section-title">Opportunities</h2>
        </div>
        <div className="space-y-2">
          {loading ? (
            <div className="h-16 glass-card shimmer-bg" />
          ) : opportunities.length > 0 ? (
            opportunities.map((opp) => (
              <div key={opp.id} className="glass-card-hover p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{opp.title}</p>
                    {opp.description && <p className="text-slate-400 text-xs mt-1 line-clamp-2">{opp.description}</p>}
                    {opp.potential_value && (
                      <p className="text-accent-400 text-xs font-medium mt-1.5">{opp.potential_value}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <StatusBadge status={opp.status} />
                    <span className="text-[10px] text-slate-600">{Math.round(opp.confidence * 100)}% confidence</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-card p-3.5 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
              <p className="text-slate-400 text-sm">Kelo is scanning for opportunities.</p>
            </div>
          )}
        </div>
      </section>

      {/* Tasks */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <ListTodo className="w-4 h-4 text-primary-400" />
          <h2 className="section-title">Tasks</h2>
        </div>
        <div className="space-y-2">
          {loading ? (
            <div className="h-14 glass-card shimmer-bg" />
          ) : tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="glass-card-hover p-3.5 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  task.status === 'completed' ? 'bg-success-500/15' :
                  task.status === 'in-progress' ? 'bg-primary-500/15' : 'bg-white/5'
                }`}>
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-success-400" />
                  ) : (
                    <Zap className={`w-4 h-4 ${
                      task.status === 'in-progress' ? 'text-primary-400' : 'text-slate-400'
                    }`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-white'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StatusBadge status={task.status} />
                    <span className="text-[10px] text-slate-600">{timeAgo(task.created_at)}</span>
                  </div>
                </div>
                {task.progress > 0 && task.status !== 'completed' && (
                  <div className="text-xs text-primary-400 font-medium">{Math.round(task.progress)}%</div>
                )}
              </div>
            ))
          ) : (
            <EmptyState
              icon={ListTodo}
              title="No tasks yet"
              description="Tasks will appear here as Kelo agents are assigned work."
            />
          )}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-slate-400" />
          <h2 className="section-title">Recent Activity</h2>
        </div>
        <div className="glass-card p-4">
          {loading ? (
            <div className="space-y-3">
              <div className="h-4 rounded shimmer-bg" />
              <div className="h-4 rounded shimmer-bg w-3/4" />
            </div>
          ) : activity.length > 0 ? (
            <div className="space-y-3">
              {activity.map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 text-sm">
                      <span className="text-primary-400 font-medium">{act.agent_id ?? 'Kelo'}</span>
                      {' '}{act.action}
                    </p>
                    <p className="text-slate-600 text-[10px] mt-0.5">{timeAgo(act.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm text-center py-2">No recent activity.</p>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="section-title mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => handleAction(action)}
                className="glass-card-hover p-3 flex flex-col items-center gap-2 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <span className="text-xs text-slate-300 font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Learning Loop visualization */}
      <section>
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-secondary-400" />
            <h2 className="section-title text-secondary-400">Learning Loop</h2>
          </div>
          <div className="flex items-center justify-between text-[10px] font-medium">
            {[
              { label: 'User', icon: Target },
              { label: 'Agent', icon: Cpu },
              { label: 'Action', icon: Zap },
              { label: 'Results', icon: TrendingUp },
              { label: 'Feedback', icon: Sparkles },
              { label: 'Memory', icon: Brain },
              { label: 'Better', icon: CheckCircle2 },
            ].map((step, i, arr) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg bg-secondary-500/10 border border-secondary-500/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-secondary-400" />
                    </div>
                    <span className="text-slate-500">{step.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="h-px flex-1 bg-gradient-to-r from-secondary-500/20 to-secondary-500/5 mx-1 -mt-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
