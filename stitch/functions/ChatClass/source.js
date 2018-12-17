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
    const url = 'https://slack.com/api/chat.delete';
    const body = {
      channel,
      ts,
      ...options
    };
    return this.postJSONWithAuthToken(url, body, token);
  }
  
  getPermalink({ token, channel, message_ts }) {
    const baseURL = 'https://slack.com/api/chat.getPermalink';
    const queryString = this.util.constructQuery({ channel, message_ts});
    const url = `${baseURL}?${queryString}`;
    return this.getWithAuthToken(url, token);
  }
  
  meMessage({ token, channel, text }) {
    const url = 'https://slack.com/api/chat.meMessage';
    const body = {
      channel,
      text,
    };
    return this.postJSONWithAuthToken(url, body, token);
  }
  
  postEphemeral({ token, channel, text, user, options }) {
    const url = 'https://slack.com/api/chat.postEphemeral';
    const body = {
      channel,
      text,
      user,
      ...options,
    };
    return this.postJSONWithAuthToken(url, body, token);
  }
  
  postMessage({ token, channel, text, options }){
    const url = 'https://slack.com/api/chat.postMessage';
    const body = { 
      channel,
      text,
      ...options,
    };
    return this.postJSONWithAuthToken(url, body, token);
  }
  
  unfurl({ token, channel, ts, unfurls, options }) {
    const url = 'https://slack.com/api/chat.unfurl';
    const body = {
      channel,
      ts,
      unfurls,
      ...options
    }
    return this.postJSONWithAuthToken(url, body, token);
  }
  
  update({ token, channel, text, ts, options }) {
    const url = 'https://slack.com/api/chat.update';
    const body = {
      channel,
      text,
      ts,
      ...options,
    }
    return this.postJSONWithAuthToken(url, body, token);
  }
  
  // UTILITY
  
  postJSONWithAuthToken(url, body, token) {
    return this.util.postJSONWithAuthToken(url, body, token || this.authToken);
  }
  
  getWithAuthToken(url, token) {
    return this.util.getWithAuthToken(url, token || this.authToken);
  }
}


exports = function(arg){
  return Chat;
};

