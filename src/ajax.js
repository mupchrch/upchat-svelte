import Token from './token';

/**
 * Performs an ajax post.
 * @param  {String}  endpoint  API endpoint url.
 * @param  {Object}  params    Parameters for the API.
 * @return {Promise} A promise resolving/rejecting to the responseJson from the server.
 */
const post = (endpoint, params, isMultipart) => {
  const headers = {};
  headers['Content-Type'] = isMultipart ? 'multipart/form-data' : 'application/x-www-form-urlencoded';

  // Add token to header if available
  const token = Token.get();
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  return _requestHelper('POST', endpoint, headers, params);
}

/**
 * Performs an ajax get.
 * @param  {String}  endpoint  API endpoint url.
 * @param  {Object}  params    Parameters for the API.
 * @return {Promise} A promise resolving/rejecting to the responseJson from the server.
 */
const get = (endpoint, params) => {
  const headers = {};

  // Add token to header if available
  const token = Token.get();
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  return _requestHelper('GET', endpoint, headers, params);
}

/**
 * Handles the response from the server.
 * @param  {XMLHttpRequest} xhttp The request object.
 * @param  {Function} resolve Function to call to resolve the promise.
 * @param  {Function} reject  Function to call to reject the promise.
 */
const _handleServerResponse = (xhttp, resolve, reject) => {
  if (xhttp.readyState == 4) {
    let responseJson = JSON.parse(xhttp.responseText);

    if (xhttp.status == 200) {
      resolve(responseJson);
    } else {
      reject(responseJson);
    }
  }
}

/**
 * Does the heavylifting for ajax calls.
 * @param  {String}  type      Type of request (POST, GET, etc)
 * @param  {String}  endpoint  API endpoint url
 * @param  {Object}  headers   The request headers to attach.
 * @param  {Object}  params    Parameters for the API.
 * @return {Promise} A promise resolving/rejecting to the responseJson from the server.
 */
const _requestHelper = (type, endpoint, headers, params) => {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => _handleServerResponse(xhttp, resolve, reject);

    // set up data we will send with ajax request
    let dataToSend;
    if (headers['Content-Type'] === 'multipart/form-data') {
      delete headers['Content-Type']; // allow the browser to set this automatically
      const data = new FormData();

      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          data.append(key, params[key]);
        }
      }

      dataToSend = data;
    } else {
      let uri = '';
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          uri += key + '=' + params[key] + '&';
        }
      }
      uri = uri.slice(0, -1); // remove trailing "&"

      if (type === 'GET') {
        endpoint += '?' + uri;
        uri = '';
      }

      dataToSend = encodeURI(uri);
    }

    // finally, open and send ajax request
    xhttp.open(type, endpoint, true);

    for (let key in headers) {
      xhttp.setRequestHeader(key, headers[key]);
    }

    xhttp.send(dataToSend);
  });
}

export default { get, post };