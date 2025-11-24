import { supabase } from "../lib/supabase";

export async function createSession({ userId, mood, language }) {
  const { data, error } = await supabase
    .from("sessions")
    .insert({
      user_id: userId,
      mood,
      language,
    })
    .select();

  if (error) console.log(error);
  return data?.[0];
}
