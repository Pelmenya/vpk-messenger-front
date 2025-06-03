export function fixBackendDate(date: string): string {
    // Отнимать 3 часа
    const parsed = new Date(date);
    // Если дата некорректная, не трогаем
    if (isNaN(parsed.getTime())) return date;
    // Уменьшаем на 3 часа
    parsed.setHours(parsed.getHours() - 3);
    return parsed.toISOString();
}