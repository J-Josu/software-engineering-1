import { derived, writable, type Writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js'
import type { Systems } from '../types/db';
import type { System } from '../types/types';
import { supabase } from '$db/supabaseClient';

export const user = writable<User | null>();

supabase.auth.onAuthStateChange((event, session) => {
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

  console.log('unhandled event', Date.now().toLocaleString());
});

export const systems = derived<[Writable<User | null>], System[]>(
  [user], async ([$user], set) => {
    if (!$user) set([]);
    else {
      const { data, error } = await supabase
        .from<Systems>('systems')
        .select(`
        *,
        stories(
          *,
          rules(*),
          scenaries(*)
        )`);

      if (error) return console.error(error);

      set(data as System[]);
    }
  }, []
);

