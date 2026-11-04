// Signs webhook payloads so merchants can verify they came from us.
import crypto from 'node:crypto';
import { createSigningKeys } from './keystore.js';

export { createSigningKeys };

export function signWebhook(payload, privateKey) {
  return crypto.createSign('RSA-SHA256').update(JSON.stringify(payload)).sign(privateKey, 'base64');
}

export function verifyWebhook(payload, signature, publicKey) {
  return crypto.createVerify('RSA-SHA256').update(JSON.stringify(payload)).verify(publicKey, signature, 'base64');
}
