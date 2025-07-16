'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ComboboxData {
  value: string;
  label: string;
}

interface ComboboxContextType {
  value: string;
  onValueChange: (value: string) => void;
  data: ComboboxData[];
  open: boolean;
  setOpen: (open: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
}

const ComboboxContext = React.createContext<ComboboxContextType | undefined>(undefined);

interface ComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
  data: ComboboxData[];
  type?: string;
  children: React.ReactNode;
}

const Combobox = ({ value, onValueChange, data, children }: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  return (
    <ComboboxContext.Provider value={{ value, onValueChange, data, open, setOpen, search, setSearch }}>
      <div className="relative">
        {children}
      </div>
    </ComboboxContext.Provider>
  );
};

const ComboboxTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error('ComboboxTrigger must be used within a Combobox');
  }

  const selectedItem = context.data.find(item => item.value === context.value);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    context.setOpen(!context.open);
  };

  return (
    <Button
      ref={ref}
      variant="outline"
      role="combobox"
      type="button"
      aria-expanded={context.open}
      className={cn("justify-between", className)}
      onClick={handleClick}
      {...props}
    >
      {selectedItem ? selectedItem.label : "Select option..."}
      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );
});
ComboboxTrigger.displayName = "ComboboxTrigger";

const ComboboxContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error('ComboboxContent must be used within a Combobox');
  }

  if (!context.open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ComboboxContent.displayName = "ComboboxContent";

const ComboboxInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error('ComboboxInput must be used within a Combobox');
  }

  return (
    <Input
      ref={ref}
      className={cn("border-0 border-b rounded-none focus:ring-0", className)}
      placeholder="Search..."
      value={context.search}
      onChange={(e) => context.setSearch(e.target.value)}
      {...props}
    />
  );
});
ComboboxInput.displayName = "ComboboxInput";

const ComboboxList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("max-h-60 overflow-auto", className)}
    {...props}
  />
));
ComboboxList.displayName = "ComboboxList";

const ComboboxEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error('ComboboxEmpty must be used within a Combobox');
  }

  const filteredData = context.data.filter(item =>
    item.label.toLowerCase().includes(context.search.toLowerCase())
  );

  if (filteredData.length > 0) return null;

  return (
    <div
      ref={ref}
      className={cn("py-6 text-center text-sm text-gray-500", className)}
      {...props}
    >
      No results found.
    </div>
  );
});
ComboboxEmpty.displayName = "ComboboxEmpty";

const ComboboxGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-1", className)}
    {...props}
  />
));
ComboboxGroup.displayName = "ComboboxGroup";

const ComboboxItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error('ComboboxItem must be used within a Combobox');
  }

  const isSelected = context.value === value;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    context.onValueChange(value);
    context.setOpen(false);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100",
        isSelected && "bg-gray-100",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
      {children}
    </div>
  );
});
ComboboxItem.displayName = "ComboboxItem";

export {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
};