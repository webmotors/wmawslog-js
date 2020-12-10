/* eslint-disable import/no-extraneous-dependencies */
const AWS = require('aws-sdk');

const sqs = new AWS.SQS({ apiVersion: '2012-11-05', region: 'us-east-1' });

let App = '';
let Level = 'warn';
let Env = 'hml';
let Queue = '';

const levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];
const envs = ['dev', 'hml', 'azl', 'prd'];

const checkConst = (arg) => (arg[0].indexOf(arg[1]) !== -1);
const messageCleaner = (arg) => {
  let msg = arg;
  if (typeof msg === 'object') {
    if (JSON.stringify(msg) === '{}') {
      msg = JSON.stringify(msg, Object.getOwnPropertyNames(msg));
    }
  }

  return msg;
};

const logger = async (args) => {
  const newArgs = args;

  newArgs.timestamp = new Date().getTime();

  if (!newArgs.message) return { err: true, message: 'invalid message' };
  newArgs.message = messageCleaner(newArgs.message);

  if (levels.indexOf(newArgs.level) <= levels.indexOf(Level) && Env !== 'dev') {
    const params = {
      MessageBody: JSON.stringify({
        app: App,
        level: newArgs.level,
        message: newArgs.message,
        env: Env,
        timestamp: newArgs.timestamp,
      }),
      QueueUrl: Queue,
    };

    return { err: false, message: await sqs.sendMessage(params).promise() };
  }

  if (Env === 'dev') {
    // eslint-disable-next-line no-console
    console.log(newArgs.timestamp, newArgs.message);
    return { err: false, message: 'dev environment' };
  }

  return { err: false, message: 'low level' };
};

const init = (args) => {
  if (!args.app) return ({ err: true, message: 'invalid app' });
  App = args.app;

  if (args.env) {
    args.env = args.env.toLowerCase();
    if (!checkConst([envs, args.env])) return ({ err: true, message: 'invalid env' });
    Env = args.env;
  }

  if (args.level) {
    const newLevel = args.level.toLowerCase();
    if (checkConst([levels, newLevel])) {
      Level = newLevel;
    } else {
      return ({ err: true, message: 'invalid level' });
    }
  }

  if (!args.queue) return ({ err: true, message: 'invalid queue' });

  Queue = args.queue;
};

module.exports = {
  init: (args) => init(args),
  fatal: (e) => logger({ message: e, level: 'fatal' }),
  error: (e) => logger({ message: e, level: 'error' }),
  warn: (e) => logger({ message: e, level: 'warn' }),
  info: (e) => logger({ message: e, level: 'info' }),
  debug: (e) => logger({ message: e, level: 'debug' }),
  trace: (e) => logger({ message: e, level: 'trace' }),
};
