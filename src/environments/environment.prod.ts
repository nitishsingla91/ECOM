import { KeycloakConfig } from "src/app/common/interfaces.defs";


// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://34.71.97.225',
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