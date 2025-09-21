import Decimal from 'decimal.js'

export enum Currency {
  BRL = 'BRL',
}

/**
 * Uma classe de valor para representar valores monetários com alta precisão.
 * Ela garante a imutabilidade e evita problemas de precisão de ponto flutuante.
 */
export class Money {
  protected _value: Decimal
  protected _currency: Currency

  /**
   * Construtor da classe Money.
   * Valida o valor e o tipo da moeda.
   * @param props O objeto de propriedades com o valor e a moeda.
   */
  constructor(value: Decimal.Value) {
    // A conversão de Decimal.Value para Decimal acontece aqui,
    // isolando a dependência no código cliente.
    const decimalValue = new Decimal(value)

    if (decimalValue.lessThan(0)) {
      throw new Error('O valor monetário não pode ser negativo.')
    }

    this._value = decimalValue
    this._currency = Currency.BRL
  }

  /**
   * Getter para o valor em formato Decimal.
   */
  public get value(): Decimal {
    return this._value
  }

  /**
   * Getter para a moeda.
   */
  public get currency(): Currency {
    return this._currency
  }

  /**
   * Soma o valor monetário com um número. Retorna uma nova instância de Money.
   * @param other O outro objeto Money a ser somado.
   * @returns Uma nova instância de Money com o resultado.
   */
  public add(other: Decimal.Value): Money {
    const newValue = this._value.plus(other).toString()
    return new Money(newValue)
  }

  /**
   * Subtrai o valor monetário por um número. Retorna uma nova instância de Money.
   * @param other O outro objeto Money a ser subtraído.
   * @returns Uma nova instância de Money com o resultado.
   */
  public subtract(other: Decimal.Value): Money {
    const newValue = this._value.minus(other).toString()
    return new Money(newValue)
  }

  /**
   * Multiplica o valor monetário por um número. Retorna uma nova instância de Money.
   * @param multiplier O multiplicador.
   * @returns Uma nova instância de Money com o resultado.
   */
  public multiply(multiplier: Decimal.Value): Money {
    const newValue = this._value.times(multiplier).toString()
    return new Money(newValue)
  }

  /**
   * Divide o valor monetário por um número. Retorna uma nova instância de Money.
   * @param divisor O divisor.
   * @returns Uma nova instância de Money com o resultado.
   */
  public divide(divisor: Decimal.Value): Money {
    if (new Decimal(divisor).isZero()) {
      throw new Error('Não é possível dividir por zero.')
    }
    const newValue = this._value.dividedBy(divisor).toString()
    return new Money(newValue)
  }

  /**
   * Compara se este valor é igual a outro.
   * @param other O outro objeto Money.
   * @returns Verdadeiro se os valores e moedas forem iguais.
   */
  public equals(other: Decimal.Value): boolean {
    return this._value.equals(other)
  }

  /**
   * Compara se este valor é maior que outro.
   * @param other O outro objeto Money.
   */
  public isGreaterThan(other: Decimal.Value): boolean {
    return this._value.greaterThan(other)
  }

  /**
   * Compara se este valor é menor que outro.
   * @param other O outro objeto Money.
   */
  public isLessThan(other: Decimal.Value): boolean {
    return this._value.lessThan(other)
  }

  /**
   * Compara se este valor é negativo.
   * @returns true ou false.
   */
  public isNegative(): boolean {
    return this._value.isNegative()
  }
  /**
   * Converte o valor para uma string com duas casas decimais, útil para exibição.
   * @returns O valor como uma string formatada.
   */
  public format(): string {
    return this._value.toFixed(2)
  }
}
