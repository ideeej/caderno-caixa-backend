import Decimal from 'decimal.js'
import { makeCashRegister } from '../factories/registerFactory'
import { CashRegisterState } from './CashRegister'
import { PaymentType } from 'src/utils/paymentType'

describe('CashRegister Entity', () => {
  // Testes de inicialização
  describe('Initialization', () => {
    it('should create an instance with default properties and correct initial balance', () => {
      // Cria uma nova instância do caixa com um valor inicial de R$ 50,00
      const initialCash = Decimal('50')
      const operatorId = 'test-operator-1'
      const registerId = 'mock-uuid-123'

      const cashRegister = makeCashRegister(
        {
          operatorId: operatorId,
          balance: { cash: initialCash },
        },
        registerId
      )

      expect(cashRegister.id).toBe(registerId)

      expect(cashRegister.state).toBe(CashRegisterState.OPEN)

      expect(cashRegister.operatorId).toBe(operatorId)

      expect(cashRegister.closedAt).toBeNull()

      expect(cashRegister.declaredCashClose).toBeNull()

      expect(cashRegister.balance.cash).toBe(initialCash)
    })
  })

  // Testes de funcionalidade principal
  describe('Core Functionality', () => {
    it('should correctly register a new deposit and withdraws in the balance', () => {
      const cashRegister = makeCashRegister({
        balance: { cash: Decimal('50') },
      })

      cashRegister.deposit({ type: PaymentType.CASH, amount: Decimal('50') })

      expect(cashRegister.balance.cash).toEqual(Decimal('100'))

      cashRegister.withdraw({ type: PaymentType.CASH, amount: Decimal('50') })
      expect(cashRegister.balance.cash).toEqual(Decimal('50'))
    })

    it('should correctly close the cash register with the declared amount', () => {
      const declaredAmount = Decimal('100')
      const cashRegister = makeCashRegister({})

      cashRegister.close(declaredAmount)

      expect(cashRegister.state).toBe(CashRegisterState.CLOSED)

      expect(cashRegister.declaredCashClose).toEqual(declaredAmount)

      expect(cashRegister.closedAt).toBeInstanceOf(Date)
    })
  })

  // Testes de regras de negócio (Edge Cases)
  describe('Business Rules and Edge Cases', () => {
    it('should throw an error when trying to close a cash register that is already closed', () => {
      const declaredAmount = Decimal('100')
      const cashRegister = makeCashRegister({})

      cashRegister.close(declaredAmount)

      expect(() => cashRegister.close(declaredAmount)).toThrow()
    })

    it('should not allow deposits when the cash register is closed', () => {
      const declaredAmount = Decimal('100')
      const amountToDeposit = Decimal('10')
      const amountToWithdraw = Decimal('10')
      const cashRegister = makeCashRegister({})

      cashRegister.close(declaredAmount)

      expect(() =>
        cashRegister.deposit({
          amount: amountToDeposit,
          type: PaymentType.CASH,
        })
      ).toThrow()
      expect(() =>
        cashRegister.withdraw({
          amount: amountToWithdraw,
          type: PaymentType.CASH,
        })
      ).toThrow()
    })

    it('should create an instance with correct properties even without partial data provided', () => {
      const cashRegister = makeCashRegister({})
      expect(cashRegister.balance).toEqual({
        cash: Decimal('0'),
        debit: Decimal('0'),
        credit: Decimal('0'),
        pix: Decimal('0'),
        check: Decimal('0'),
        onAccount: Decimal('0'),
      })

      expect(cashRegister.state).toBe(CashRegisterState.OPEN)
      expect(cashRegister.operatorId).toBe('default_operator')
      expect(cashRegister.openedAt).toBeInstanceOf(Date)
      expect(cashRegister.closedAt).toBeNull()
      expect(cashRegister.declaredCashClose).toBeNull()
    })
  })
})
