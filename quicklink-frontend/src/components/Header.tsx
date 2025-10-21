import { Github, LogOut, UserCircle } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  onRequestLogout: () => void; 
}

export function Header({ isAuthenticated, onRequestLogout }: HeaderProps) {
  return (
    <header className="py-2 border-b border-gray-300 bg-white sticky top-0 z-20">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <img src='/urllogo.png' className='h-8' alt="QuickLink Logo" />
          <h1 className="text-2xl font-bold text-slate-800">QuickLink</h1>
        </div>
        
        <div className="flex items-center gap-4">
           <a
            href="https://github.com/Amrik-Bhadra/QuickLinkApp" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-x-2 border border-slate-300 hover:bg-slate-100 py-1.5 px-3 rounded-md"
            aria-label="View on GitHub"
          >
            <Github size={20} />
            <p className='font-semibold text-sm'>GitHub</p>
          </a>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500" title="User menu placeholder">
                <UserCircle size={20} />
              </div>
              
              <button
                onClick={onRequestLogout} // Call the function to open the confirmation modal
                className="flex items-center gap-1.5 text-slate-600 hover:text-red-600 font-semibold transition-colors py-1.5 px-3 rounded-md hover:bg-red-50"
                title="Log Out"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            null 
          )}
        </div>
      </div>
    </header>
  );
}