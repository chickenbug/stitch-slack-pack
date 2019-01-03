exports = async function(){
  const testAuthToken = context.values.get('TestAuthToken');
  const testChannel = context.values.get('TestChannel');
  const testBotId = context.values.get('TestBotId');
  
  const TestUtil = context.functions.execute('TestUtilClass');
  const ChatClass = context.functions.execute('ChatClass');
  const chat = new ChatClass();
  chat.setAuthToken(testAuthToken);
  
  const PinsClass = context.functions.execute('PinsClass');
  const Pins = new PinsClass();
  Pins.setAuthToken(testAuthToken);
  
  
  // Tests Begin
  const postMessageResponse = await chat.postMessage({
      channel: testChannel,
      text: 'pins and needles',
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('postMessageResponse status', postMessageResponse.ok, true);

  const pinsAddResponse = await Pins.add({
      channel: testChannel,
      options: {
        timestamp: postMessageResponse.ts,
      },
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('pinsAddResponse status', pinsAddResponse.ok, true);
  
  const pinsListResponse = await Pins.list({
      channel: testChannel,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('pinsListResponse status', pinsListResponse.ok, true);
  
  const pinsRemoveResponse = await Pins.remove({
      channel: testChannel,
      options: {
        timestamp: postMessageResponse.ts,
      },
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('pinsRemoveResponse status', pinsRemoveResponse.ok, true);
  
  // Clean Up
  const deleteMessageResponse = await chat.deleteMessage({
      channel: testChannel,
      ts: postMessageResponse.ts,    
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('deleteMessageResponse status',deleteMessageResponse.ok, true);
};
