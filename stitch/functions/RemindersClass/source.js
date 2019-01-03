// RemindersClass returns the class definition for Reminders so that it can be used in other functions.
// Since functions and classes can only be represented as BSON.Code in EJSON. This class can not
// be returned to any client, including the Debug Console. 

// Reminders contains functions that use the Slack WebAPI reminders endpoints
class Reminders {
  constructor() {
    this.Util = context.functions.execute('UtilClass');
  }
  
  setAuthToken(token) {
    this.authToken = token;
  }
  
  add({ token, text, time, options }) {
    const method = 'reminders.add';
    const body = {
      text,
      time,
      ...options,
    }
    return this.postJSONWithAuthToken(method, body, token);
  }

  complete({ token, reminder }) {
    const method = 'reminders.complete';
    const body = { reminder };
    return this.postJSONWithAuthToken(method, body, token);
  }

  deleteReminder({ token, reminder }) {
    const method = 'reminders.delete';
    const body = { reminder };
    return this.postJSONWithAuthToken(method, body, token);
  }

  info({ token, reminder }) {
    const method = 'reminders.info';
    const query = { reminder };
    return this.getWithAuthToken(method, query, token);
  }

  list({ token }) {
    const method = 'reminders.list';
    const query = {};
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
  return Reminders;
};