import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AdvancedOptions {
  customAlias: string;
  expiresAt: string;
}

interface AdvancedOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (options: AdvancedOptions) => void;
  initialOptions: AdvancedOptions;
}

export function AdvancedOptionsModal({ isOpen, onClose, onSave, initialOptions }: AdvancedOptionsModalProps) {
  const [customAlias, setCustomAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState('');

  // When the modal opens, populate it with the current advanced options
  useEffect(() => {
    if (isOpen) {
      setCustomAlias(initialOptions.customAlias || '');
      setExpiresAt(initialOptions.expiresAt || '');
    }
  }, [isOpen, initialOptions]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave({ customAlias, expiresAt });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Advanced Options</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900">
            <X size={24} />
          </button>
        </div>
        
        {/* Custom Alias Input */}
        <div>
          <label htmlFor="customAlias" className="block text-sm font-medium text-slate-700 mb-1">
            Custom Alias (optional)
          </label>
          <div className="relative">
            {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              quick.link/
            </span> */}
            <input 
              type="text" 
              id="customAlias"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="w-full pl-24 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="my-cool-link"
            />
          </div>
        </div>

        {/* Expiration Date Input */}
        <div>
          <label htmlFor="expiresAt" className="block text-sm font-medium text-slate-700 mb-1">
            Expiration Date & Time (optional)
          </label>
          <input 
            type="datetime-local" 
            id="expiresAt"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Save Options
        </button>
      </div>
    </div>
  );
}
