import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/lib/types";

// Fetch all psychologists
export const usePsychologists = () => {
  return useQuery({
    queryKey: ["psychologists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id,full_name,avatar_url")
        .eq("role", "psychologist")
        .order("full_name");

      if (error) throw error;
      return data as Profile[];
    },
  });
};