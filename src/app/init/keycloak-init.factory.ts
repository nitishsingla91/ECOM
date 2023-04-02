import {KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";

export function initializeKeycloak(
    keycloak: KeycloakService
    ) {
      return () =>
        keycloak.init({
          config: environment.keycloakConfig,
          initOptions: {
            pkceMethod: 'S256', 
            redirectUri: window.location.origin,   
            checkLoginIframe: false
          },
          shouldAddToken:() => true
        });
  }
