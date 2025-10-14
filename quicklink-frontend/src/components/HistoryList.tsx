import type { LinkHistoryItem } from '../services/api';
import { ArrowUpRight } from 'lucide-react';

interface HistoryListProps {
  history: LinkHistoryItem[];
}

export function HistoryList({ history }: HistoryListProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 w-full">
      <h2 className="text-xl font-bold mb-4">Your Link History</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-slate-200">
          {history.map((item, index) => (
            <li key={index} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex-grow">
                <a 
                  href={item.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-blue-600 hover:underline"
                >
                  {item.shortUrl}
                </a>
                <p className="text-sm text-slate-500 truncate">{item.longUrl}</p>
              </div>
              <a
                href={item.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-1 text-slate-600 hover:text-blue-600 font-semibold transition-colors"
              >
                Visit <ArrowUpRight size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
