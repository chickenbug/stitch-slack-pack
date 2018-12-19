exports = async function(){
  const TestUtil = context.functions.execute('TestUtilClass');
  
  const SlackClass = context.functions.execute('SlackClass');
  const Slack = new SlackClass();
  
  const testAuthToken = context.values.get('TestAuthToken');
  Slack.setAuthToken(testAuthToken);
  
  const apiTestResponse = await Slack.apiTest({
      body: { foo: 'bar' }
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('apiTestResponse status', apiTestResponse.ok, true);
};
