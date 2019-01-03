// GroupsClass returns the class definition for Group so that it can be used in other functions.
// Since functions and classes can only be represented as BSON.Code in EJSON. This class can not
// be returned to any client, including the Debug Console. 

// Groups contains functions that use the Slack WebAPI group endpoints
class Groups {
  constructor() {
    this.Util = context.functions.execute('UtilClass');
  }
  
  setAuthToken(token) {
    this.authToken = token;
  }
  
  archive({ token, channel }) {
    const method = 'groups.archive';
    const body = { channel };
    return this.postJSONWithAuthToken(method, body, token);
  }

  create({ token, name, options }) {
    const method = 'groups.create';
    const body = {
      name,
      ...options,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  createChild({ token, channel }) {
    const method = 'groups.createChild';
    const query = { channel };
    return this.getWithAuthToken(method, query, token);
  }

  history({ token, channel, options }) {
    const method = 'groups.history';
    const query = {
      channel,
      ...options,
    };
    return this.getWithAuthToken(method, query, token);
  }

  invite({ token, channel, user }) {
    const method = 'groups.invite';
    const body = {
      channel,
      user,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  kick({ token, channel, user }) {
    const method = 'groups.kick';
    const body = {
      channel,
      user,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  leave({ token, channel }) {
    const method = 'groups.leave';
    const body = { channel };
    return this.postJSONWithAuthToken(method, body, token);
  }

  mark({ token, channel, ts }) {
    const method = 'groups.mark';
    const body = {
      channel,
      ts,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  open({ token, channel }) {
    const method = 'groups.open';
    const body = { channel };
    return this.postJSONWithAuthToken(method, body, token);
  }

  rename({ token, channel, name, options }) {
    const method = 'groups.rename';
    const body = {
      channel,
      name,
      ...options
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  replies({ token, channel, thread_ts }) {
    const method = 'groups.replies';
    const query = {
      channel,
      thread_ts,
    };
    return this.getWithAuthToken(method, query, token);
  }

  setPurpose({ token, channel, purpose }) {
    const method = 'groups.setPurpose';
    const body = {
      channel,
      purpose,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  setTopic({ token, channel, topic }) {
    const method = 'groups.setTopic';
    const body = {
      channel,
      topic,
    };
    return this.postJSONWithAuthToken(method, body, token);
  }

  unarchive({ token, channel }) {
    const method = 'groups.unarchive';
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
  return Groups;
};