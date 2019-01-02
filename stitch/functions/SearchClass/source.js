// SearchClass returns the class definition for Search so that it can be used in other functions.
// Since functions and classes can only be represented as BSON.Code in EJSON. This class can not
// be returned to any client, including the Debug Console. 

// Search contains functions that use the Slack WebAPI search endpoints
class Search {
  constructor() {
    this.util = context.functions.execute('UtilClass');
  }
  
  setAuthToken(token) {
    this.authToken = token;
  }
  
  all({ token, query, options }) {
    const method = 'search.all';
    return this.search(method, query, options, token);
  }
  
  files({ token, query, options }) {
    const method = 'search.files';
    return this.search(method, query, options, token);
  }
  
  messages({ token, query, options }) {
    const method = 'search.messages';
    return this.search(method, query, options, token);
  }
  
  search(method, query, options, token) {
    const queryObject = { query, ...options };
    return this.util.getWithAuthToken(method, queryObject, token || this.authToken);
  }
}

exports = function(){
  return Search;
};