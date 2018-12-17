// UtilClass returns the class definition for Util so that it can be used in other functions.
// Since functions and classes can only be represented as BSON.Code in EJSON. This class cannot
// be returned to any client, including the Debug Console. 


// Util contains utility methods used to send properly formatted http requests to the Slack 
// Web API
class Util {
  
  // postJSONWithAuthToken sends a http POST request with `application/JSON`
  // content type and the given token as the Authorization Bearer token
  static postJSONWithAuthToken(url, body, token) {
    const http = context.services.get("http");
    return http.post({
      url,
      body,
      headers: {
        "Content-Type": ["application/json; charset=utf-8"],
        "Authorization": [`Bearer ${token}`],
      },
      encodeBodyAsJSON: true,
    });
  }
  
  // getWithAuthToken sets a http GET request with `application/x-www-form-urlencoded`
  // content type and the given token as the Authorization Bearer token
  static getWithAuthToken(url, token) {
    const http = context.services.get("http");
    return http.get({
      url,
      headers: {
        "Authorization": [`Bearer ${token}`],
      },
    }); 
  }
  
  static constructQuery(parameters) {
    let query = '';
    for (const key in parameters) {
      query += `${key}=${parameters[key]}&`;
    }
    if (query !== '') {
      query = query.slice(0,-1);
    }
    
    return query;
  }
}

exports = function(){
  return Util;
};