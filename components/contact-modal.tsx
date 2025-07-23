import { Dialog, DialogContent } from './ui/dialog';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] mx-4 sm:mx-auto p-0 overflow-hidden">
        <div className="w-full h-full">
          <iframe 
            className="airtable-embed w-full h-full" 
            src="https://airtable.com/embed/appGpvotz5u1yGsvH/pagJquPGG4foG1Zv6/form" 
            frameBorder="0" 
            width="100%" 
            height="600" 
            style={{ 
              background: 'transparent', 
              border: 'none',
              borderRadius: '8px'
            }}
            loading="eager"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}