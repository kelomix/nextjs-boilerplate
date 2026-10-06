import { useState, useEffect } from 'react';
import { Home, MessageSquare, Lightbulb, Brain, Shield, Users, MoreHorizontal, X } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { HQDashboard } from '@/screens/HQDashboard';
import { KeloChat } from '@/screens/KeloChat';
import { IdeasScreen } from '@/screens/IdeasScreen';
import { MemoryScreen } from '@/screens/MemoryScreen';
import { SecurityScreen } from '@/screens/SecurityScreen';
import { MissionControl } from '@/screens/MissionControl';
import { ModuleScreen } from '@/screens/ModuleScreen';
import { ContentModule } from '@/screens/modules/ContentModule';
import { ViralRadarModule } from '@/screens/modules/ViralRadarModule';
import { MoneyModule } from '@/screens/modules/MoneyModule';
import { ShopifyModule } from '@/screens/modules/ShopifyModule';
import { SportsAIModule } from '@/screens/modules/SportsAIModule';
import { KalshiAIModule } from '@/screens/modules/KalshiAIModule';
import { SponsorsModule } from '@/screens/modules/SponsorsModule';
import { AnalyticsModule } from '@/screens/modules/AnalyticsModule';
import { SocialScreen } from '@/screens/SocialScreen';

type Tab = 'hq' | 'kelo' | 'ideas' | 'memory' | 'security' | 'community';

interface ModuleConfig {
  id: string;
  title: string;
  component: React.ComponentType;
}

const MODULES: ModuleConfig[] = [
  { id: 'content', title: 'Content', component: ContentModule },
  { id: 'viral-radar', title: 'Viral Radar', component: ViralRadarModule },
  { id: 'money', title: 'Money', component: MoneyModule },
  { id: 'shopify', title: 'Shopify', component: ShopifyModule },
  { id: 'sports-ai', title: 'Sports AI', component: SportsAIModule },
  { id: 'kalshi-ai', title: 'Kalshi AI', component: KalshiAIModule },
  { id: 'sponsors', title: 'Sponsors', component: SponsorsModule },
  { id: 'analytics', title: 'Analytics', component: AnalyticsModule },
];

const MAIN_TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'hq', label: 'HQ', icon: Home },
  { id: 'kelo', label: 'Kelo', icon: MessageSquare },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'ideas', label: 'Ideas', icon: Lightbulb },
  { id: 'memory', label: 'Memory', icon: Brain },
  { id: 'security', label: 'Security', icon: Shield },
];

export function AppShell() {
  const [tab, setTab] = useState<Tab>('hq');
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab, activeModule]);

  const openModule = (id: string) => {
    setActiveModule(id);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const closeModule = () => {
    setActiveModule(null);
  };

  // Render a module screen
  if (activeModule) {
    const mod = MODULES.find((m) => m.id === activeModule);
    if (mod) {
      const Comp = mod.component;
      return (
        <div className="min-h-screen bg-base-900">
          <ModuleScreen title={mod.title} onBack={closeModule}>
            <Comp />
          </ModuleScreen>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-base-900">
      {/* Top bar */}
      <header className="sticky top-0 z-30 glass safe-top">
        <div className="flex items-center justify-between px-5 h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/20 flex items-center justify-center">
              <span className="text-sm font-black bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">K</span>
            </div>
            <span className="font-semibold text-white text-sm">Kelomix HQ</span>
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="More modules"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 pb-28 pt-2 max-w-2xl mx-auto">
        {tab === 'hq' && <HQDashboard onOpenModule={openModule} onNavigate={setTab} />}
        {tab === 'kelo' && <KeloChat />}
        {tab === 'community' && <SocialScreen />}
        {tab === 'ideas' && <IdeasScreen />}
        {tab === 'memory' && <MemoryScreen />}
        {tab === 'security' && <SecurityScreen />}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 glass border-t border-white/5 safe-bottom">
        <div className="flex items-center justify-around max-w-2xl mx-auto h-16 px-2">
          {MAIN_TABS.map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="flex flex-col items-center gap-1 px-1.5 py-1.5 transition-all duration-200 relative"
                aria-label={label}
              >
                {active && (
                  <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary-400 rounded-full" />
                )}
                <Icon
                  className={`w-5.5 h-5.5 transition-colors duration-200 ${
                    active ? 'text-primary-400' : 'text-slate-500'
                  }`}
                  style={{ width: 22, height: 22 }}
                />
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    active ? 'text-primary-400' : 'text-slate-500'
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Modules drawer */}
      {menuOpen && (
        <ModulesDrawer
          modules={MODULES}
          onOpen={openModule}
          onClose={() => setMenuOpen(false)}
          onNavigateMissionControl={() => {
            setMenuOpen(false);
            setActiveModule('__mission-control');
          }}
          onOpenCommunity={() => {
            setMenuOpen(false);
            setTab('community');
          }}
        />
      )}

      {/* Mission Control as a special "module" */}
      {activeModule === '__mission-control' && (
        <div className="min-h-screen bg-base-900">
          <ModuleScreen title="Mission Control" onBack={closeModule}>
            <MissionControl />
          </ModuleScreen>
        </div>
      )}
    </div>
  );
}

function ModulesDrawer({
  modules,
  onOpen,
  onClose,
  onNavigateMissionControl,
  onOpenCommunity,
}: {
  modules: ModuleConfig[];
  onOpen: (id: string) => void;
  onClose: () => void;
  onNavigateMissionControl: () => void;
  onOpenCommunity: () => void;
}) {
  const { signOut, user } = useAuth();

  const moduleIcons: Record<string, React.ElementType> = {
    content: Home,
    'viral-radar': Brain,
    money: Home,
    shopify: Home,
    'sports-ai': Brain,
    'kalshi-ai': Brain,
    sponsors: Home,
    analytics: Home,
  };

  return (
    <div className="fixed inset-0 z-50 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-base-900/80 backdrop-blur-sm" />
      <div
        className="absolute bottom-0 left-0 right-0 glass rounded-t-3xl border-t border-white/10 safe-bottom animate-slide-up max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <h2 className="text-lg font-bold text-white">All Modules</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 px-5 pb-4">
          {/* Community featured */}
          <button
            onClick={() => { onClose(); onOpenCommunity(); }}
            className="col-span-2 glass-card-hover p-4 text-left flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500/20 to-accent-500/20 border border-secondary-500/20 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-secondary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Community</h3>
              <p className="text-xs text-slate-500 mt-0.5">Friends, messages, posts, social profiles</p>
            </div>
          </button>

          {/* Mission Control featured */}
          <button
            onClick={onNavigateMissionControl}
            className="col-span-2 glass-card-hover p-4 text-left flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Mission Control</h3>
              <p className="text-xs text-slate-500 mt-0.5">Agents, tasks, runs, integrations</p>
            </div>
          </button>

          {modules.map((mod) => {
            const Icon = moduleIcons[mod.id] ?? Home;
            return (
              <button
                key={mod.id}
                onClick={() => onOpen(mod.id)}
                className="glass-card-hover p-4 text-left flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-slate-300" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-white text-sm truncate">{mod.title}</h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* User section */}
        <div className="border-t border-white/5 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center">
                <span className="text-sm font-bold text-primary-300">
                  {user?.email?.[0]?.toUpperCase() ?? 'O'}
                </span>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Owner</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="btn-ghost text-sm px-3 py-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
