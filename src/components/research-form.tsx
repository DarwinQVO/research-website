'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  UserIcon,
  ArrowRightIcon,
  BookOpenIcon,
  UsersIcon,
  CheckCircleIcon,
} from 'lucide-react';

// Social media icons as SVG
const TwitterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);
import { type FormEventHandler, useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

// Research types for final selection
const researchTypes = [
  {
    value: 'interview-prep',
    label: 'Interview Prep',
    description: 'Research preparation for interviews and podcast appearances',
    chip: 'Interview'
  },
  {
    value: 'topic-recommendation',
    label: 'Topic Recommendation',
    description: 'Curated topic suggestions based on your audience and goals',
    chip: 'Topics'
  },
  {
    value: 'company-research',
    label: 'Company Research',
    description: 'Deep dive into companies, competitors, and market dynamics',
    chip: 'Companies'
  },
  {
    value: 'people-research',
    label: 'People Research',
    description: 'Background research on individuals, experts, and key figures',
    chip: 'People'
  },
  {
    value: 'health-research',
    label: 'Health Research',
    description: 'Medical and health-related research with scientific backing',
    chip: 'Health'
  },
  {
    value: 'other',
    label: 'Other Research',
    description: 'Custom research needs - describe your specific requirements',
    chip: 'Custom'
  },
];

export default function ResearchForm() {
  // Form state management
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info + Service Type
    fullName: '',
    email: '',
    socialHandle: '',
    socialPlatform: 'twitter',
    serviceType: '', // 'do-research' or 'teach-research'
    trainingFor: '', // 'myself' or 'team' (only for teach-research)
    teamSize: '', // only for team training
    
    // Step 2: Research Types
    selectedResearchTypes: [] as string[],
    customResearch: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const [showUsernameChip, setShowUsernameChip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPlatformDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const updateFormData = (field: string, value: string | string[]) => {
    // Input sanitization
    let sanitizedValue = value;
    if (typeof value === 'string') {
      // Remove potentially dangerous characters
      sanitizedValue = value
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim();
    }
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const resetForm = () => {
    setCurrentStep(1);
    setShowSuccessScreen(false);
    setFormData({
      fullName: '',
      email: '',
      socialHandle: '',
      socialPlatform: 'twitter',
      serviceType: '',
      trainingFor: '',
      teamSize: '',
      selectedResearchTypes: [],
      customResearch: '',
    });
  };

  // Function to detect social platform from URL
  const detectSocialPlatform = (input: string) => {
    if (!input || (!input.includes('http') && !input.includes('www.') && !input.includes('.com'))) {
      return null; // Not a URL
    }

    try {
      const url = new URL(input.includes('http') ? input : `https://${input}`);
      const hostname = url.hostname.toLowerCase();

      if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
        return 'twitter';
      } else if (hostname.includes('linkedin.com')) {
        return 'linkedin';
      } else if (hostname.includes('instagram.com')) {
        return 'instagram';
      } else {
        return 'other';
      }
    } catch (error) {
      return null;
    }
  };

  // Function to extract username from social media URLs
  const extractUsernameFromUrl = (input: string, platform: string) => {
    if (!input) return '';
    
    // If it's already a username (starts with @ or no protocol), return as is
    if (input.startsWith('@') || (!input.includes('http') && !input.includes('www.') && !input.includes('.com'))) {
      return input.startsWith('@') ? input : `@${input}`;
    }

    try {
      const url = new URL(input.includes('http') ? input : `https://${input}`);
      const hostname = url.hostname.toLowerCase();
      const pathname = url.pathname;

      // Extract username based on platform
      if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
        const match = pathname.match(/^\/([a-zA-Z0-9_]+)/);
        return match ? `@${match[1]}` : input;
      } else if (hostname.includes('linkedin.com')) {
        const match = pathname.match(/^\/in\/([a-zA-Z0-9-]+)/);
        return match ? `@${match[1]}` : input;
      } else if (hostname.includes('instagram.com')) {
        const match = pathname.match(/^\/([a-zA-Z0-9_.]+)/);
        return match ? `@${match[1]}` : input;
      } else {
        // For other platforms, try to extract the last part of the path
        const parts = pathname.split('/').filter(Boolean);
        return parts.length > 0 ? `@${parts[parts.length - 1]}` : input;
      }
    } catch (error) {
      // If URL parsing fails, return the input as is
      return input.startsWith('@') ? input : `@${input}`;
    }
  };

  const handleSocialHandleChange = (value: string) => {
    const originalValue = value;
    
    // Detect social platform from URL
    const detectedPlatform = detectSocialPlatform(value);
    if (detectedPlatform) {
      updateFormData('socialPlatform', detectedPlatform);
    }
    
    const extractedUsername = extractUsernameFromUrl(value, detectedPlatform || formData.socialPlatform);
    
    // Show chip animation if we extracted a username from a URL
    const wasUrl = originalValue !== extractedUsername && (originalValue.includes('http') || originalValue.includes('www.') || originalValue.includes('.com'));
    if (wasUrl && extractedUsername.startsWith('@')) {
      setShowUsernameChip(true);
      setTimeout(() => setShowUsernameChip(false), 3000); // Hide after 3 seconds
    }
    
    updateFormData('socialHandle', extractedUsername);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleResearchTypeToggle = (type: string) => {
    const current = formData.selectedResearchTypes;
    if (current.includes(type)) {
      updateFormData('selectedResearchTypes', current.filter(t => t !== type));
    } else {
      updateFormData('selectedResearchTypes', [...current, type]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Here you would submit to your backend/Airtable
      console.log('Submitting form data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success screen instead of toast
      setShowSuccessScreen(true);
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit request', {
        description: 'Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedFromStep1 = () => {
    const basicInfo = formData.fullName && formData.email && formData.socialHandle && formData.serviceType;
    if (!basicInfo) return false;
    
    if (formData.serviceType === 'teach-research') {
      if (!formData.trainingFor) return false;
      if (formData.trainingFor === 'team' && !formData.teamSize) return false;
    }
    
    return true;
  };

  const canSubmit = () => {
    return formData.selectedResearchTypes.length > 0;
  };

  // Calculate progress based on completed fields
  const calculateProgress = () => {
    let totalFields = 5; // fullName, email, socialHandle, serviceType, selectedResearchTypes (always count step 2)
    let completedFields = 0;

    // Basic fields (always required)
    if (formData.fullName) completedFields++;
    if (formData.email) completedFields++;
    if (formData.socialHandle) completedFields++;
    if (formData.serviceType) completedFields++;

    // Conditional fields based on service type
    if (formData.serviceType === 'teach-research') {
      totalFields += 1; // trainingFor
      if (formData.trainingFor) completedFields++;
      
      if (formData.trainingFor === 'team') {
        totalFields += 1; // teamSize
        if (formData.teamSize) completedFields++;
      }
    }

    // Research types (ALWAYS count this field, regardless of current step)
    if (formData.selectedResearchTypes.length > 0) completedFields++;
    
    // Custom research field if "other" is selected (ALWAYS count if other is selected)
    if (formData.selectedResearchTypes.includes('other')) {
      totalFields += 1; // customResearch
      if (formData.customResearch) completedFields++;
    }

    return {
      completed: completedFields,
      total: totalFields,
      percentage: Math.round((completedFields / totalFields) * 100)
    };
  };

  const progress = calculateProgress();

  // Show success screen if submission was successful
  if (showSuccessScreen) {
    return (
      <div className="mx-auto p-6 rounded-2xl border shadow" style={{ width: '460px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
        <div className="text-center space-y-6 animate-slide-in-smooth">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>
          
          {/* Thank You Message */}
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-slate-900">
              Thank You!
            </h1>
            <p className="text-slate-600 leading-relaxed">
              Your research request has been submitted successfully. Our team will review your request and contact you within 24 hours.
            </p>
          </div>
          
          {/* Submitted Details Summary */}
          <div className="bg-slate-50 rounded-lg p-4 text-left space-y-2">
            <h3 className="font-medium text-slate-700 text-sm">Request Summary:</h3>
            <div className="space-y-1 text-sm text-slate-600">
              <p><span className="font-medium">Name:</span> {formData.fullName}</p>
              <p><span className="font-medium">Email:</span> {formData.email}</p>
              <p><span className="font-medium">Service:</span> {formData.serviceType === 'do-research' ? 'Research for you' : 'Teach you research'}</p>
              <p><span className="font-medium">Research Types:</span> {formData.selectedResearchTypes.length} selected</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button
              onClick={resetForm}
              variant="outline"
              className="border-gray-300 px-6 btn-premium hover:border-gray-400 bg-white hover:bg-gray-50"
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 rounded-2xl border shadow" style={{ width: '460px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
      <div className="mb-6 text-left">
        <h1 className="mb-2 font-semibold text-2xl tracking-tight">
          Start Your Research Project
        </h1>
        
        {/* Compact Progress Bar */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{progress.completed} of {progress.total} fields</span>
            <span>{progress.percentage}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Step 1: Contact & Service Type */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-slide-in-smooth">
            <div className="text-left">
              <h2 className="font-medium text-lg text-slate-700">Contact & Service</h2>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <Input
                placeholder="Full name"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                className="text-sm w-full"
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="text-sm w-full"
                required
              />
              
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
                      className="flex items-center justify-center w-12 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50"
                    >
                      <div className="text-gray-600">
                        {formData.socialPlatform === 'twitter' && <TwitterIcon />}
                        {formData.socialPlatform === 'linkedin' && <LinkedInIcon />}
                        {formData.socialPlatform === 'instagram' && <InstagramIcon />}
                        {formData.socialPlatform === 'other' && <GlobeIcon />}
                      </div>
                    </button>
                    {showPlatformDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-12 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <button
                          type="button"
                          onClick={() => {
                            updateFormData('socialPlatform', 'twitter');
                            setShowPlatformDropdown(false);
                          }}
                          className="w-full p-2 hover:bg-gray-50 flex items-center justify-center text-gray-600"
                        >
                          <TwitterIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            updateFormData('socialPlatform', 'linkedin');
                            setShowPlatformDropdown(false);
                          }}
                          className="w-full p-2 hover:bg-gray-50 flex items-center justify-center text-blue-600"
                        >
                          <LinkedInIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            updateFormData('socialPlatform', 'instagram');
                            setShowPlatformDropdown(false);
                          }}
                          className="w-full p-2 hover:bg-gray-50 flex items-center justify-center text-pink-600"
                        >
                          <InstagramIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            updateFormData('socialPlatform', 'other');
                            setShowPlatformDropdown(false);
                          }}
                          className="w-full p-2 hover:bg-gray-50 flex items-center justify-center text-gray-600"
                        >
                          <GlobeIcon />
                        </button>
                      </div>
                    )}
                  </div>
                  <Input
                    type="text"
                    placeholder="@username or paste social media link"
                    value={formData.socialHandle}
                    onChange={(e) => handleSocialHandleChange(e.target.value)}
                    className="flex-1 text-sm"
                    required
                  />
                </div>
                
                {/* Username chip notification */}
                {showUsernameChip && formData.socialHandle && formData.socialHandle.startsWith('@') && (
                  <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-md text-sm text-green-700 animate-success-explode">
                    <div className="text-green-600">
                      {formData.socialPlatform === 'twitter' && <TwitterIcon />}
                      {formData.socialPlatform === 'linkedin' && <LinkedInIcon />}
                      {formData.socialPlatform === 'instagram' && <InstagramIcon />}
                      {formData.socialPlatform === 'other' && <GlobeIcon />}
                    </div>
                    <span className="font-medium">{formData.socialHandle}</span>
                    <span className="text-green-600">✓ Platform & username detected</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Service Type */}
            <div className="space-y-3">
              <p className="text-sm text-left text-slate-600 border-t pt-4">What do you need?</p>
              
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="radio"
                    name="serviceType"
                    value="do-research"
                    checked={formData.serviceType === 'do-research'}
                    onChange={(e) => updateFormData('serviceType', e.target.value)}
                    className="w-4 h-4 text-blue-600 mt-0.5"
                  />
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-sm">Research for you</span>
                  </div>
                </label>
                
                <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="radio"
                    name="serviceType"
                    value="teach-research"
                    checked={formData.serviceType === 'teach-research'}
                    onChange={(e) => updateFormData('serviceType', e.target.value)}
                    className="w-4 h-4 text-blue-600 mt-0.5"
                  />
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-sm">Teach you research</span>
                  </div>
                </label>
              </div>
              
              {/* Conditional training options */}
              {formData.serviceType === 'teach-research' && (
                <div className="space-y-2 bg-blue-50 p-3 rounded-lg ml-6">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="trainingFor"
                        value="myself"
                        checked={formData.trainingFor === 'myself'}
                        onChange={(e) => updateFormData('trainingFor', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm">Individual</span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="trainingFor"
                        value="team"
                        checked={formData.trainingFor === 'team'}
                        onChange={(e) => updateFormData('trainingFor', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm">Team</span>
                    </label>
                  </div>
                  
                  {formData.trainingFor === 'team' && (
                    <div>
                      <Input
                        type="number"
                        min="2"
                        placeholder="Team size"
                        value={formData.teamSize}
                        onChange={(e) => updateFormData('teamSize', e.target.value)}
                        className="w-24 text-sm"
                        required
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex justify-start pt-2">
              <Button
                onClick={nextStep}
                disabled={!canProceedFromStep1()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-8 btn-premium disabled:opacity-50 disabled:cursor-not-allowed"
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.classList.add('animate-magnetic-hover');
                  }
                }}
                onAnimationEnd={(e) => {
                  e.currentTarget.classList.remove('animate-magnetic-hover');
                }}
              >
                <span className="relative z-10 transition-all duration-200">Next</span>
                <ArrowRightIcon 
                  className="ml-2 h-4 w-4 relative z-10 transition-all duration-300" 
                  style={{
                    transform: 'translateX(0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.classList.add('animate-icon-dance');
                  }}
                  onAnimationEnd={(e) => {
                    e.currentTarget.classList.remove('animate-icon-dance');
                  }}
                />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Research Types Selection */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-slide-in-smooth">
            <div className="text-left">
              <h2 className="font-medium text-lg text-slate-700">Research Types</h2>
              <p className="text-sm text-muted-foreground mt-1">Select what you need</p>
            </div>
            
            <div className="space-y-2">
              {researchTypes.map((type) => (
                <label
                  key={type.value}
                  className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.selectedResearchTypes.includes(type.value)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedResearchTypes.includes(type.value)}
                    onChange={() => handleResearchTypeToggle(type.value)}
                    className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                        formData.selectedResearchTypes.includes(type.value)
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {type.chip}
                      </div>
                      <span className="font-medium text-sm">{type.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </div>
                </label>
              ))}
            </div>
            
            {formData.selectedResearchTypes.includes('other') && (
              <div className="space-y-2">
                <Textarea
                  placeholder="Describe your custom research needs..."
                  value={formData.customResearch}
                  onChange={(e) => updateFormData('customResearch', e.target.value)}
                  rows={2}
                  className="text-sm"
                  required
                />
              </div>
            )}
            
            <div className="flex justify-start gap-3 pt-2">
              <Button
                onClick={prevStep}
                variant="outline"
                className="border-gray-300 px-6 btn-premium hover:border-gray-400 bg-white hover:bg-gray-50"
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add('animate-magnetic-hover');
                }}
                onAnimationEnd={(e) => {
                  e.currentTarget.classList.remove('animate-magnetic-hover');
                }}
              >
                <ArrowRightIcon 
                  className="mr-2 h-4 w-4 rotate-180 relative z-10 transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.classList.add('animate-icon-dance');
                  }}
                  onAnimationEnd={(e) => {
                    e.currentTarget.classList.remove('animate-icon-dance');
                  }}
                />
                <span className="relative z-10 transition-all duration-200">Back</span>
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit() || isSubmitting}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-6 btn-premium disabled:opacity-50 disabled:cursor-not-allowed"
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.classList.add('animate-magnetic-hover');
                  }
                }}
                onAnimationEnd={(e) => {
                  e.currentTarget.classList.remove('animate-magnetic-hover');
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent relative z-10" />
                    <span className="relative z-10 transition-opacity duration-200">Sending...</span>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon 
                      className="mr-2 h-4 w-4 relative z-10 transition-all duration-300"
                      onMouseEnter={(e) => {
                        e.currentTarget.classList.add('animate-icon-dance');
                      }}
                      onAnimationEnd={(e) => {
                        e.currentTarget.classList.remove('animate-icon-dance');
                      }}
                    />
                    <span className="relative z-10 transition-all duration-200">Submit</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}