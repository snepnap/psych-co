import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Booking } from '@/lib/types';

// Helper to check for overlapping bookings for a psychologist
async function hasOverlappingBooking(psychologistId: string, startsAt: string, endsAt: string, excludeId?: string) {
  let query = supabase
    .from('bookings')
    .select('id')
    .eq('psychologist_id', psychologistId)
    .gte('starts_at', endsAt) // booking starts after existing ends: no overlap
    .lt('ends_at', startsAt); // booking ends before existing starts: no overlap
  // Actually we want to find overlaps: existing booking where (startsAt < newEnd && endsAt > newStart)
  // Let's do it the other way: select where NOT (endsAt <= newStart OR startsAt >= newEnd)
  // Simpler: fetch existing bookings and check in memory? For now, we'll do a simple check and maybe improve later.
  // We'll do a range query: bookings that start before the new end and end after the new start.
  query = supabase
    .from('bookings')
    .select('id')
    .eq('psychologist_id', psychologistId)
    .lt('starts_at', endsAt) // existing starts before new ends
    .gt('ends_at', startsAt); // existing ends after new starts
  if (excludeId) {
    query = query.neq('id', excludeId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data.length > 0;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const psychologistId = searchParams.get('psychologistId');
    const clientId = searchParams.get('clientId');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;

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

    const { data, error, count } = await query;

    if (error) throw error;

    const bookings: Booking[] = data.map((row) => ({
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

    return NextResponse.json({
      data: bookings,
      count: count ?? bookings.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      psychologist_id,
      client_id,
      starts_at,
      ends_at,
      meeting_url,
      price_cents,
    } = body;

    // Basic validation
    if (!psychologist_id || !client_id || !starts_at || !ends_at) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for overlapping bookings for the psychologist
    const overlap = await hasOverlappingBooking(psychologist_id, starts_at, ends_at);
    if (overlap) {
      return NextResponse.json(
        { error: 'Psychologist already has a booking that overlaps with this time slot' },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          psychologist_id,
          client_id,
          starts_at,
          ends_at,
          meeting_url: meeting_url ?? null,
          price_cents: price_cents ?? null,
          status: 'pending', // default to pending; payment will confirm
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}