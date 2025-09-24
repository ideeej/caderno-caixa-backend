import { Injectable } from '@nestjs/common'
import { Sale, SaleState } from '../Sale'
import { SaleRepository } from '../Sale.repository'
import { makeSale } from '../Sale.factory'
import { InventoryRepository } from 'src/modules/ERP/Inventory/Inventory.repository'
import { CreateInventoryUseCase } from 'src/modules/ERP/Inventory/useCases/Inventory.create.usecase'

@Injectable()
export class CreateSaleUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private inventoryRepository: InventoryRepository,
    private createInventoryUseCase: CreateInventoryUseCase
  ) {}

  async execute(inventoryId: string): Promise<Sale> {
    let inventory = await this.inventoryRepository.findById(inventoryId)

    if (!inventory) {
      this.createInventoryUseCase = new CreateInventoryUseCase(
        this.inventoryRepository
      )

      inventory = await this.createInventoryUseCase.execute()

      if (!inventory) {
        // panic
        throw new Error(
          'Inventory could not be create for some reason on CreateSaleUseCase'
        )
      }
    }

    const sale = makeSale({
      items: [],
      state: SaleState.CREATED,
      inventory,
      payments: [],
      openedAt: new Date(),
      closedAt: null,
      cancelledAt: null,
      finishedAt: null,
    })

    await this.saleRepository.save(sale)
    return sale
  }
}
