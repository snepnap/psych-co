import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Variant of the badge: 'default', 'secondary', 'tertiary', 'success', 'warning', 'destructive' */
  variant?: "default" | "secondary" | "tertiary" | "success" | "warning" | "destructive";
  /** If true, badge will have a soft glow */
  soft?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", soft = false, ...props }, ref) => {
    // Variant mapping to background and text colors
    const variantMap: Record<
      BadgeProps["variant"],
      { bg: string; text: string }
    > = {
      default: { bg: "bg-muted", text: "text-muted-foreground" },
      secondary: { bg: "bg-secondary/20", text: "text-secondary" },
      tertiary: { bg: "bg-tertiary/20", text: "text-tertiary" },
      success: { bg: "bg-emerald-500/20", text: "text-emerald-500" },
      warning: { bg: "bg-amber-500/20", text: "text-amber-500" },
      destructive: { bg: "bg-destructive/20", text: "text-destructive" },
    };

    const { bg, text } = variantMap[variant];

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
          soft ? "ring-1 ring-muted/20" : "",
          bg,
          text,
          className
        )}
        {...props>
      </span>
    );
  }
);
Badge.displayName = "Badge";

export { Badge };