import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Internship, InternshipEnrollment } from '@/lib/types';

// Fetch internships with optional filters
export const useInternships = (options: {
  status?: string;
  psychologistId?: string;
  limit?: number;
} = {}) => {
  const { status, psychologistId, limit } = options;

  return useQuery({
    queryKey: ['internships', { status, psychologistId, limit }],
    queryFn: async () => {
      let query = supabase
        .from('internships')
        .select(
          `*,
          psychologist:profiles(id,full_name,avatar_url)`
        )
        .order('created_at', { ascending: false });

      if (status) query = query.eq('status', status);
      if (psychologistId) query = query.eq('psychologist_id', psychologistId);
      if (limit) query = query.limit(limit);

      const { data, error } = await query;
      if (error) throw error;

      return data.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        psychologist_id: row.psychologist_id,
        start_date: row.start_date,
        end_date: row.end_date,
        max_participants: row.max_participants,
        price_cents: row.price_cents,
        status: row.status,
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
      }));
    },
  });
};

// Fetch a single internship by ID
export const useInternship = (id: string) => {
  return useQuery({
    queryKey: ['internship', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('internships')
        .select(
          `*,
          psychologist:profiles(id,full_name,avatar_url)`
        )
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Internship not found');

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        psychologist_id: data.psychologist_id,
        start_date: data.start_date,
        end_date: data.end_date,
        max_participants: data.max_participants,
        price_cents: data.price_cents,
        status: data.status,
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
      };
    },
    enabled: !!id,
  });
};

// Create internship mutation
export const useCreateInternship = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newInternship: Omit<Internship, 'id' | 'created_at' | 'psychologist'>) => {
      const { data, error } = await supabase
        .from('internships')
        .insert([
          {
            title: newInternship.title,
            description: newInternship.description ?? null,
            psychologist_id: newInternship.psychologist_id,
            start_date: newInternship.start_date,
            end_date: newInternship.end_date,
            max_participants: newInternship.max_participants,
            price_cents: newInternship.price_cents ?? null,
            status: 'draft',
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['internships'] });
    },
  });
};

// Update internship mutation
export const useUpdateInternship = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Omit<Internship, 'id' | 'created_at' | 'psychologist'>>;
    }) => {
      const { data, error } = await supabase
        .from('internships')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['internships'] });
      queryClient.invalidateQueries({ queryKey: ['internship', id] });
    },
  });
};

// Delete internship mutation
export const useDeleteInternship = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('internships')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['internships'] });
    },
  });
};

// Enroll in internship
export const useEnrollInternship = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (internshipId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('internship_enrollments')
        .insert([
          {
            internship_id: internshipId,
            profile_id: user.id,
            status: 'pending',
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['internship_enrollments'] });
    },
  });
};

// Get enrollments for current user
export const useMyEnrollments = () => {
  return useQuery({
    queryKey: ['my-enrollments'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('internship_enrollments')
        .select(
          `*,
          internship:internships(*)`
        )
        .eq('profile_id', user.id);

      if (error) throw error;

      return data.map((row) => ({
        id: row.id,
        internship_id: row.internship_id,
        profile_id: row.profile_id,
        enrolled_at: row.enrolled_at,
        status: row.status,
        internship: row.internship
          ? {
              id: row.internship.id,
              title: row.internship.title,
              description: row.internship.description,
              psychologist_id: row.internship.psychologist_id,
              start_date: row.internship.start_date,
              end_date: row.internship.end_date,
              max_participants: row.internship.max_participants,
              price_cents: row.internship.price_cents,
              status: row.internship.status,
              created_at: row.internship.created_at,
            }
          : undefined,
      }));
    },
  });
};