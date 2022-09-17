import { browser } from '$app/environment';
import { error, type Page } from "@sveltejs/kit";
import { setStorie } from '$stores/systemStore';

interface Params extends Page {
  storie_slug: string
}

export async function load({ params }: Params) {
  if (!browser) return;

  const result = await setStorie(params.storie_slug);
  
  if (!result) throw error(404, `No existe la historia '${params.system_slug}'`);
}
