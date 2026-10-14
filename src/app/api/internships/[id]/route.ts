import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Internship } from '@/lib/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from('internships')
      .select(
        `*,
        psychologist:profiles(id,full_name,avatar_url)`
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const internship: Internship = {
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
            role: 'psychologist' as const,
            avatar_url: data.psychologist.avatar_url,
            bio: null,
            created_at: '',
          }
        : undefined,
    };

    return NextResponse.json(internship);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      description,
      start_date,
      end_date,
      max_participants,
      price_cents,
      status,
    } = body;

    const updates: Record<string, any> = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (start_date !== undefined) updates.start_date = start_date;
    if (end_date !== undefined) updates.end_date = end_date;
    if (max_participants !== undefined) updates.max_participants = max_participants;
    if (price_cents !== undefined) updates.price_cents = price_cents;
    if (status !== undefined) updates.status = status;

    const { data, error } = await supabase
      .from('internships')
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabase
      .from('internships')
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