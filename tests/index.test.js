const log = require('../index');
const queue = process.env.queue || 'https://sqs.us-east-1.amazonaws.com/{{account_id}}/{{queue_name}}';

test('init() no app', () => {
  expect(log.init({})).toEqual({ err: true, message: 'invalid app' });
});

test('init() invalid env', () => {
  expect(log.init({ app: 'asd', env: 'asd' })).toEqual({ err: true, message: 'invalid env' });
});

test('init() invalid level', () => {
  expect(log.init({ app: 'asd', env: 'dev', level: 'asd', queue })).toEqual({ err: true, message: 'invalid level' });
});

test('init() no queue', () => {
  expect(log.init({ app: 'asd' })).toEqual({ err: true, message: 'invalid queue' });
});

test('init() successfully', () => {
  expect(log.init({ app: 'asd', env: 'hml', queue })).not.toBeDefined();
});

test('trace() error', async () => {
  const data = await log.trace('');
  expect(data).toStrictEqual({ err: true, message: 'invalid message' });
});

test('trace() success dev environment', async () => {
  log.init({ app: 'asd', env: 'dev', level: 'trace', queue });
  const data = await log.trace('test');
  expect(data).toStrictEqual({ err: false, message: 'dev environment' });
});

test('trace() success low level', async () => {
  log.init({ app: 'asd', env: 'hml', level: 'fatal', queue });
  const data = await log.trace('test');
  expect(data).toStrictEqual({ err: false, message: 'low level' });
});

test('debug() success low level', async () => {
  log.init({ app: 'asd', env: 'hml', level: 'fatal', queue });
  const data = await log.debug('test');
  expect(data).toStrictEqual({ err: false, message: 'low level' });
});

test('info() success low level', async () => {
  log.init({ app: 'asd', env: 'hml', level: 'fatal', queue });
  const data = await log.info('test');
  expect(data).toStrictEqual({ err: false, message: 'low level' });
});

test('warn() success low level', async () => {
  log.init({ app: 'asd', env: 'hml', level: 'fatal', queue });
  const data = await log.warn('test');
  expect(data).toStrictEqual({ err: false, message: 'low level' });
});

test('error() success low level', async () => {
  log.init({ app: 'asd', env: 'hml', level: 'fatal', queue });
  const data = await log.error('test');
  expect(data).toStrictEqual({ err: false, message: 'low level' });
});

test('fatal() error', async () => {
  const data = await log.fatal('');
  expect(data).toStrictEqual({ err: true, message: 'invalid message' });
});

test('fatal() success', async () => {
  await expect(log.fatal({ a: 'asd' })).rejects.toThrow();
});

test('fatal() success', async () => {
  await expect(log.fatal({})).rejects.toThrow();
});
