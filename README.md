# Signature Verification

## Overview

This repository, **charter-21BCE0433**, contains a **Signature Verification** solution for blockchain transactions. It supports **ECDSA** and **Schnorr-like** signatures using Merkle proofs, providing a robust mechanism to verify the validity of blockchain transaction signatures.

### Key Features

- **Supports Multiple Signature Schemes**: Implements verification for **ECDSA** and **Schnorr-like** signatures.
- **Efficient Verification**: Validates the authenticity of a given signature against the corresponding public key and message hash.
- **Extensible Design**: Can be easily extended to include additional cryptographic signature schemes.

## Directory Structure

- **`package.json`**: Contains dependencies for the project.
- **`signatureVerifier.js`**: Implements the core logic for signature verification.
- **`testSignature.js`**: Script to test the functionality of the signature verification system.
- **`README.md`**: Comprehensive documentation for the project.

## Prerequisites

- **Node.js** (v14 or higher is recommended)
- **npm** (Node Package Manager)

## Installation

To get started, follow these steps to clone the repository and install the necessary dependencies.

1. **Clone the Repository**

   Begin by cloning the repository to your local machine:

   ```bash
   git clone <YOUR_REPOSITORY_URL>
   ```

2. **Navigate to the Project Directory**

   Change your current directory to the project folder:

   ```bash
   cd charter-21BCE0433
   ```

3. **Install Dependencies**

   Use npm to install all the required dependencies:

   ```bash
   npm install
   ```

   This will install libraries like:

   - **elliptic**: For operations related to **ECDSA** signatures.
   - **secp256k1**: To manage **Schnorr-like** signature verification.

## Usage Instructions

The project includes scripts that demonstrate how to verify **ECDSA** and **Schnorr-like** signatures.

### Running the Signature Verification Script

To verify the signatures, run the **`testSignature.js`** script:

```bash
node testSignature.js
```

The script will:

1. Generate an ECDSA key pair.
2. Create a message hash and sign it using **ECDSA**.
3. Generate a Schnorr-like key pair.
4. Sign and verify the message hash using the Schnorr-like method.

### Expected Output

After running the script, you should see output similar to:

```
Is the ECDSA signature valid? true
Is the Schnorr-like signature valid? true
```

This indicates that both **ECDSA** and **Schnorr-like** signatures have been successfully verified.

## Testing

The **`testSignature.js`** script is used to run various test cases to ensure that the implementation works correctly.

### Navigate to the Project Directory:

```bash
cd charter-21BCE0433
```

### Run the Test Script:

```bash
node testSignature.js
```

### Edge Case Testing

The script also includes tests for various edge cases:

- **Invalid Signatures**: Verifying a transaction using an invalid signature should return `false`.
- **Wrong Public Key**: Using the wrong public key should also result in a `false` validation result.

Example of an edge case test:

```javascript
const invalidSignature = Buffer.alloc(64, 1); // Generate an invalid signature
const isInvalidSchnorr = signatureVerifier(
  schnorrPublicKey,
  invalidSignature,
  messageHash,
  "schnorr"
);
console.log("Is the invalid Schnorr-like signature valid?", isInvalidSchnorr);

const wrongPublicKey = secp256k1.publicKeyCreate(Buffer.alloc(32, 2)); // Generate a different public key
const isWrongKeyValid = signatureVerifier(
  wrongPublicKey,
  schnorrSignature,
  messageHash,
  "schnorr"
);
console.log(
  "Is the Schnorr-like signature valid with the wrong public key?",
  isWrongKeyValid
);
```

### Expected output for invalid cases:

```
Is the invalid Schnorr-like signature valid? false
Is the Schnorr-like signature valid with the wrong public key? false
```

## File Descriptions

### `signatureVerifier.js`

- Implements the core logic for verifying **ECDSA** and **Schnorr-like** signatures.
- The function **`signatureVerifier()`** accepts the following parameters:
  - **signerAddress**: The public key of the signer.
  - **signature**: The signature generated from the signed message.
  - **signedHash**: The hash of the message.
  - **schemeType**: Type of signature scheme (`"ecdsa"` or `"schnorr"`).

### `testSignature.js`

- Script to test the functionality of **signatureVerifier.js**.
- Generates key pairs, signs messages, and runs verification tests to ensure everything works properly.

## Example Code Usage

Here is a quick example demonstrating how to use the `signatureVerifier()` function:

```javascript
const signatureVerifier = require("./signatureVerifier");

// Example data
const schemeType = "ecdsa";
const signerAddress = "your_public_key_here_in_hex_format";
const signature = "signature_here_in_hex_format";
const signedHash = "hash_of_the_message_here_in_hex_format";

// Running verification
const isValid = signatureVerifier(
  signerAddress,
  signature,
  signedHash,
  schemeType
);
console.log("Is the signature valid?", isValid);
```

## Dependencies

This project depends on the following libraries:

- **elliptic**: Used for **ECDSA** signature operations.
- **secp256k1**: Used for handling **Schnorr-like** signatures.

To install all dependencies, run:

```bash
npm install
```

## Contributing

Contributions to this project are welcome! If you would like to contribute, please follow these steps:

1. **Fork the repository**.
2. **Create a branch** for your feature (`git checkout -b feature/YourFeature`).
3. **Commit your changes** (`git commit -m 'Add new feature'`).
4. **Push to the branch** (`git push origin feature/YourFeature`).
5. **Create a pull request**.

Please ensure that your code is well-tested and follows the project’s coding standards.

## Contact

For any questions, concerns, or suggestions, feel free to reach out:

- **Email**: sachin.jakhar2011@gmail.com
- **GitHub**: [sachin3104](https://github.com/sachin3104)

---
