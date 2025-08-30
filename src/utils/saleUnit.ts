export interface SaleUnitProps {
  code: string
  symbol: string
  description: string
}

export class SaleUnit {
  private props: SaleUnitProps

  constructor(props: SaleUnitProps) {
    this.props = props
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
}

// Para manter a clareza e ter um conjunto fixo de opções
export const SaleUnits = {
  UNIT: new SaleUnit({ code: 'UN', symbol: 'un', description: 'Unidade' }),
  KILOGRAM: new SaleUnit({
    code: 'KG',
    symbol: 'kg',
    description: 'Quilograma',
  }),
  GRAM: new SaleUnit({ code: 'G', symbol: 'g', description: 'Grama' }),
  BOX: new SaleUnit({ code: 'CX', symbol: 'cx', description: 'Caixa' }),
  LITER: new SaleUnit({ code: 'L', symbol: 'l', description: 'Litro' }),
  MILILITER: new SaleUnit({
    code: 'ML',
    symbol: 'ml',
    description: 'Mililitro',
  }),
}
