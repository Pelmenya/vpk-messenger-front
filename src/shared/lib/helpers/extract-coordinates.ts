export function extractCoordinates(str: string): number[] | null {
  if (!str.startsWith('[location]')) return null;
  // Обрезаем '[location]' и пробелы
  const coordsPart = str.slice(10).trim();
  const parts = coordsPart.split(',').map(s => s.trim());
  if (parts.length !== 2) return null;
  const lat = parseFloat(parts[0]);
  const lon = parseFloat(parts[1]);
  if (isNaN(lat) || isNaN(lon)) return null;
  return [lat, lon];
}