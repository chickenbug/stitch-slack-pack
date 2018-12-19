exports = async function(){
  const TestUtil = context.functions.execute('TestUtilClass');
  
  const testAuthToken = context.values.get('TestAuthToken');
  
  const SearchClass = context.functions.execute('SearchClass');
  const Search = new SearchClass();
  Search.setAuthToken(testAuthToken);
  
  const searchAllResponse = await Search.all({
      query: 'some gobblygook'
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('searchAllResponse status', searchAllResponse.ok, true);
  
  const searchFilesResponse = await Search.files({
      query: 'some flim fam'
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('searchFilesResponse status', searchAllResponse.ok, true);
  
  const searchMessagesResponse = await Search.messages({
      query: 'some muckety mack'
    })
    .then(TestUtil.parseResponseBodyToObject);
  TestUtil.assertEquals('searchMessagesResponse status', searchAllResponse.ok, true);
};