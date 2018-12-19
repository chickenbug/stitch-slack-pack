// TestUtilClass returns the class definition for TestUtil so that it can be used in other functions.
// Since functions and classes can only be represented as BSON.Code in EJSON. This class cannot
// be returned to any client, including the Debug Console. 


// TestUtil contains utility methods needed for test functions
class TestUtil{
  static assertEquals(resourceName, received, expected) {
    if(expected !== received) {
      throw `Error comparing '${resourceName}': received '${received}; expected '${expected}'`;
    }
  }
  
  static parseResponseBodyToObject(resp) {
    return EJSON.parse(resp.body.text());
  }

}

exports = function(){
  return TestUtil;
};