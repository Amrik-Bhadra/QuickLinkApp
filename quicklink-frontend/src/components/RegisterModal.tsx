import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { registerUser } from '../services/api';
import { Loader2, X, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userAuthentication } = useAuth();

  if (!isOpen) {
    return null;
  }

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const passwordsDoNotMatch = confirmPassword && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Add validation checks
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerUser({ email, password });
      userAuthentication(response.token);
      toast.success('Registration Successful');
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        toast.success(err.message);
        setError(err.message);
      } else {
        toast.success('An unexpected error occurred during registration.');
        setError('An unexpected error occurred during registration.');
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
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email-register" className="block text-sm font-medium text-slate-700">Email address</label>
            <input
              id="email-register"
              name="email"
              type="email"
              autoComplete="email"
              placeholder='eg., abc@example.com'
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {/* Password Input */}
          <div>
            <label htmlFor="password-register" className="block text-sm font-medium text-slate-700">Password</label>
            <input
              id="password-register"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder='min. 8 characters'
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {/* 3. Confirm Password Input */}
          <div>
            <label htmlFor="confirm-password-register" className="block text-sm font-medium text-slate-700">Confirm Password</label>
            <input
              id="confirm-password-register"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder='Same as password'
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                passwordsDoNotMatch ? 'border-red-500' : 'border-slate-300'
              } ${passwordsMatch ? 'border-green-500' : ''}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
            
            {passwordsMatch && (
              <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                <CheckCircle size={14} /> Passwords match!
              </p>
            )}
            {passwordsDoNotMatch && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <XCircle size={14} /> Passwords do not match.
              </p>
            )}
          </div>

           {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400"
              disabled={isLoading || !passwordsMatch}
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Register'}
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <button
            onClick={() => {
              onClose();
              onSwitchToLogin();
            }}
            className="font-medium text-blue-600 hover:text-blue-500 underline"
          >

            Log in here
          </button>
        </p>
      </div>
    </div>
  );
}