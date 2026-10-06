import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import type { Profile } from '@/lib/types';

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    if (data) {
      setProfile(data as Profile);
    } else {
      const { data: newProfile } = await supabase
        .from('profiles')
        .insert({ user_id: user.id, display_name: user.email?.split('@')[0] ?? 'User' })
        .select('*')
        .single();
      if (newProfile) setProfile(newProfile as Profile);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const updateProfile = useCallback(async (updates: Partial<Profile>): Promise<boolean> => {
    if (!user || !profile) return false;
    const { error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);
    if (!error) {
      setProfile({ ...profile, ...updates });
      return true;
    }
    return false;
  }, [user, profile]);

  return { profile, loading, updateProfile, reload: load };
}
