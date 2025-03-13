let fiberIdCounter = 0 // Contador global para IDs únicos en hexadecimal

/**
 * Genera un identificador único en hexadecimal de 8 caracteres con prefijo "f".
 * @returns Un string con formato "fxxxxxxxx" (ejemplo: "f00000a3")
 */
export function generateFiberId(): string {
  return `f${(fiberIdCounter++).toString(16).padStart(8, '0')}`
}
