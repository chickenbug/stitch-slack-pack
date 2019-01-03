exports = async function(){
  // setup 
  const testUtil = context.functions.execute('TestUtilClass');
  
  const testAuthToken = context.values.get('TestAuthToken');
  const testChannel = context.values.get('TestChannel');
  const testUserId = context.values.get('TestUserId');
  
  const ChatClass = context.functions.execute('ChatClass');
  const chat = new ChatClass();
  chat.setAuthToken(testAuthToken);
  
  // postMessage
  const postMessageResponse = await chat.postMessage({
      channel: testChannel,
      text: 'slick',
    })
    .then(testUtil.parseResponseBodyToObject);
  testUtil.assertEquals('postMessageResponse status', postMessageResponse.ok, true);
  
  // update
  const updateResponse = await chat.update({
      channel: testChannel,
      text: 'slack ya doof',
      ts: postMessageResponse.ts,
    })
    .then(testUtil.parseResponseBodyToObject);
  testUtil.assertEquals('updateResponse status', updateResponse.ok, true);
  
  // getPermalink
  const getPermalinkResponse = await chat.getPermalink({
      channel: testChannel,
      message_ts: updateResponse.ts,
    })
    .then(testUtil.parseResponseBodyToObject);
  testUtil.assertEquals('getPermalinkResponse status', getPermalinkResponse.ok, true);
  
  // deleteMessage
  const deleteMessageResponse = await chat.deleteMessage({
      channel: testChannel,
      ts: updateResponse.ts,    
    })
    .then(testUtil.parseResponseBodyToObject);
  testUtil.assertEquals('deleteMessageResponse status',deleteMessageResponse.ok, true);
  
  // postEphemeral
  const postEphemeralResponse = await chat.postEphemeral({
      channel: testChannel,
      text: 'only you',
      user: testUserId,
    })
    .then(testUtil.parseResponseBodyToObject);
  testUtil.assertEquals('postEphemeralResponse status', postEphemeralResponse.ok, true);
  
  
  // meMessage
  const meMessageResponse = await chat.meMessage({
      channel: testChannel,
      text: 'me message'
    })
    .then(testUtil.parseResponseBodyToObject);
  testUtil.assertEquals('meMessageResponse status', meMessageResponse.ok, true);
  
  const deleteMeMessageResponse = await chat.deleteMessage({
      channel: testChannel,
      ts: meMessageResponse.ts,
    })
    .then(testUtil.parseResponseBodyToObject);
  testUtil.assertEquals('deleteMeMessageResponse status', deleteMeMessageResponse.ok, true);
}
