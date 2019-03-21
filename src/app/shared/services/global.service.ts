import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {BreadcrumInterface} from "../../core/resources/breadcrum-interface";
import {BreadCrums} from "../../modules/tabs/models/tab-class-form";

export class GlobalService {
  public serverURL = environment.serverURL;
  public apiURL = environment.apiURL;

  public static layout: BreadcrumInterface;
  public handleError(error: Response) {
    return Observable.throw(error || 'Server error');
  }
  public registerLayout(interfaceBreadCrum:BreadcrumInterface) {
    GlobalService.layout = interfaceBreadCrum;
  }
  public setBreadCrum(breadcrum: BreadCrums[]) {
    if (GlobalService.layout)
    GlobalService.layout.setBreadCrum(breadcrum);
  }
}
