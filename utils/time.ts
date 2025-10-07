/**
 * Analisa uma string de tempo flexível (por exemplo, '2', '2:30', '1.5') em minutos totais.
 * @param input A string de tempo do usuário.
 * @returns O total de minutos como um número, ou nulo se a entrada for inválida.
 */
export const parseTimeInput = (input: string): number | null => {
  if (!input || typeof input !== 'string' || input.trim() === '') {
    return null;
  }

  const trimmedInput = input.trim();
  
  // Caso 1: formato 'HH:MM'
  if (trimmedInput.includes(':')) {
    const parts = trimmedInput.split(':');
    if (parts.length === 2) {
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && minutes >= 0 && minutes < 60) {
        return hours * 60 + minutes;
      }
    }
  }

  // Caso 2: formato decimal ou inteiro (por exemplo, '2', '1.5')
  const numericValue = parseFloat(trimmedInput.replace(',', '.'));
  if (!isNaN(numericValue) && numericValue >= 0) {
    return Math.round(numericValue * 60);
  }

  return null; // Formato inválido
};

/**
 * Formata minutos totais em uma string 'HH:MM'.
 * @param totalMinutes O total de minutos a ser formatado.
 * @returns Uma string no formato 'HH:MM'.
 */
export const formatMinutes = (totalMinutes: number): string => {
  if (totalMinutes < 0) totalMinutes = 0;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${paddedMinutes}`;
};