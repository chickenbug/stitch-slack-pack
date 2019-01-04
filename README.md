# stitch-slack-pack
This is a proof of concept for importable, continuously tested [Slack WebAPI](https://api.slack.com/web) integration for for MongoDB Stitch apps made using only Stitch entities.

## Usage Instructions
To use, import all functions that end with `Class` and the `slack_http` service into your stitch application using `stitch-cli` with `--stategy=merge`.

For more information on the stitch cli see [here](https://docs.mongodb.com/stitch/import-export/stitch-cli-reference). 

Once set up, you can use the integration inside other stitch functions as follows:
```javascript
const SlackClass = context.functions.execute('SlackClass');
const slack = new SlackClass();
slack.Chat.postMessage(...);
```

## Testing
Testing is done by running API requests against the Slack API for a test workspace. Tests are run after every push and current test status can be seen [here](https://slack-pack-caalv.mongodbstitch.com).

## Implementation
The key components for the Slack integration are several Stitch private functions that return classes that can send http requests the Slack Web API. 
The functions to note are:
* SlackClass
* ChatClass
* SearchCLass
* ChannelsClass
* ConversationsClass
* PinsClass
* RemindersClass
* IMClass
* GroupsClass
* UtilClass

`SlackClass` contains all classes, however if needed the individual classes can also be used modularly.

The key components for the continuous integration are:
* A github webhook called `runTests` that runs tests after every push and updates an atlas collection with the result
* A simple static hosting page that displays the results of the test
