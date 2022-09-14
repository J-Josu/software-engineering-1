import { derived, get, writable, type Writable } from 'svelte/store';
import { user } from './sessionStore';
import { supabase } from '$db/supabaseClient';
import type * as tDB from '$lib/types/db';

import type { System, Storie } from '$lib/types/types';
import type { User } from '@supabase/supabase-js';


const toKebabCase = (word: string) => word
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

const newSystem = (name: string, description: string, user_id: string) => {
  return {
    user_id,
    slug: toKebabCase(name),
    name,
    description
  }
}

export const systems = writable<System[]>([]);

export const loadSystems = async () => {
  const user_id = get(user)?.id;
  if (!user_id) return console.error('No user loaded');

  const { data, error } = await supabase
    .from<tDB.Systems>('systems')
    .select(`
    *,
    stories(
      *,
      rules(*),
      scenaries(*)
    )`);

  if (error) console.error(error);

  systems.set(data ? data as System[] : []);
}

const currentSystem = writable<string>('');

export const system = derived([systems, currentSystem], ([$systems, $currentSystem]) => {
  if ($currentSystem === '') return null;
  if ($systems.length === 0) return null;
  const result = $systems.find(system => system.id === $currentSystem);
  return result ? result : null;
}, null);

export const setSystem = (system_slug: string) => {
  const $systems = get(systems);

  if ($systems.length === 0) {
    loadSystems();
    if ($systems.length === 0) return false;
  }

  const system = $systems.find((system) => system.slug === system_slug);
  currentSystem.set(system ? system.id : '');
  return true;
}



export const addSystem = async (name: string, description: string = '', user_id: string) => {
  const { data, error } = await supabase
    .from('systems')
    .insert([newSystem(name, description, user_id)]);

  if (error) {
    return console.error(error);
  }

  systems.update($systems => [...$systems, { ...data[0], stories: [] }]);
}


export const addStorie = async (id_custom: string, description: string, color: string, user_id: string, system_id: string) => {
  const { data, error } = await supabase
    .from('stories')
    .insert([{ slug: toKebabCase(id_custom), id_custom, description, color, user_id, system_id }]);

  if (error) {
    return console.error(error);
  }

  return data[0] as Storie
}

export const addRule = async (user_id: string, storie_id: string, description: string) => {
  const { data, error } = await supabase
    .from<tDB.Rules>('rules')
    .insert([{ user_id, description, storie_id }]);

  if (error) {
    return console.error(error);
  }

  return data[0] as tDB.Rules
}

export const addScenarie = async (user_id: string, storie_id: string, title: string, context: string, event: string, response: string) => {
  const { data, error } = await supabase
    .from<tDB.Scenaries>('scenaries')
    .insert([{ user_id, storie_id, title, context, event, response }]);

  if (error) {
    return console.error(error);
  }

  return data[0] as tDB.Scenaries
}





export const userSignUp = writable<User | null>(null);
export const hola = derived(
  [userSignUp],([u], set)=> console.log('derived',u))

  export const onSignUpsystems = derived<[Writable<User | null>], System[]>(
  [userSignUp], async ([$user], set) => {
      
  console.log('entro2')
    if (!$user) set([]);
      else {
          const { data, error } = await supabase
              .from<tDB.Systems>('systems')
              .select(`
              *,
              stories(
                  *,
                  rules(*),
                  scenaries(*)
              )`);

              console.log(error)
          if (error) return console.error(error);

          set(data as System[]);
      }
  }, []
);

supabase.auth.onAuthStateChange((event, session) => {
  
  console.log(event)
  console.log(session)
  if (event === 'SIGNED_OUT') {
      userSignUp.set(null);
        return;
    }
    if (event === 'SIGNED_IN' && session?.user) {
      userSignUp.set(session.user)
      console.log('entro')
        return;
    }
    if (event === 'USER_DELETED') {
      userSignUp.set(null)
        return;
    }

});
// userSignUp.set(supabase.auth.user());
