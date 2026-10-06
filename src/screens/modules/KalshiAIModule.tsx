import { TrendingUp, BarChart3, Activity } from 'lucide-react';
import { EmptyState } from '@/components/ui';

export function KalshiAIModule() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2.5 pt-2">
        <div className="w-10 h-10 rounded-xl bg-primary-500/15 border border-primary-500/20 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Kalshi AI</h1>
          <p className="text-slate-500 text-xs">Prediction market analysis</p>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="w-5 h-5 text-primary-400 flex-shrink-0" />
          <h3 className="text-white font-semibold text-sm">Configuration Required</h3>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          The Kalshi AI module needs API credentials to access prediction market data. To activate:
        </p>
        <ol className="mt-3 space-y-2 text-sm text-slate-400">
          <li className="flex gap-2"><span className="text-primary-400 font-bold">1.</span> Add your Kalshi API credentials to Supabase Edge Function secrets</li>
          <li className="flex gap-2"><span className="text-primary-400 font-bold">2.</span> Create an edge function to fetch market data and run analysis</li>
          <li className="flex gap-2"><span className="text-primary-400 font-bold">3.</span> Kelo will surface high-confidence market opportunities here</li>
        </ol>
        <div className="mt-4 glass-card p-3 bg-primary-500/5 border-primary-500/10">
          <p className="text-primary-400 text-xs">All market analysis is advisory only. Trade execution requires your explicit approval.</p>
        </div>
      </div>

      <EmptyState icon={BarChart3} title="No market analysis yet" description="Once configured, Kelo's prediction market analysis will appear here." />
    </div>
  );
}
