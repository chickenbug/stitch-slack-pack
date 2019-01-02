exports = async function(){
  const testAuthToken = context.values.get('TestAuthToken');
  const testUserId = context.values.get('TestUserId');
  const testBotId = context.values.get('TestBotId');
  
  const TestUtil = context.functions.execute('TestUtilClass');
  
  const ChannelsClass = context.functions.execute('ChannelsClass');
  const Channels = new ChannelsClass();
  Channels.setAuthToken(testAuthToken);
  
  const channelName = BSON.ObjectId().toString().slice(0,-3);
  const channelsCreateResponse = await Channels.create({
      name: channelName,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('channelsCreateResponse status', channelsCreateResponse.ok, true);
  
  const channelId = channelsCreateResponse.channel.id;
  
  const channelsHistoryResonse = await Channels.history({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('channelsHistoryResonse status', channelsHistoryResonse.ok, true);
  
  const channelsInfoResponse = await Channels.info({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('channelsInfoResponse status', channelsInfoResponse.ok, true);
  
  
  const channelsSetPurposeResponse = await Channels.setPurpose({
      channel: channelId,
      purpose: 'what we are about',
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('channelsSetPurposeResponse status', channelsSetPurposeResponse.ok, true);
  
  const channelsSetTopicResponse = await Channels.setTopic({
      channel: channelId,
      topic: "tops are pretty great",
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('channelsSetTopicResponse status', channelsSetTopicResponse.ok, true);
  
  const newChannelName = BSON.ObjectId().toString().slice(0,-3);
  const channelsRenameResponse = await Channels.rename({
      channel: channelId,
      name: newChannelName,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('channelsSetTopicResponse status', channelsSetTopicResponse.ok, true);
  
  //TODO: add channelReplies and channelMark test after I can create threads
  
  const channelsLeaveResponse = await Channels.leave({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('channelsLeaveResponse status', channelsLeaveResponse.ok, true);
  
  const channelsJoinResponse = await Channels.join({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('channelsJoinResponse status', channelsJoinResponse.ok, true);
  
  const channelsInviteResponse = await Channels.invite({
      channel: channelId,
      user: testBotId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('channelsInviteResponse status', channelsInviteResponse.ok, true);
  
  const channelsKickResponse = await Channels.kick({
      channel: channelId,
      user: testBotId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('channelsKickResponse status', channelsKickResponse.ok, true);
  
  const channelsArchiveRespose = await Channels.archive({
      channel: channelId
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('channelsArchiveRespose status', channelsArchiveRespose.ok, true);
  
  const channelsUnarchiveResponse = await Channels.unarchive({
      channel: channelId,
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('channelsUnarchiveResponse status', channelsUnarchiveResponse.ok, true);
  
  // clean up test channel by attempting to archive
  Channels.archive({ channel: channelId })
  
};
