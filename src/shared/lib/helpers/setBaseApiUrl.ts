export const setBaseApiUrl = (suffix: string): string => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL as string;

    // Удаляем слэш в конце baseUrl, если есть
    const cleanedBaseUrl = baseUrl.replace(/\/+$/, '');

    // Удаляем слэш в начале суффикса, если есть
    const cleanedSuffix = suffix.replace(/^\/+/, '');

    // Если суффикс пустой, возвращаем только cleanedBaseUrl
    if (!cleanedSuffix) return cleanedBaseUrl;

    // Склеиваем с одним слэшем
    return `${cleanedBaseUrl}/${cleanedSuffix}`;
};
