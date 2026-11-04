// Signs webhook payloads so merchants can verify they came from us.
import crypto from 'node:crypto';
import { createSigningKeys } from './keystore.js';

export { createSigningKeys };

export function signWebhook(payload, privateKey) {
  const data = Buffer.from(JSON.stringify(payload));
  return crypto.sign(null, data, privateKey).toString('base64');
}

export function verifyWebhook(payload, signature, publicKey) {
  const data = Buffer.from(JSON.stringify(payload));
  const sigBuf = Buffer.from(signature, 'base64');
  return crypto.verify(null, data, publicKey, sigBuf);
}
