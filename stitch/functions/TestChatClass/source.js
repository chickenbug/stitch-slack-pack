/**
 * TestChat runs calls all ChatClass methods and sees if they work as expected.
 * It returns 0 on success and throws an error if there is a failure.
 *
*/

const testAuthToken = '';
const testChannel = '';
const testUserId = '';

const parseResponseBodyToObject = resp => EJSON.parse(resp.body.text());

exports = async function(){
  // setup 
  const testUtil = context.functions.execute('TestUtilClass');
  
  const ChatClass = context.functions.execute('ChatClass');
  const chat = new ChatClass();
  chat.setAuthToken(testAuthToken);
  
  const SearchClass = context.functions.execute('SearchClass');
  const search = new SearchClass();
  search.setAuthToken(testAuthToken);
  
  // postMessage
  const postMessageResponse = await chat.postMessage({
      channel: testChannel,
      text: 'slick',
    })
    .then(parseResponseBodyToObject);
  testUtil.assertEquals('postMessageResponse status', postMessageResponse.ok, true);
  
  // update
  const updateResponse = await chat.update({
      channel: testChannel,
      text: 'slack ya doof',
      ts: postMessageResponse.ts,
    })
    .then(parseResponseBodyToObject);
  testUtil.assertEquals('updateResponse status', updateResponse.ok, true);
  
  // getPermalink
  const getPermalinkResponse = await chat.getPermalink({
      channel: testChannel,
      message_ts: updateResponse.ts,
    })
    .then(parseResponseBodyToObject);
  testUtil.assertEquals('getPermalinkResponse status', getPermalinkResponse.ok, true);
  
  // deleteMessage
  const deleteMessageResponse = await chat.deleteMessage({
      channel: testChannel,
      ts: updateResponse.ts,    
    })
    .then(parseResponseBodyToObject);
  testUtil.assertEquals('deleteMessageResponse status',deleteMessageResponse.ok, true);
  
  // postEphemeral
  const postEphemeralResponse = await chat.postEphemeral({
      channel: testChannel,
      text: 'only you',
      user: testUserId,
    })
    .then(parseResponseBodyToObject);
  testUtil.assertEquals('postEphemeralResponse status', postEphemeralResponse.ok, true);
  
  
  // meMessage
  const meMessageResponse = await chat.meMessage({
      channel: testChannel,
      text: 'me message'
    })
    .then(parseResponseBodyToObject);
  testUtil.assertEquals('meMessageResponse status', meMessageResponse.ok, true);
  
  const deleteMeMessageResponse = await chat.deleteMessage({
      channel: testChannel,
      ts: meMessageResponse.ts,
    })
    .then(parseResponseBodyToObject);
  testUtil.assertEquals('deleteMeMessageResponse status', deleteMeMessageResponse.ok, true);
}
