import * as React from "react";
import Link from "next/link";
import { Calendar, User, Euro, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Booking } from "@/lib/types";

interface SessionCardProps {
  booking: Booking;
  /** If true, show action buttons (for psychologist/client) */
  showActions?: boolean;
}

export const SessionCard = ({
  booking,
  showActions = true,
}: SessionCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isConfirmed = booking.status === "confirmed";
  const isCompleted = booking.status === "completed";
  const isCancelled = booking.status === "cancelled";

  return (
    <Link
      href={`/app/bookings/${booking.id}`}
      passHref
      className={cn(
        "group",
        "neumorphism-card",
        "hover:neumorphism-hover",
        "cursor-pointer"
      )}
    >
      <div className="flex items-start space-x-4">
        {/* Psychologist Avatar (or client?) We'll show psychologist */}
        <div className="h-10 w-10 flex-shrink-0">
          {booking.psychologist ? (
            <Avatar
              src={booking.psychologist.avatar_url}
              alt={booking.psychologist.full_name}
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full neumorphism-light border">
              <User className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-baseline space-x-3">
            <h3 className="text-xl font-semibold font-outfit text-foreground">
              Session with {booking.psychologist?.full_name ?? "Psychologist"}
            </h3>
            {/* Status badge */}
            <Badge
              variant={
                isConfirmed
                  ? "secondary"
                  : isCompleted
                  ? "success"
                  : isCancelled
                  ? "destructive"
                  : "warning"
              }
              soft
            >
              {booking.status
                .split("_")
                .map((w) => w[0] + w.slice(1).toLowerCase())
                .join(" ")}
            </Badge>
          </div>

          <p className="text-muted-foreground">
            {booking.client?.full_name ?? "Client"}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {formatDate(booking.starts_at)} at {formatTime(booking.starts_at)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>– {formatDate(booking.ends_at)} at {formatTime(booking.ends_at)}</span>
            </div>
            {booking.price_cents !== null && (
              <div className="flex items-center space-x-2">
                <Euro className="h-4 w-4 text-muted-foreground" />
                <span>€{(booking.price_cents / 100).toFixed(2)}</span>
              </div>
            )}
          </div>

          {showActions && (
            <div className="mt-2 flex space-x-2">
              {/* If user is psychologist, show options to mark as completed or cancel */}
              {/* We'll implement via modals or redirects; for now, show placeholder */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // TODO: Implement action
                  alert("Action not implemented yet");
                }}
              >
                Mark as Completed
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive"
                onClick={() => {
                  // TODO: Implement cancel
                  alert("Cancel not implemented yet");
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};