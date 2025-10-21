import { useState, useEffect } from "react"; // Import useEffect
import { Header } from "./components/Header";
import { ShortenerForm } from "./components/ShortenerForm";
import { ResultDisplay } from "./components/ResultDisplay";
import { HistoryList } from "./components/HistoryList";
import { QrCodeModal } from "./components/QrCodeModal";
import { AdvancedOptionsModal } from "./components/AdvancedOptionsModal";
import { AuthOverlay } from "./components/AuthOverlay"; // 1. Import AuthOverlay
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { LinkHistoryItem, ShortenRequestPayload } from "./services/api";
import { useAuth } from "./hooks/useAuth"; // 2. Import useAuth
import { getUserLinks } from "./services/api"; // Import function to fetch user links
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";
import { ConfirmationModal } from "./components/ConfirmationModal";
import toast from "react-hot-toast";

function App() {
  const { isAuthenticated, logout } = useAuth(); 
  const [latestShortUrl, setLatestShortUrl] = useState<string | null>(null);
  const [localHistory, setLocalHistory] = useLocalStorage<LinkHistoryItem[]>(
    "link-history",
    []
  ); 
  const [userLinks, setUserLinks] = useState<LinkHistoryItem[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
  const [advancedOptions, setAdvancedOptions] = useState<
    Partial<ShortenRequestPayload>
  >({});

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);


  useEffect(() => {
    if (isAuthenticated) {
      const fetchLinks = async () => {
        try {
          const links = await getUserLinks();
          setUserLinks(links);
          setLocalHistory(links);
        } catch (error) {
          console.error("Failed to fetch user links:", error);
        }
      };
      fetchLinks();
    } else {
      setUserLinks([]);
      setLatestShortUrl(null); 
      setLocalHistory([]);
    }
  }, [isAuthenticated, setLocalHistory]);

  const handleShortenSuccess = (longUrl: string, shortUrl: string) => {
    const newItem = { shortUrl, longUrl };
    setLatestShortUrl(shortUrl);
    setLocalHistory((prev) => [newItem, ...prev]);
    if (isAuthenticated) {
      setUserLinks((prev) => [newItem, ...prev]);
    }
    setAdvancedOptions({});
  };

  const handleSaveAdvancedOptions = (options: {
    customAlias: string;
    expiresAt: string;
  }) => {
    const expiresAt = options.expiresAt
      ? new Date(options.expiresAt).toISOString()
      : undefined;
    setAdvancedOptions({
      customAlias: options.customAlias || undefined,
      expiresAt,
    });
  };

  const displayHistory = isAuthenticated ? userLinks : localHistory;

  const handleRequestLogout = () => {
    setIsLogoutConfirmOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    toast.success('Logout Successful');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* --- 7. Pass auth status and logout function to Header --- */}
      <Header isAuthenticated={isAuthenticated} onRequestLogout={handleRequestLogout} />
      <main className="flex-grow container w-full flex">
        <div
          id="content-container"
          className="flex flex-col lg:flex-row flex-grow w-full"
        >
          {/* Left Column */}
          <div className="w-full lg:w-7/12 p-12 md:border-r md:border-gray-300 flex flex-col justify-center">
            {/* Left column content remains unchanged */}
            <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-2">
              The only URL Shortener
            </h2>
            <p className="text-slate-600 text-center text-lg mb-8">
              you'll ever need.
            </p>
            <ShortenerForm
              onShortenSuccess={handleShortenSuccess}
              onAdvancedOptionsClick={() => setIsAdvancedModalOpen(true)}
              advancedOptions={advancedOptions}
            />
            {latestShortUrl && <ResultDisplay shortUrl={latestShortUrl} />}
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-5/12 mt-12 lg:mt-0 p-6 relative">
            {" "}
            {/* Add relative positioning for the overlay */}
            {/* --- 8. Conditionally render the AuthOverlay --- */}
            {!isAuthenticated && (
              <AuthOverlay
                onLoginClick={() => setIsLoginModalOpen(true)}
                onRegisterClick={() => setIsRegisterModalOpen(true)}
              />
            )}
            {/* The HistoryList is always rendered, but styled differently based on auth status */}
            <div
              className={
                !isAuthenticated ? "opacity-20 pointer-events-none" : ""
              }
            >
              <HistoryList
                history={displayHistory}
                onShowQrCode={setQrCodeUrl}
              />
            </div>
          </div>
        </div>
      </main>

      <QrCodeModal url={qrCodeUrl} onClose={() => setQrCodeUrl(null)} />
      <AdvancedOptionsModal
        isOpen={isAdvancedModalOpen}
        onClose={() => setIsAdvancedModalOpen(false)}
        onSave={handleSaveAdvancedOptions}
        initialOptions={{
          customAlias: advancedOptions.customAlias || "",
          expiresAt: advancedOptions.expiresAt
            ? advancedOptions.expiresAt.substring(0, 16)
            : "",
        }}
      />

      {/* --- 9. Placeholders for future Login/Register Modals --- */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      <ConfirmationModal
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
      />
    </div>
  );
}

export default App;
