import { system, systems } from '$stores/systemsStore';
import type { Load, Page } from "@sveltejs/kit";

import { get } from 'svelte/store';

interface Params extends Page {
  storie_slug: string
}

export async function load({ params }: Params) {
  
  const storie = get(system)?.stories?.find((storie) => storie.slug === params.storie_slug)
  console.log(storie)
  return storie;
}
