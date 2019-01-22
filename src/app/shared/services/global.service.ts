import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

export class GlobalService {
  public serverURL = environment.serverURL;
  public apiURL = environment.apiURL;

  public handleError(error: Response) {
    return Observable.throw(error || 'Server error');
  }
}
