import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

interface ResultDisplayProps {
  shortUrl: string;
}

export function ResultDisplay({ shortUrl }: ResultDisplayProps) {
  const [hasCopied, setHasCopied] = useState(false);

  // Reset the "Copied!" state when a new shortUrl is generated
  useEffect(() => {
    setHasCopied(false);
  }, [shortUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setHasCopied(true);
  };

  return (
    <div className="mt-6 p-4 bg-slate-100 rounded-lg shadow-inner animate-fade-in-up">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <a 
          href={shortUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-mono text-blue-600 hover:underline break-all"
        >
          {shortUrl}
        </a>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-white transition-all duration-200 ${
            hasCopied
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {hasCopied ? <Check size={18} /> : <Copy size={18} />}
          {hasCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
