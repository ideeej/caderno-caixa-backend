import { randomUUID } from 'node:crypto'

export interface EntityProps {
  [key: string]: any
}

export abstract class Entity<T extends EntityProps> {
  protected _id: string
  protected _createdAt: Date
  protected _updatedAt: Date
  protected props: T

  constructor(props: T, id?: string) {
    this._id = id ?? randomUUID()
    this.props = { ...props }
    this._createdAt = new Date()
    this._updatedAt = new Date()
  }

  get id(): string {
    return this._id
  }

  public get createdAt(): Date {
    return this._createdAt ?? null
  }

  public get updatedAt(): Date | null {
    return this._updatedAt ?? null
  }

  public toProps(): T {
    return { ...this.props }
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

  public updateTimestamp(): void {
    this._updatedAt = new Date()
  }
}
