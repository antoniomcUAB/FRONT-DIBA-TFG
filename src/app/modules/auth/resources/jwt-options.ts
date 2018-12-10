import { TokenService } from '../services/token.service';

export function jwtOptionsFactory(tokenService: TokenService) {
  return {
    headerName: 'authentication',
    authScheme: 'Bearer',
    tokenGetter: () => {
      return tokenService.getToken();
    }
  };
}
