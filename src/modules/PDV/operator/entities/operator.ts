import { randomUUID } from 'crypto'

interface OperatorProps {
  name: string
}

export class Operator {
  private props: OperatorProps
  private _id: string

  constructor(props: OperatorProps, id?: string) {
    this.props = {
      ...props,
    }

    this._id = id || randomUUID()
  }
  get id(): string {
    return this._id
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }
}
