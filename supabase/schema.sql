-- Supabase Schema for Psychologist SaaS Platform
-- Enable the uuid extension if not already enabled
create extension if not exists "uuid-ossp";

-- Profiles table extending auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text not null,
  role text not null check (role in ('psychologist','client','admin')),
  avatar_url text,
  bio text,
  created_at timestamptz default now()
);

-- Internships offered by psychologists
create table if not exists public.internships (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  psychologist_id uuid references profiles(id) not null,
  start_date date not null,
  end_date date not null,
  max_participants integer not null,
  price_cents integer, -- null = free
  status text check (status in ('draft','active','completed','cancelled')) default 'draft',
  created_at timestamptz default now()
);

-- Enrollments linking profiles to internships
create table if not exists public.internship_enrollments (
  id uuid primary key default gen_random_uuid(),
  internship_id uuid references internships(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  enrolled_at timestamptz default now(),
  status text check (status in ('pending','approved','rejected','completed')) default 'pending',
  unique (internship_id, profile_id)
);

-- Certificates issued to users
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid references profiles(id) not null,
  issued_by uuid references profiles(id) not null,
  template text not null, -- e.g. 'internship_completion', 'course_completion'
  data jsonb, -- dynamic fields like name, date, score
  pdf_url text, -- stored in Supabase Storage bucket 'certificates'
  issued_at timestamptz default now(),
  unique (recipient_id, template) -- one per type per person
);

-- Bookings (sessions) between psychologist and client
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  psychologist_id uuid references profiles(id) not null,
  client_id uuid references profiles(id) not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  meeting_url text, -- Whereby/Zoom link or null
  status text check (status in ('pending','confirmed','completed','cancelled')) default 'pending',
  price_cents integer,
  created_at timestamptz default now()
);

-- Payments via Stripe
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  stripe_payment_intent_id text unique not null,
  amount_cents integer not null,
  currency text default 'usd',
  status text check (status in ('succeeded','pending','failed')) default 'pending',
  related_to text, -- e.g. 'internship:<id>' or 'booking:<id>'
  related_uuid uuid, -- FK to internships or bookings (nullable)
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS) on all tables
alter table public.profiles enable row level security;
alter table public.internships enable row level security;
alter table public.internship_enrollments enable row level security;
alter table public.certificates enable row level security;
alter table public.bookings enable row level security;
alter table public.payments enable row level security;

-- Policies (examples – adjust as needed)
-- Profiles: users can read all profiles, update own
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Internships: psychologists can manage their own; anyone can view active
create policy "Anyone can view active internships"
  on public.internships for select
  using (status = 'active');

create policy "Psychologists can manage own internships"
  on public.internships for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'psychologist'
    )
    and psychologist_id = auth.uid()
  );

-- Enrollments: anyone can read own enrollments; psychologists can manage enrollments for their internships
create policy "Users can view own enrollments"
  on public.internship_enrollments for select
  using (profile_id = auth.uid());

create policy "Psychologists can manage enrollments for their internships"
  on public.internship_enrollments for all
  using (
    exists (
      select 1 from public.internships
      where internships.id = internship_enrollments.internship_id
        and internships.psychologist_id = auth.uid()
    )
  );

-- Certificates: recipients can view own; issuers can manage their issued
create policy "Users can view own certificates"
  on public.certificates for select
  using (recipient_id = auth.uid());

create policy "Issuers can manage own certificates"
  on public.certificates for all
  using (issued_by = auth.uid());

-- Bookings: psychologists and clients can view own bookings; psychologists can manage theirs
create policy "Users can view own bookings"
  on public.bookings for select
  using (psychologist_id = auth.uid() or client_id = auth.uid());

create policy "Psychologists can manage own bookings"
  on public.bookings for all
  using (psychologist_id = auth.uid());

-- Payments: admins can view all; related parties can view own
create policy "Anyone can view payments related to them"
  on public.payments for select
  using (
    related_to ILIKE 'internship:%' and
    related_uuid in (
      select id from public.internships where psychologist_id = auth.uid()
    )
  )
  or (
    related_to ILIKE 'booking:%' and
    related_uuid in (
      select id from public.bookings where psychologist_id = auth.uid() or client_id = auth.uid()
    )
  );