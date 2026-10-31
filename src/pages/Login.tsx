import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, Lock, Mail, Loader2, UserRound } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type Mode = 'signin' | 'signup';

export default function Login() {
  const { signIn, signUp, hasAccount } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? '/admin/dashboard';

  const [mode, setMode] = useState<Mode>(hasAccount ? 'signin' : 'signup');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = mode === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password, username.trim());

    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    navigate(mode === 'signup' ? '/admin/dashboard' : from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-6">
      <div className="w-full max-w-md">
        <div className="mb-10 flex flex-col items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center border border-gold-400/60 text-gold-300">
            <span className="font-serif text-2xl font-semibold leading-none">L</span>
          </span>
          <span className="font-serif text-2xl font-medium tracking-wide text-cream-50">
            LTS WELDING HOUSE
          </span>
        </div>

        <div className="border border-ink-800 bg-ink-900/50 p-8 backdrop-blur-sm">
          <h1 className="font-serif text-2xl text-cream-50">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="mt-2 text-sm text-cream-100/40">
            {mode === 'signin' ? 'Sign in to access the dashboard.' : 'Create your one-time account.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {mode === 'signup' && (
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-medium text-cream-100/70">
                  Username
                </label>
                <div className="relative">
                  <UserRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-100/30" />
                  <input
                    id="username"
                    type="text"
                    required
                    minLength={2}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="w-full border border-ink-700 bg-ink-950 py-3.5 pl-11 pr-4 text-cream-50 placeholder-cream-100/30 outline-none transition-colors focus:border-gold-400"
                    placeholder="Your username"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-cream-100/70">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-100/30" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full border border-ink-700 bg-ink-950 py-3.5 pl-11 pr-4 text-cream-50 placeholder-cream-100/30 outline-none transition-colors focus:border-gold-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-cream-100/70">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-100/30" />
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full border border-ink-700 bg-ink-950 py-3.5 pl-11 pr-4 text-cream-50 placeholder-cream-100/30 outline-none transition-colors focus:border-gold-400"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-shine flex w-full items-center justify-center gap-2 bg-gold-500 px-7 py-4 text-sm font-semibold tracking-wide text-ink-950 transition-all duration-300 hover:bg-gold-400 disabled:opacity-50"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-cream-100/40">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError(null);
              }}
              className="font-medium text-gold-300 transition-colors hover:text-gold-200"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
