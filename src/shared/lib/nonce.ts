// Хранилище nonces (в продакшене используйте Redis)
const nonces = new Set<string>();

export function addNonce(nonce: string): void {
  nonces.add(nonce);
  
  // Очистка старых nonces через 5 минут
  setTimeout(() => {
    nonces.delete(nonce);
  }, 5 * 60 * 1000);
}

export function validateNonce(nonce: string): boolean {
  if (!nonce || !nonces.has(nonce)) {
    return false;
  }
  
  // Удаляем nonce после использования (одноразовый)
  nonces.delete(nonce);
  return true;
}
