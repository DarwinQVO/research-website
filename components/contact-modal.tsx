import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Linkedin, Instagram, Globe, Youtube } from 'lucide-react';
import { XLogo } from '@/components/icons/XLogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SocialPlatform = 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'other' | null;

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
  const [showDropdown, setShowDropdown] = useState(false);

  // Detectar plataforma automáticamente
  const detectSocialPlatform = (input: string): SocialPlatform => {
    const lowerInput = input.toLowerCase();
    
    // Detección directa por contenido de string - más simple y directo
    if (lowerInput.includes('youtube.com')) return 'youtube';
    if (lowerInput.includes('twitter.com') || lowerInput.includes('x.com')) return 'twitter';
    if (lowerInput.includes('linkedin.com')) return 'linkedin';
    if (lowerInput.includes('instagram.com')) return 'instagram';
    
    // Si no tiene indicadores de URL, retorna null
    if (!input.includes('http') && !input.includes('www.') && !input.includes('.com')) {
      return null;
    }

    // Fallback con URL parsing
    try {
      const url = new URL(input.startsWith('http') ? input : `https://${input}`);
      const hostname = url.hostname.toLowerCase();
      
      if (hostname.includes('twitter.com') || hostname.includes('x.com')) return 'twitter';
      if (hostname.includes('linkedin.com')) return 'linkedin';
      if (hostname.includes('instagram.com')) return 'instagram';
      if (hostname.includes('youtube.com')) return 'youtube';
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

      // YouTube: extrae de /channel/ID, /@username, /c/username, o /user/username
      if (hostname.includes('youtube.com') || hostname.includes('www.youtube.com')) {
        // Para @username (nuevo formato)
        const atMatch = pathname.match(/^\/@([a-zA-Z0-9_.-]+)/);
        if (atMatch) return `@${atMatch[1]}`;
        
        // Para /c/username (formato canal personalizado)
        const cMatch = pathname.match(/^\/c\/([a-zA-Z0-9_.-]+)/);
        if (cMatch) return `@${cMatch[1]}`;
        
        // Para /user/username (formato antiguo)
        const userMatch = pathname.match(/^\/user\/([a-zA-Z0-9_.-]+)/);
        if (userMatch) return `@${userMatch[1]}`;
        
        // Para /channel/ID (mantener como está porque no es username legible)
        const channelMatch = pathname.match(/^\/channel\/([a-zA-Z0-9_-]+)/);
        if (channelMatch) return `@${channelMatch[1]}`;
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
      // Verificar que las variables de entorno existan
      if (!process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || !process.env.NEXT_PUBLIC_AIRTABLE_PAT) {
        console.error('Missing environment variables for Airtable');
        alert('Configuration error. Please contact e@eugeniocastro.com directly.');
        return;
      }

      // Llamada directa a Airtable desde el cliente para static export
      const airtableUrl = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Table%201`;
      
      const response = await fetch(airtableUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Email: formData.email.trim().toLowerCase(),
            Name: formData.fullName.trim(),
            'Social Handle': formData.socialHandle?.trim() || '',
            Description: formData.description?.trim() || '',
            Platform: selectedPlatform || detectedPlatform || 'Not specified'
          }
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
        alert('There was an issue submitting your request. Please try again or contact me directly at e@eugeniocastro.com');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was a connection error. Please try again or contact me directly at e@eugeniocastro.com');
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
      case 'twitter': return <XLogo className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'other': return <Globe className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getPlatformName = (platform: SocialPlatform) => {
    switch (platform) {
      case 'twitter': return 'X / Twitter';
      case 'linkedin': return 'LinkedIn';
      case 'instagram': return 'Instagram';
      case 'youtube': return 'YouTube';
      case 'other': return 'Other';
      default: return 'Select Platform';
    }
  };

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
          // Formulario normal
          <>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              onFocus={() => setShowDropdown(false)}
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
              onFocus={() => setShowDropdown(false)}
              placeholder="your@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="socialHandle">Main social handle *</Label>
            <div className="flex items-stretch w-full relative">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center w-8 h-10 bg-white border border-gray-300 rounded-l-md border-r-0 px-1 shrink-0 hover:bg-gray-50"
              >
                {selectedPlatform ? getPlatformIcon(selectedPlatform) : <Globe className="w-4 h-4 text-gray-500" />}
              </button>
              
              {showDropdown && (
<div className="absolute top-10 left-0 z-30 bg-white border border-gray-300 rounded-md shadow-lg min-w-32">
                  <div 
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {setSelectedPlatform('twitter'); setShowDropdown(false);}}
                  >
                    <XLogo className="w-4 h-4" />
                    <span className="text-sm">X / Twitter</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {setSelectedPlatform('linkedin'); setShowDropdown(false);}}
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {setSelectedPlatform('instagram'); setShowDropdown(false);}}
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="text-sm">Instagram</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {setSelectedPlatform('youtube'); setShowDropdown(false);}}
                  >
                    <Youtube className="w-4 h-4" />
                    <span className="text-sm">YouTube</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {setSelectedPlatform('other'); setShowDropdown(false);}}
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Other</span>
                  </div>
                </div>
              )}
              
              <Input
                id="socialHandle"
                name="socialHandle"
                value={formData.socialHandle}
                onChange={handleChange}
                onFocus={() => setShowDropdown(false)}
                placeholder="@username or paste social media link"
                className="flex-1 h-10 rounded-l-none border-l-0"
                required
              />
              
              {showConfirmation && detectedPlatform && (
                <div className="absolute -top-8 left-0 right-0 flex justify-center z-20">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border border-green-200">
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
            <Label htmlFor="description">Tell me about your project *</Label>
            <Textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              onFocus={() => setShowDropdown(false)}
              placeholder="Briefly describe how you think research can elevate your content"
              rows={5}
              className="min-h-[120px]"
            />
          </div>
          
          <div className="flex justify-center pt-4">
            <Button 
              type="submit" 
              className="w-full sm:w-auto px-8" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Sending...</span>
                  <span className="sm:hidden">Sending</span>
                </div>
              ) : (
                <>
                  <span className="hidden sm:inline">Send Message</span>
                  <span className="sm:hidden">Send</span>
                </>
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