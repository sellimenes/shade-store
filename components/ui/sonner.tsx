"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast as sonnerToast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner> & {
  variant?: "success" | "error" | "info" | "warning";
};

const Toaster = ({ variant = "error", ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  const variantClasses = {
    success: {
      toast: "bg-green-500 text-white border-green-700 shadow-lg",
      description: "text-green-200",
      actionButton: "bg-green-700 text-white",
      cancelButton: "bg-green-300 text-green-700",
    },
    error: {
      toast: "bg-red-500 text-white border-red-700 shadow-lg",
      description: "text-red-200",
      actionButton: "bg-red-700 text-white",
      cancelButton: "bg-red-300 text-red-700",
    },
    info: {
      toast: "bg-blue-500 text-white border-blue-700 shadow-lg",
      description: "text-blue-200",
      actionButton: "bg-blue-700 text-white",
      cancelButton: "bg-blue-300 text-blue-700",
    },
    warning: {
      toast: "bg-yellow-500 text-white border-yellow-700 shadow-lg",
      description: "text-yellow-200",
      actionButton: "bg-yellow-700 text-white",
      cancelButton: "bg-yellow-300 text-yellow-700",
    },
  };

  const selectedVariant = variantClasses[variant];

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `group toast ${selectedVariant.toast}`,
          description: `group-[.toast]:${selectedVariant.description}`,
          actionButton: `group-[.toast]:${selectedVariant.actionButton}`,
          cancelButton: `group-[.toast]:${selectedVariant.cancelButton}`,
        },
      }}
      {...props}
    />
  );
};

const toast = {
  success: (message: string, options?: any) =>
    sonnerToast(message, { ...options, variant: "success" }),
  error: (message: string, options?: any) =>
    sonnerToast(message, { ...options, variant: "error" }),
  info: (message: string, options?: any) =>
    sonnerToast(message, { ...options, variant: "info" }),
  warning: (message: string, options?: any) =>
    sonnerToast(message, { ...options, variant: "warning" }),
};

export { Toaster, toast };
