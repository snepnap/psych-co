import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Payment } from '@/lib/types';

// Record a payment (called after successful Stripe payment confirmation on client)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      stripe_payment_intent_id,
      amount_cents,
      currency,
      related_to, // e.g., 'internship:<id>' or 'booking:<id>'
      related_uuid, // the actual UUID of the internship or booking
    } = body;

    // Basic validation
    if (!stripe_payment_intent_id || !amount_cents || !related_to || !related_uuid) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if payment intent already recorded (idempotency)
    const { data: existing, error: checkError } = await supabase
      .from('payments')
      .select('id')
      .eq('stripe_payment_intent_id', stripe_payment_intent_id)
      .single();

    if (!checkError && existing) {
      // Already recorded, return existing
      return NextResponse.json(existing);
    }

    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          stripe_payment_intent_id,
          amount_cents,
          currency: currency ?? 'usd',
          status: 'succeeded', // assuming we only call this on successful payment
          related_to,
          related_uuid,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Optionally, update the related entity (e.g., mark internship enrollment as paid, booking as confirmed)
    // We'll do that in a separate function or via triggers; for now, we just record.

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}

// Get payments for a user (optional)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const relatedTo = searchParams.get('relatedTo');
    const relatedUuid = searchParams.get('relatedUuid');

    let query = supabase.from('payments').select('*').order('created_at', { ascending: false });

    if (relatedTo && relatedUuid) {
      query = query.eq('related_to', relatedTo).eq('related_uuid', relatedUuid);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      data,
      count: count ?? data.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}