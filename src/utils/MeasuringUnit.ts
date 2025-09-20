import Decimal from 'decimal.js'

export interface MeasuringUnitProps {
  code: string
  symbol: string
  description: string
  value: Decimal
}

export class MeasuringUnit {
  private props: MeasuringUnitProps

  constructor(props: MeasuringUnitProps) {
    this.props = { ...props }
  }

  get code(): string {
    return this.props.code
  }

  get symbol(): string {
    return this.props.symbol
  }

  get description(): string {
    return this.props.description
  }

  get value(): Decimal {
    return this.props.value
  }

  static mililiter(value: string): MeasuringUnit {
    return new MeasuringUnit({
      code: 'ML',
      symbol: 'ml',
      description: 'Mililitro',
      value: Decimal(value),
    })
  }

  static liter(value: string): MeasuringUnit {
    return new MeasuringUnit({
      code: 'L',
      symbol: 'l',
      description: 'liter',
      value: Decimal(value),
    })
  }

  static kilogram(value: string): MeasuringUnit {
    return new MeasuringUnit({
      code: 'KG',
      symbol: 'kg',
      description: 'kilogram',
      value: Decimal(value),
    })
  }

  static gram(value: string): MeasuringUnit {
    return new MeasuringUnit({
      code: 'G',
      symbol: 'g',
      description: 'gram',
      value: Decimal(value),
    })
  }

  static unit(value: string): MeasuringUnit {
    return new MeasuringUnit({
      code: 'UN',
      symbol: 'un',
      description: 'unit',
      value: Decimal(value),
    })
  }

  static box(value: string): MeasuringUnit {
    return new MeasuringUnit({
      code: 'CX',
      symbol: 'cx',
      description: 'caixa',
      value: Decimal(value),
    })
  }

  static dozen(value: string): MeasuringUnit {
    return new MeasuringUnit({
      code: 'DZ',
      symbol: 'dz',
      description: 'dozen',
      value: Decimal(value),
    })
  }
}
