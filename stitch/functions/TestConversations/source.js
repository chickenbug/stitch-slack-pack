exports = async function(){
  const testAuthToken = context.values.get('TestAuthToken');
  const testBotId = context.values.get('TestBotId');
  
  const TestUtil = context.functions.execute('TestUtilClass');
  
  const ConversationsClass = context.functions.execute('ConversationsClass');
  const Conversations = new ConversationsClass();
  Conversations.setAuthToken(testAuthToken);
  
  
  // Tests Begin
  const channelName = BSON.ObjectId().toString().slice(3);
  const conversationsCreateResponse = await Conversations.create({
      name: channelName,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsCreateResponse status', conversationsCreateResponse.ok, true);
  
  const channelId = conversationsCreateResponse.channel.id;
  
  const conversationsHistoryResonse = await Conversations.history({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsHistoryResonse status', conversationsHistoryResonse.ok, true);
  
  const conversationsInfoResponse = await Conversations.info({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsInfoResponse status', conversationsInfoResponse.ok, true);
  
  
  const conversationsSetPurposeResponse = await Conversations.setPurpose({
      channel: channelId,
      purpose: 'what we are about',
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsSetPurposeResponse status', conversationsSetPurposeResponse.ok, true);
  
  const conversationsSetTopicResponse = await Conversations.setTopic({
      channel: channelId,
      topic: "tops are pretty great",
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsSetTopicResponse status', conversationsSetTopicResponse.ok, true);
  
  const newChannelName = BSON.ObjectId().toString().slice(3);;
  const conversationsRenameResponse = await Conversations.rename({
      channel: channelId,
      name: newChannelName,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsRenameResponse status', conversationsRenameResponse.ok, true);
  
  //TODO: add conversationsReplies test after I can create threads
  
  const conversationsLeaveResponse = await Conversations.leave({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsLeaveResponse status', conversationsLeaveResponse.ok, true);
  
  const conversationsJoinResponse = await Conversations.join({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsJoinResponse status', conversationsJoinResponse.ok, true);
  
  const conversationsInviteResponse = await Conversations.invite({
      channel: channelId,
      users: testBotId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsInviteResponse status', conversationsInviteResponse.ok, true);
  
  const conversationsKickResponse = await Conversations.kick({
      channel: channelId,
      user: testBotId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsKickResponse status', conversationsKickResponse.ok, true);
  
  const conversationsMembersResponse = await Conversations.members({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsMembersResponse status', conversationsMembersResponse.ok, true);
  
  const conversationsArchiveRespose = await Conversations.archive({
      channel: channelId
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsArchiveRespose status', conversationsArchiveRespose.ok, true);
  
  const conversationsUnarchiveResponse = await Conversations.unarchive({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsUnarchiveResponse status', conversationsUnarchiveResponse.ok, true);
  
  // clean up tests using created converstion by attempting to archive
  Conversations.archive({ channel: channelId })
  
  const conversationsListResponse = await Conversations.list({})
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationsListResponse status', conversationsListResponse.ok, true);
  
  // Private message methods
  const conversationOpenResponse = await Conversations.open({
      options: { users: testBotId },
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationOpenResponse status', conversationOpenResponse.ok, true);
  
  const privateMessageId = conversationOpenResponse.channel.id;
  const conversationCloseResponse = await Conversations.close({
      channel: privateMessageId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('conversationCloseResponse status', conversationCloseResponse.ok, true);
  
};