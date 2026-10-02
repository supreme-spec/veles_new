import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { addNonce } from '@/shared/lib/nonce';

export async function GET(_request: NextRequest) {
  try {
    // Генерируем nonce
    const nonce = crypto.randomBytes(24).toString('base64url') + '.' + Date.now();
    
    // Сохраняем nonce (он будет действителен 5 минут)
    addNonce(nonce);
    
    console.log('Generated nonce:', nonce);
    
    return NextResponse.json({ 
      nonce,
      timestamp: Date.now() 
    });
    
  } catch (error) {
    console.error('Error generating nonce:', error);
    return NextResponse.json(
      { error: 'Failed to generate nonce' }, 
      { status: 500 }
    );
  }
}
