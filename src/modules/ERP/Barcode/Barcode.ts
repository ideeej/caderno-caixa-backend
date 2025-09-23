export function generateValidEAN13(prefix: string = ''): Barcode {
  const code = prefix.padEnd(12, '0') // Garante que o prefixo tenha 12 dígitos
  let sum = 0
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(code[i], 10)
    sum += i % 2 === 0 ? digit : digit * 3
  }
  const checkDigit = (10 - (sum % 10)) % 10
  return new Barcode(code.slice(0, 12) + checkDigit.toString())
}

// Uma classe de valor para representar e validar códigos de barras.
// Isso garante que o formato do código de barras seja sempre válido na sua entidade `Product`.
export class Barcode {
  private _value: string

  /**
   * Construtor da classe Barcode.
   * Valida o formato do código de barras na criação.
   * @param value A string do código de barras.
   */
  constructor(value: string) {
    if (value.trim() === '') {
      throw new Error('O código de barras não pode ser vazio.')
    }

    if (!this.validate(value)) {
      throw new Error('Formato de código de barras inválido.')
    }
    this._value = value
  }

  /**
   * Getter para o valor do código de barras.
   */
  public get value(): string {
    return this._value
  }

  /**
   * Compara se dois objetos Barcode têm o mesmo valor.
   * @param barcode O objeto Barcode a ser comparado.
   * @returns Verdadeiro se os valores forem iguais, falso caso contrário.
   */
  public equals(barcode: Barcode): boolean {
    return this._value === barcode.value
  }

  /**
   * Compara se o Barcode têm o mesmo valor tem o mesmo valor.
   * @param barcode O a string com o valor do  Barcode a ser comparado.
   * @returns Verdadeiro se os valores forem iguais, falso caso contrário.
   */
  public checkBarcode(barcode: string): boolean {
    return this._value === barcode
  }

  /**
   * Método de validação privada.
   * Verifica se o valor corresponde a um dos formatos de código de barras mais comuns.
   * @param value A string a ser validada.
   * @returns Verdadeiro se o valor for um código de barras válido, falso caso contrário.
   */
  private validate(value: string): boolean {
    // Tenta validar como EAN-13 (13 dígitos)
    if (this.validateEAN13(value)) {
      return true
    }

    // Tenta validar como EAN-8 (8 dígitos)
    if (this.validateEAN8(value)) {
      return true
    }

    // Tenta validar como UPC-A (12 dígitos)
    if (this.validateUPCA(value)) {
      return true
    }

    return false
  }

  /**
   * Valida o formato EAN-13, incluindo o cálculo do dígito verificador.
   * @param barcode A string do código de barras.
   * @returns Verdadeiro se for um EAN-13 válido.
   */
  private validateEAN13(barcode: string): boolean {
    // O código EAN-13 deve ter exatamente 13 dígitos
    if (!/^\d{13}$/.test(barcode)) {
      return false
    }

    // Calcula o dígito verificador
    let sum = 0
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(barcode[i], 10)
      sum += i % 2 === 0 ? digit : digit * 3
    }
    const checkDigit = (10 - (sum % 10)) % 10

    return checkDigit === parseInt(barcode[12], 10)
  }

  /**
   * Valida o formato EAN-8, incluindo o cálculo do dígito verificador.
   * @param barcode A string do código de barras.
   * @returns Verdadeiro se for um EAN-8 válido.
   */
  private validateEAN8(barcode: string): boolean {
    // O código EAN-8 deve ter exatamente 8 dígitos
    if (!/^\d{8}$/.test(barcode)) {
      return false
    }

    // Calcula o dígito verificador
    let sum = 0
    for (let i = 0; i < 7; i++) {
      const digit = parseInt(barcode[i], 10)
      sum += i % 2 === 0 ? digit * 3 : digit
    }
    const checkDigit = (10 - (sum % 10)) % 10

    return checkDigit === parseInt(barcode[7], 10)
  }

  /**
   * Valida o formato UPC-A, incluindo o cálculo do dígito verificador.
   * @param barcode A string do código de barras.
   * @returns Verdadeiro se for um UPC-A válido.
   */
  private validateUPCA(barcode: string): boolean {
    // O código UPC-A deve ter exatamente 12 dígitos
    if (!/^\d{12}$/.test(barcode)) {
      return false
    }

    // Calcula o dígito verificador
    let sum = 0
    for (let i = 0; i < 11; i++) {
      const digit = parseInt(barcode[i], 10)
      sum += i % 2 === 0 ? digit * 3 : digit
    }
    const checkDigit = (10 - (sum % 10)) % 10

    return checkDigit === parseInt(barcode[11], 10)
  }
}
