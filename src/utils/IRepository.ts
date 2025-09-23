import { Entity } from 'src/modules/entity'

export interface IRepository<T extends Entity<any>> {
  // Encontra uma entidade pelo seu ID.
  // Retorna a entidade ou null se não for encontrada.
  findById(id: string): Promise<T | null>

  // Salva ou atualiza uma entidade.
  // Pode ser usada para criar ou atualizar, simplificando a lógica.
  save(entity: T): Promise<void>

  // Deleta uma entidade pelo seu ID.
  delete(id: string): Promise<void>
}
