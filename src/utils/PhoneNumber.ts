export class PhoneNumber {
  private value: string

  constructor(value: string) {
    if (!PhoneNumber.validate(value)) {
      throw new Error('Telefone inválido')
    }
    this.value = value.replace(/[^\d]+/g, '')
  }

  static validate(phone: string): boolean {
    // Aceita formatos nacionais (com DDD) e internacionais simples
    return /^(\+?\d{2,3})?[\s-]?(\d{2})[\s-]?(\d{4,5})[\s-]?(\d{4})$/.test(
      phone.replace(/[^\d]+/g, '')
    )
  }

  toString() {
    return this.value
  }
}
