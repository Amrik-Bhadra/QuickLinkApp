import { List, QrCode, Share2 } from 'lucide-react';

interface AuthOverlayProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export function AuthOverlay({ onLoginClick, onRegisterClick }: AuthOverlayProps) {
  return (
    // The overlay container with blur effect
    <div className="absolute inset-0 bg-slate-100 bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center p-8 rounded-lg z-10">
      <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">Unlock Full Features!</h3>
      <p className="text-center text-slate-600 mb-6">Log in or create an account to get access to:</p>
      
      {/* Feature List */}
      <ul className="space-y-3 mb-8 text-slate-700">
        <li className="flex items-center gap-3">
          <List size={20} className="text-blue-600 flex-shrink-0" />
          <span>Persistent, cross-device link history.</span>
        </li>
        <li className="flex items-center gap-3">
          <QrCode size={20} className="text-blue-600 flex-shrink-0" />
          <span>QR code generation for every link.</span>
        </li>
        <li className="flex items-center gap-3">
          <Share2 size={20} className="text-blue-600 flex-shrink-0" />
          <span>Direct QR code image sharing.</span>
        </li>
      </ul>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <button
          onClick={onLoginClick}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Log In
        </button>
        <button
          onClick={onRegisterClick}
          className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Register
        </button>
      </div>
    </div>
  );
}
