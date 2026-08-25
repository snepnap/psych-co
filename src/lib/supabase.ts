import { createClient } from '@/utils/supabase/client';
import type { Database } from '@/types/supabase';

// Type for Supabase DB (generated from supabase types)
// If you have generated types, you can import them.
// For now, we define a minimal Database type.
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          role: 'psychologist' | 'client' | 'admin';
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          role: 'psychologist' | 'client' | 'admin';
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          role?: 'psychologist' | 'client' | 'admin';
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
        };
      };
      internships: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          psychologist_id: string;
          start_date: string;
          end_date: string;
          max_participants: number;
          price_cents: number | null;
          status: 'draft' | 'active' | 'completed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          psychologist_id: string;
          start_date: string;
          end_date: string;
          max_participants: number;
          price_cents?: number | null;
          status?: 'draft' | 'active' | 'completed' | 'cancelled';
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          psychologist_id?: string;
          start_date?: string;
          end_date?: string;
          max_participants?: number;
          price_cents?: number | null;
          status?: 'draft' | 'active' | 'completed' | 'cancelled';
          created_at?: string;
        };
      };
      internship_enrollments: {
        Row: {
          id: string;
          internship_id: string;
          profile_id: string;
          enrolled_at: string;
          status: 'pending' | 'approved' | 'rejected' | 'completed';
        };
        Insert: {
          id?: string;
          internship_id: string;
          profile_id: string;
          enrolled_at?: string;
          status?: 'pending' | 'approved' | 'rejected' | 'completed';
        };
        Update: {
          id?: string;
          internship_id?: string;
          profile_id?: string;
          enrolled_at?: string;
          status?: 'pending' | 'approved' | 'rejected' | 'completed';
        };
      };
      certificates: {
        Row: {
          id: string;
          recipient_id: string;
          issued_by: string;
          template: string;
          data: Json;
          pdf_url: string | null;
          issued_at: string;
        };
        Insert: {
          id?: string;
          recipient_id: string;
          issued_by: string;
          template: string;
          data?: Json;
          pdf_url?: string | null;
          issued_at?: string;
        };
        Update: {
          id?: string;
          recipient_id?: string;
          issued_by?: string;
          template?: string;
          data?: Json;
          pdf_url?: string | null;
          issued_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          psychologist_id: string;
          client_id: string;
          starts_at: string;
          ends_at: string;
          meeting_url: string | null;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          price_cents: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          psychologist_id: string;
          client_id: string;
          starts_at: string;
          ends_at: string;
          meeting_url?: string | null;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          price_cents?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          psychologist_id?: string;
          client_id?: string;
          starts_at?: string;
          ends_at?: string;
          meeting_url?: string | null;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          price_cents?: number | null;
          created_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          stripe_payment_intent_id: string;
          amount_cents: number;
          currency: string;
          status: 'succeeded' | 'pending' | 'failed';
          related_to: string | null;
          related_uuid: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          stripe_payment_intent_id: string;
          amount_cents: number;
          currency?: string;
          status?: 'succeeded' | 'pending' | 'failed';
          related_to?: string | null;
          related_uuid?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          stripe_payment_intent_id?: string;
          amount_cents?: number;
          currency?: string;
          status?: 'succeeded' | 'pending' | 'failed';
          related_to?: string | null;
          related_uuid?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  }
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export const supabase = createClient();

// Helper to get user profile
export async function getProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data as Database['public']['Tables']['profiles']['Row'] | null;
}

// Helper to upload file to storage bucket
export async function uploadFile(
  bucket: string,
  path: string,
  file: File
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) throw error;
  return data;
}

// Helper to get public URL for a file
export function getFileUrl(bucket: string, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}