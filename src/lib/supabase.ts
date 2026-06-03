import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Client for browser/frontend use
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations (with service role key)
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase;

// Types for our tables
export interface Contact {
  id?: string;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  created_at?: string;
}

export interface Booking {
  id?: string;
  space_id: string;
  first_name: string;
  last_name: string;
  company?: string;
  email: string;
  phone?: string;
  service_type: string;
  start_date: string;
  end_date: string;
  duration: number;
  lane_count: number;
  price_per_month: number;
  total_price: number;
  notes?: string;
  status: string;
  created_at?: string;
}

export interface StorageSpace {
  id?: string;
  space_id: string;
  zone: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}
