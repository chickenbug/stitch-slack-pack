
exports = function() {
  const atlasCluster = context.services.get('cluster');
  const testingCollection = atlasCluster.db('stitch-slack-pack').collection('testing');
  const testsLastRunCollection = atlasCluster.db('stitch-slack-pack').collection('testsLastRun');
  let allTestsPass = true;
  
  const runTestAndPostResults = testName => {
    console.log(`Running ${testName}`);
    context.functions.execute(testName).then(() => {
      testingCollection.updateOne(
        { name: testName },
        { '$set': { error: '' } },
        {upsert: true},
      );
      console.log(`${testName} succeded`);
    }).catch(testError => {
      testingCollection.updateOne(
        { name: testName },
        { '$set': { error: testError } },
        {upsert: true},
      );
      console.warn(`  Error for ${testName}: ${testError}`);
      allTestsPass = false;
    });
  };
  
  runTestAndPostResults('TestChat');
  runTestAndPostResults('TestSearch');
  runTestAndPostResults('TestSlack');
  runTestAndPostResults('TestChannels');
  runTestAndPostResults('TestConversations');
  runTestAndPostResults('TestPins');
  runTestAndPostResults('TestReminders');
  runTestAndPostResults('TestIM');
  runTestAndPostResults('TestGroups');

  
  testsLastRunCollection.updateOne(
    { lastRun: { '$exists': true } },
    { '$set': { lastRun: Date.now() } },
    {upsert: true},
  ).catch(console.error);
};