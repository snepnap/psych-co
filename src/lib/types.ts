// TypeScript types for Psychologist SaaS Platform
export type UserRole = 'psychologist' | 'client' | 'admin';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string | null;
  bio?: string | null;
  created_at: string;
}

// Internship
export interface Internship {
  id: string;
  title: string;
  description?: string | null;
  psychologist_id: string;
  start_date: string; // ISO date
  end_date: string; // ISO date
  max_participants: number;
  price_cents?: number | null;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  created_at: string;
  // Optional relations (populated via joins)
  psychologist?: Profile;
  enrollment_count?: number;
}

// Enrollment
export interface InternshipEnrollment {
  id: string;
  internship_id: string;
  profile_id: string;
  enrolled_at: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  // Optional relations
  internship?: Internship;
  profile?: Profile;
}

// Certificate
export interface Certificate {
  id: string;
  recipient_id: string;
  issued_by: string;
  template: string; // e.g., 'internship_completion'
  data: Record<string, any>; // dynamic fields
  pdf_url?: string | null;
  issued_at: string;
  // Optional relations
  recipient?: Profile;
  issuer?: Profile;
}

// Booking
export interface Booking {
  id: string;
  psychologist_id: string;
  client_id: string;
  starts_at: string; // ISO datetime
  ends_at: string; // ISO datetime
  meeting_url?: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price_cents?: number | null;
  created_at: string;
  // Optional relations
  psychologist?: Profile;
  client?: Profile;
}

// Payment
export interface Payment {
  id: string;
  stripe_payment_intent_id: string;
  amount_cents: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  related_to?: string; // e.g., 'internship:<id>' or 'booking:<id>'
  related_uuid?: string | null;
  created_at: string;
}

// API response wrappers
export interface Paginated<T> {
  data: T[];
  count: number;
  hasMore: boolean;
}