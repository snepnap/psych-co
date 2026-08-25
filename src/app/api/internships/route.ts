import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Internship } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // optional filter
    const psychologistId = searchParams.get('psychologistId'); // optional

    let query = supabase
      .from('internships')
      .select('*, psychologist:profiles(id,full_name,avatar_url)')
      .order('created_at', { ascending: false });

    if (status) query = query.eq('status', status);
    if (psychologistId) query = query.eq('psychologist_id', psychologistId);

    const { data, error, count } = await query;

    if (error) throw error;

    // Transform data to match Internship type (including psychologist)
    const internships: Internship[] = data.map((row) => ({
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
            role: '', // role not fetched; could add if needed
            avatar_url: row.psychologist.avatar_url,
            bio: null,
            created_at: '',
          }
        : undefined,
    }));

    return NextResponse.json({
      data: internships,
      count: count ?? internships.length,
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
      title,
      description,
      psychologist_id,
      start_date,
      end_date,
      max_participants,
      price_cents,
    } = body;

    // Basic validation
    if (!title || !psychologist_id || !start_date || !end_date || !max_participants) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('internships')
      .insert([
        {
          title,
          description,
          psychologist_id,
          start_date,
          end_date,
          max_participants,
          price_cents,
          status: 'draft', // default to draft; psychologist can activate later
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