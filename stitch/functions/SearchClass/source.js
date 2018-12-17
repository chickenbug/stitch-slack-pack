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
    const baseURL = 'https://slack.com/api/search.all';
    return this.search(baseURL, query, options, token);
  }
  
  files({ token, query, options }) {
    const baseURL = 'https://slack.com/api/search.files';
    return this.search(baseURL, query, options, token);
  }
  
  messages({ token, query, options }) {
    const baseURL = 'https://slack.com/api/search.messages';
    return this.search(baseURL, query, options, token);
  }
  
  search(baseURL, query, options, token) {
    const queryString = this.util.constructQuery({ query, ...options });
    const url = `${baseURL}?${queryString}`;
    return this.util.getWithAuthToken(url, token || this.authToken);
  }
}

exports = function(){
  return Search;
};