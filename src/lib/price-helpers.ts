export function formatPrice(price: number | string | null | undefined, currency = '₽'): string {
  if (price == null) return '';
  return `${Number(price).toLocaleString('ru-RU')} ${currency}`;
}

export function formatPriceWithTaxes(
  basePrice: number | null | undefined,
  taxes: Array<{ amount: number; name?: string }> = [],
  included = true
) {
  if (basePrice == null) {
    return { display: '', breakdown: null, total: null };
  }

  if (included) {
    return {
      display: formatPrice(basePrice),
      breakdown: null,
      total: basePrice,
    };
  }

  const totalTaxes = taxes.reduce((sum, t) => sum + Number(t.amount || 0), 0);
  return {
    display: formatPrice(basePrice),
    breakdown: `+${formatPrice(totalTaxes)} налоги и сборы`,
    total: basePrice + totalTaxes,
  };
}

export function getMealTypeLabel(mealType: string | null | undefined): string {
  if (!mealType) return '';
  const map: Record<string, string> = {
    breakfast: 'Завтрак включён',
    half_board: 'Полупансион',
    full_board: 'Полный пансион',
    all_inclusive: 'All inclusive',
    room_only: 'Только номер',
  };
  return map[mealType] || mealType;
}

export function formatCancellationDate(date: Date | string | null | undefined): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
