export class Email {
  private value: string

  constructor(value: string) {
    if (!Email.validate(value)) {
      throw new Error('Email inválido')
    }
    this.value = value.trim().toLowerCase()
  }

  static validate(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  toString() {
    return this.value
  }
}
