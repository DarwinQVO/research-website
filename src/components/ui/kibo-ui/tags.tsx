'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface TagsContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
}

const TagsContext = React.createContext<TagsContextType | undefined>(undefined);

interface TagsProps {
  children: React.ReactNode;
  className?: string;
}

const Tags = ({ children, className }: TagsProps) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  return (
    <TagsContext.Provider value={{ open, setOpen, search, setSearch }}>
      <div className={cn("relative", className)}>
        {children}
      </div>
    </TagsContext.Provider>
  );
};

const TagsTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(TagsContext);
  if (!context) {
    throw new Error('TagsTrigger must be used within a Tags');
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    context.setOpen(!context.open);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap gap-1 p-2 border border-gray-300 rounded-md cursor-text min-h-[40px] items-center",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      <div className="text-gray-500 text-sm">
        {React.Children.count(children) === 0 ? "Add tags..." : ""}
      </div>
    </div>
  );
});
TagsTrigger.displayName = "TagsTrigger";

const TagsValue = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { onRemove: () => void }
>(({ className, children, onRemove, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm",
      className
    )}
    {...props}
  >
    {children}
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      className="hover:bg-blue-200 rounded-full p-0.5"
    >
      <X className="h-3 w-3" />
    </button>
  </div>
));
TagsValue.displayName = "TagsValue";

const TagsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(TagsContext);
  if (!context) {
    throw new Error('TagsContent must be used within a Tags');
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
TagsContent.displayName = "TagsContent";

const TagsInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(TagsContext);
  if (!context) {
    throw new Error('TagsInput must be used within a Tags');
  }

  return (
    <Input
      ref={ref}
      className={cn("border-0 border-b rounded-none focus:ring-0", className)}
      value={context.search}
      onChange={(e) => context.setSearch(e.target.value)}
      {...props}
    />
  );
});
TagsInput.displayName = "TagsInput";

const TagsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("max-h-60 overflow-auto", className)}
    {...props}
  />
));
TagsList.displayName = "TagsList";

const TagsEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("py-6 text-center text-sm text-gray-500", className)}
    {...props}
  />
));
TagsEmpty.displayName = "TagsEmpty";

const TagsGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-1", className)}
    {...props}
  />
));
TagsGroup.displayName = "TagsGroup";

const TagsItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { onSelect: () => void }
>(({ className, children, onSelect, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
});
TagsItem.displayName = "TagsItem";

export {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
};