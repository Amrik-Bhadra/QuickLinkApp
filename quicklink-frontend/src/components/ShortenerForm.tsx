// import { useState } from 'react';
// import { Settings, Loader2 } from 'lucide-react';
// import { shortenUrl, type ShortenRequestPayload } from '../services/api';

// interface ShortenerFormProps {
//   onShortenSuccess: (longUrl: string, shortUrl: string) => void;
// }

// export function ShortenerForm({ onShortenSuccess }: ShortenerFormProps) {
//   const [longUrl, setLongUrl] = useState('');
//   const [customAlias, setCustomAlias] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [showAdvanced, setShowAdvanced] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!longUrl) {
//       setError('Please enter a URL to shorten.');
//       return;
//     }
    
//     setIsLoading(true);
//     setError(null);

//     const payload: ShortenRequestPayload = { longUrl };
//     if (customAlias) {
//       payload.customAlias = customAlias;
//     }

//     try {
//       const shortUrl = await shortenUrl(payload);
//       onShortenSuccess(longUrl, shortUrl);
//       // Reset form fields
//       setLongUrl('');
//       setCustomAlias('');
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('An unknown error occurred.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-full">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="url"
//           value={longUrl}
//           onChange={(e) => setLongUrl(e.target.value)}
//           placeholder="Paste your long URL here..."
//           className="w-full p-4 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//           disabled={isLoading}
//         />
        
//         {showAdvanced && (
//           <div className="animate-fade-in-up">
//             <input
//               type="text"
//               value={customAlias}
//               onChange={(e) => setCustomAlias(e.target.value)}
//               placeholder="Optional: Custom alias (e.g., my-portfolio)"
//               className="w-full p-4 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//               disabled={isLoading}
//             />
//           </div>
//         )}

//         <div className="flex flex-col sm:flex-row items-center gap-4">
//           <button
//             type="submit"
//             className="w-full sm:w-auto flex-grow bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:bg-slate-400"
//             disabled={isLoading}
//           >
//             {isLoading ? <Loader2 className="animate-spin" /> : null}
//             {isLoading ? 'Shortening...' : 'Shorten!'}
//           </button>
//           <button
//             type="button"
//             onClick={() => setShowAdvanced(!showAdvanced)}
//             className="w-full sm:w-auto flex items-center justify-center gap-2 p-4 text-slate-600 font-semibold hover:bg-slate-200 rounded-lg transition-colors"
//           >
//             <Settings size={20} />
//             Advanced Options
//           </button>
//         </div>
//       </form>

//       {error && (
//         <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
//       )}
//     </div>
//   );
// }


import { useState } from 'react';
import { Settings, Loader2 } from 'lucide-react';
// Correct the import to use the exported name
import { shortenUrl, type ShortenRequestPayload } from '../services/api';

// Update the props interface to use the correct type
interface ShortenerFormProps {
  onShortenSuccess: (longUrl: string, shortUrl: string) => void;
  onAdvancedOptionsClick: () => void;
  advancedOptions: Partial<ShortenRequestPayload>;
}

export function ShortenerForm({ onShortenSuccess, onAdvancedOptionsClick, advancedOptions }: ShortenerFormProps) {
  const [longUrl, setLongUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!longUrl) {
      setError('Please enter a URL to shorten.');
      return;
    }
    
    setIsLoading(true);
    setError(null);

    // Update the payload to use the correct type
    const payload: ShortenRequestPayload = {
      longUrl,
      ...advancedOptions,
    };

    try {
      const shortUrl = await shortenUrl(payload);
      onShortenSuccess(longUrl, shortUrl);
      setLongUrl(''); // Reset only the longUrl input
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to check if any advanced options have been set
  const areAdvancedOptionsSet = advancedOptions.customAlias || advancedOptions.expiresAt;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            className="flex-grow p-4 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:bg-slate-400"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Shorten!'}
          </button>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onAdvancedOptionsClick}
            className={`text-sm font-semibold flex items-center gap-1 transition-colors ${
              areAdvancedOptionsSet
                ? 'text-blue-600 hover:text-blue-800'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Settings size={16} />
            Advanced Options
            {areAdvancedOptionsSet && <span className="ml-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>}
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
      )}
    </div>
  );
}

