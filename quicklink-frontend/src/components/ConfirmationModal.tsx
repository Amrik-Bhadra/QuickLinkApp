import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}: ConfirmationModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose} 
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()} 
      >
        <AlertTriangle className="text-red-500" size={48} />
        <h2 className="text-xl font-bold text-slate-800 text-center">{title}</h2>
        <p className="text-slate-600 text-center text-sm">{message}</p>
        
        <div className="mt-4 flex gap-4 w-full justify-center">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(); // Perform the action
              onClose(); // Close the modal
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}