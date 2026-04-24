"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-dark active:scale-95",
        secondary:
          "bg-accent text-dark-green hover:bg-accent-dark active:scale-95",
        outline:
          "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white active:scale-95",
        ghost:
          "bg-transparent text-foreground hover:bg-muted active:scale-95",
        danger:
          "bg-danger text-white hover:bg-red-600 active:scale-95",
      },
      size: {
        sm:  "h-9  px-4  text-sm",
        md:  "h-11 px-6  text-base",
        lg:  "h-13 px-8  text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
