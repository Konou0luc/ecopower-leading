import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { AdminButton } from '@/components/admin/ui/AdminButton';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 text-red-600">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle size={24} />
            </div>
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600">{message}</p>
        </div>
        
        <div className="flex items-center justify-end gap-3 p-6 bg-gray-50 border-t border-gray-100">
          <AdminButton
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Annuler
          </AdminButton>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Suppression...
              </>
            ) : (
              'Confirmer la suppression'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
