import type { Systems, Stories, Rules, Scenaries } from './db'

export interface System extends Systems {
  stories: Storie[]
}

export interface Storie extends Stories {
  rules: Rules[],
  scenaries: Scenaries[]
}
