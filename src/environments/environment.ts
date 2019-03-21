
declare const env: any;

export const environment = {
  production: false,
  serverURL: env.serverURL,
  apiURL: env.apiURL,
  whitelistedDomains: env.whitelistedDomains,
  blacklistedRoutes: env.blacklistedRoutes
};
