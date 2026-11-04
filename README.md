# acme-payments-api (demo)

A tiny, **intentionally quantum-vulnerable** payments service, used to
demonstrate an end-to-end post-quantum cryptography (PQC) migration.

| File | Classical crypto | Quantum-safe target |
|---|---|---|
| `src/keystore.js` + `src/webhooks.js` | RSA-2048 / RSA-SHA256 webhook signatures (two files that depend on each other) | ML-DSA-65 |
| `src/tokens.js` | ECDSA P-256 API tokens | ML-DSA-65 |
| `src/receipts.js` | MD5 fingerprints | SHA-256 |

The tests check behaviour (sign → verify, tampering is rejected, fingerprints
are stable), so a correct migration keeps them green. One test hard-codes the
MD5 digest length and has to be updated as part of the migration.

```sh
npm test   # Node 24+, no dependencies
```

Not real software: do not use this code for anything.
