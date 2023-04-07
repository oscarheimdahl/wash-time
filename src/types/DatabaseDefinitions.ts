export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      washers: {
        Row: {
          booked: boolean
          created_at: string
          date: string
          id: number
          part_of_day: number
          user: string
        }
        Insert: {
          booked?: boolean
          created_at?: string
          date: string
          id?: number
          part_of_day: number
          user: string
        }
        Update: {
          booked?: boolean
          created_at?: string
          date?: string
          id?: number
          part_of_day?: number
          user?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
