declare const env: any;

export const environment = {
  production: true,
  serverURL: env.serverURL,
  apiURL: env.apiURL,
  whitelistedDomains: env.whitelistedDomains,
  blacklistedRoutes: env.blacklistedRoutes
};
