export function formatNumber(number: number | string) {
  // Convertir el número a tipo numérico
  const numericValue = typeof number === 'string' ? parseFloat(number) : number;

  // Verificar si la conversión fue exitosa
  if (isNaN(numericValue)) {
    return number;  // Si la conversión falla, devuelve el valor original
  }

  // Formatear el número
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
  }).format(numericValue);
}


export function cutFirst8Digits(input: number | string): string {
  try {
    // Si el input es un número, conviértelo a string
    const inputString = typeof input === 'number' ? input.toString() : input;

    // Cortar los primeros 8 dígitos
    const cutString = inputString.slice(0, 8);

    return cutString;
  } catch {
    return input.toString();
  }
}

export function formatMarketCap(num: number) {
  if (num === null || num === undefined || isNaN(num)) return 'Invalid number';

  const suffixes = ['K', 'M', 'B', 'T'];
  const threshold = 1000;

  if (num < threshold) return num.toString(); // Si es menor a 1000, no abreviar

  let suffixIndex = -1;
  let reducedNum = num;

  // Reducir el número dividiéndolo por 1000 hasta encontrar el sufijo adecuado
  while (reducedNum >= threshold && suffixIndex < suffixes.length - 1) {
    reducedNum /= threshold;
    suffixIndex++;
  }

  // Redondear a 1 decimal y añadir el sufijo
  return `${reducedNum.toFixed(1)}${suffixes[suffixIndex]}`;
}

export function getCoordinates(value: number, radius: number = 87) {
  const angle = ((100 - value) / 100) * Math.PI; 
  const cx = 100 + radius * Math.cos(angle); 
  const cy = 95 - radius * Math.sin(angle); 

  return { cx, cy };
}