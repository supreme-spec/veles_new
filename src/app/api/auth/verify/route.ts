import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { proof, account } = body;
    
    console.log('Verification request:', { proof, account });
    
    // В упрощенной версии просто проверяем наличие данных
    // В реальном приложении здесь должна быть полная проверка TON proof
    if (!proof || !account?.address) {
      return NextResponse.json(
        { ok: false, error: 'Invalid proof or account data' }, 
        { status: 400 }
      );
    }
    
    // Простая проверка адреса (в реальности нужна криптографическая проверка)
    const address = account.address;
    if (!address.startsWith('EQ') && !address.startsWith('UQ')) {
      return NextResponse.json(
        { ok: false, error: 'Invalid TON address format' }, 
        { status: 400 }
      );
    }
    
    // Генерируем токен сессии
    const sessionToken = crypto.randomBytes(32).toString('hex');
    
    console.log('Authentication successful for address:', address);
    
    // В реальном приложении здесь нужно:
    // 1. Проверить ton_proof подпись
    // 2. Сохранить сессию в базе данных
    // 3. Установить secure cookie
    
    return NextResponse.json({
      ok: true,
      sessionToken,
      address,
      message: 'Authentication successful'
    });
    
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
