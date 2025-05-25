import { format, isToday, isThisWeek, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

/**
 * Форматирует дату по правилам:
 * - Сегодня: HH:mm
 * - На этой неделе: день недели (понедельник, ...)
 * - Иначе: d MMMM yyyy 'года'
 */
export const formatChatDate = (date?: string) => {
  if (!date) return '';

  // Преобразуем строку в объект Date
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;

  if (isToday(parsedDate)) {
    return format(parsedDate, 'HH:mm', { locale: ru });
  }

  if (isThisWeek(parsedDate, { weekStartsOn: 1 })) {
    // 'eeee' — полное название дня недели на русском
    return format(parsedDate, 'eeee', { locale: ru });
  }

  return format(parsedDate, "d MMMM yyyy", { locale: ru });
};
