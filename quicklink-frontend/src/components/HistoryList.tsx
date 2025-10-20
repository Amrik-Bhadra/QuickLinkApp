// import { useState } from 'react';
// import type { LinkHistoryItem } from '../services/api';
// import { ArrowUpRight, Copy, Check, QrCode } from 'lucide-react';

// // --- Helper Component for a single History Item ---
// // We create this small component to manage the "copied" state for each item individually.
// const HistoryItemCard = ({ item }: { item: LinkHistoryItem }) => {
//   const [copiedShort, setCopiedShort] = useState(false);
//   const [copiedLong, setCopiedLong] = useState(false);

//   const handleCopy = (text: string, type: 'short' | 'long') => {
//     navigator.clipboard.writeText(text);
//     if (type === 'short') {
//       setCopiedShort(true);
//       setTimeout(() => setCopiedShort(false), 2000); // Reset after 2 seconds
//     } else {
//       setCopiedLong(true);
//       setTimeout(() => setCopiedLong(false), 2000); // Reset after 2 seconds
//     }
//   };

//   return (
//     <li className="p-4 bg-white border border-gray-300 rounded-lg transition-shadow hover:shadow-md flex flex-col gap-4">
//       {/* Top section: Short Link */}
//       <div className="flex justify-between items-center gap-2">
//         <a 
//           href={item.shortUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="font-mono text-blue-600 hover:underline text-lg font-semibold truncate"
//         >
//           {/* Display a cleaner version of the short URL */}
//           {item.shortUrl.replace(/^https?:\/\//, '')}
//         </a>
//         <div className="flex items-center gap-3 flex-shrink-0">
//           <button 
//             onClick={() => handleCopy(item.shortUrl, 'short')}
//             title="Copy short link"
//             className="text-slate-500 hover:text-slate-900 transition-colors"
//           >
//             {copiedShort ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
//           </button>
//           <a
//             href={item.shortUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             title="Visit link"
//             className="text-slate-500 hover:text-slate-900 transition-colors"
//           >
//             <ArrowUpRight size={18} />
//           </a>
//           <button 
//             // onClick will be added later for the modal
//             title="Show QR Code"
//             className="text-slate-500 hover:text-slate-900 transition-colors"
//           >
//             <QrCode size={18} />
//           </button>
//         </div>
//       </div>
      
//       {/* Bottom section: Original Link */}
//       <div className="flex justify-between items-center gap-2 border-t border-slate-200 pt-3">
//         <p className="text-sm text-slate-500 truncate" title={item.longUrl}>
//           {item.longUrl}
//         </p>
//         <button 
//           onClick={() => handleCopy(item.longUrl, 'long')}
//           title="Copy original link"
//           className="text-slate-500 hover:text-slate-900 transition-colors flex-shrink-0"
//         >
//           {copiedLong ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
//         </button>
//       </div>
//     </li>
//   );
// };


// // --- Main HistoryList Component ---
// interface HistoryListProps {
//   history: LinkHistoryItem[];
// }

// export function HistoryList({ history }: HistoryListProps) {
//   if (history.length === 0) {
//     // A more user-friendly empty state
//     return (
//       <div className="text-center p-8 bg-slate-100 rounded-lg">
//         <h3 className="text-lg font-semibold text-slate-700">No links yet!</h3>
//         <p className="text-slate-500">Your shortened links will appear here.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full">
//       <h2 className="text-2xl font-bold mb-4">Your Link History</h2>
//       {/* We use a simple div with space-y for consistent spacing between cards */}
//       <div className="space-y-3">
//         {history.map((item, index) => (
//           <HistoryItemCard key={index} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import type { LinkHistoryItem } from '../services/api';
import { ArrowUpRight, Copy, Check, QrCode } from 'lucide-react';

// --- Helper Component for a single History Item ---
// 1. We update its props to accept the onShowQrCode function.
const HistoryItemCard = ({ item, onShowQrCode }: { item: LinkHistoryItem, onShowQrCode: (url: string) => void }) => {
  const [copiedShort, setCopiedShort] = useState(false);
  const [copiedLong, setCopiedLong] = useState(false);

  const handleCopy = (text: string, type: 'short' | 'long') => {
    navigator.clipboard.writeText(text);
    if (type === 'short') {
      setCopiedShort(true);
      setTimeout(() => setCopiedShort(false), 2000); // Reset after 2 seconds
    } else {
      setCopiedLong(true);
      setTimeout(() => setCopiedLong(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <li className="p-4 bg-white border border-gray-300 rounded-lg transition-shadow hover:shadow-md flex flex-col gap-4">
      {/* Top section: Short Link */}
      <div className="flex justify-between items-center gap-2">
        <a 
          href={item.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-blue-600 hover:underline text-lg font-semibold truncate"
        >
          {/* Display a cleaner version of the short URL */}
          {item.shortUrl.replace(/^https?:\/\//, '')}
        </a>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button 
            onClick={() => handleCopy(item.shortUrl, 'short')}
            title="Copy short link"
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            {copiedShort ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
          <a
            href={item.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Visit link"
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowUpRight size={18} />
          </a>
          {/* 2. We activate the onClick handler for the QR code button. */}
          <button 
            onClick={() => onShowQrCode(item.shortUrl)}
            title="Show QR Code"
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            <QrCode size={18} />
          </button>
        </div>
      </div>
      
      {/* Bottom section: Original Link */}
      <div className="flex justify-between items-center gap-2 border-t border-slate-200 pt-3">
        <p className="text-sm text-slate-500 truncate" title={item.longUrl}>
          {item.longUrl}
        </p>
        <button 
          onClick={() => handleCopy(item.longUrl, 'long')}
          title="Copy original link"
          className="text-slate-500 hover:text-slate-900 transition-colors flex-shrink-0"
        >
          {copiedLong ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
    </li>
  );
};


// --- Main HistoryList Component ---
// 3. We update its props to accept the onShowQrCode function.
interface HistoryListProps {
  history: LinkHistoryItem[];
  onShowQrCode: (url: string) => void;
}

export function HistoryList({ history, onShowQrCode }: HistoryListProps) {
  if (history.length === 0) {
    // A more user-friendly empty state
    return (
      <div className="text-center p-8 bg-slate-100 rounded-lg">
        <h3 className="text-lg font-semibold text-slate-700">No links yet!</h3>
        <p className="text-slate-500">Your shortened links will appear here.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Your Link History</h2>
      <div className="space-y-3">
        {history.map((item, index) => (
          // 4. We pass the function down to each card.
          <HistoryItemCard key={index} item={item} onShowQrCode={onShowQrCode} />
        ))}
      </div>
    </div>
  );
}
