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

  get street(): string {
    return this.props.street
  }

  get number(): string {
    return this.props.number
  }

  get neighborhood(): string {
    return this.props.neighborhood
  }

  get city(): string {
    return this.props.city
  }

  get state(): string {
    return this.props.state
  }

  get zip(): string {
    return this.props.zip
  }

  get country(): string {
    return this.props.country
  }

  get complement(): string | undefined {
    return this.props.complement
  }

  set complement(value: string | undefined) {
    this.props.complement = value
  }

  set country(value: string) {
    this.props.country = value
  }

  set zip(value: string) {
    this.props.zip = value
  }

  set state(value: string) {
    this.props.state = value
  }

  set city(value: string) {
    this.props.city = value
  }

  set neighborhood(value: string) {
    this.props.neighborhood = value
  }

  set number(value: string) {
    this.props.number = value
  }

  set street(value: string) {
    this.props.street = value
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
