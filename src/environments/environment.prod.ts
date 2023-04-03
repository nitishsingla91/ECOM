import { KeycloakConfig } from "keycloak-js";

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://34.71.104.109',
  realm: 'AMCart',
  clientId: 'amcart-frontend'
};

export const environment = {  
    production: true,
    keycloakConfig,
    searchServiceUrl:'http://35.224.74.147'
}