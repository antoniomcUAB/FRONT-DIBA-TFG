const env = {
  // serverURL: 'dsdiba.api.demo.in2.es',  DES
  serverURL: 'http://localhost:8090', //DES
  apiURL   : 'http://dsdiba.api.demo.in2.es', // DES
  // apiURL   : 'http://localhost:8090', // LOCAL
  whitelistedDomains: ['dsdiba.api.demo.in2.es', 'localhost:8090'],
  blacklistedRoutes: ['dsdiba.api.demo.in2.es/dsdiba/api/login', 'localhost:8090/dsdiba/api/login']/*
  apiURL   : 'http://localhost:8081', // DES
  whitelistedDomains: [],
  blacklistedDomains: ['localhost:8081', 'localhost:4200']*/
};
