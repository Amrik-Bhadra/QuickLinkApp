import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Share2 } from "lucide-react";

interface QrCodeModalProps {
  url: string | null;
  onClose: () => void;
}

async function svgElementToPngFile(
  svgEl: SVGSVGElement,
  fileName: string
): Promise<File> {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgEl);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.src = url;

  return new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = svgEl.width.baseVal.value;
      canvas.height = svgEl.height.baseVal.value;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas to Blob conversion failed"));
          return;
        }
        const file = new File([blob], fileName, { type: "image/png" });
        resolve(file);
      }, "image/png");
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
  });
}

export function QrCodeModal({ url, onClose }: QrCodeModalProps) {
  const qrCodeRef = useRef<SVGSVGElement>(null);

  if (!url) {
    return null;
  }

  const handleShare = async () => {
    // Check if the ref is connected and the share API is available
    if (!qrCodeRef.current || !("share" in navigator)) {
      alert("Sharing is not supported on this browser.");
      return;
    }

    try {
      // 2. Convert the SVG to a PNG file
      const file = await svgElementToPngFile(
        qrCodeRef.current,
        "quicklink-qr.png"
      );

      // 3. Check if the browser can share files
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "QuickLink QR Code",
          text: `QR Code for the link: ${url}`,
        });
      } else {
        // Fallback if file sharing is not supported, share the URL instead
        await navigator.share({
          title: "QuickLink Short URL",
          url: url,
        });
      }
    } catch (error) {
      console.error("Error sharing QR Code:", error);
      alert("Could not share QR code. Please try again.");
    }
  };

  return (
    // Backdrop
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity"
    >
      {/* Modal Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center flex flex-col items-center gap-6"
      >
        <h2 className="text-2xl font-bold text-slate-800">Scan QR Code</h2>

        <div className="p-4 bg-white border rounded-lg">
          <QRCodeSVG
            ref={qrCodeRef}
            value={url}
            size={256}
            includeMargin={true}
          />
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-slate-600 hover:text-blue-600 text-sm break-all"
        >
          {url}
        </a>

        <div className="mt-4 flex gap-4 w-full justify-center">
          {/* --- UPDATED: Conditional Rendering with robust check --- */}
          {"share" in navigator && (
            <button
              onClick={handleShare}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Share2 size={18} /> Share
            </button>
          )}

          <button
            onClick={onClose}
            className={`bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 px-6 rounded-lg transition-colors ${
              "share" in navigator ? "flex-1" : "w-full"
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
