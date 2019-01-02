class Converstions {
  constructor() {
    this.Util = context.functions.execute('UtilClass');
  }
  
  setAuthToken(token) {
    this.authToken = token;
  }
  
  archive({ token, channel }){
    const method = 'conversations.archive';
    const body = { channel };
    return this.postJSONWithAuthToken(method, body, token);
  }

  close({ token, channel }){
    const method = 'conversations.close';
    const body = { channel };
    return this.postJSONWithAuthToken(method, body, token);
  }

  create({ token, name, options }){
    const method = 'conversations.create';
    const body = { 
      name,
      ...options
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  history({ token, channel, options }){
    const method = 'conversations.history';
    const query = {
      channel,
      ...options,
    }
    return this.getWithAuthToken(method, query, token);
  }

  info({ token, channel, options }){
    const method = 'conversations.info';
    const query = {
      channel,
      ...options,
    }
    return this.getWithAuthToken(method, query, token);
  }

  invite({ token, channel, users }){
    const method = 'conversations.invite';
    const body = {
      channel,
      users,
    }
    return this.postJSONWithAuthToken(method, body, token);
  }

  join({ token, channel }){
    const method = 'conversations.join';
    const body = { channel };
    return this.postJSONWithAuthToken(method, body, token);
  }

  kick({ token, channel, user }){
    const method = 'conversations.kick';
    const body = {
      channel,
      user,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  leave({ token, channel }){
    const method = 'conversations.leave';
    const body = { channel };
    return this.postJSONWithAuthToken(method, body, token);
  }

  list({ token, options }){
    const method = 'conversations.list';
    const query = { ...options };
    return this.getWithAuthToken(method, query, token);
  }

  members({ token, channel, options }){
    const method = 'conversations.members';
    const query = {
      channel,
      ...options,
    };
    return this.getWithAuthToken(method, query, token);
  }

  open({ token, options }){
    const method = 'conversations.open';
    const body = { ...options };
    return this.postJSONWithAuthToken(method, body, token);
  }

  rename({ token, channel, name }){
    const method = 'conversations.rename';
    const body = {
      channel,
      name,
    }
    return this.postJSONWithAuthToken(method, body, token);
  }

  replies({ token, channel, ts, options }){
    const method = 'conversations.replies';
    const query = {
      channel,
      ts,
      ...options,
    }
    return this.getWithAuthToken(method, query, token);
  }

  setPurpose({ token, channel, purpose }){
    const method = 'conversations.setPurpose';
    const body = {
      channel,
      purpose,
    }
    return this.postJSONWithAuthToken(method, body, token);
  }

  setTopic({ token, channel, topic }){
    const method = 'conversations.setTopic';
    const body = {
      channel,
      topic,
    }
    return this.postJSONWithAuthToken(method, body, token);
  }

  unarchive({ token, channel }){
    const method = 'conversations.unarchive';
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

exports = function(){
  return Converstions;
};