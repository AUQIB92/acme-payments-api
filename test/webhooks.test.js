import test from 'node:test';
import assert from 'node:assert/strict';
import { createSigningKeys, signWebhook, verifyWebhook } from '../src/webhooks.js';

test('a signed webhook verifies', () => {
  const { privateKey, publicKey } = createSigningKeys();
  const payload = { event: 'payment.succeeded', id: 'pay_123', amount: 4200 };
  assert.equal(verifyWebhook(payload, signWebhook(payload, privateKey), publicKey), true);
});

test('a tampered webhook is rejected', () => {
  const { privateKey, publicKey } = createSigningKeys();
  const sig = signWebhook({ id: 'pay_123', amount: 4200 }, privateKey);
  assert.equal(verifyWebhook({ id: 'pay_123', amount: 9999 }, sig, publicKey), false);
});
