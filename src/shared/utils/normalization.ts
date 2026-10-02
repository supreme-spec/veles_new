// Функция нормализации названия страны
export const normalizeCountryName = (title: string): string => {
    // Убираем эмодзи (Unicode диапазон эмодзи)
    let name = title.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
    // Убираем флаги стран (Unicode диапазон флагов)
    name = name.replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, '');
    // Разделяем только по двоеточию или длинному тире (сохраняем дефисы в названиях типа "Сан-Марино")
    name = name.split(/[:]|[—–]/)[0] || name;
    // Убираем лишние пробелы
    name = name.trim();
    return name;
};
