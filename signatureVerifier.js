const EC = require("elliptic").ec;
const secp256k1 = require("secp256k1");

const ec = new EC("secp256k1");

function signatureVerifier(signerAddress, signature, signedHash, schemeType) {
  if (schemeType === "ecdsa") {
    return verifyEcdsaSignature(signerAddress, signature, signedHash);
  } else if (schemeType === "schnorr") {
    return verifySchnorrSignature(signerAddress, signature, signedHash);
  } else {
    throw new Error("Unsupported signature scheme type");
  }
}

function verifyEcdsaSignature(signerAddress, signature, signedHash) {
  try {
    const key = ec.keyFromPublic(signerAddress, "hex");
    const valid = key.verify(signedHash, signature);
    return valid;
  } catch (error) {
    console.error("Error verifying ECDSA signature:", error);
    return false;
  }
}

function verifySchnorrSignature(signerAddress, signature, signedHash) {
  try {
    const hashBuffer = Buffer.from(signedHash, "hex");

    if (
      !(signerAddress instanceof Uint8Array) ||
      (signerAddress.length !== 33 && signerAddress.length !== 65)
    ) {
      throw new Error(
        "Expected public key to be an Uint8Array with length [33, 65]"
      );
    }

    const valid = secp256k1.ecdsaVerify(signature, hashBuffer, signerAddress);
    return valid;
  } catch (error) {
    console.error("Error verifying Schnorr-like signature:", error);
    return false;
  }
}

module.exports = signatureVerifier;
