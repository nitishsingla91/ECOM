import { KeycloakConfig } from "keycloak-js";

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'AMCart',
  clientId: 'amcart-frontend'
};

export const environment = {  
    production: false,
    keycloakConfig,
    searchServiceUrl:'http://localhost:8081'
}