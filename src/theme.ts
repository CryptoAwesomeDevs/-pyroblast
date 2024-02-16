import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
});

export interface Theme {
  colorPrimary: string;
  colorSecondary: string;
  colorTertiary: string;
  colorQuaternary: string;
  colorQuinary: string;
  bgColorPrimary: string;
  bgColorSecondary: string;
  bgColorTertiary: string;
  bgColorQuaternary: string;
  bgColorQuinary: string;
  actionColor: string;
  primaryBorderColor: string;
  primaryFont: string;
  primaryBorderRadius: string;
  secondaryBorderRadius: string;
  tertiaryBorderRadius: string;
  primaryBgColorBoxShadow: string;
  primaryBgColorBoxShadowHover: string;
  primaryBgColorBoxShadowActive: string;
}

export const defaultTheme: Theme = {
  colorPrimary: '#F38118',
  colorSecondary: '#FFFFFF',
  colorTertiary: '#493F24',
  colorQuaternary: '#26A69A',
  colorQuinary: '#EF5350',
  bgColorPrimary: '#151515',
  bgColorSecondary: '#0C0C0C',
  bgColorTertiary: '#D9D9D9',
  bgColorQuaternary: '#4C4C4C',
  bgColorQuinary: '#D9D9D9',
  actionColor: '#8B8F97',
  primaryBorderColor: '#383839',
  primaryFont: spaceGrotesk.style.fontFamily,
  primaryBorderRadius: '12px',
  secondaryBorderRadius: '6px',
  tertiaryBorderRadius: '3px',
  primaryBgColorBoxShadow: 'rgba(243, 129, 24, 1) 0px 0px 0px 1px',
  primaryBgColorBoxShadowHover: 'rgba(243, 129, 24, 0.9) 0px 0px 0px 1px',
  primaryBgColorBoxShadowActive: 'rgba(243, 129, 24, 0.7) 0px 0px 0px 1px',
};

export const breakpoints = {
  xs: 400,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;
