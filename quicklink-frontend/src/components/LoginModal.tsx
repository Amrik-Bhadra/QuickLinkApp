import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { loginUser } from '../services/api';
import { Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userAuthentication } = useAuth();

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await loginUser({ email, password });
      userAuthentication(response.token);
      toast.success('Login Successful');
      onClose();
    } catch (err) { 
      if (err instanceof Error) {
        toast.error(err.message);
        setError(err.message); 
      } else {
        toast.error('An unexpected error occurred during login.')
        setError('An unexpected error occurred during login.'); 
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ... rest of the modal JSX ... */}
         <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Log In</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email-login" className="block text-sm font-medium text-slate-700">Email address</label>
            <input
              id="email-login"
              name="email"
              type="email"
              autoComplete="email"
              placeholder='eg. abc@example.com'
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password-login" className="block text-sm font-medium text-slate-700">Password</label>
            <input
              id="password-login"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder='min 8 characters'
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Log In'}
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-slate-600">
          Need an account?{' '}
          <button
            onClick={() => {
              onClose();
              onSwitchToRegister();
            }}
            className="font-medium text-blue-600 hover:text-blue-500 underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}