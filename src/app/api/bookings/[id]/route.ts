import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Booking } from '@/lib/types';

// Helper to check for overlapping bookings for a psychologist (excluding current booking)
async function hasOverlappingBooking(psychologistId: string, startsAt: string, endsAt: string, excludeId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('psychologist_id', psychologistId)
    .lt('starts_at', endsAt) // existing starts before new ends
    .gt('ends_at', startsAt) // existing ends after new starts
    .neq('id', excludeId);

  if (error) throw error;
  return data.length > 0;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const booking: Booking = {
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
            role: 'psychologist' as const,
            avatar_url: data.psychologist.avatar_url,
            bio: null,
            created_at: '',
          }
        : undefined,
      client: data.client
        ? {
            id: data.client.id,
            full_name: data.client.full_name,
            role: 'client' as const,
            avatar_url: data.client.avatar_url,
            bio: null,
            created_at: '',
          }
        : undefined,
    };

    return NextResponse.json(booking);
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
      psychologist_id,
      client_id,
      starts_at,
      ends_at,
      meeting_url,
      price_cents,
      status,
    } = body;

    // If psychologist or time is changing, check for overlaps
    if (psychologist_id || starts_at || ends_at) {
      // Fetch current booking to get existing values for comparison
      const { data: currentBooking, error: fetchError } = await supabase
        .from('bookings')
        .select('psychologist_id, starts_at, ends_at')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const effPsychologistId = psychologist_id ?? currentBooking.psychologist_id;
      const effStartsAt = starts_at ?? currentBooking.starts_at;
      const effEndsAt = ends_at ?? currentBooking.ends_at;

      const overlap = await hasOverlappingBooking(effPsychologistId, effStartsAt, effEndsAt, id);
      if (overlap) {
        return NextResponse.json(
          { error: 'Psychologist already has a booking that overlaps with this time slot' },
          { status: 409 }
        );
      }
    }

    const updates: Record<string, any> = {};
    if (psychologist_id !== undefined) updates.psychologist_id = psychologist_id;
    if (client_id !== undefined) updates.client_id = client_id;
    if (starts_at !== undefined) updates.starts_at = starts_at;
    if (ends_at !== undefined) updates.ends_at = ends_at;
    if (meeting_url !== undefined) updates.meeting_url = meeting_url;
    if (price_cents !== undefined) updates.price_cents = price_cents;
    if (status !== undefined) updates.status = status;

    const { data, error } = await supabase
      .from('bookings')
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
      .from('bookings')
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