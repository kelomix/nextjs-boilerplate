import { Users, MessageSquare, User } from 'lucide-react';
import { useState } from 'react';
import { SocialFeed } from '@/screens/social/SocialFeed';
import { SocialFriends } from '@/screens/social/SocialFriends';
import { SocialMessages } from '@/screens/social/SocialMessages';
import { SocialProfile } from '@/screens/social/SocialProfile';

type SocialTab = 'feed' | 'friends' | 'messages' | 'profile';

const TABS: { id: SocialTab; label: string; icon: React.ElementType }[] = [
  { id: 'feed', label: 'Feed', icon: Users },
  { id: 'friends', label: 'Friends', icon: User },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'profile', label: 'Profile', icon: User },
];

export function SocialScreen() {
  const [tab, setTab] = useState<SocialTab>('feed');

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="pt-2">
        <h1 className="text-xl font-bold text-white tracking-tight">Community</h1>
        <p className="text-slate-500 text-xs mt-0.5">Connect with friends and creators</p>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex-shrink-0 ${
              tab === id
                ? 'bg-primary-500/15 text-primary-400 border border-primary-500/20'
                : 'bg-white/5 text-slate-400 border border-white/5'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === 'feed' && <SocialFeed />}
      {tab === 'friends' && <SocialFriends />}
      {tab === 'messages' && <SocialMessages />}
      {tab === 'profile' && <SocialProfile />}
    </div>
  );
}
