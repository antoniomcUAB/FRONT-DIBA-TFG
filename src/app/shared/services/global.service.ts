import { Injectable } from '@angular/core';

import {environment} from '../../../environments/environment';

@Injectable()
export class GlobalService {
  public serverURL = environment.serverURL;

  constructor() {  }

}
