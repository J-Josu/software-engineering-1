import { derived, get, writable, type Writable } from 'svelte/store';
import { supabase } from '$db/supabaseClient';
import type * as DB from '$lib/types/db';
import { user } from './auth';

import type { System, Storie } from '$lib/types/types';
import type { User } from '@supabase/supabase-js';
import { toKebabCase } from '$lib/utils';

const newSystem = (name: string, description: string, user_id: string) => {
  return {
    user_id,
    slug: toKebabCase(name),
    name,
    description
  }
};

export const systems = derived<[Writable<User | null>], System[]>(
  // @ts-ignore
  [user], async ([$user], set) => {
    if (!$user) set([]);
    else {
      const { data, error } = await supabase
        .from<DB.Systems>('systems')
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

// export const addSystem = async (name: string, description: string = '', user_id: string) => {
//   const { data, error } = await supabase
//     .from('systems')
//     .insert([newSystem(name, description, user_id)]);

//   if (error) {
//     return console.error(error);
//   }

//   systems.update($systems => [...$systems, { ...data[0], stories: [] }]);
// }


export const system = writable<System>();

export const setCurrentSystem = (system_slug: string) => {
  const $systems = get(systems);
  if ($systems.length === 0) {
    console.log('Sistemas no cargados');
    if ($systems.length === 0) return false;
  }

  const result = $systems.find((system) => system.slug === system_slug);
  if (!result) return false;

  system.set(result);
  return true;
}
export const storie = writable<Storie>();

export const setCurrentStorie = (storie_slug: string) => {
  const $system = get(system);
  console.log($system)
  if (!$system) {
    console.log('Sistema no cargado');
    return false;
  }

  const result = $system.stories.find((storie) => storie.slug === storie_slug);
  if (!result) return false;
  storie.set(result);
  console.log('hola historia',get(storie))
  return true;
}


export const addStorie = async (id_custom: string, description: string, color: string, user_id: string, system_id: string) => {
  const { data, error } = await supabase
    .from('stories')
    .insert([{
      slug: toKebabCase(id_custom),
      id_custom,
      description,
      color,
      user_id,
      system_id
    }]);

  if (error) {
    console.error(error)
    return null;
  }

  return data[0] as Storie
}

// export const addScenarie = async (user_id: string, storie_id: string, title: string, context: string, event: string, response: string) => {
//   const { data, error } = await supabase
//     .from<DB.Scenaries>('scenaries')
//     .insert([{ user_id, storie_id, title, context, event, response }]);

//   if (error) {
//     return console.error(error);
//   }

//   return data[0] as DB.Scenaries
// }
// export const addRule = async (user_id: string, storie_id: string, description: string) => {
//   const { data, error } = await supabase
//     .from<DB.Rules>('rules')
//     .insert([{ user_id, description, storie_id }]);

//   if (error) {
//     return console.error(error);
//   }

//   return data[0] as DB.Rules
// }
