import { Injectable } from "@nestjs/common";
import { CashRegisterRepository } from "../../repositories/cashRegisterRepository";
import { CashRegister } from "../../entities/CashRegister";

interface CloseCashRegisterRequest {
    closingAmount: Number
    userId: string
    id: string
}

@Injectable()
export class CloseCashRegister {
    constructor(private cashRegisterRepository: CashRegisterRepository) {}

    async execute(cashRegister: CashRegister) : Promise<CashRegister | null> {
        return this.cashRegisterRepository.close(cashRegister)
    }
}
