'use client';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from '@/components/ui/kibo-ui/combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  BriefcaseIcon,
  DollarSignIcon,
  ClockIcon,
  InfoIcon,
  GlobeIcon,
} from 'lucide-react';
import { type FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

const researchObjectives = [
  {
    value: 'podcast-interview',
    label: 'Podcast / Interview Prep',
    description: 'Research preparation for interviews and podcast appearances',
  },
  {
    value: 'competitive-landscape',
    label: 'Competitive Landscape · Company Report',
    description: 'Comprehensive competitive analysis and company intelligence',
  },
  {
    value: 'audience-insights',
    label: 'Audience & Community Insights',
    description: 'Deep dive into audience behavior and community dynamics',
  },
  {
    value: 'fact-check',
    label: 'Scientific Fact-Check',
    description: 'Scientific fact-checking and verification services',
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Custom research needs - describe your specific requirements',
  },
];

const industries = [
  { value: 'media', label: 'Media' },
  { value: 'saas', label: 'SaaS' },
  { value: 'health', label: 'Health' },
  { value: 'fintech', label: 'FinTech' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'education', label: 'Education' },
  { value: 'technology', label: 'Technology' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'finance', label: 'Finance' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'retail', label: 'Retail' },
  { value: 'food-beverage', label: 'Food & Beverage' },
  { value: 'travel', label: 'Travel & Tourism' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'nonprofit', label: 'Nonprofit' },
  { value: 'government', label: 'Government' },
  { value: 'other', label: 'Other' },
];

const budgetRanges = [
  {
    value: 'less-5k',
    label: '< 5k USD',
    description: 'Essential research package for focused studies',
  },
  {
    value: '5-10k',
    label: '5–10k USD',
    description: 'Comprehensive research with detailed analysis',
  },
  {
    value: '10-25k',
    label: '10–25k USD',
    description: 'Premium research with extensive coverage',
  },
  {
    value: 'more-25k',
    label: '> 25k USD',
    description: 'Enterprise-level research with ongoing support',
  },
];

const urgencyOptions = [
  {
    value: '1-2-weeks',
    label: '1–2 weeks',
    description: 'Urgent delivery within 1-2 weeks',
  },
  {
    value: '3-4-weeks',
    label: '3–4 weeks',
    description: 'Standard delivery within 3-4 weeks',
  },
  {
    value: 'flexible',
    label: 'Flexible',
    description: 'No specific timeline requirements',
  },
];

// Function to extract domain from email and suggest company name
const getCompanyFromEmail = (email: string): string => {
  const domain = email.split('@')[1];
  if (!domain) return '';
  
  const companyPart = domain.split('.')[0];
  return companyPart.charAt(0).toUpperCase() + companyPart.slice(1);
};

export default function ResearchForm() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [objective, setObjective] = useState('');
  const [customObjective, setCustomObjective] = useState('');
  const [industry, setIndustry] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [urgency, setUrgency] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    
    // Auto-suggest company name from email domain
    if (emailValue.includes('@') && !company) {
      const suggestedCompany = getCompanyFromEmail(emailValue);
      if (suggestedCompany) {
        setCompany(suggestedCompany);
      }
    }
  };

  const handleIndustryChange = (industryValue: string) => {
    setIndustry(prev => {
      if (prev.includes(industryValue)) {
        return prev.filter(item => item !== industryValue);
      } else {
        return [...prev, industryValue];
      }
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitToAirtable = async (formData: FormData) => {
    const url = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/tblUTfvLPJNSqIFox?typecast=true`;
    console.log('State values:', { budget, urgency });
    
    const payload = {
      records: [{
        fields: {
          'fldQWak3mK7LbYk0W': formData.get('name'), // Name
          'fldrv18ALvpeXJZva': formData.get('email'), // Email  
          'fldjuhWBoMUWQlMXG': formData.get('company'), // Company
          'fldFTAmLyxefiOIor': objective, // Objective
          'flde92PWU0ZlI3xEq': customObjective || '', // Custom Objective
          'fldTsV6OCJSbaafJs': industry, // Industry (multiple select)
          'fldfhDOhTGYQ4mEnn': budget, // Budget
          'fldehjORCv0G08C3i': urgency, // Urgency
          'fld8tHx7pbppi6E2q': new Date().toISOString().split('T')[0], // Submitted At (date only)
        }
      }]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} - ${responseText}`);
    }

    return JSON.parse(responseText);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      
      // Validate required fields
      if (!formData.get('name') || !formData.get('email') || !company || !objective || industry.length === 0 || !budget || !urgency) {
        toast.error('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      await submitToAirtable(formData);
      
      toast.success('Request submitted successfully', {
        description: 'Our team will review your request and contact you within 24 hours.',
      });

      // Reset form
      const form = event.currentTarget;
      if (form) {
        form.reset();
      }
      setEmail('');
      setCompany('');
      setObjective('');
      setCustomObjective('');
      setIndustry([]);
      setBudget('');
      setUrgency('');
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit request', {
        description: 'Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="not-prose mx-auto max-w-[530px] p-8 rounded-2xl shadow-sm border border-slate-200" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-semibold text-3xl tracking-tight">
          Start Your Research Project
        </h1>
        <p className="text-balance text-muted-foreground">
          Tell us about your research needs and we'll provide a customized solution
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-semibold text-xl">
            <InfoIcon className="size-5" />
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Corporate Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Company Inc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Research Objective */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-semibold text-xl">
            <BriefcaseIcon className="size-5" />
            Main Objective
          </h2>
          <div className="space-y-3">
            {researchObjectives.map((obj) => (
              <label key={obj.value} className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="objective"
                  value={obj.value}
                  checked={objective === obj.value}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{obj.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{obj.description}</div>
                </div>
              </label>
            ))}
          </div>
          
          {objective === 'other' && (
            <div className="space-y-2">
              <Label htmlFor="custom-objective">Describe your need</Label>
              <Textarea
                id="custom-objective"
                placeholder="Describe your specific need..."
                value={customObjective}
                onChange={(e) => setCustomObjective(e.target.value)}
                rows={3}
                required
              />
            </div>
          )}
        </div>

        {/* Industry Selection */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-semibold text-xl">
            <GlobeIcon className="size-5" />
            Industry / Niche
          </h2>
          <p className="text-sm text-muted-foreground">Select all that apply</p>
          <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
            {industries.map((ind) => (
              <label key={ind.value} className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={industry.includes(ind.value)}
                  onChange={() => handleIndustryChange(ind.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium">{ind.label}</span>
              </label>
            ))}
          </div>
          {industry.length > 0 && (
            <div className="text-sm text-slate-600">
              Selected: {industry.map(val => industries.find(ind => ind.value === val)?.label).join(', ')}
            </div>
          )}
        </div>

        {/* Budget Range */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-semibold text-xl">
            <DollarSignIcon className="size-5" />
            Approximate Budget
          </h2>
          <div className="space-y-3">
            {budgetRanges.map((range) => (
              <label key={range.value} className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="budget"
                  value={range.value}
                  checked={budget === range.value}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{range.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{range.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Urgency */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-semibold text-xl">
            <ClockIcon className="size-5" />
            Urgency
          </h2>
          <div className="space-y-3">
            {urgencyOptions.map((option) => (
              <label key={option.value} className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="urgency"
                  value={option.value}
                  checked={urgency === option.value}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-slate-900 hover:bg-slate-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </form>
    </div>
  );
}