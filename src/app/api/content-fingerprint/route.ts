import { NextResponse } from 'next/server';
import { 
  generateTextFingerprint, 
  embedFingerprintInText, 
  extractFingerprintFromText,
  verifyTextOwnership,
  generateKeyContentFingerprints
} from '@/lib/steganography/textFingerprint';

/**
 * Content Fingerprint API
 * Generates and verifies steganographic fingerprints for text content
 * Protects against content scraping and plagiarism
 */

interface FingerprintRequest {
  text?: string;
  action?: 'generate' | 'embed' | 'verify' | 'key-pages';
}

export async function POST(request: Request) {
  try {
    const body: FingerprintRequest = await request.json();
    const { text, action = 'generate' } = body;

    if (action === 'key-pages') {
      // Generate fingerprints for key content pages
      const keyFingerprints = await generateKeyContentFingerprints();
      return NextResponse.json({
        type: 'KeyContentFingerprints',
        domain: 'veles-voyage.ru',
        fingerprints: keyFingerprints,
        generated: new Date().toISOString()
      });
    }

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (action === 'generate') {
      // Generate fingerprint for text
      const fingerprint = generateTextFingerprint(text);
      return NextResponse.json({
        type: 'TextFingerprint',
        fingerprint: fingerprint.fingerprint,
        signature: fingerprint.signature,
        timestamp: fingerprint.timestamp,
        domain: fingerprint.domain,
        version: fingerprint.version
      });
    }

    if (action === 'embed') {
      // Embed fingerprint into text
      const fingerprint = generateTextFingerprint(text);
      const embeddedText = embedFingerprintInText(text, fingerprint);
      return NextResponse.json({
        type: 'EmbeddedText',
        originalText: text,
        embeddedText,
        fingerprint: fingerprint.fingerprint,
        signature: fingerprint.signature,
        note: 'Text contains invisible zero-width characters for ownership verification'
      });
    }

    if (action === 'verify') {
      // Verify text ownership
      const isValid = verifyTextOwnership(text);
      const extracted = extractFingerprintFromText(text);
      
      return NextResponse.json({
        type: 'OwnershipVerification',
        isValid,
        domain: extracted?.domain || null,
        fingerprint: extracted?.fingerprint || null,
        timestamp: extracted?.timestamp || null,
        message: isValid 
          ? 'Content belongs to veles-voyage.ru' 
          : 'Content ownership cannot be verified or belongs to different domain'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use: generate, embed, verify, or key-pages' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error in content fingerprint:', error);
    return NextResponse.json(
      { error: 'Failed to process content fingerprint' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'key-pages';
  
  const mockRequest = new Request(request.url, {
    method: 'POST',
    body: JSON.stringify({ action })
  });
  
  return POST(mockRequest);
}
