import { makeCashRegister } from '../factories/registerFactory'
import { CashRegisterState } from './CashRegister'

describe('CashRegister Entity', () => {
  // Testes de inicialização
  describe('Initialization', () => {
    it('should create an instance with default properties and correct initial balance', () => {
      // Cria uma nova instância do caixa com um valor inicial de R$ 50,00
      const initialCash = 50.0
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
      const initialCash = 50

      const cashRegister = makeCashRegister({
        balance: { cash: initialCash },
      })

      cashRegister.deposit({ type: 'cash', amount: 50 })

      expect(cashRegister.balance.cash).toBe(100)

      cashRegister.withdraw({ type: 'cash', amount: 50 })
      expect(cashRegister.balance.cash).toBe(50)
    })

    it('should correctly close the cash register with the declared amount', () => {
      const declaredAmount = 100
      const cashRegister = makeCashRegister({})

      cashRegister.close(declaredAmount)

      expect(cashRegister.state).toBe(CashRegisterState.CLOSED)

      expect(cashRegister.declaredCashClose).toBe(declaredAmount)

      expect(cashRegister.closedAt).toBeInstanceOf(Date)
    })
  })

  // Testes de regras de negócio (Edge Cases)
  describe('Business Rules and Edge Cases', () => {
    it('should throw an error when trying to close a cash register that is already closed', () => {
      const declaredAmount = 100
      const cashRegister = makeCashRegister({})

      cashRegister.close(declaredAmount)

      expect(() => cashRegister.close(declaredAmount)).toThrow()
    })

    it('should not allow deposits when the cash register is closed', () => {
      const declaredAmount = 100
      const amountToDeposit = 10
      const amountToWithdraw = 10
      const cashRegister = makeCashRegister({})

      cashRegister.close(declaredAmount)

      expect(() =>
        cashRegister.deposit({ amount: amountToDeposit, type: 'cash' })
      ).toThrow()
      expect(() =>
        cashRegister.withdraw({ amount: amountToWithdraw, type: 'cash' })
      ).toThrow()
    })

    it('should create an instance with correct properties even without partial data provided', () => {
      const cashRegister = makeCashRegister({})
      expect(cashRegister.balance).toEqual({
        cash: 0,
        debit: 0,
        credit: 0,
        pix: 0,
        check: 0,
        onAccount: 0,
      })

      expect(cashRegister.state).toBe(CashRegisterState.OPEN)
      expect(cashRegister.operatorId).toBe('default_operator')
      expect(cashRegister.openedAt).toBeInstanceOf(Date)
      expect(cashRegister.closedAt).toBeNull()
      expect(cashRegister.declaredCashClose).toBeNull()
    })
  })
})
