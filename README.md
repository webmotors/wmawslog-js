# wmawslog-js
A simple lib to send logs to AWS SQS from applications.

## How to use
```js
const log = require('@webmotors/wmawslog-js');

exports.handler = async (event, context) => {
    // configure
    log.init({ app: 'lambdaTest', env: 'prd', level: 'warn', queue: 'https://sqs.us-east-1.amazonaws.com/{{account_id}}/{{queue_name}}' });

    await log.info('Function started...');

    try {
     /**
      * code to be logged
      */
    } catch (err) {
        await log.error(err);
    }
};
```

## Log level hierarchy
|       | fatal | error | warn | info | debug | trace |
| ----- | ----- | ----- | ---- | ---- | ----- | ----- |
| fatal |   x   |   x   |  x   |   x  |   x   |   x   |
| error |       |   x   |  x   |   x  |   x   |   x   |
| warn  |       |       |  x   |   x  |   x   |   x   |
| info  |       |       |      |   x  |   x   |   x   |
| debug |       |       |      |      |   x   |   x   |
| trace |       |       |      |      |       |   x   |

### .init()
Required.

| Param | Name             | Description                | Options                                | Default | Required |
| ----- | ---------------- | -------------------------- | -------------------------------------- | ------- | -------- |
| app   | Application Name | Used for group logs        | n/a                                    | n/a     | true     |
| env   | Environment      | Used for group logs        | dev, hml, azl, prd                     | hml     | false    |
| level | Log Level        | Minimun level to be logged | fatal, error, warn, info, debug, trace | warn    | false    |
| queue | Queue url        | AWS SQS Queue url          | n/a                                    | n/a     | true     |

### .fatal(message)
Logs a fatal error.
Message is required (can be a string, object, error stack, etc...);

### .error(message)
Logs a error.
Message is required (can be a string, object, error stack, etc...);

### .warn(message)
Logs a warn.
Message is required (can be a string, object, error stack, etc...);

### .info(message)
Logs a info.
Message is required (can be a string, object, error stack, etc...);

### .debug(message)
Logs a debug.
Message is required (can be a string, object, error stack, etc...);

### .trace(message)
Logs a trace.
Message is required (can be a string, object, error stack, etc...);