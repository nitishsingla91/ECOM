import { KeycloakConfig } from "src/app/common/interfaces.defs";


// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://35.225.180.167',
  realm: 'AMCart',
  clientId: 'amcart-client',
  redirectURI: 'http://localhost:4200'
};

export const environment = {  
    production: true,
    keycloakConfig,
    searchServiceUrl:'https://backend.amcart.ml',
    authServiceUrl:'https://backend.amcart.ml/auth/'
}