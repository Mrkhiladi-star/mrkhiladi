'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/Auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ShimmerButton from '@/components/magicui/shimmer-button';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };
  return (
      <div className="w-96 bg-gradient-to-br from-white via-gray-50 to-white/90 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 shadow-2xl rounded-2xl p-6 space-y-5">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Login
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Sign in to access your dashboard
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full py-2 px-3 text-sm rounded-lg"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full py-2 px-3 text-sm rounded-lg"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="text-sm text-center text-red-600 dark:text-red-400">{error}</p>
          )}
          <ShimmerButton
            type="submit"
            disabled={isLoading}
            className="w-full py-2 text-sm font-medium rounded-lg"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </ShimmerButton>
        </form>
      </div>
  
  );
}
