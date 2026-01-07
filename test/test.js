import { test } from 'node:test';
import assert from 'node:assert';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import * as greetings from '../lib/greetings.js';

const execFilePromise = promisify(execFile);

test('select one option', () => {
  // normal case
  assert.ok(greetings.get('new'));

  // error check
  assert.strictEqual(greetings.get(), false);
  assert.strictEqual(greetings.get('all'), false);
  assert.strictEqual(greetings.get('help'), false);
  assert.strictEqual(greetings.get('l'), false);
  assert.strictEqual(greetings.get('hoge'), false);
  assert.strictEqual(greetings.replaceEx('hoge'), 'Cannot parse greeting file');
});

test('select multi options', () => {
  const opts = [
    'new',
    'last',
    'summer',
    'winter',
    'thx',
    'sorry',
    'all',
    'hoge',
  ];

  // error check
  assert.strictEqual(greetings.get(opts), false);
});

test('check greeting list', () => {
  const list = greetings.getGreetings();
  let list_length = 0;
  for (let key in list) {
    list_length++;
  }

  // error check
  assert.strictEqual(list_length, 7);
  assert.ok('a' in list);
  assert.ok('n' in list);
  assert.ok('s' in list);
  assert.ok('w' in list);
  assert.ok('t' in list);
  assert.ok('so' in list);
  assert.strictEqual('z' in list, false);
});

test('check dialect list', () => {
  const list = greetings.getDialects();

  // error check
  assert.strictEqual(list.length, 4);
  assert.ok(list.indexOf('kyoto') >= 0);
  assert.ok(list.indexOf('osaka') >= 0);
  assert.ok(list.indexOf('okinawa') >= 0);
  assert.ok(list.indexOf('hiroshima') >= 0);
  assert.strictEqual(list.indexOf('hokkaido') >= 0, false);
});

test('check language list', () => {
  const list = greetings.getLanguages();

  // error check
  assert.strictEqual(list.length, 2);
  assert.ok(list.indexOf('en') >= 0);
  assert.ok(list.indexOf('ch') >= 0);
  assert.strictEqual(list.indexOf('fr') >= 0, false);
});

test('check surround list', () => {
  const list = greetings.getSurrounds();

  // error check
  assert.strictEqual(list.length, 7);
  assert.ok(list.indexOf('no') >= 0);
  assert.ok(list.indexOf('w-star') >= 0);
  assert.ok(list.indexOf('b-star') >= 0);
  assert.ok(list.indexOf('asterisk') >= 0);
  assert.ok(list.indexOf('w-tri') >= 0);
  assert.ok(list.indexOf('b-tri') >= 0);
  assert.ok(list.indexOf('slash') >= 0);
  assert.strictEqual(list.indexOf('hoge') >= 0, false);
});

test('surround exist check', async () => {
  // error
  let result = await execFilePromise('./bin/jgr', ['last']);
  let stdout = result.stdout;
  assert.doesNotMatch(stdout, /#+/);

  // default (Japanese uses full-width hyphen)
  assert.match(stdout, /ー+/);

  // b-star
  result = await execFilePromise('./bin/jgr', ['-s', 'b-star', 'last']);
  stdout = result.stdout;
  assert.match(stdout, /★+/);

  // slash
  result = await execFilePromise('./bin/jgr', ['-s', 'slash', 'last']);
  stdout = result.stdout;
  assert.match(stdout, /\/￣/);

  // no surround
  result = await execFilePromise('./bin/jgr', ['-s', 'no', 'last']);
  stdout = result.stdout.split(/\r\n|\r|\n/)[1];
  assert.strictEqual(stdout, '　　　　　本');

  // null check
  result = await execFilePromise('./bin/jgr', ['-s', 'last']);
  stdout = result.stdout;
  assert.strictEqual(stdout, '');
});

test('dialect exist check', async () => {
  // okinawa
  let result = await execFilePromise('./bin/jgr', ['-d', 'okinawa', 'last']);
  let stdout = result.stdout.split(/\r\n|\r|\n/)[5];
  assert.strictEqual(stdout, '　ん　話で');

  // null check
  result = await execFilePromise('./bin/jgr', ['-d', 'last']);
  stdout = result.stdout;
  assert.strictEqual(stdout, '');
});

test('default hyphen changes based on language', async () => {
  // Japanese (default) - should use full-width hyphen (ー)
  let result = await execFilePromise('./bin/jgr', ['last']);
  let stdout = result.stdout;
  assert.match(stdout, /ー+/);
  assert.doesNotMatch(stdout, /^-+$/m);

  // English - should use half-width hyphen (-)
  result = await execFilePromise('./bin/jgr', ['-l', 'en', 'last']);
  stdout = result.stdout;
  assert.match(stdout, /-+/);
  assert.doesNotMatch(stdout, /ー+/);

  // Chinese - should use half-width hyphen (-)
  result = await execFilePromise('./bin/jgr', ['-l', 'ch', 'last']);
  stdout = result.stdout;
  assert.match(stdout, /-+/);
  assert.doesNotMatch(stdout, /ー+/);
});
