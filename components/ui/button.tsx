import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: "sm" | "md" | "lg"
    variant?: "default" | "outline"
  }
>(({ className, size = "md", variant = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        {
          "h-8 px-3 text-xs": size === "sm",
          "h-10 px-4 py-2": size === "md", 
          "h-12 px-8 py-3 text-lg": size === "lg",
        },
        {
          "bg-black text-white hover:bg-gray-800": variant === "default",
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50": variant === "outline",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }