'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ChoiceboxContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const ChoiceboxContext = React.createContext<ChoiceboxContextType | undefined>(undefined);

interface ChoiceboxProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const Choicebox = ({ value, onValueChange, children, className }: ChoiceboxProps) => {
  return (
    <ChoiceboxContext.Provider value={{ value, onValueChange }}>
      <div className={cn("space-y-2", className)}>
        {children}
      </div>
    </ChoiceboxContext.Provider>
  );
};

const ChoiceboxItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(ChoiceboxContext);
  if (!context) {
    throw new Error('ChoiceboxItem must be used within a Choicebox');
  }

  const isSelected = context.value === value;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    context.onValueChange(value);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors",
        isSelected
          ? "border-blue-500 bg-blue-50 text-blue-900"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
});
ChoiceboxItem.displayName = "ChoiceboxItem";

const ChoiceboxItemHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1", className)}
    {...props}
  />
));
ChoiceboxItemHeader.displayName = "ChoiceboxItemHeader";

const ChoiceboxItemTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-medium", className)}
    {...props}
  />
));
ChoiceboxItemTitle.displayName = "ChoiceboxItemTitle";

const ChoiceboxItemDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
));
ChoiceboxItemDescription.displayName = "ChoiceboxItemDescription";

const ChoiceboxItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center", className)}
    {...props}
  />
));
ChoiceboxItemContent.displayName = "ChoiceboxItemContent";

const ChoiceboxItemIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(ChoiceboxContext);
  if (!context) {
    throw new Error('ChoiceboxItemIndicator must be used within a Choicebox');
  }

  return (
    <div
      ref={ref}
      className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
        context.value ? "border-blue-500 bg-blue-500" : "border-gray-300",
        className
      )}
      {...props}
    >
      {context.value && (
        <div className="w-2 h-2 bg-white rounded-full" />
      )}
    </div>
  );
});
ChoiceboxItemIndicator.displayName = "ChoiceboxItemIndicator";

export {
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemContent,
  ChoiceboxItemDescription,
  ChoiceboxItemHeader,
  ChoiceboxItemIndicator,
  ChoiceboxItemTitle,
};