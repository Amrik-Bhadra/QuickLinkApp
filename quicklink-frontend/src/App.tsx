import { useState } from 'react';
import { Header } from './components/Header';
import { ShortenerForm } from './components/ShortenerForm';
import { ResultDisplay } from './components/ResultDisplay';
import { HistoryList } from './components/HistoryList';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { LinkHistoryItem } from './services/api';

function App() {
  // State for the most recently created short URL
  const [latestShortUrl, setLatestShortUrl] = useState<string | null>(null);
  
  // State for the list of all created links, persisted in localStorage
  const [history, setHistory] = useLocalStorage<LinkHistoryItem[]>('link-history', []);

  // This function is passed down to the form component.
  // It gets called when the API successfully returns a short URL.
  const handleShortenSuccess = (longUrl: string, shortUrl: string) => {
    setLatestShortUrl(shortUrl);
    // Add the new link to the top of the history list
    setHistory(prevHistory => [{ shortUrl, longUrl }, ...prevHistory]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-2">The only URL Shortener</h2>
          <p className="text-slate-600 text-center text-lg mb-8">you'll ever need.</p>
          
          <ShortenerForm onShortenSuccess={handleShortenSuccess} />
          
          {latestShortUrl && <ResultDisplay shortUrl={latestShortUrl} />}
        </div>

        <HistoryList history={history} />
      </main>
    </div>
  )
}

export default App;