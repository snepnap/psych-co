import * as React from "react";
import Link from "next/link";
import { Brain, Calendar, Users, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Internship } from "@/lib/types";

interface InternshipCardProps {
  internship: Internship;
  /** If true, show enroll button; else show details */
  showAction?: boolean;
  /** Callback when enroll button is clicked */
  onEnroll?: () => Promise<void>;
}

export const InternshipCard = ({
  internship,
  showAction = true,
  onEnroll,
}: InternshipCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isFree = !internship.price_cents || internship.price_cents === 0;
  const priceDisplay = isFree ? "Free" : `€${(internship.price_cents ?? 0) / 100}`;

  return (
    <Link
      href={`/app/internships/${internship.id}`}
      passHref
      className={cn(
        "group",
        "neumorphism-card",
        "hover:neumorphism-hover",
        "cursor-pointer"
      )}
    >
      <div className="flex items-start space-x-4">
        {/* Psychologist Avatar */}
        <div className="h-10 w-10 flex-shrink-0">
          {internship.psychologist ? (
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={internship.psychologist.avatar_url ?? undefined}
                alt={internship.psychologist.full_name}
              />
              <AvatarFallback>
                {internship.psychologist.full_name?.[0] ?? "P"}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full neumorphism-light border">
              <Brain className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-baseline space-x-3">
            <h3 className="text-xl font-semibold font-outfit text-foreground">
              {internship.title}
            </h3>
            {/* Status badge */}
            <Badge
              variant={
                internship.status === "active"
                  ? "success"
                  : internship.status === "completed"
                  ? "secondary"
                  : internship.status === "draft"
                  ? "tertiary"
                  : "warning"
              }
              soft
            >
              {internship.status
                .split("_")
                .map((w) => w[0] + w.slice(1).toLowerCase())
                .join(" ")}
            </Badge>
          </div>

          <p className="text-muted-foreground line-clamp-2">
            {internship.description ?? "No description available"}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {formatDate(internship.start_date)} –{" "}
                {formatDate(internship.end_date)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{internship.max_participants} participants</span>
            </div>
            <div className="flex items-center space-x-2">
              <Euro className="h-4 w-4 text-muted-foreground" />
              <span>{priceDisplay}</span>
            </div>
          </div>

          {showAction && onEnroll ? (
            <Button
              variant="neumorphism-outline"
              size="sm"
              onClick={async () => {
                await onEnroll();
              }}
              className="mt-2"
            >
              Enroll
            </Button>
          ) : null}
        </div>
      </div>
    </Link>
  );
}