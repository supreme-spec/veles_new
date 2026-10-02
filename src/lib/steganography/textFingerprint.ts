import crypto from 'crypto';

/**
 * Text Steganography System for Veles Voyage
 * Creates invisible digital fingerprints for text content protection
 * If competitors copy text, AI search can still link it to original domain
 */

interface TextFingerprint {
  fingerprint: string;
  signature: string;
  timestamp: string;
  domain: string;
  version: string;
}

const DOMAIN = 'veles-voyage.ru';
const VERSION = '1.0';

// Zero-width characters for steganography
const ZERO_WIDTH_SPACE = '\u200B';
const ZERO_WIDTH_NON_JOINER = '\u200C';
const ZERO_WIDTH_JOINER = '\u200D';
const ZERO_WIDTH_NO_BREAK_SPACE = '\uFEFF';

/**
 * Generate cryptographic hash for text content
 */
function generateTextHash(text: string): string {
  return crypto
    .createHash('sha256')
    .update(text + DOMAIN + Date.now())
    .digest('hex');
}

/**
 * Generate steganographic fingerprint for text
 */
export function generateTextFingerprint(text: string): TextFingerprint {
  const timestamp = new Date().toISOString();
  const hash = generateTextHash(text);
  const signature = crypto
    .createHmac('sha256', DOMAIN)
    .update(hash + timestamp)
    .digest('hex');

  return {
    fingerprint: hash,
    signature,
    timestamp,
    domain: DOMAIN,
    version: VERSION
  };
}

/**
 * Embed fingerprint into text using zero-width characters
 */
export function embedFingerprintInText(text: string, fingerprint: TextFingerprint): string {
  // Convert fingerprint to binary
  const fingerprintBinary = fingerprint.signature
    .split('')
    .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');

  // Embed using zero-width characters
  let embeddedText = '';
  let binaryIndex = 0;

  for (let i = 0; i < text.length && binaryIndex < fingerprintBinary.length; i++) {
    embeddedText += text[i];
    
    // Insert zero-width character after certain words
    if (text[i] === ' ' && binaryIndex < fingerprintBinary.length) {
      const bit = fingerprintBinary[binaryIndex];
      if (bit === '0') {
        embeddedText += ZERO_WIDTH_SPACE + ZERO_WIDTH_NON_JOINER;
      } else {
        embeddedText += ZERO_WIDTH_SPACE + ZERO_WIDTH_JOINER;
      }
      binaryIndex++;
    }
  }

  // Add metadata at end if not fully embedded
  if (binaryIndex < fingerprintBinary.length) {
    const metadata = ZERO_WIDTH_NO_BREAK_SPACE + 
                     fingerprint.fingerprint.slice(0, 16) + 
                     ZERO_WIDTH_NO_BREAK_SPACE;
    embeddedText += metadata;
  }

  return embeddedText;
}

/**
 * Extract fingerprint from text
 */
export function extractFingerprintFromText(text: string): TextFingerprint | null {
  // Extract zero-width characters
  const zeroWidthPattern = new RegExp(
    `[${ZERO_WIDTH_SPACE}${ZERO_WIDTH_NON_JOINER}${ZERO_WIDTH_JOINER}${ZERO_WIDTH_NO_BREAK_SPACE}]+`,
    'g'
  );
  
  const matches = text.match(zeroWidthPattern);
  if (!matches) return null;

  // Reconstruct binary
  let binary = '';
  for (const match of matches) {
    if (match.includes(ZERO_WIDTH_NON_JOINER)) {
      binary += '0';
    } else if (match.includes(ZERO_WIDTH_JOINER)) {
      binary += '1';
    }
  }

  // Convert binary to hex
  let signature = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    if (byte.length === 8) {
      signature += parseInt(byte, 2).toString(16).padStart(2, '0');
    }
  }

  // Extract fingerprint from metadata if present
  const metadataPattern = new RegExp(
    `${ZERO_WIDTH_NO_BREAK_SPACE}([a-f0-9]{16})${ZERO_WIDTH_NO_BREAK_SPACE}`
  );
  const metadataMatch = text.match(metadataPattern);
  const fingerprint = metadataMatch ? metadataMatch[1] : signature.slice(0, 32);

  return {
    fingerprint: fingerprint || '',
    signature,
    timestamp: new Date().toISOString(),
    domain: DOMAIN,
    version: VERSION
  };
}

/**
 * Verify text ownership
 */
export function verifyTextOwnership(text: string): boolean {
  const fingerprint = extractFingerprintFromText(text);
  if (!fingerprint) return false;

  // Verify domain matches
  if (fingerprint.domain !== DOMAIN) return false;

  // Verify signature format
  if (!/^[a-f0-9]{64}$/.test(fingerprint.signature)) return false;

  return true;
}

/**
 * Generate fingerprint for key content pages
 */
export async function generateKeyContentFingerprints(): Promise<Record<string, string>> {
  const keyPages = [
    'turkey',
    'egypt',
    'uae',
    'thailand',
    'maldives',
    'cyprus',
    'greece',
    'italy',
    'spain',
    'france'
  ];

  const fingerprints: Record<string, string> = {};

  for (const country of keyPages) {
    const sampleText = `Путеводитель по ${country} от Велес Вояж - экспертные туры и рекомендации 2026`;
    const fingerprint = generateTextFingerprint(sampleText);
    fingerprints[country] = fingerprint.fingerprint;
  }

  return fingerprints;
}
