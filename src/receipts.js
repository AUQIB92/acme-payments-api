// Receipt fingerprints used for de-duplication and ETags.
import crypto from 'node:crypto';

export function receiptFingerprint(receipt) {
  return crypto.createHash('md5').update(JSON.stringify(receipt)).digest('hex');
}
