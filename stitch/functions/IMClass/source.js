// IMClass returns the class definition for IM so that it can be used in other functions.
// Since functions and classes can only be represented as BSON.Code in EJSON. This class can not
// be returned to any client, including the Debug Console. 

// IM contains functions that use the Slack WebAPI im endpoints
class IM {
  constructor() {
    this.Util = context.functions.execute('UtilClass');
  }
  
  setAuthToken(token) {
    this.authToken = token;
  }
  
  close({ token, channel }) {
    const method = 'im.close';
    const body = { channel };
    return this.postJSONWithAuthToken(method, body, token);
  }

  history({ token, channel, options }) {
    const method = 'im.history';
    const query = {
      channel,
      ...options,
    };
    return this.getWithAuthToken(method, query, token);
  }

  list({ token, options }) {
    const method = 'im.list';
    const query = options;
    return this.getWithAuthToken(method, query, token);
  }

  mark({ token, channel, ts }) {
    const method = 'im.mark';
    const body = {
      channel,
      ts,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  open({ token, user, options }) {
    const method = 'im.open';
    const body = {
      user,
      ...options,
    }
    return this.postJSONWithAuthToken(method, body, token);
  }

  replies({ token, channel, thread_ts }) {
    const method = 'im.replies';
    const query = {
      channel,
      thread_ts,
    }
    return this.getWithAuthToken(method, query, token);
  }

  // UTILITY
  postJSONWithAuthToken(method, body, token) {
    return this.Util.postJSONWithAuthToken(method, body, token || this.authToken);
  }
  
  getWithAuthToken(method, query, token) {
    return this.Util.getWithAuthToken(method, query, token || this.authToken);
  }
}

exports = function(){
  return IM;
};
