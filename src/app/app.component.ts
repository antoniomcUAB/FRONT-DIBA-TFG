import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, getDefaultLanguage } from './app-translate';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(private _translateService: TranslateService) {
    const defaultLanguage = getDefaultLanguage();
    this._translateService.addLangs(AVAILABLE_LANGUAGES);
    this._translateService.setDefaultLang(DEFAULT_LANGUAGE);
    this._translateService.use(defaultLanguage);
  }
}
