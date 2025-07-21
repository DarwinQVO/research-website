import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Twitter, Linkedin, Instagram, Globe } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SocialPlatform = 'twitter' | 'linkedin' | 'instagram' | 'other' | null;

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    socialHandle: '',
    description: ''
  });
  
  const [detectedPlatform, setDetectedPlatform] = useState<SocialPlatform>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Detectar plataforma automáticamente
  const detectSocialPlatform = (input: string): SocialPlatform => {
    // Si no tiene indicadores de URL, retorna null
    if (!input.includes('http') && !input.includes('www.') && !input.includes('.com') && !input.includes('twitter.com') && !input.includes('x.com') && !input.includes('linkedin.com') && !input.includes('instagram.com')) {
      return null;
    }

    const lowerInput = input.toLowerCase();
    
    // Detección directa por contenido de string
    if (lowerInput.includes('twitter.com') || lowerInput.includes('x.com')) return 'twitter';
    if (lowerInput.includes('linkedin.com')) return 'linkedin';
    if (lowerInput.includes('instagram.com')) return 'instagram';

    // Fallback con URL parsing
    try {
      const url = new URL(input.startsWith('http') ? input : `https://${input}`);
      const hostname = url.hostname.toLowerCase();
      
      if (hostname.includes('twitter.com') || hostname.includes('x.com')) return 'twitter';
      if (hostname.includes('linkedin.com')) return 'linkedin';
      if (hostname.includes('instagram.com')) return 'instagram';
      return 'other';
    } catch {
      return null;
    }
  };

  // Extraer username de URL
  const extractUsernameFromUrl = (input: string, platform: SocialPlatform): string => {
    if (!platform || platform === 'other') return input;

    try {
      const url = new URL(input.startsWith('http') ? input : `https://${input}`);
      const pathname = url.pathname;
      const hostname = url.hostname.toLowerCase();

      // Twitter/X: extrae de /username
      if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
        const match = pathname.match(/^\/([a-zA-Z0-9_]+)/);
        return match ? `@${match[1]}` : input;
      }

      // LinkedIn: extrae de /in/username  
      if (hostname.includes('linkedin.com')) {
        const match = pathname.match(/^\/in\/([a-zA-Z0-9-]+)/);
        return match ? `@${match[1]}` : input;
      }

      // Instagram: extrae de /username
      if (hostname.includes('instagram.com')) {
        const match = pathname.match(/^\/([a-zA-Z0-9_.]+)/);
        return match ? `@${match[1]}` : input;
      }

      return input;
    } catch {
      return input;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Usar API route segura en lugar de llamada directa
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          socialHandle: formData.socialHandle,
          description: formData.description,
          platform: detectedPlatform || 'Not specified'
        })
      });

      if (response.ok) {
        // Éxito - mostrar mensaje y limpiar form
        setShowSuccessMessage(true);
        setFormData({
          fullName: '',
          email: '',
          socialHandle: '',
          description: ''
        });
        setDetectedPlatform(null);
        setSelectedPlatform(null);
        setShowConfirmation(false);
        
        // Cerrar modal después de 2 segundos
        setTimeout(() => {
          setShowSuccessMessage(false);
          onClose();
        }, 2000);
      } else {
        const data = await response.json();
        console.error('Airtable error:', data);
        alert('There was an issue submitting your request. Please try again or contact me directly at eugenio@castrogarza.com');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was a connection error. Please try again or contact me directly at eugenio@castrogarza.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Manejo especial para el campo social handle
    if (name === 'socialHandle') {
      const platform = detectSocialPlatform(value);
      
      if (platform) {
        const extractedUsername = extractUsernameFromUrl(value, platform);
        setDetectedPlatform(platform);
        setSelectedPlatform(platform);
        setShowConfirmation(true);
        
        // Actualizar el valor con el username extraído
        setFormData(prev => ({
          ...prev,
          socialHandle: extractedUsername
        }));

        // Ocultar confirmación después de 3 segundos
        setTimeout(() => setShowConfirmation(false), 3000);
      } else {
        setDetectedPlatform(null);
        setShowConfirmation(false);
      }
    }
  };

  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'other': return <Globe className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getPlatformName = (platform: SocialPlatform) => {
    switch (platform) {
      case 'twitter': return 'Twitter/X';
      case 'linkedin': return 'LinkedIn';
      case 'instagram': return 'Instagram';
      case 'other': return 'Other';
      default: return 'Select Platform';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {showSuccessMessage ? (
          // Pantalla de confirmación
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-4">Thank you for your inquiry. I'll get back to you within 24 hours.</p>
            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          // Formulario normal
          <>
            <DialogHeader>
              <DialogTitle>Let's explore working together</DialogTitle>
              <DialogDescription>
                Tell me about your project and how I can help you spend less time researching and more time creating.
              </DialogDescription>
            </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="socialHandle">Main Social Handle</Label>
            <div className="relative">
              <Input
                id="socialHandle"
                name="socialHandle"
                value={formData.socialHandle}
                onChange={handleChange}
                placeholder="@username or paste social media link"
                className="w-full"
              />
              
              {/* Chip de confirmación */}
              {showConfirmation && detectedPlatform && (
                <div className="absolute -top-8 left-0 right-0 flex justify-center">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border border-green-200 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(detectedPlatform)}
                      <span className="text-xs font-medium">
                        {getPlatformName(detectedPlatform)} detected!
                      </span>
                    </div>
                  </Badge>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Describe what you need help with *</Label>
            <Textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell me about your project, research needs, timeline, and any specific areas where you'd like support..."
              rows={5}
              className="min-h-[120px]"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </Button>
          </div>
        </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}