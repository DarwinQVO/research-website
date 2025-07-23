import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Spend less time researching and more time creating.</h2>
          <Button 
            type="button" 
            className="w-full sm:w-auto px-8" 
            data-tally-open="n9ALOV" 
            data-tally-emoji-text="👋" 
            data-tally-emoji-animation="wave"
            onClick={onClose}
          >
            <span className="hidden sm:inline">Send Message</span>
            <span className="sm:hidden">Send</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}