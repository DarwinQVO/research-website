import { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        {showSuccessMessage ? (
          // Pantalla de confirmación
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-4">Thank you for your inquiry. I&apos;ll get back to you within 24 hours.</p>
            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          // Airtable Form Embed
          <div className="w-full">
            <iframe 
              className="airtable-embed w-full" 
              src="https://airtable.com/embed/appGpvotz5u1yGsvH/pagJquPGG4foG1Zv6/form" 
              frameBorder="0" 
              width="100%" 
              height="533" 
              style={{ background: 'transparent', border: '1px solid #ccc', borderRadius: '8px' }}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}