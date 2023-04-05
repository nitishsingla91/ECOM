import { KeycloakConfig } from "src/app/common/interfaces.defs";

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'AMCart',
  clientId: 'amcart-client',
  redirectURI: 'http://localhost:4200'
};
export const environment = {  
    production: false,
    keycloakConfig,
    searchServiceUrl:'http://localhost:8082',
    authServiceUrl:'http://localhost:8082/auth/'
}