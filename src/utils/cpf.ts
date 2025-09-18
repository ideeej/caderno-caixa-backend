export class CPF {
  private value: string

  constructor(value: string) {
    if (!CPF.validate(value)) {
      throw new Error('[CPF] CPF inválido.')
    }
    this.value = CPF.format(value)
  }

  static validate(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '')

    // Verifica se tem 11 dígitos ou se todos os dígitos são iguais (caso inválido)
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false

    // Validação do primeiro dígito verificador
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += Number(cpf.charAt(i)) * (10 - i)
    }
    let firstCheckDigit = 11 - (sum % 11)
    if (firstCheckDigit === 10 || firstCheckDigit === 11) firstCheckDigit = 0

    // Confere se o primeiro dígito verificador está correto
    if (firstCheckDigit !== Number(cpf.charAt(9))) return false

    // Validação do segundo dígito verificador
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += Number(cpf.charAt(i)) * (11 - i)
    }
    let secondCheckDigit = 11 - (sum % 11)
    if (secondCheckDigit === 10 || secondCheckDigit === 11) secondCheckDigit = 0

    // Confere se o segundo dígito verificador está correto
    return secondCheckDigit === Number(cpf.charAt(10))
  }

  static format(cpf: string): string {
    cpf = cpf.replace(/[^\d]+/g, '')
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  toString() {
    return this.value
  }
}
