import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Certificate } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const recipientId = searchParams.get('recipientId');
    const issuedBy = searchParams.get('issuedBy');
    const template = searchParams.get('template');

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

    const { data, error, count } = await query;

    if (error) throw error;

    const certificates: Certificate[] = (data as any[]).map((row: any) => ({
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
            role: 'client' as const,
            avatar_url: row.recipient.avatar_url,
            bio: null,
            created_at: '',
          }
        : undefined,
      issuer: row.issuer
        ? {
            id: row.issuer.id,
            full_name: row.issuer.full_name,
            role: 'psychologist' as const,
            avatar_url: row.issuer.avatar_url,
            bio: null,
            created_at: '',
          }
        : undefined,
    }));

    return NextResponse.json({
      data: certificates,
      count: count ?? certificates.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}

// Issue a new certificate (typically called by psychologist or admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      recipient_id,
      issued_by,
      template,
      data, // dynamic data for the certificate
    } = body;

    // Basic validation
    if (!recipient_id || !issued_by || !template) {
      return NextResponse.json(
        { error: 'Missing required fields: recipient_id, issued_by, template' },
        { status: 400 }
      );
    }

    // Check if a certificate of this template already exists for the recipient
    const { data: existing, error: checkError } = await supabase
      .from('certificates')
      .select('id')
      .eq('recipient_id', recipient_id)
      .eq('template', template)
      .single();

    if (!checkError && existing) {
      return NextResponse.json(
        { error: 'Certificate of this type already exists for the recipient' },
        { status: 409 }
      );
    }

    // In a real app, you would generate a PDF here and upload to storage.
    // For now, we'll set pdf_url to null and let the frontend handle generation or we can integrate a PDF service.
    const { data: newCertificate, error } = await supabase
      .from('certificates')
      .insert([
        {
          recipient_id,
          issued_by,
          template,
          data,
          pdf_url: null, // to be filled after PDF generation
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // TODO: Trigger PDF generation (e.g., via a webhook or edge function) and update pdf_url
    // For now, we return the certificate without PDF.

    return NextResponse.json(newCertificate, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}