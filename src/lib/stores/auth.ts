import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js'
import { supabase } from '$db/supabaseClient';

export const user = writable<User | null>();

supabase.auth.onAuthStateChange((event, session) => {
  console.log('handling event', Date.now(), '\n', event);
  if (event === 'SIGNED_OUT') {
    user.set(null);
    return;
  }
  if (event === 'SIGNED_IN' && session?.user) {
    user.set(session.user);
    return;
  }
  if (event === 'USER_DELETED') {
    user.set(null);
    return;
  }

  console.log('unhandled event', Date.now(), '\n', event);
});

