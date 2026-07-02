import type { TranslationKey, Translations } from './en'
import { en } from './en'
import { fr } from './fr'

export type { TranslationKey, Translations }

export type Lang = 'en' | 'fr'

const strings: Record<Lang, Translations> = { en, fr }

export function getLang(url: URL): Lang {
  return url.pathname.startsWith('/fr') ? 'fr' : 'en'
}

export function useTranslations(lang: Lang) {
  return (key: TranslationKey): string => strings[lang][key]
}
