import test from 'node:test';
import assert from 'node:assert/strict';
import { receiptFingerprint } from '../src/receipts.js';

test('fingerprints are stable and hex', () => {
  const r = { id: 'rcpt_1', total: 4200 };
  assert.equal(receiptFingerprint(r), receiptFingerprint({ ...r }));
  assert.match(receiptFingerprint(r), /^[0-9a-f]{32}$/);
});

test('different receipts get different fingerprints', () => {
  assert.notEqual(receiptFingerprint({ id: 'a' }), receiptFingerprint({ id: 'b' }));
});
