import { browser } from '$app/environment';
import { error, type Page } from "@sveltejs/kit";
import { setSystem } from '$stores/systemStore';

interface Params extends Page {
  system_slug: string
}

export async function load({ params }: Params) {
  if (!browser) return;

  const result = await setSystem(params.system_slug);
  
  if (!result) throw error(404, `No existe el sistema '${params.system_slug}'`);
}
