import { derived, get, writable, type Writable } from 'svelte/store';
import { supabase } from '$db/supabaseClient';
import type * as DB from '$lib/types/db';
import { user } from './auth';

import type { System, Storie } from '$lib/types/types';
import { toKebabCase } from '$lib/utils';
import { notify } from './notifyStore';


export const systems = writable<System[]>([]);

export const loadSystems = async () => {
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

  systems.set(data as System[]);
}

user.subscribe(async $user => {
  if (!$user) systems.set([]);

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

  systems.set(data as System[]);
})

export const addSystem = async (name: string, description: string = '', user_id: string) => {
  const { data, error } = await supabase
    .from<DB.Systems>('systems')
    .insert([{
      user_id,
      slug: toKebabCase(name),
      name,
      description
    }]);

  if (error) {
    return console.error(error);
  }

  systems.update($systems => [...$systems, { ...data[0], stories: [] }]);
}

export const updateSystem = async (id: string, description?: string, name?: string) => {
  alert('improve this');
  const { data, error } = await supabase
    .from<DB.Systems>('systems')
    .update({ description, name })
    .match({ id })

  if (error) {
    return notify(error);
  }

  systems.update($systems => $systems.map(
      $system => $system.id === id ?
        { ...data[0], stories: $system.stories }
        : $system
    )
  );
}

export const deleteSystem = async (id: string) => {
  const { error } = await supabase
    .from<DB.Systems>('systems')
    .delete({ returning: 'minimal' })
    .match({ id })

  if (error) {
    return notify(error);
  }

  systems.update($systems => $systems.filter($system => $system.id !== id));
}


export const system = writable<System | null>(null);

export const setSystem = async (system_slug: string) => {
  const $systems = get(systems);

  if ($systems.length === 0) {
    console.log('Sistemas no cargados');
    // await loadSystems();
    // if ($systems.length === 0)
    return false;
  }

  const result = $systems.find(($system) => $system.slug === system_slug);
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
  console.log('hola historia', get(storie))
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

export const addScenarie = async (user_id: string, storie_id: string, title: string, context: string, event: string, response: string) => {
  const { data, error } = await supabase
    .from<DB.Scenaries>('scenaries')
    .insert([{ user_id, storie_id, title, context, event, response }]);

  if (error) {
    return console.error(error);
  }

  return data[0] as DB.Scenaries
}
export const addRule = async (user_id: string, storie_id: string, description: string) => {
  const { data, error } = await supabase
    .from<DB.Rules>('rules')
    .insert([{ user_id, description, storie_id }]);

  if (error) {
    return console.error(error);
  }

  return data[0] as DB.Rules
}
