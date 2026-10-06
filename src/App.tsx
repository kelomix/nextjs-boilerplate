import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { AuthScreen } from '@/screens/AuthScreen';
import { LoadingScreen } from '@/components/ui';
import { AppShell } from '@/AppShell';

export default function App() {
  const { session, loading } = useAuth();

  if (loading) return <LoadingScreen message="Initializing Kelomix HQ..." />;
  if (!session) return <AuthScreen />;
  return <AppShell />;
}
