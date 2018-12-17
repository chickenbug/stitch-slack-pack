// TestUtilClass returns the class definition for TestUtil so that it can be used in other functions.
// Since functions and classes can only be represented as BSON.Code in EJSON. This class cannot
// be returned to any client, including the Debug Console. 


// TestUtil contains utility methods needed for test functions
class TestUtil{
  static assertEquals(expected, received) {
    if(expected !== received) {
      throw `Error: expected '${expected}'; received '${received}'`;
    }
  }
}

exports = function(){
  return TestUtil;
};