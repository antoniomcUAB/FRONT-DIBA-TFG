export const env = {
  serverURL: 'http://localhost:4200',
  // apiURL   : 'http://10.14.1.165:8080' // LOCAL
  // apiURL   : 'http://10.14.4.52:7001' // LOCAL
  apiURL   : 'http://dsdiba-api.demo.in2.es' // DES
};

export const environment = {
  production: false,
  serverURL: env.serverURL,
  apiURL: env.apiURL
};
