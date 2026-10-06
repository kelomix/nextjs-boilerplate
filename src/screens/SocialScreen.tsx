import { useState } from 'react';
import { Users, MessageCircle, User as UserIcon, Rss } from 'lucide-react';
import { SocialFeed } from '@/screens/social/SocialFeed';
import { SocialFriends } from '@/screens/social/SocialFriends';
import { SocialMessages } from '@/screens/social/SocialMessages';
import { SocialProfile } from '@/screens/social/SocialProfile';

type SocialTab = 'feed' | 'friends' | 'messages' | 'profile';

const TABS: { id: SocialTab; label: string; icon: React.ElementType }[] = [
  { id: 'feed', label: 'Feed', icon: Rss },
  { id: 'friends', label: 'Friends', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageCircle },
  { id: 'profile', label: 'Profile', icon: UserIcon },
];

export function SocialScreen() {
  const [tab, setTab] = useState<SocialTab>('feed');

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="pt-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-500/20 to-accent-500/20 border border-secondary-500/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-secondary-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Community</h1>
            <p className="text-slate-500 text-xs">Connect, share, and grow together</p>
          </div>
        </div>
      </div>

      {/* Social sub-tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                active
                  ? 'bg-primary-500/15 text-primary-400 border border-primary-500/20'
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </div>

      {tab === 'feed' && <SocialFeed />}
      {tab === 'friends' && <SocialFriends />}
      {tab === 'messages' && <SocialMessages />}
      {tab === 'profile' && <SocialProfile />}
    </div>
  );
}
