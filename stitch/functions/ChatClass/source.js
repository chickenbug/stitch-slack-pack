// ChatClass returns the class definition for Chat so that it can be used in other functions.
// Since functions and classes can only be represented as BSON.Code in EJSON. This class can not
// be returned to any client, including the Debug Console. 

// Chat contains functions that use the Slack WebAPI chat endpoints
class Chat {
  constructor() {
    this.util = context.functions.execute("UtilClass");
  }
  
  setAuthToken(token) {
    this.authToken = token;
  }
  
  deleteMessage({ token, channel, ts, options }) {
    const method = 'chat.delete';
    const body = {
      channel,
      ts,
      ...options
    };
    return this.postJSONWithAuthToken(method, body, token);
  }
  
  getPermalink({ token, channel, message_ts }) {
    const method = 'chat.getPermalink';
    const query = {
      channel,
      message_ts,
    };
    return this.getWithAuthToken(method, query, token);
  }
  
  meMessage({ token, channel, text }) {
    const method = 'chat.meMessage';
    const body = {
      channel,
      text,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }
  
  postEphemeral({ token, channel, text, user, options }) {
    const method = 'chat.postEphemeral';
    const body = {
      channel,
      text,
      user,
      ...options,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }
  
  postMessage({ token, channel, text, options }){
    const method = 'chat.postMessage';
    const body = { 
      channel,
      text,
      ...options,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }
  
  unfurl({ token, channel, ts, unfurls, options }) {
    const method = 'chat.unfurl';
    const body = {
      channel,
      ts,
      unfurls,
      ...options
    }
    return this.postJSONWithAuthToken(method, body, token);
  }
  
  update({ token, channel, text, ts, options }) {
    const method = 'chat.update';
    const body = {
      channel,
      text,
      ts,
      ...options,
    }
    return this.postJSONWithAuthToken(method, body, token);
  }
  
  // UTILITY
  postJSONWithAuthToken(method, body, token) {
    return this.util.postJSONWithAuthToken(method, body, token || this.authToken);
  }
  
  getWithAuthToken(method, query, token) {
    return this.util.getWithAuthToken(method, query, token || this.authToken);
  }
}


exports = function(arg){
  return Chat;
};

