

exports = function() {
  const atlasCluster = context.services.get('cluster');
  const collection = atlasCluster.db('stitch-slack-pack').collection('testing');
  let allTestsPass = true
  
  const runTestAndPostResults = testName => {
    console.log(`Running ${testName}`);
    context.functions.execute(testName).then(() => {
      collection.updateOne(
        { name: testName },
        { '$set': { error: '' } },
        {upsert: true},
      );
      console.log(`${testName} succeded`);
    }).catch(testError => {
      collection.updateOne(
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
  runTestAndPostResults('TestSlack')
};