import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

export class GlobalService {
  public serverURL = environment.serverURL;
  public static apiURL = environment.apiURL;

  public handleError(error: Response) {
    return Observable.throw(error || 'Server error');
  }

  public static  get API_URL(): string {
    return this.apiURL;
  }
  public static  setapiURL() {
    this.apiURL = environment.apiURL;
  }
}
