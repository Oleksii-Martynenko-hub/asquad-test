const sizes = {
  xs: '375px',
  md: '1024px',
  lg: '1280px',
  xl: '1440px',
} as const

export const devices = {
  mobile: `(min-width: ${sizes.xs})`,
  tablet: `(min-width: ${sizes.md})`,
  laptop: `(min-width: ${sizes.lg})`,
  desktop: `(min-width: ${sizes.xl})`,
} as const
