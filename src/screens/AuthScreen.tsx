import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Shield, Mail, Lock, ArrowRight, Eye, EyeOff, KeyRound, ArrowLeft } from 'lucide-react';

type Mode = 'signin' | 'signup' | 'reset';

export function AuthScreen() {
  const { signIn, signUp, resetPassword } = useAuth();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setBusy(true);

    if (mode === 'reset') {
      const { error } = await resetPassword(email);
      setBusy(false);
      if (error) setError(error);
      else setSuccess('Recovery link sent to your email.');
      return;
    }

    if (mode === 'signup') {
      const { error } = await signUp(email, password);
      setBusy(false);
      if (error) setError(error);
      else setSuccess('Account created. You can now sign in.');
      setMode('signin');
      return;
    }

    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) setError(error);
  };

  return (
    <div className="min-h-screen bg-base-900 flex flex-col safe-top safe-bottom safe-left safe-right">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col justify-center px-6 max-w-sm mx-auto w-full">
        {/* Logo */}
        <div className="text-center mb-10 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/20 mb-4 animate-pulse-glow">
            <span className="text-4xl font-black bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">K</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Kelomix HQ</h1>
          <p className="text-slate-500 text-sm mt-1.5">Private AI Command Center</p>
        </div>

        {/* Mode indicator */}
        <div className="flex items-center gap-2 mb-6 animate-fade-in">
          <Shield className="w-4 h-4 text-primary-400" />
          <span className="text-xs text-slate-400 font-medium">
            {mode === 'signin' && 'Owner Access'}
            {mode === 'signup' && 'Create Owner Account'}
            {mode === 'reset' && 'Recover Access'}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-11"
                placeholder="owner@kelomix.com"
                autoComplete="email"
              />
            </div>
          </div>

          {mode !== 'reset' && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-11 pr-11"
                  placeholder="••••••••"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-error-500/10 border border-error-500/20 rounded-xl px-4 py-3 text-error-400 text-sm animate-slide-down">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-success-500/10 border border-success-500/20 rounded-xl px-4 py-3 text-success-400 text-sm animate-slide-down">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {busy ? (
              <span className="w-5 h-5 border-2 border-base-900/30 border-t-base-900 rounded-full animate-spin" />
            ) : (
              <>
                {mode === 'signin' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'reset' && 'Send Recovery Link'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Mode switcher */}
        <div className="mt-6 space-y-3 text-center text-sm">
          {mode === 'signin' && (
            <>
              <button
                onClick={() => { setMode('signup'); setError(null); }}
                className="text-slate-400 hover:text-primary-400 transition-colors"
              >
                Don't have an account? <span className="font-medium">Create one</span>
              </button>
              <div>
                <button
                  onClick={() => { setMode('reset'); setError(null); setSuccess(null); }}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors text-xs"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  Forgot password?
                </button>
              </div>
            </>
          )}
          {mode === 'signup' && (
            <button
              onClick={() => { setMode('signin'); setError(null); }}
              className="text-slate-400 hover:text-primary-400 transition-colors"
            >
              Already have an account? <span className="font-medium">Sign in</span>
            </button>
          )}
          {mode === 'reset' && (
            <button
              onClick={() => { setMode('signin'); setError(null); setSuccess(null); }}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to sign in
            </button>
          )}
        </div>

        {/* Kelo identity */}
        <div className="mt-10 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
            <span className="text-xs text-slate-500">Powered by Kelo AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
