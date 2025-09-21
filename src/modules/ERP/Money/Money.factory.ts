import { Decimal } from 'decimal.js'
import { Money } from './Money'

/**
 * Cria uma nova instância da classe Money com base nas propriedades fornecidas.
 * @param props As propriedades para criar a instância Money.
 * @returns Uma nova instância de Money.
 */
export function makeMoney(value: Decimal.Value = '0'): Money {
  return new Money(value)
}

/**
 * Cria uma nova instância de Money com um valor aleatório para testes.
 * @returns Uma nova instância de Money com um valor aleatório.
 */
export function makeRandomMoney(): Money {
  const randomValue = new Decimal((Math.random() * 1000).toString())
  return new Money(randomValue.toDecimalPlaces(2))
}
