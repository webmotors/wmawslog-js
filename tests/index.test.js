const log = require('../index');

test('init() no app', () => {
  expect(log.init({})).toEqual({ err: true, message: 'invalid app' });
});

test('init() invalid env', () => {
  expect(log.init({ app: 'asd', env: 'asd' })).toEqual({ err: true, message: 'invalid env' });
});

test('init() no context', () => {
  expect(log.init({ app: 'asd' })).toEqual({ err: true, message: 'invalid context' });
});

test('init() invalid context', () => {
  expect(log.init({ app: 'asd', env: 'hml', level: 'asd', context: {} })).toEqual({ err: true, message: 'invalid context' });
});

test('init() successfully', () => {
  expect(log.init({ app: 'asd', env: 'hml', context: { invokedFunctionArn: 'arn::::123' } })).not.toBeDefined();
});

test('trace() error', async () => {
  const data = await log.trace('');
  expect(data).toStrictEqual({ err: true, message: 'invalid message' });
});

test('trace() success low level', async () => {
  log.init({ app: 'asd', env: 'hml', level: 'fatal', context: { invokedFunctionArn: 'arn::::123' } });
  const data = await log.trace('test');
  expect(data).toStrictEqual({ err: false, message: 'low level' });
});

test('debug() success low level', async () => {
  log.init({ app: 'asd', env: 'hml', level: 'fatal', context: { invokedFunctionArn: 'arn::::123' } });
  const data = await log.debug('test');
  expect(data).toStrictEqual({ err: false, message: 'low level' });
});

test('info() success low level', async () => {
  log.init({ app: 'asd', env: 'hml', level: 'fatal', context: { invokedFunctionArn: 'arn::::123' } });
  const data = await log.info('test');
  expect(data).toStrictEqual({ err: false, message: 'low level' });
});

test('warn() success low level', async () => {
  log.init({ app: 'asd', env: 'hml', level: 'fatal', context: { invokedFunctionArn: 'arn::::123' } });
  const data = await log.warn('test');
  expect(data).toStrictEqual({ err: false, message: 'low level' });
});

test('error() success low level', async () => {
  log.init({ app: 'asd', env: 'hml', level: 'fatal', context: { invokedFunctionArn: 'arn::::123' } });
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
