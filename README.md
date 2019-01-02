# stitch-slack-pack
This is a proof of concept for importable, continiously tested [Slack WebAPI](https://api.slack.com/web) integration for for MongoDB Stitch apps made using only Stitch entities.

## Usage Instructions
To use, import all functions except those that start with `Test` into your stitch application using `stitch-cli` with `--stategy=merge`. You will also need to have a [http](https://docs.mongodb.com/stitch/services/http/) service set up in order for them to work properly. 

For more information on the stitch cli see [here](https://docs.mongodb.com/stitch/import-export/stitch-cli-reference). 

Once set up, you can use the integration inside other stitch functions as follows:
```javascript
const SlackClass = context.functions.execute('SlackClass');
const slack = new SlackClass();
slack.Chat.postMessage(...);
```

## Testing
Testing is done by running API requests against the Slack API for a test workspace. Tests are run after every push and current test status can be seen [here]https://slack-pack-caalv.mongodbstitch.com)

## Implementation
The key components for the Slack integration are several Stitch private functions that return classes that can send requests the Slack Web API. 
The functions to note are:
* SlackClass
* ChatClass
* SearchCLass
* UtilClass


The key components for the continuous integration are:
* A github webhook called `runTests` that runs tests after every push and updates an atlas collection with the result
* A simple static hosting page that displays the results of the test
