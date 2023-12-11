export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      auth: {
        Row: {
          bearer: string | null
          created_at: string | null
          id: number
          refresh_token: string | null
        }
        Insert: {
          bearer?: string | null
          created_at?: string | null
          id?: number
          refresh_token?: string | null
        }
        Update: {
          bearer?: string | null
          created_at?: string | null
          id?: number
          refresh_token?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          embedding: string | null
          id: number
          metadata: Json | null
          title: string | null
          token_count: number | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
          title?: string | null
          token_count?: number | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
          title?: string | null
          token_count?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      favouriteMovies: {
        Row: {
          created_at: string | null
          id: number
          movie_info: Json | null
          rating: number | null
          watched: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          movie_info?: Json | null
          rating?: number | null
          watched?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: number
          movie_info?: Json | null
          rating?: number | null
          watched?: boolean | null
        }
        Relationships: []
      }
      lojack: {
        Row: {
          BB: string | null
          BTN: string | null
          CO: string | null
          Hand: string
          HJ: string | null
          LJ: string | null
          SB: string | null
        }
        Insert: {
          BB?: string | null
          BTN?: string | null
          CO?: string | null
          Hand: string
          HJ?: string | null
          LJ?: string | null
          SB?: string | null
        }
        Update: {
          BB?: string | null
          BTN?: string | null
          CO?: string | null
          Hand?: string
          HJ?: string | null
          LJ?: string | null
          SB?: string | null
        }
        Relationships: []
      }
      produktivdach: {
        Row: {
          created_at: string | null
          date: string | null
          email: string | null
          flachdach: boolean | null
          flaeche: number | null
          id: number
          plz: string | null
          rechnung: string | null
          solar: boolean | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          email?: string | null
          flachdach?: boolean | null
          flaeche?: number | null
          id?: number
          plz?: string | null
          rechnung?: string | null
          solar?: boolean | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          email?: string | null
          flachdach?: boolean | null
          flaeche?: number | null
          id?: number
          plz?: string | null
          rechnung?: string | null
          solar?: boolean | null
          type?: string | null
        }
        Relationships: []
      }
      stripe_users: {
        Row: {
          cancel_at: string | null
          canceled_at: string | null
          created: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          plan: Json | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          cancel_at?: string | null
          canceled_at?: string | null
          created?: string | null
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          plan?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          cancel_at?: string | null
          canceled_at?: string | null
          created?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          plan?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          duration: number | null
          id: number
          location: string | null
          start_time: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          duration?: number | null
          id?: number
          location?: string | null
          start_time?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          duration?: number | null
          id?: number
          location?: string | null
          start_time?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tours: {
        Row: {
          created_at: string | null
          dates_offered: string[] | null
          description: string | null
          host_name: string
          location: string | null
          price: number | null
          tour_id: number
          tour_name: string
        }
        Insert: {
          created_at?: string | null
          dates_offered?: string[] | null
          description?: string | null
          host_name: string
          location?: string | null
          price?: number | null
          tour_id?: number
          tour_name: string
        }
        Update: {
          created_at?: string | null
          dates_offered?: string[] | null
          description?: string | null
          host_name?: string
          location?: string | null
          price?: number | null
          tour_id?: number
          tour_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      document_embeddings: {
        Row: {
          category: string | null
          chunks: number | null
          pages: Json | null
          title: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          title: string
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
