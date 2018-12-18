# stitch-slack-pack
This is a proof of concept for an easily importable, continiously tested slack integration for for MongDB Stitch apps made using only Stitch Entities.

## Usage Instructions
To use, import functions not prefixed with `Test` into your stitch application using `stitch-cli` with `--stategy=merge`. For more information on the stitch cli see [here](https://docs.mongodb.com/stitch/import-export/stitch-cli-reference). You will also need to have a [http](https://docs.mongodb.com/stitch/services/http/) service set up in order for them to work properly.

Once set up you can use the integration inside other functions as follows:
```javascript
const SlackClass = context.functions.execute('SlackClass');
const slack = new SlackClass();
slack.Chat.postMessage(...);
```