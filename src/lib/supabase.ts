// Standalone in-memory data store for PSYCH Co.
// Completely eliminates external Supabase, PostgreSQL, and MongoDB database dependencies.

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          role: 'psychologist' | 'client' | 'admin';
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          role: 'psychologist' | 'client' | 'admin';
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          role?: 'psychologist' | 'client' | 'admin';
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
        };
      };
      internships: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          psychologist_id: string;
          start_date: string;
          end_date: string;
          max_participants: number;
          price_cents: number | null;
          status: 'draft' | 'active' | 'completed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          psychologist_id: string;
          start_date: string;
          end_date: string;
          max_participants: number;
          price_cents?: number | null;
          status?: 'draft' | 'active' | 'completed' | 'cancelled';
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          psychologist_id?: string;
          start_date?: string;
          end_date?: string;
          max_participants?: number;
          price_cents?: number | null;
          status?: 'draft' | 'active' | 'completed' | 'cancelled';
          created_at?: string;
        };
      };
      internship_enrollments: {
        Row: {
          id: string;
          internship_id: string;
          profile_id: string;
          enrolled_at: string;
          status: 'pending' | 'approved' | 'rejected' | 'completed';
        };
        Insert: {
          id?: string;
          internship_id: string;
          profile_id: string;
          enrolled_at?: string;
          status?: 'pending' | 'approved' | 'rejected' | 'completed';
        };
        Update: {
          id?: string;
          internship_id?: string;
          profile_id?: string;
          enrolled_at?: string;
          status?: 'pending' | 'approved' | 'rejected' | 'completed';
        };
      };
      certificates: {
        Row: {
          id: string;
          recipient_id: string;
          issued_by: string;
          template: string;
          data: Json;
          pdf_url: string | null;
          issued_at: string;
        };
        Insert: {
          id?: string;
          recipient_id: string;
          issued_by: string;
          template: string;
          data?: Json;
          pdf_url?: string | null;
          issued_at?: string;
        };
        Update: {
          id?: string;
          recipient_id?: string;
          issued_by?: string;
          template?: string;
          data?: Json;
          pdf_url?: string | null;
          issued_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          psychologist_id: string;
          client_id: string;
          starts_at: string;
          ends_at: string;
          meeting_url: string | null;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          price_cents: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          psychologist_id: string;
          client_id: string;
          starts_at: string;
          ends_at: string;
          meeting_url?: string | null;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          price_cents?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          psychologist_id?: string;
          client_id?: string;
          starts_at?: string;
          ends_at?: string;
          meeting_url?: string | null;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          price_cents?: number | null;
          created_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          stripe_payment_intent_id: string;
          amount_cents: number;
          currency: string;
          status: 'succeeded' | 'pending' | 'failed';
          related_to: string | null;
          related_uuid: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          stripe_payment_intent_id: string;
          amount_cents: number;
          currency?: string;
          status?: 'succeeded' | 'pending' | 'failed';
          related_to?: string | null;
          related_uuid?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          stripe_payment_intent_id?: string;
          amount_cents?: number;
          currency?: string;
          status?: 'succeeded' | 'pending' | 'failed';
          related_to?: string | null;
          related_uuid?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AuthError = {
  message: string;
  code?: string;
} | null;

// ── In-Memory Seed Data ──────────────────────────────────────────────────
const initialProfiles = [
  {
    id: "demo-user-1",
    full_name: "Dr. Sarah Mitchell",
    role: "psychologist" as const,
    email: "sarah.mitchell@psychco.com",
    avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256",
    bio: "Clinical Psychologist specializing in Cognitive Behavioral Therapy and Mindfulness-Based Stress Reduction.",
    location: "New York, NY",
    phone: "+1 (555) 234-5678",
    dob: "1988-06-14",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "client-demo-1",
    full_name: "Alex Morgan",
    role: "client" as const,
    email: "alex.morgan@example.com",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
    bio: "Client pursuing personal mental wellness goals.",
    location: "Boston, MA",
    phone: "+1 (555) 876-5432",
    dob: "1994-09-22",
    created_at: "2026-01-05T00:00:00Z",
  },
  {
    id: "psych-2",
    full_name: "Dr. David Chen, Psy.D",
    role: "psychologist" as const,
    email: "david.chen@psychco.com",
    avatar_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256",
    bio: "Neuropsychologist & Mindfulness Lead specializing in executive cognitive regulation.",
    location: "San Francisco, CA",
    phone: "+1 (555) 345-6789",
    dob: "1982-03-11",
    created_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "psych-3",
    full_name: "Dr. Elena Rostova, Ph.D",
    role: "psychologist" as const,
    email: "elena.rostova@psychco.com",
    avatar_url: "https://images.unsplash.com/photo-1594824813689-53b499119777?auto=format&fit=crop&q=80&w=256",
    bio: "Trauma & Somatic Experiencing Specialist.",
    location: "Chicago, IL",
    phone: "+1 (555) 456-7890",
    dob: "1986-11-28",
    created_at: "2026-01-15T00:00:00Z",
  },
];

const initialInternships = [
  {
    id: "int-1",
    title: "Clinical Psychology Practicum",
    description: "Immersive 8-week hands-on clinical rotation covering client intake, case formulations, and evidence-based CBT protocols.",
    psychologist_id: "demo-user-1",
    start_date: "2026-09-01T00:00:00Z",
    end_date: "2026-10-31T00:00:00Z",
    max_participants: 25,
    price_cents: 29900,
    status: "active" as const,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "int-2",
    title: "Neuro-Cognitive Assessment Fellowship",
    description: "Advanced training in cognitive profiling, psychometric testing batteries, and developmental neuropsychology.",
    psychologist_id: "psych-2",
    start_date: "2026-10-01T00:00:00Z",
    end_date: "2026-12-15T00:00:00Z",
    max_participants: 20,
    price_cents: 39900,
    status: "active" as const,
    created_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "int-3",
    title: "Somatic Trauma & Polyvagal Intensive",
    description: "Body-oriented therapeutic interventions, autonomic nervous system regulation, and crisis stabilization methodologies.",
    psychologist_id: "psych-3",
    start_date: "2026-11-01T00:00:00Z",
    end_date: "2026-12-20T00:00:00Z",
    max_participants: 15,
    price_cents: 34900,
    status: "active" as const,
    created_at: "2026-01-20T00:00:00Z",
  },
];

const initialEnrollments = [
  {
    id: "enr-1",
    internship_id: "int-1",
    profile_id: "demo-user-1",
    enrolled_at: "2026-08-01T00:00:00Z",
    status: "approved" as const,
  },
  {
    id: "enr-2",
    internship_id: "int-2",
    profile_id: "demo-user-1",
    enrolled_at: "2026-08-15T00:00:00Z",
    status: "completed" as const,
  },
];

const initialCertificates = [
  {
    id: "cert-1",
    recipient_id: "demo-user-1",
    issued_by: "Dr. Sarah Mitchell",
    template: "clinical_excellence",
    data: {
      student_name: "Dr. Sarah Mitchell",
      course: "Clinical Psychology Practicum",
      grade: "Honors (98%)",
      hours: 120,
    },
    pdf_url: null,
    issued_at: "2026-08-20T00:00:00Z",
  },
  {
    id: "cert-2",
    recipient_id: "demo-user-1",
    issued_by: "Dr. David Chen",
    template: "neuro_cognitive",
    data: {
      student_name: "Dr. Sarah Mitchell",
      course: "Neuro-Cognitive Assessment Fellowship",
      grade: "Distinction",
      hours: 160,
    },
    pdf_url: null,
    issued_at: "2026-09-01T00:00:00Z",
  },
];

const initialBookings = [
  {
    id: "book-1",
    psychologist_id: "demo-user-1",
    client_id: "client-demo-1",
    starts_at: "2026-10-15T14:00:00Z",
    ends_at: "2026-10-15T15:00:00Z",
    meeting_url: "https://meet.psychco.com/session-1",
    status: "confirmed" as const,
    price_cents: 15000,
    created_at: "2026-10-10T00:00:00Z",
  },
  {
    id: "book-2",
    psychologist_id: "psych-2",
    client_id: "demo-user-1",
    starts_at: "2026-10-18T10:00:00Z",
    ends_at: "2026-10-18T11:00:00Z",
    meeting_url: "https://meet.psychco.com/session-2",
    status: "confirmed" as const,
    price_cents: 18000,
    created_at: "2026-10-11T00:00:00Z",
  },
];

const initialPayments = [
  {
    id: "pay-1",
    stripe_payment_intent_id: "pi_demo_1",
    amount_cents: 15000,
    currency: "usd",
    status: "succeeded" as const,
    related_to: "booking:book-1",
    related_uuid: "book-1",
    created_at: "2026-10-10T00:00:00Z",
  },
  {
    id: "pay-2",
    stripe_payment_intent_id: "pi_demo_2",
    amount_cents: 29900,
    currency: "usd",
    status: "succeeded" as const,
    related_to: "internship:int-1",
    related_uuid: "int-1",
    created_at: "2026-08-01T00:00:00Z",
  },
];

const dataStore: Record<string, any[]> = {
  profiles: initialProfiles,
  internships: initialInternships,
  internship_enrollments: initialEnrollments,
  certificates: initialCertificates,
  bookings: initialBookings,
  payments: initialPayments,
  appointments: [],
  scholarships: [],
  purchases: [],
};

// ── Mock Query Builder ───────────────────────────────────────────────────
export class MockQueryBuilder<T = any> implements PromiseLike<{ data: any; error: { message: string; code?: string } | null; count?: number }> {
  private tableName: string;
  private filters: ((item: any) => boolean)[] = [];
  private orderField?: string;
  private ascending = true;
  private isSingle = false;
  private limitCount?: number;
  private pendingInsert?: any;
  private pendingUpdate?: any;
  private isDelete = false;

  constructor(tableName: string) {
    this.tableName = tableName;
    if (!dataStore[tableName]) {
      dataStore[tableName] = [];
    }
  }

  select(_query?: string): this {
    return this;
  }

  insert(record: any): this {
    this.pendingInsert = record;
    return this;
  }

  upsert(record: any, _opts?: any): this {
    this.pendingInsert = record;
    return this;
  }

  update(updates: any): this {
    this.pendingUpdate = updates;
    return this;
  }

  delete(): this {
    this.isDelete = true;
    return this;
  }

  eq(field: string, value: any): this {
    this.filters.push((item) => item[field] === value);
    return this;
  }

  neq(field: string, value: any): this {
    this.filters.push((item) => item[field] !== value);
    return this;
  }

  lt(field: string, value: any): this {
    this.filters.push((item) => item[field] < value);
    return this;
  }

  gt(field: string, value: any): this {
    this.filters.push((item) => item[field] > value);
    return this;
  }

  gte(field: string, value: any): this {
    this.filters.push((item) => item[field] >= value);
    return this;
  }

  lte(field: string, value: any): this {
    this.filters.push((item) => item[field] <= value);
    return this;
  }

  or(expr: string): this {
    const parts = expr.split(",").map((p) => p.trim());
    this.filters.push((item) => {
      return parts.some((p) => {
        const [field, op, val] = p.split(".");
        if (op === "eq") return item[field] === val;
        return true;
      });
    });
    return this;
  }

  order(field: string, opts?: { ascending?: boolean }): this {
    this.orderField = field;
    this.ascending = opts?.ascending ?? true;
    return this;
  }

  limit(n: number): this {
    this.limitCount = n;
    return this;
  }

  range(from: number, to: number): this {
    this.limitCount = to - from + 1;
    return this;
  }

  single(): this {
    this.isSingle = true;
    return this;
  }

  private execute(): { data: any; error: { message: string; code?: string } | null; count?: number } {
    const list = dataStore[this.tableName] || [];

    if (this.pendingInsert) {
      const items = Array.isArray(this.pendingInsert) ? this.pendingInsert : [this.pendingInsert];
      const created = items.map((item) => ({
        id: item.id || `mock-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        created_at: new Date().toISOString(),
        ...item,
      }));
      list.push(...created);
      const res = this.isSingle || !Array.isArray(this.pendingInsert) ? created[0] : created;
      return { data: res, error: null };
    }

    if (this.isDelete) {
      dataStore[this.tableName] = list.filter((item) => !this.filters.every((fn) => fn(item)));
      return { data: null, error: null };
    }

    if (this.pendingUpdate) {
      let updatedItem: any = null;
      for (const item of list) {
        if (this.filters.every((fn) => fn(item))) {
          Object.assign(item, this.pendingUpdate);
          updatedItem = item;
        }
      }
      return { data: updatedItem, error: null };
    }

    let items = list.filter((item) => this.filters.every((fn) => fn(item)));

    // Hydrate relations
    items = items.map((item) => {
      const copy = { ...item };
      if (copy.psychologist_id) {
        copy.psychologist = dataStore.profiles?.find((p: any) => p.id === copy.psychologist_id) || null;
      }
      if (copy.client_id) {
        copy.client = dataStore.profiles?.find((p: any) => p.id === copy.client_id) || null;
      }
      if (copy.recipient_id) {
        copy.recipient = dataStore.profiles?.find((p: any) => p.id === copy.recipient_id) || null;
      }
      if (copy.internship_id) {
        copy.internship = dataStore.internships?.find((i: any) => i.id === copy.internship_id) || null;
      }
      return copy;
    });

    if (this.orderField) {
      const field = this.orderField;
      const asc = this.ascending ? 1 : -1;
      items.sort((a, b) => (a[field] > b[field] ? asc : a[field] < b[field] ? -asc : 0));
    }

    if (this.limitCount !== undefined) {
      items = items.slice(0, this.limitCount);
    }

    if (this.isSingle) {
      return { data: items[0] || null, error: null };
    }

    return { data: items, error: null, count: items.length };
  }

  then<TResult1 = { data: any; error: { message: string; code?: string } | null; count?: number }, TResult2 = never>(
    onfulfilled?: ((value: { data: any; error: { message: string; code?: string } | null; count?: number }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    const res = this.execute();
    return Promise.resolve(res).then(onfulfilled, onrejected);
  }
}

// ── Standalone Client Object ─────────────────────────────────────────────
export const supabase = {
  from(tableName: string): any {
    return new MockQueryBuilder(tableName);
  },
  auth: {
    async getUser(_args?: any): Promise<{ data: { user: any }; error: AuthError }> {
      return {
        data: {
          user: {
            id: "demo-user-1",
            email: "sarah.mitchell@psychco.com",
            user_metadata: { full_name: "Dr. Sarah Mitchell" },
          },
        },
        error: null,
      };
    },
    async getSession(_args?: any): Promise<{ data: { session: any }; error: AuthError }> {
      return {
        data: {
          session: {
            user: {
              id: "demo-user-1",
              email: "sarah.mitchell@psychco.com",
            },
          },
        },
        error: null,
      };
    },
    async signInWithPassword(_args?: any): Promise<{ data: any; error: AuthError }> {
      return {
        data: {
          user: {
            id: "demo-user-1",
            email: _args?.email || "sarah.mitchell@psychco.com",
          },
        },
        error: null,
      };
    },
    async signInWithOAuth(_args?: any): Promise<{ data: any; error: AuthError }> {
      return { data: {}, error: null };
    },
    async signUp(_args?: any): Promise<{ data: any; error: AuthError }> {
      return {
        data: {
          user: {
            id: "demo-user-1",
            email: _args?.email || "demo@psychco.com",
            user_metadata: _args?.options?.data,
          },
        },
        error: null,
      };
    },
    async signOut(): Promise<{ error: AuthError }> {
      return { error: null };
    },
    onAuthStateChange(_callback: any) {
      return {
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      };
    },
  },
  storage: {
    from(bucket: string) {
      return {
        async upload(path: string, _file: any, _options?: any) {
          return { data: { path, id: `mock-${bucket}-${Date.now()}` }, error: null };
        },
        getPublicUrl(path: string) {
          return { data: { publicUrl: `/uploads/${path}` } };
        },
      };
    },
  },
};

// ── Helper functions exported for components ─────────────────────────────
export async function getProfile() {
  return initialProfiles[0];
}

export async function uploadFile(_bucket: string, path: string, _file: File) {
  return { path, id: `mock-${Date.now()}` };
}

export function getFileUrl(_bucket: string, path: string) {
  return `/uploads/${path}`;
}