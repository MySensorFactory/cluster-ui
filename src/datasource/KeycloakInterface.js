import Keycloak from 'keycloak-js';


export const keycloakConfig = {
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_CLIENT_ID
};

const _kc = new Keycloak(keycloakConfig);

const initKeycloak = (onAuthenticatedCallback) => {
    _kc.init(
        { onLoad: 'login-required' }
    )
        .then((authenticated) => {
            if (!authenticated) {
                console.log("user is not authenticated..!");
            }
            onAuthenticatedCallback();
        })
        .catch(console.error);
};

const doLogin = _kc.login;

const getToken = () => _kc.token;

const getTokenParsed = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
    _kc.updateToken(5)
        .then(successCallback)
        .catch(doLogin);

const doLogout = _kc.logout;

const clearToken = _kc.clearToken;

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles: string[]) => roles.some((role) => _kc.hasRealmRole(role));

export const KeycloakInterface = {
    initKeycloak,
    doLogout,
    hasRole,
    doLogin,
    isLoggedIn,
    clearToken,
    getToken,
    getTokenParsed,
    updateToken,
    getUsername
};