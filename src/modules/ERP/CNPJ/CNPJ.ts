export class CNPJ {
  private value: string

  constructor(value: string) {
    if (!CNPJ.validate(value)) {
      throw new Error('[CNPJ] CNPJ inválido.')
    }
    this.value = CNPJ.format(value)
  }

  static validate(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '')

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false

    // Validação do primeiro dígito
    let sum = 0
    let weight = 5
    for (let i = 0; i < 12; i++) {
      sum += Number(cnpj.charAt(i)) * weight
      weight = weight === 2 ? 9 : weight - 1
    }
    let digit = 11 - (sum % 11)
    if (digit > 9) digit = 0
    if (digit !== Number(cnpj.charAt(12))) return false

    // Validação do segundo dígito
    sum = 0
    weight = 6
    for (let i = 0; i < 13; i++) {
      sum += Number(cnpj.charAt(i)) * weight
      weight = weight === 2 ? 9 : weight - 1
    }
    digit = 11 - (sum % 11)
    if (digit > 9) digit = 0
    return digit === Number(cnpj.charAt(13))
  }

  static format(cnpj: string): string {
    cnpj = cnpj.replace(/[^\d]+/g, '')
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }

  toString() {
    return this.value
  }
}
