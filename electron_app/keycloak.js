import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://localhost:8080/auth',
  realm: 'iot_scanner',
  clientId: 'account'
});

export default keycloak;