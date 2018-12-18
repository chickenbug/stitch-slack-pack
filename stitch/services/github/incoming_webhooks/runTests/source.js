exports = function() {
  const atlasCluster = context.services.get('cluster');
  const collection = atlasCluster.db('stitch-slack-pack').collection('testing');
  
  const chatClassTestName = 'TestChatClass';
  console.log(`Running ${chatClassTestName}`);
  context.functions.execute(chatClassTestName).then(() => {
    collection.updateOne(
      { name: chatClassTestName },
      { '$set': { error: '' } },
      {upsert: true},
    );
    console.log(`${chatClassTestName} succeded`);
  }).catch(testChatError => {
    console.warn(`  Error for ${chatClassTestName}: ${testChatError}`);
    collection.updateOne(
      { name: chatClassTestName },
      { '$set': { error: testChatError } },
      {upsert: true},
    );
  });
};