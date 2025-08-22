import { Injectable } from "@nestjs/common";
import { CashRegisterRepository } from "../../repositories/cashRegisterRepository"
import { CashRegister } from "../../entities/CashRegister";

interface OpenCashRegisterRequest {
    initialAmount: Number
    userId: string

}

@Injectable()
export class OpenCashRegister {
    constructor(private cashRegisterRepository:CashRegisterRepository) {}

    async execute({initialAmount, userId}: OpenCashRegisterRequest): Promise<CashRegister | null> {
        const cashRegister = new CashRegister({
            userId,
            openedAt: new Date(),
            initialAmount,
            isOpen: true
        })

        return await this.cashRegisterRepository.open(cashRegister).catch(err => {
            console.log(err)
            return null;
        })

    }

}