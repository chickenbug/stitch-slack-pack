// SlackClass returns the class definition for Slack so that it can be used in other functions.
// Since functions and classes can only be represented as BSON.Code in EJSON. This class cannot
// be returned to any client, including the Debug Console. 

// Slack contains classes and methods that allow usage of the Slack Web API.
class Slack {
  constructor() {
    const ChatClass = context.functions.execute('ChatClass');
    const SearchClass = context.functions.execute('SearchClass');
    const ChannelsClass = context.functions.execute('ChannelsClass');
    const ConversationsClass = context.functions.execute('ConversationsClass');
    const PinsClass = context.functions.execute('PinsClass');
    const RemindersClass = context.functions.execute('RemindersClass');
    const IMClass = context.functions.execute('IMClass');
    const GroupClass = context.functions.execute('GroupsClass');
    
    this.Chat = new ChatClass();
    this.Search = new SearchClass();
    this.Channels = new ChannelsClass();
    this.Converstions = new ConversationsClass();
    this.Pins = new PinsClass();
    this.Reminders = new RemindersClass();
    this.IM = new IMClass();
    this.Groups = new GroupsClass();
    
    
    this.Util = context.functions.execute('UtilClass');
  }
  
  setAuthToken(token) {
    this.authToken = token;
    this.Chat.setAuthToken(token);
    this.Search.setAuthToken(token);
    this.Channels.setAuthToken(token);
    this.Converstions.setAuthToken(token);
    this.Pins.setAuthToken(token);
    this.Reminders.setAuthToken(token);
    this.IM.setAuthToken(token);
    this.Groups.setAuthToken(token);
  }
  
  // apiTest sends a request to the api.test endpoint
  apiTest({ token, body }) {
    const method = 'api.test';
    return this.Util.postJSONWithAuthToken(method, body, token || this.authToken);
  }
  
}

exports = function(){
  return Slack;
};