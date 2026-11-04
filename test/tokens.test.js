import test from 'node:test';
import assert from 'node:assert/strict';
import { issueToken, verifyToken } from '../src/tokens.js';

test('issued tokens verify and return their claims', () => {
  assert.deepEqual(verifyToken(issueToken({ sub: 'merchant_42', scope: 'payments:write' })), { sub: 'merchant_42', scope: 'payments:write' });
});

test('forged or malformed tokens are rejected', () => {
  const [, sig] = issueToken({ sub: 'merchant_42' }).split('.');
  const forged = `${Buffer.from(JSON.stringify({ sub: 'admin' })).toString('base64url')}.${sig}`;
  assert.equal(verifyToken(forged), null);
  assert.equal(verifyToken('garbage'), null);
});
