exports = async function(){
  const testAuthToken = context.values.get('TestAuthToken');
  const testBotId = context.values.get('TestBotId');
  
  const TestUtil = context.functions.execute('TestUtilClass');
  const ChatClass = context.functions.execute('ChatClass');
  const Chat = new ChatClass();
  Chat.setAuthToken(testAuthToken);
  
  const GroupsClass = context.functions.execute('GroupsClass');
  const Groups = new GroupsClass();
  Groups.setAuthToken(testAuthToken);
  
  
  // Tests Begin
  const channelName = BSON.ObjectId().toString().slice(3);
  const groupsCreateResponse = await Groups.create({
      name: channelName,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('groupsCreateResponse status', groupsCreateResponse.ok, true);
  
  const channelId = groupsCreateResponse.group.id;
  
  const groupsHistoryResonse = await Groups.history({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('groupsHistoryResonse status', groupsHistoryResonse.ok, true);
  
  const groupsSetPurposeResponse = await Groups.setPurpose({
      channel: channelId,
      purpose: 'getting good',
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('groupsSetPurposeResponse status', groupsSetPurposeResponse.ok, true);
  
  const groupsSetTopicResponse = await Groups.setTopic({
      channel: channelId,
      topic: "group topic oooh rah",
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('groupsSetTopicResponse status', groupsSetTopicResponse.ok, true);
  
  const newChannelName = BSON.ObjectId().toString().slice(3);;
  const groupsRenameResponse = await Groups.rename({
      channel: channelId,
      name: newChannelName,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('groupsRenameResponse status', groupsRenameResponse.ok, true);
  
  const postGroupResponse = await Chat.postMessage({
      channel: channelId,
      test: 'suh'
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('postGroupResponse status', postGroupResponse.ok, true);
  
  const groupsMarkResponse = await Groups.mark({
      channel: channelId,
      ts: postGroupResponse.ts,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('groupsMarkResponse status', groupsMarkResponse.ok, true);
  
  const groupsRepliesResponse = await Groups.replies({
      channel: channelId,
      thread_ts: postGroupResponse.ts,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('groupsRepliesResponse status', groupsRepliesResponse.ok, true);
  
  const groupsOpenResponse = await Groups.open({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('groupsOpenResponse status', groupsOpenResponse.ok, true);
  
  const groupsInviteResponse = await Groups.invite({
      channel: channelId,
      user: testBotId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('groupsInviteResponse status', groupsInviteResponse.ok, true);
  
  const groupsKickResponse = await Groups.kick({
      channel: channelId,
      user: testBotId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('groupsKickResponse status', groupsKickResponse.ok, true);
  
  const groupsArchiveRespose = await Groups.archive({
      channel: channelId
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('groupsArchiveRespose status', groupsArchiveRespose.ok, true);
  
  const groupsUnarchiveResponse = await Groups.unarchive({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('groupsUnarchiveResponse status', groupsUnarchiveResponse.ok, true);
  
  const groupsCreateChildResponse = await Groups.createChild({
      channel: channelId,
    }).then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('groupsCreateChildResponse status', groupsCreateChildResponse.ok, true);
  
  // clean up tests using created converstion by attempting to archive
  Groups.archive({ channel: groupsCreateChildResponse.group.id })
  
  // TODO: test Groups.leave method
};
