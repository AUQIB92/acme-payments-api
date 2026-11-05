// Signing keys for outbound webhooks.
import crypto from 'node:crypto';

export function createSigningKeys() {
  return crypto.generateKeyPairSync('ml-dsa-65');
}
