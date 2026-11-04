// Compact signed API tokens: base64url(claims).base64url(signature).
import crypto from 'node:crypto';

const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'P-256' });

export function issueToken(claims) {
  const body = Buffer.from(JSON.stringify(claims)).toString('base64url');
  const sig = crypto.sign('sha256', Buffer.from(body), privateKey).toString('base64url');
  return `${body}.${sig}`;
}

export function verifyToken(token) {
  const [body, sig] = String(token).split('.');
  if (!body || !sig) return null;
  const ok = crypto.verify('sha256', Buffer.from(body), publicKey, Buffer.from(sig, 'base64url'));
  return ok ? JSON.parse(Buffer.from(body, 'base64url').toString()) : null;
}
