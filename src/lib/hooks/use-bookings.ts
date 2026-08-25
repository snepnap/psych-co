import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Booking } from '@/lib/types';

// Fetch bookings with optional filters
export const useBookings = (options: {
  psychologistId?: string;
  clientId?: string;
  status?: string;
  limit?: number;
} = {}) => {
  const { psychologistId, clientId, status, limit } = options;

  return useQuery({
    queryKey: ['bookings', { psychologistId, clientId, status, limit }],
    queryFn: async () => {
      let query = supabase
        .from('bookings')
        .select(`
          *,
          psychologist:profiles(id,full_name,avatar_url),
          client:profiles(id,full_name,avatar_url)
        `)
        .order('starts_at', { ascending: true });

      if (psychologistId) query = query.eq('psychologist_id', psychologistId);
      if (clientId) query = query.eq('client_id', clientId);
      if (status) query = query.eq('status', status);
      if (limit) query = query.limit(limit);

      const { data, error } = await query;
      if (error) throw error;

      return data.map((row) => ({
        id: row.id,
        psychologist_id: row.psychologist_id,
        client_id: row.client_id,
        starts_at: row.starts_at,
        ends_at: row.ends_at,
        meeting_url: row.meeting_url,
        status: row.status,
        price_cents: row.price_cents,
        created_at: row.created_at,
        psychologist: row.psychologist
          ? {
              id: row.psychologist.id,
              full_name: row.psychologist.full_name,
              role: '',
              avatar_url: row.psychologist.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
        client: row.client
          ? {
              id: row.client.id,
              full_name: row.client.full_name,
              role: '',
              avatar_url: row.client.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
      }));
    },
  });
};

// Fetch a single booking by ID
export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          psychologist:profiles(id,full_name,avatar_url),
          client:profiles(id,full_name,avatar_url)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Booking not found');

      return {
        id: data.id,
        psychologist_id: data.psychologist_id,
        client_id: data.client_id,
        starts_at: data.starts_at,
        ends_at: data.ends_at,
        meeting_url: data.meeting_url,
        status: data.status,
        price_cents: data.price_cents,
        created_at: data.created_at,
        psychologist: data.psychologist
          ? {
              id: data.psychologist.id,
              full_name: data.psychologist.full_name,
              role: '',
              avatar_url: data.psychologist.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
        client: data.client
          ? {
              id: data.client.id,
              full_name: data.client.full_name,
              role: '',
              avatar_url: data.client.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
      };
    },
    enabled: !!id,
  });
};

// Create booking mutation
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBooking: Omit<Booking, 'id' | 'created_at' | 'psychologist' | 'client'>) => {
      // Overlap check is done in the API route, but we can also do it here for optimistic UI if desired.
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            psychologist_id: newBooking.psychologist_id,
            client_id: newBooking.client_id,
            starts_at: newBooking.starts_at,
            ends_at: newBooking.ends_at,
            meeting_url: newBooking.meeting_url ?? null,
            price_cents: newBooking.price_cents ?? null,
            status: 'pending',
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

// Update booking mutation
export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Omit<Booking, 'id' | 'created_at' | 'psychologist' | 'client'>>;
    }) => {
      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking', id] });
    },
  });
};

// Delete booking mutation (cancel)
export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

// Get bookings for current user (as psychologist or client)
export const useMyBookings = () => {
  return useQuery({
    queryKey: ['my-bookings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          psychologist:profiles(id,full_name,avatar_url),
          client:profiles(id,full_name,avatar_url)
        `)
        .or(`psychologist_id.eq.${user.id},client_id.eq.${user.id}`)
        .order('starts_at', { ascending: true });

      if (error) throw error;

      return data.map((row) => ({
        id: row.id,
        psychologist_id: row.psychologist_id,
        client_id: row.client_id,
        starts_at: row.starts_at,
        ends_at: row.ends_at,
        meeting_url: row.meeting_url,
        status: row.status,
        price_cents: row.price_cents,
        created_at: row.created_at,
        psychologist: row.psychologist
          ? {
              id: row.psychologist.id,
              full_name: row.psychologist.full_name,
              role: '',
              avatar_url: row.psychologist.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
        client: row.client
          ? {
              id: row.client.id,
              full_name: row.client.full_name,
              role: '',
              avatar_url: row.client.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
      }));
    },
  });
};

// Get upcoming bookings for current user
export const useUpcomingBookings = () => {
  return useQuery({
    queryKey: ['upcoming-bookings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          psychologist:profiles(id,full_name,avatar_url),
          client:profiles(id,full_name,avatar_url)
        `)
        .or(`psychologist_id.eq.${user.id},client_id.eq.${user.id}`)
        .eq('status', 'confirmed') // or pending? We'll consider confirmed as upcoming
        .gte('starts_at', new Date().toISOString())
        .order('starts_at', { ascending: true });

      if (error) throw error;

      return data.map((row) => ({
        id: row.id,
        psychologist_id: row.psychologist_id,
        client_id: row.client_id,
        starts_at: row.starts_at,
        ends_at: row.ends_at,
        meeting_url: row.meeting_url,
        status: row.status,
        price_cents: row.price_cents,
        created_at: row.created_at,
        psychologist: row.psychologist
          ? {
              id: row.psychologist.id,
              full_name: row.psychologist.full_name,
              role: '',
              avatar_url: row.psychologist.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
        client: row.client
          ? {
              id: row.client.id,
              full_name: row.client.full_name,
              role: '',
              avatar_url: row.client.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
      }));
    },
  });
};