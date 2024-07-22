import { format } from 'date-fns';
import { hu } from 'date-fns/locale';

export function formatHu(date: Date | number | string, formatting: string) {
  return format(date, formatting, { locale: hu });
}
