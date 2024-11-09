const EC = require("elliptic").ec;
const secp256k1 = require("secp256k1");
const ec = new EC("secp256k1");
const signatureVerifier = require("./signatureVerifier");

const keyPair = ec.genKeyPair();
const publicKey = keyPair.getPublic("hex");

const messageHash =
  "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890";

const signature = keyPair.sign(messageHash);

const isValidEcdsa = signatureVerifier(
  publicKey,
  signature,
  messageHash,
  "ecdsa"
);
console.log("Is the ECDSA signature valid?", isValidEcdsa);

const schnorrPrivateKey = Buffer.alloc(32, 0);
schnorrPrivateKey[31] = 1;

const schnorrPublicKey = secp256k1.publicKeyCreate(schnorrPrivateKey);

const hashBuffer = Buffer.from(messageHash, "hex");
const { signature: schnorrSignature } = secp256k1.ecdsaSign(
  hashBuffer,
  schnorrPrivateKey
);

const isValidSchnorr = signatureVerifier(
  schnorrPublicKey,
  schnorrSignature,
  messageHash,
  "schnorr"
);
console.log("Is the Schnorr-like signature valid?", isValidSchnorr);
