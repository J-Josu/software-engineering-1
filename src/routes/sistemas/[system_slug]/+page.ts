import { error, type Load, type Page } from "@sveltejs/kit";
import { setSystem, system } from '$lib/stores/systemsStore';
import { get } from 'svelte/store';

interface Params extends Page {
  system_slug: string
}

export async function load({ params }: Params) {
  const result = setSystem(params.system_slug);

  if (!result) throw error(404, `No existe systema asociado a ${params.system_slug}`);

  return get(system);
}
