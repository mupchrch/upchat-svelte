import Ajax from './ajax';

let _autoRefreshId = null;

/**
 * Gets the token from storage.
 * @return {String} The token.
 */
const get = () => {
  return sessionStorage.getItem('token');
}

/**
 * Sets the token in storage.
 * @param {String} token The token.
 */
const set = (token) => {
  sessionStorage.setItem('token', token);
}

/**
 * Removes the token from storage.
 */
const remove = () => {
  sessionStorage.removeItem('token');
}

/**
 * Schedules when to refresh the token before it expires.
 */
const enableAutoRefresh = () => {
  _autoRefreshId = window.setInterval(() => {
    const tokenPayload = getPayload();
    const tokenCreation = tokenPayload.iat * 1000;
    const tokenExpiration = tokenPayload.exp * 1000;

    // refresh when the token is over halfway expired
    const whenToRefreshToken = tokenCreation + ((tokenExpiration - tokenCreation) / 2);

    if (new Date().getTime() >= whenToRefreshToken) {
      Ajax.post('/api/auth/refresh-token', {})
        .then((resJson) => {
          set(resJson.token);
        })
        .catch((resJson) => {
          console.log(resJson);
        });
    }
  }, 60000); // check every minute
}

/**
 * Cancels the function that runs periodically to check if the token needs to
 * be refreshed.
 */
const disableAutoRefresh = () => {
  if (_autoRefreshId !== null) {
    window.clearInterval(_autoRefreshId);
    _autoRefreshId = null;
  }
}

/**
 * Gets the payload of the token.
 * @return {Object} The payload of the token.
 */
const getPayload = () => {
  return JSON.parse(atob(sessionStorage.getItem('token').split('.')[1]));
}

/**
 * Checks if the token is expired.
 * @return {Boolean} True if the token is expired.
 */
const isExpired = () => {
  const currentTime = new Date().getTime() / 1000;
  return currentTime > getPayload().exp;
}

export default { get, set, remove, enableAutoRefresh, disableAutoRefresh, getPayload, isExpired };