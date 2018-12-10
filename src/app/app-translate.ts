import { TranslateLoader } from '@ngx-translate/core';
import {Observable, of} from 'rxjs';

import { TRANSLATION as EN } from '../assets/i18n/en';
import { TRANSLATION as ES } from '../assets/i18n/es';

export const AVAILABLE_LANGUAGES = ['en', 'es'];
export const DEFAULT_LANGUAGE = 'es';

export function getDefaultLanguage(): string {
  const browserLanguage = navigator.language;
  return (AVAILABLE_LANGUAGES.find((item) => {
    return item === browserLanguage;
  }) !== undefined) ? DEFAULT_LANGUAGE : browserLanguage;
}

export function TranslateLoaderFactory() {
  return new FileTranslationLoader();
}

export class FileTranslationLoader extends TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    let translation = {};
    switch (lang) {
      case 'en': translation = EN;
        break;
      case 'es': translation = ES;
        break;
    }
    return of(translation);
  }

}
