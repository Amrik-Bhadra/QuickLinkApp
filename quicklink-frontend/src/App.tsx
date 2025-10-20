// import { useState } from "react";
// import { Header } from "./components/Header";
// import { ShortenerForm } from "./components/ShortenerForm";
// import { ResultDisplay } from "./components/ResultDisplay";
// import { HistoryList } from "./components/HistoryList";
// import { QrCodeModal } from "./components/QrCodeModal"; // 1. Import the new modal component
// import { useLocalStorage } from "./hooks/useLocalStorage";
// import type { LinkHistoryItem } from "./services/api";

// function App() {
//   // State for the most recently created short URL
//   const [latestShortUrl, setLatestShortUrl] = useState<string | null>(null);

//   // State for the list of all created links, persisted in localStorage
//   const [history, setHistory] = useLocalStorage<LinkHistoryItem[]>(
//     "link-history",
//     []
//   );

//   // 2. Add new state to manage the modal's visibility and content
//   const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

//   // This function is passed down to the form component.
//   // It gets called when the API successfully returns a short URL.
//   const handleShortenSuccess = (longUrl: string, shortUrl: string) => {
//     setLatestShortUrl(shortUrl);
//     // Add the new link to the top of the history list
//     setHistory((prevHistory) => [{ shortUrl, longUrl }, ...prevHistory]);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       {/* The main container is a flex container that will pass its height down */}
//       <main className="flex-grow container w-full flex">
//         <div
//           id="content-container"
//           className="flex flex-col lg:flex-row flex-grow w-full"
//         >
//           {/* Left Column */}
//           <div className="w-full lg:w-7/12 p-12 md:border-r md:border-gray-300 flex flex-col justify-center">
//             <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-2">
//               The only URL Shortener
//             </h2>
//             <p className="text-slate-600 text-center text-lg mb-8">
//               you'll ever need.
//             </p>

//             <ShortenerForm onShortenSuccess={handleShortenSuccess} />

//             {latestShortUrl && <ResultDisplay shortUrl={latestShortUrl} />}
//           </div>

//           {/* Right Column */}
//           <div className="w-full lg:w-5/12 mt-12 lg:mt-0 p-6">
//             {/* 3. Pass the state-setting function as a prop to HistoryList */}
//             <HistoryList history={history} onShowQrCode={setQrCodeUrl} />
//           </div>
//         </div>
//       </main>

//       {/* 4. Render the modal, which is controlled by the qrCodeUrl state */}
//       <QrCodeModal url={qrCodeUrl} onClose={() => setQrCodeUrl(null)} />
//     </div>
//   );
// }

// export default App;


import { useState } from "react";
import { Header } from "./components/Header";
import { ShortenerForm } from "./components/ShortenerForm";
import { ResultDisplay } from "./components/ResultDisplay";
import { HistoryList } from "./components/HistoryList";
import { QrCodeModal } from "./components/QrCodeModal";
import { AdvancedOptionsModal } from "./components/AdvancedOptionsModal"; // 1. Import AdvancedOptionsModal
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { LinkHistoryItem, ShortenRequestPayload } from "./services/api"; // 2. Import ShortenRequestPayload type

function App() {
  const [latestShortUrl, setLatestShortUrl] = useState<string | null>(null);
  const [history, setHistory] = useLocalStorage<LinkHistoryItem[]>(
    "link-history",
    []
  );
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  // --- 3. Add state for Advanced Options Modal ---
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
  const [advancedOptions, setAdvancedOptions] = useState<Partial<ShortenRequestPayload>>({});

  const handleShortenSuccess = (longUrl: string, shortUrl: string) => {
    setLatestShortUrl(shortUrl);
    // Add the new link to the top of the history list
    setHistory((prevHistory) => [{ shortUrl, longUrl }, ...prevHistory]);
    // Optionally reset advanced options after success
    setAdvancedOptions({});
  };

  // --- 4. Function to handle saving from Advanced Options Modal ---
  const handleSaveAdvancedOptions = (options: { customAlias: string, expiresAt: string }) => {
    // Convert the local datetime string to ISO format if present, else undefined
    const expiresAt = options.expiresAt ? new Date(options.expiresAt).toISOString() : undefined;
    setAdvancedOptions({ customAlias: options.customAlias || undefined, expiresAt });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container w-full flex">
        <div
          id="content-container"
          className="flex flex-col lg:flex-row flex-grow w-full"
        >
          {/* Left Column */}
          <div className="w-full lg:w-7/12 p-12 md:border-r md:border-gray-300 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-2">
              The only URL Shortener
            </h2>
            <p className="text-slate-600 text-center text-lg mb-8">
              you'll ever need.
            </p>

            {/* --- 5. Pass new props to ShortenerForm --- */}
            <ShortenerForm
              onShortenSuccess={handleShortenSuccess}
              onAdvancedOptionsClick={() => setIsAdvancedModalOpen(true)}
              advancedOptions={advancedOptions}
            />

            {latestShortUrl && <ResultDisplay shortUrl={latestShortUrl} />}
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-5/12 mt-12 lg:mt-0 p-6">
            <HistoryList history={history} onShowQrCode={setQrCodeUrl} />
          </div>
        </div>
      </main>

      <QrCodeModal url={qrCodeUrl} onClose={() => setQrCodeUrl(null)} />

      {/* --- 6. Render the Advanced Options Modal --- */}
      <AdvancedOptionsModal
        isOpen={isAdvancedModalOpen}
        onClose={() => setIsAdvancedModalOpen(false)}
        onSave={handleSaveAdvancedOptions}
        initialOptions={{
          customAlias: advancedOptions.customAlias || '',
          // Convert ISO string back to 'YYYY-MM-DDTHH:MM' for the input field
          expiresAt: advancedOptions.expiresAt ? advancedOptions.expiresAt.substring(0, 16) : ''
        }}
      />
    </div>
  );
}

export default App;