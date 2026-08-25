import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Certificate } from '@/lib/types';

// Fetch certificates with optional filters
export const useCertificates = (options: {
  recipientId?: string;
  issuedBy?: string;
  template?: string;
  limit?: number;
} = {}) => {
  const { recipientId, issuedBy, template, limit } = options;

  return useQuery({
    queryKey: ['certificates', { recipientId, issuedBy, template, limit }],
    queryFn: async () => {
      let query = supabase
        .from('certificates')
        .select(`
          *,
          recipient:profiles(id,full_name,avatar_url),
          issuer:profiles(id,full_name,avatar_url)
        `)
        .order('issued_at', { ascending: false });

      if (recipientId) query = query.eq('recipient_id', recipientId);
      if (issuedBy) query = query.eq('issued_by', issuedBy);
      if (template) query = query.eq('template', template);
      if (limit) query = query.limit(limit);

      const { data, error } = await query;
      if (error) throw error;

      return data.map((row) => ({
        id: row.id,
        recipient_id: row.recipient_id,
        issued_by: row.issued_by,
        template: row.template,
        data: row.data,
        pdf_url: row.pdf_url,
        issued_at: row.issued_at,
        recipient: row.recipient
          ? {
              id: row.recipient.id,
              full_name: row.recipient.full_name,
              role: '',
              avatar_url: row.recipient.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
        issuer: row.issuer
          ? {
              id: row.issuer.id,
              full_name: row.issuer.full_name,
              role: '',
              avatar_url: row.issuer.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
      }));
    },
  });
};

// Fetch a single certificate by ID
export const useCertificate = (id: string) => {
  return useQuery({
    queryKey: ['certificate', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certificates')
        .select(`
          *,
          recipient:profiles(id,full_name,avatar_url),
          issuer:profiles(id,full_name,avatar_url)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Certificate not found');

      return {
        id: data.id,
        recipient_id: data.recipient_id,
        issued_by: data.issued_by,
        template: data.template,
        data: data.data,
        pdf_url: data.pdf_url,
        issued_at: data.issued_at,
        recipient: data.recipient
          ? {
              id: data.recipient.id,
              full_name: data.recipient.full_name,
              role: '',
              avatar_url: data.recipient.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
        issuer: data.issuer
          ? {
              id: data.issuer.id,
              full_name: data.issuer.full_name,
              role: '',
              avatar_url: data.issuer.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
      };
    },
    enabled: !!id,
  });
};

// Issue a new certificate mutation
export const useIssueCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCertificate: Omit<Certificate, 'id' | 'issued_at' | 'recipient' | 'issuer'>) => {
      const { data, error } = await supabase
        .from('certificates')
        .insert([
          {
            recipient_id: newCertificate.recipient_id,
            issued_by: newCertificate.issued_by,
            template: newCertificate.template,
            data: newCertificate.data ?? {},
            pdf_url: newCertificate.pdf_url ?? null,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
    },
  });
};

// Update certificate mutation (e.g., regenerate PDF, update data)
export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Pick<Certificate, 'data' | 'pdf_url'>>;
    }) => {
      const { data, error } = await supabase
        .from('certificates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      queryClient.invalidateQueries({ queryKey: ['certificate', id] });
    },
  });
};

// Delete certificate mutation (revoke)
export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
    },
  });
};

// Get certificates for current user (recipient)
export const useMyCertificates = () => {
  return useQuery({
    queryKey: ['my-certificates'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('certificates')
        .select(`
          *,
          recipient:profiles(id,full_name,avatar_url),
          issuer:profiles(id,full_name,avatar_url)
        `)
        .eq('recipient_id', user.id)
        .order('issued_at', { ascending: false });

      if (error) throw error;

      return data.map((row) => ({
        id: row.id,
        recipient_id: row.recipient_id,
        issued_by: row.issued_by,
        template: row.template,
        data: row.data,
        pdf_url: row.pdf_url,
        issued_at: row.issued_at,
        recipient: row.recipient
          ? {
              id: row.recipient.id,
              full_name: row.recipient.full_name,
              role: '',
              avatar_url: row.recipient.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
        issuer: row.issuer
          ? {
              id: row.issuer.id,
              full_name: row.issuer.full_name,
              role: '',
              avatar_url: row.issuer.avatar_url,
              bio: null,
              created_at: '',
            }
          : undefined,
      }));
    },
  });
};