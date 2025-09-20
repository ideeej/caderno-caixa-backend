import Decimal from 'decimal.js'

// Todo Implement money class properly, not confortable using decimal everywhere
export class Money {
  constructor(private amount: Decimal) {
    if (amount.isNegative()) {
      throw new Error('Valor não pode ser negativo')
    }
  }
}
