export interface AddressProps {
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  zip: string
  country: string
  complement?: string
}

export class Address {
  private props: AddressProps

  constructor(props: AddressProps) {
    if (!Address.validate(props)) {
      throw new Error('Endereço inválido')
    }
    this.props = props
  }

  static validate(props: AddressProps): boolean {
    return (
      !!props.street &&
      !!props.number &&
      !!props.neighborhood &&
      !!props.city &&
      !!props.state &&
      !!props.zip &&
      !!props.country
    )
  }

  toString() {
    const {
      street,
      number,
      neighborhood,
      city,
      state,
      zip,
      country,
      complement,
    } = this.props
    return `${street}, ${number}${complement ? ' - ' + complement : ''}, ${neighborhood}, ${city} - ${state}, ${zip}, ${country}`
  }

  get value() {
    return this.props
  }
}
