import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Certificate } from '@/lib/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const certificate: Certificate = {
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
            role: 'client' as const,
            avatar_url: data.recipient.avatar_url,
            bio: null,
            created_at: '',
          }
        : undefined,
      issuer: data.issuer
        ? {
            id: data.issuer.id,
            full_name: data.issuer.full_name,
            role: 'psychologist' as const,
            avatar_url: data.issuer.avatar_url,
            bio: null,
            created_at: '',
          }
        : undefined,
    };

    return NextResponse.json(certificate);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}

// We might allow updating the data (if needed) or revoking (deleting)
// For simplicity, we'll allow updating the data field and pdf_url (if PDF is regenerated)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { data: newData, pdf_url } = body;

    const updates: Record<string, any> = {};
    if (newData !== undefined) updates.data = newData;
    if (pdf_url !== undefined) updates.pdf_url = pdf_url;

    const { data, error } = await supabase
      .from('certificates')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE (revoke certificate) - only if needed
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}