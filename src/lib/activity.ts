import { supabase } from '@/lib/supabase';

export async function logActivity(
  userId: string,
  activityType: string,
  description: string,
  entityType?: string,
  entityId?: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  try {
    await supabase.from('activity_feed').insert({
      user_id: userId,
      activity_type: activityType,
      description,
      entity_type: entityType ?? null,
      entity_id: entityId ?? null,
      metadata: metadata ?? {},
    });
  } catch {
    // non-critical — don't block user actions
  }
}

export async function awardEarnings(
  userId: string,
  source: string,
  amount: number,
  description: string,
  sourceId?: string,
): Promise<void> {
  try {
    await supabase.from('creator_earnings').insert({
      user_id: userId,
      source,
      source_id: sourceId ?? null,
      amount,
      description,
      status: 'available',
    });
  } catch {
    // non-critical
  }
}

const EARNING_RATES = {
  post_created: 0.05,
  comment_posted: 0.02,
  like_given: 0.01,
  stream_started: 0.10,
  stream_chat: 0.01,
  game_played: 0.03,
  friend_added: 0.05,
  profile_updated: 0.02,
};

export function getEarningRate(action: keyof typeof EARNING_RATES): number {
  return EARNING_RATES[action] ?? 0;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
