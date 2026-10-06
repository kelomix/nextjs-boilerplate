export type IdeaStatus = 'new' | 'exploring' | 'planning' | 'in-progress' | 'shipped' | 'archived';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'expired';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AgentStatus = 'idle' | 'running' | 'paused' | 'error';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'blocked' | 'cancelled';
export type PatternType = 'success' | 'failure' | 'neutral';

export interface Idea {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  notes: string | null;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  summary: string | null;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface AgentMemoryEntry {
  id: string;
  user_id: string;
  category: string;
  key: string;
  value: string | null;
  context: Record<string, unknown>;
  confidence: number;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface LearningEvent {
  id: string;
  user_id: string;
  event_type: string;
  description: string | null;
  input_data: Record<string, unknown>;
  action_taken: Record<string, unknown>;
  result: Record<string, unknown>;
  feedback: string | null;
  pattern_type: string;
  confidence: number;
  created_at: string;
}

export interface Approval {
  id: string;
  user_id: string;
  agent_id: string | null;
  action_type: string;
  description: string;
  risk_level: string;
  status: string;
  details: Record<string, unknown>;
  decided_at: string | null;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface KeloAlert {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string | null;
  severity: string;
  is_read: boolean;
  action_url: string | null;
  created_at: string;
}

export interface KeloAgent {
  id: string;
  user_id: string;
  name: string;
  role: string;
  status: string;
  capabilities: string[];
  last_active_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface KeloTask {
  id: string;
  user_id: string;
  agent_id: string | null;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  progress: number;
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface KeloOpportunity {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string | null;
  potential_value: string | null;
  confidence: number;
  status: string;
  window_closes_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface KeloIntegration {
  id: string;
  user_id: string;
  name: string;
  service: string;
  status: string;
  last_synced_at: string | null;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface KeloAgentRun {
  id: string;
  user_id: string;
  agent_id: string | null;
  agent_name: string | null;
  task: string;
  status: string;
  result: Record<string, unknown>;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

export interface DailyBrief {
  id: string;
  user_id: string;
  brief_date: string;
  summary: string | null;
  priorities: string[];
  alerts: string[];
  opportunities: string[];
  tasks: string[];
  metrics: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ChangeHistoryEntry {
  id: string;
  user_id: string;
  entity: string;
  entity_id: string | null;
  change_type: string;
  description: string | null;
  old_value: Record<string, unknown> | null;
  new_value: Record<string, unknown> | null;
  actor: string;
  created_at: string;
}

export interface AgentDecision {
  id: string;
  user_id: string;
  agent_id: string | null;
  decision: string;
  reasoning: string | null;
  risk_level: string;
  outcome: string | null;
  approved: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface OwnerRecoverySettings {
  id: string;
  user_id: string;
  recovery_email: string | null;
  recovery_phone: string | null;
  two_factor_enabled: boolean;
  kill_switch_active: boolean;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface AgentActivity {
  id: string;
  user_id: string;
  agent_id: string | null;
  action: string;
  details: Record<string, unknown>;
  result: Record<string, unknown>;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  is_owner: boolean;
  social_handles: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface Friendship {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DirectMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  media_url: string | null;
  media_type: string | null;
  read_at: string | null;
  created_at: string;
}

export interface SocialPost {
  id: string;
  user_id: string;
  caption: string;
  media_url: string | null;
  media_type: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface Stream {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url: string | null;
  is_live: boolean;
  viewer_count: number;
  like_count: number;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface StreamChatMessage {
  id: string;
  stream_id: string;
  user_id: string;
  message: string;
  is_pinned: boolean;
  created_at: string;
}

export interface AppNotification {
  id: string;
  user_id: string;
  actor_id: string | null;
  type: string;
  title: string;
  body: string | null;
  entity_type: string | null;
  entity_id: string | null;
  is_read: boolean;
  created_at: string;
}

export interface GameScore {
  id: string;
  user_id: string;
  game_id: string;
  score: number;
  level: number;
  duration_seconds: number;
  created_at: string;
}

export interface CreatorEarning {
  id: string;
  user_id: string;
  source: string;
  source_id: string | null;
  amount: number;
  description: string | null;
  status: string;
  created_at: string;
}

export interface EarningsPayout {
  id: string;
  user_id: string;
  amount: number;
  method: string;
  status: string;
  requested_at: string;
  processed_at: string | null;
}

export interface ActivityFeedItem {
  id: string;
  user_id: string;
  activity_type: string;
  description: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}
