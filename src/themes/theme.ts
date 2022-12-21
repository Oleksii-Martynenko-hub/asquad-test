import { devices } from './media-queries'

export const theme = {
  palette: {
    primary: '#A555EC',
    primaryDisabled: '#b590d6',
    primaryHover: '#9b46e6',
    header: '#343040',
    success: '#015B08',
    error: '#FE5F55',
  },
  media: devices,
} as const
