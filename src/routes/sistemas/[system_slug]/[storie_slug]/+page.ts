import { browser } from '$app/environment';
import { setCurrentStorie, system, systems } from '$stores/systemStore';
import { error, type Load, type Page } from "@sveltejs/kit";

import { get } from 'svelte/store';

interface Params extends Page {
  storie_slug: string
}

export const ssr = false;

export async function load({ params }: Params) {
  if (!browser) return;
  const result = setCurrentStorie(params.storie_slug);
  console.log('navegador xd')
  
  if (!result) throw error(404, `No existe la historia '${params.system_slug}'`);
}
