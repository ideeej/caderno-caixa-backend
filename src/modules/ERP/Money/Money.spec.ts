import { Currency } from './Money'
import { makeMoney } from './Money.factory'

describe('Money', () => {
  it('should be able to create a money object with a positive value', () => {
    const money = makeMoney('100')
    expect(money.value.toString()).toBe('100')
    expect(money.currency).toBe(Currency.BRL)
  })

  it('should throw an error if the value is negative', () => {
    expect(() => makeMoney('-100')).toThrow(
      'O valor monetário não pode ser negativo.'
    )
  })

  describe('Operations', () => {
    it('should be able to add two money objects', () => {
      const moneyA = makeMoney('100')
      const moneyB = makeMoney('50')
      const result = moneyA.add(moneyB.value)

      // Verifica o resultado
      expect(result.value.toString()).toBe('150')
      expect(result.currency).toBe(Currency.BRL)

      // Garante que o objeto original não foi alterado (imutabilidade)
      expect(moneyA.value.toString()).toBe('100')
    })

    it('should be able to subtract two money objects', () => {
      const moneyA = makeMoney('100')
      const moneyB = makeMoney('50')
      const result = moneyA.subtract(moneyB.value)

      expect(result.value.toString()).toBe('50')
      expect(result.currency).toBe(Currency.BRL)
    })

    it('should be able to multiply money by a number', () => {
      const money = makeMoney('10.5')
      const result = money.multiply(2)

      expect(result.value.toString()).toBe('21')
      expect(result.currency).toBe(Currency.BRL)
    })

    it('should be able to divide money by a number', () => {
      const money = makeMoney('10.5')
      const result = money.divide(2)

      expect(result.value.toString()).toBe('5.25')
      expect(result.currency).toBe(Currency.BRL)
    })

    it('should throw an error when dividing by zero', () => {
      const money = makeMoney('100')
      expect(() => money.divide(0)).toThrow('Não é possível dividir por zero.')
    })
  })

  describe('Checks', () => {
    it('should correctly check if a money object is greater than another', () => {
      const moneyA = makeMoney('200')
      const moneyB = makeMoney('100')

      expect(moneyA.isGreaterThan(moneyB.value)).toBe(true)
      expect(moneyB.isGreaterThan(moneyA.value)).toBe(false)
    })

    it('should format the value to two decimal places', () => {
      const moneyA = makeMoney('100')
      const moneyB = makeMoney('50.75')
      const moneyC = makeMoney('12.3')

      expect(moneyA.format()).toBe('100.00')
      expect(moneyB.format()).toBe('50.75')
      expect(moneyC.format()).toBe('12.30')
    })
  })
})
