import { error, type Load, type Page } from "@sveltejs/kit";
import { setCurrentSystem } from '$stores/systemStore';
import { browser } from '$app/environment';

interface Params extends Page {
  system_slug: string
}

export async function load({ params }: Params) {
  if (!browser) return;
  console.log('navegador xd')
  const result = setCurrentSystem(params.system_slug);
  
  if (!result) throw error(404, `No existe el sistema '${params.system_slug}'`);
}
