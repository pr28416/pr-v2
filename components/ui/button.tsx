import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dos-white focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 font-mono",
  {
    variants: {
      variant: {
        default: "bg-dos-white text-dos-black hover:bg-dos-bright-white border border-dos-white",
        destructive:
          "bg-dos-red text-dos-bright-white hover:bg-dos-bright-red border border-dos-red",
        outline:
          "border border-dos-white bg-transparent text-dos-white hover:bg-dos-white hover:text-dos-black",
        secondary:
          "bg-transparent border border-dos-bright-black text-dos-white hover:bg-dos-white/10",
        ghost: "hover:bg-dos-white/10 text-dos-white",
        link: "text-dos-bright-cyan underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-1",
        sm: "h-8 px-3",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
