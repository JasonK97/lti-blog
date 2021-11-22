import { SPACE } from './space'

export const SIZES = {
  ...SPACE,
  9.25: 640,
  9.5: 768,
  9.75: 896,
  10: 1024,
  10.25: 1280,
  10.5: 1536,
  10.75: 1792,
  11: 2048,
  11.25: 2560,
  11.5: 3072,
  11.75: 3584,
  12: 4096,
}

export const CORE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs']

export const EXPANDED_SIZES = ['3xl', '2xl', ...CORE_SIZES, '2xs', '3xs']
