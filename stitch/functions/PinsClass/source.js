// PinsClass returns the class definition for Pins so that it can be used in other functions.
// Since functions and classes can only be represented as BSON.Code in EJSON. This class can not
// be returned to any client, including the Debug Console. 

// Pins contains functions that use the Slack WebAPI pins endpoints
class Pins {
  constructor() {
    this.Util = context.functions.execute('UtilClass');
  }
  
  setAuthToken(token) {
    this.authToken = token;
  }
  
  add({ token, channel, options }) {
    const method = 'pins.add';
    const body = {
      channel,
      ...options,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  list({ token, channel }) {
    const method = 'pins.list';
    const query = { channel };
    return this.getWithAuthToken(method, query, token);
  }

  remove({ token, channel, options }) {
    const method = 'pins.remove';
    const body = {
      channel,
      ...options,
    };
    return this.postJSONWithAuthToken(method, body, token);
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
  return Pins;
};