# stitch-slack-pack
This is a proof of concept for importable, continiously tested slack integration for for MongoDB Stitch apps made using only Stitch entities.

## Usage Instructions
To use, import all functions except those that start with `Test` into your stitch application using `stitch-cli` with `--stategy=merge`. You will also need to have a [http](https://docs.mongodb.com/stitch/services/http/) service set up in order for them to work properly. 

For more information on the stitch cli see [here](https://docs.mongodb.com/stitch/import-export/stitch-cli-reference). 

Once set up you can use the integration inside other stitch functions as follows:
```javascript
const SlackClass = context.functions.execute('SlackClass');
const slack = new SlackClass();
slack.Chat.postMessage(...);
```
## Implementation
The key components for the Slack integration are several Stitch private functions that return classes that can send requests the Slack Web API. 
The functions to note are:
* SlackClass
* ChatClass
* SearchCLass
* UtilClass


The key components for the continuous integration are:
* A github webhook called `testRunner` that runs tests after every push and updates an atlas collection with the result
* A simple static hosting page that displays the results of the test
