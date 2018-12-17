// SlackClass returns the class definition for Slack so that it can be used in other functions.
// Since functions and classes can only be represented as BSON.Code in EJSON. This class cannot
// be returned to any client, including the Debug Console. 

// Slack contains classes and methods that allow usage of the Slack Web API.
class Slack {
  constructor() {
    const ChatClass = context.functions.execute('ChatClass');
    const SearchClass = context.functions.execute('SearchClass');
    
    this.Chat = new ChatClass();
    this.Search = new SearchClass();
    this.Util = context.functions.execute('UtilClass');
  }
  
  setAuthToken(token) {
    this.authToken = token;
    this.Chat.setAuthToken(token);
    this.Search.setAuthToken(token);
  }
  
  // apiTest sends a request to the api.test endpoint
  apiTest({ token, body }) {
    const url = 'https://slack.com/api/api.test';
    return this.Util.postJSONWithAuthToken(url, body, token || this.authToken);
  }
  
  
}

exports = function(){
  return Slack;
};