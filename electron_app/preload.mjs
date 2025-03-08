import { contextBridge, ipcRenderer } from 'electron';
import keycloak from './keycloak.js';

contextBridge.exposeInMainWorld('auth', {
  login: async () => {
    const authenticated = await keycloak.init({ checkLoginIframe: false });

    if (!authenticated) {
      keycloak.login();
    } else {
      return keycloak.token;
    }
  },
  getToken: () => ipcRenderer.invoke('get-auth-token'),
});
