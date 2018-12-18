export const env = {
  serverURL: 'http://localhost:4201',
  apiURL   : 'http://localhost:3000'
};

export const environment = {
  production: false,
  serverURL: env.serverURL,
  apiURL: env.apiURL
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
