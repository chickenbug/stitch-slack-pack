exports = async function(){
  const testAuthToken = context.values.get('TestAuthToken');
  const testUserId = context.values.get('TestUserId');
  
  const TestUtil = context.functions.execute('TestUtilClass');
  const ChatClass = context.functions.execute('ChatClass');
  const Chat = new ChatClass();
  Chat.setAuthToken(testAuthToken);
  
  const IMClass = context.functions.execute('IMClass');
  const IM = new IMClass();
  IM.setAuthToken(testAuthToken);
  
  
  // Tests Begin
  const imOpenResponse = await IM.open({
      user: testUserId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('imOpenResponse status', imOpenResponse.ok, true);
  
  const imChannel = imOpenResponse.channel.id;
  
  const postIMResponse = await Chat.postMessage({
      channel: imChannel,
      test: 'suh'
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('postIMResponse status', postIMResponse.ok, true);
  
  const imMarkResponse = await IM.mark({
      channel: imChannel,
      ts: postIMResponse.ts,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('imMarkResponse status', imMarkResponse.ok, true);
  
  const imRepliesResponse = await IM.replies({
      channel: imChannel,
      thread_ts: postIMResponse.ts,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('imRepliesResponse status', imRepliesResponse.ok, true);
  
  const imHistoryResponse = await IM.history({
      channel: imChannel,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('imHistoryResponse status', imHistoryResponse.ok, true);
  
  const imCloseResponse = await IM.close({
      channel: imChannel,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('imCloseResponse status', imCloseResponse.ok, true);
  
  const imListResponse = await IM.list({})
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('imListResponse status', imListResponse.ok, true);
};
