// ChannelsClass returns the class definition for Channels so that it can be used in other functions.
// Since functions and classes can only be represented as BSON.Code in EJSON. This class can not
// be returned to any client, including the Debug Console. 

// Chanels contains functions that use the Slack WebAPI channels endpoints
class Channels {
  constructor() {
    this.Util = context.functions.execute('UtilClass');
  }
  
  setAuthToken(token) {
    this.authToken = token;
  }
  
  archive({ token, channel }){
    const method = 'channels.archive';
    const body = { channel };
    return this.postJSONWithAuthToken(method, body, token);
  }

  create({ token, name, options }){
    const method = 'channels.create';
    const body = {
      name,
      ...options,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  history({ token, channel, options }){
    const method ='channels.history';
    const query = {
      channel,
      ...options,
    }
    return this.getWithAuthToken(method, query, token);
  }

  info({ token, channel, options }){
    const method ='channels.info';
    const query = {
      channel,
      ...options,
    }
    return this.getWithAuthToken(method, query, token);
  }

  invite({ token, channel, user }){
    const method = 'channels.invite';
    const body = {
      channel,
      user,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  join({ token, name, options }){
    const method = 'channels.join';
    const body = {
      name,
      ...options,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  kick({ token, channel, user }){
    const method = 'channels.kick';
    const body = {
      channel,
      user,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  leave({ token, channel }){
    const method = 'channels.leave';
    const body = { channel };
    return this.postJSONWithAuthToken(method, body, token);
  }

  mark({ token, channel, ts }){ 
    const method = 'channels.mark';
    const body = { channel, ts };
    return this.postJSONWithAuthToken(method, body, token);  
  }

  rename({ token, channel, name, options }){
    const method = 'channels.rename'
    const body = {
      channel,
      name,
      ...options,
    }
    return this.postJSONWithAuthToken(method, body, token);
  }

  replies({ token, channel, thread_ts}){
    const method = 'channels.replies';
    const query = { channel, thread_ts };
    return this.getWithAuthToken(method, query, token);
  }

  setPurpose({ token, channel, purpose }){
    const method = 'channels.setPurpose';
    const body = { channel, purpose };
    return this.postJSONWithAuthToken(method, body, token);
  }

  setTopic({ token, channel, topic }){
    const method = 'channels.setTopic';
    const body = { channel, topic };
    return this.postJSONWithAuthToken(method, body, token);
  }

  unarchive({ token, channel }){
    const method = 'channels.unarchive';
    const body = { channel };
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

exports = function(arg){
  return Channels;
};