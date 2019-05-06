import { TokenService } from '../services/token.service';
import {environment} from '../../../../environments/environment';

export function jwtOptionsFactory(tokenService: TokenService) {
  return {
    headerName: 'Authorization',
    authScheme: 'bearer ',
    throwNoTokenError: false,
    whitelistedDomains: environment.whitelistedDomains,
    blacklistedRoutes: environment.blacklistedRoutes,
    tokenGetter: () => {
      return tokenService.getToken();
    }
  };
}
