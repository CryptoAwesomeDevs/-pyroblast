import type { CSSObject } from 'styled-components';
import { breakpoints } from 'app/theme';

const mediaKeys = Object.keys(breakpoints) as (keyof typeof breakpoints)[];
export const media = mediaKeys.reduce((accumulator, label) => {
  accumulator[label] = (style: CSSObject) => ({ [`@media (min-width: ${breakpoints[label]}px)`]: style });
  return accumulator;
}, {} as Record<keyof typeof breakpoints, (style: CSSObject) => { [mediaString: string]: CSSObject }>);
