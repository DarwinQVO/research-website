'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MiniCalendarContextType {
  value: Date | undefined;
  onValueChange: (date: Date | undefined) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  days: number;
}

const MiniCalendarContext = React.createContext<MiniCalendarContextType | undefined>(undefined);

interface MiniCalendarProps {
  value: Date | undefined;
  onValueChange: (date: Date | undefined) => void;
  days: number;
  children: React.ReactNode;
  className?: string;
}

const MiniCalendar = ({ value, onValueChange, days, children, className }: MiniCalendarProps) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  return (
    <MiniCalendarContext.Provider value={{ value, onValueChange, currentDate, setCurrentDate, days }}>
      <div className={cn("flex items-center gap-2", className)}>
        {children}
      </div>
    </MiniCalendarContext.Provider>
  );
};

const MiniCalendarNavigation = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { direction: 'prev' | 'next' }
>(({ className, direction, ...props }, ref) => {
  const context = React.useContext(MiniCalendarContext);
  if (!context) {
    throw new Error('MiniCalendarNavigation must be used within a MiniCalendar');
  }

  const handleClick = () => {
    const newDate = new Date(context.currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - context.days);
    } else {
      newDate.setDate(newDate.getDate() + context.days);
    }
    context.setCurrentDate(newDate);
  };

  return (
    <Button
      ref={ref}
      variant="outline"
      size="sm"
      onClick={handleClick}
      className={cn("h-8 w-8 p-0", className)}
      {...props}
    >
      {direction === 'prev' ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </Button>
  );
});
MiniCalendarNavigation.displayName = "MiniCalendarNavigation";

interface MiniCalendarDaysProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: (date: Date) => React.ReactNode;
}

const MiniCalendarDays = React.forwardRef<
  HTMLDivElement,
  MiniCalendarDaysProps
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(MiniCalendarContext);
  if (!context) {
    throw new Error('MiniCalendarDays must be used within a MiniCalendar');
  }

  const getDays = () => {
    const days = [];
    const startDate = new Date(context.currentDate);
    
    for (let i = 0; i < context.days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  return (
    <div
      ref={ref}
      className={cn("flex gap-1 sm:gap-2", className)}
      {...props}
    >
      {getDays().map((date) => children(date))}
    </div>
  );
});
MiniCalendarDays.displayName = "MiniCalendarDays";

const MiniCalendarDay = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { date: Date }
>(({ className, date, ...props }, ref) => {
  const context = React.useContext(MiniCalendarContext);
  if (!context) {
    throw new Error('MiniCalendarDay must be used within a MiniCalendar');
  }

  const isSelected = context.value && 
    context.value.toDateString() === date.toDateString();

  const isToday = new Date().toDateString() === date.toDateString();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    context.onValueChange(date);
  };

  return (
    <Button
      ref={ref}
      variant={isSelected ? "default" : "outline"}
      size="sm"
      type="button"
      onClick={handleClick}
      className={cn(
        "h-14 w-14 sm:h-16 sm:w-16 p-0 flex flex-col items-center justify-center flex-shrink-0",
        isToday && !isSelected && "border-blue-500 text-blue-500",
        className
      )}
      {...props}
    >
      <div className="text-xs font-medium">
        {date.toLocaleDateString('en-US', { weekday: 'short' })}
      </div>
      <div className="text-lg font-bold">
        {date.getDate()}
      </div>
    </Button>
  );
});
MiniCalendarDay.displayName = "MiniCalendarDay";

export {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
};