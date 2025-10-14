import { Github, Link } from 'lucide-react';

export function Header() {
  return (
    <header className="py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link className="text-blue-600" size={32} />
          <h1 className="text-2xl font-bold text-slate-800">QuickLink</h1>
        </div>
        <a
          href="https://github.com/your-username/quicklink-project" // Remember to change this URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="View on GitHub"
        >
          <Github size={28} />
        </a>
      </div>
    </header>
  );
}
