import { Github, Link } from 'lucide-react';

export function Header() {
  return (
    <header className="py-2 border-b border-gray-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link className="text-blue-600" size={32} />
          <h1 className="text-2xl font-bold text-slate-800">QuickLink</h1>
        </div>
        <a
          href="https://github.com/Amrik-Bhadra/QuickLinkApp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-x-2 border p-2 rounded-4xl"
          aria-label="View on GitHub"
        >
          <Github size={24} />
          <p className='font-semibold'>GitHub</p>
        </a>
      </div>
    </header>
  );
}
