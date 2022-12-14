import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js'
import { supabase } from '$db/supabaseClient';

export const user = writable<User | null>();

type Profile = {
  name: string
}
export const profile = writable<Profile | null>();


supabase.auth.onAuthStateChange(async (event, session) => {
  console.log(`${new Date().toTimeString().slice(0, 8)} handling event: ${event}`);
  if (event === 'SIGNED_OUT') {
    user.set(null);
    profile.set(null);
    return;
  }
  if (event === 'SIGNED_IN' && session?.user) {
    user.set(session.user);
    profile.set({ name: session.user.user_metadata.name });
    // const { data, error } = await supabase.from('profiles').select();
    // if (data) userData.set({ name: data[0].name });
    return;
  }
  if (event === 'USER_DELETED') {
    user.set(null);
    profile.set(null);
    return;
  }

  console.log(`${new Date().toTimeString().slice(0, 8)} unhandled event: ${event}`);
});


