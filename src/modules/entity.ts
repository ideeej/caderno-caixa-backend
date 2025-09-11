import { randomUUID } from 'node:crypto'

export interface EntityProps {
  [key: string]: any
}

export abstract class Entity<T extends EntityProps> {
  protected _id: string
  protected props: T

  constructor(props: T, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
  }

  get id(): string {
    return this._id
  }

  public equals(entity: Entity<any>): boolean {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}
