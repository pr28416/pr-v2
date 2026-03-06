import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-1.5 py-0 text-xs transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-dos-white bg-transparent text-dos-white",
        secondary:
          "border-dos-bright-black bg-transparent text-dos-bright-black",
        destructive:
          "border-dos-bright-red bg-transparent text-dos-bright-red",
        outline: "border-dos-white text-dos-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
