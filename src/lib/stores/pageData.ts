import { writable } from 'svelte/store';

type PageMetadata = {
  title: string
}

export const pageMetada = writable<PageMetadata>({
  title: ''
})
