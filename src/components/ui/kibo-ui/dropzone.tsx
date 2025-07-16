'use client';

import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
  children: React.ReactNode;
  className?: string;
}

const Dropzone = ({ onDrop, accept, maxFiles, maxSize, children, className }: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer transition-colors",
        isDragActive ? "border-blue-500 bg-blue-50" : "hover:border-gray-400",
        className
      )}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

const DropzoneEmptyState = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-2", className)}
    {...props}
  >
    <Upload className="mx-auto h-8 w-8 text-gray-400" />
    <div className="text-sm text-gray-600">
      <span className="font-medium">Click to upload</span> or drag and drop
    </div>
    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
  </div>
));
DropzoneEmptyState.displayName = "DropzoneEmptyState";

const DropzoneContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-2", className)}
    {...props}
  />
));
DropzoneContent.displayName = "DropzoneContent";

export { Dropzone, DropzoneContent, DropzoneEmptyState };