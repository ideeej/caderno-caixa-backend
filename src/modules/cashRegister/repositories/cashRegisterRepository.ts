import { CashRegister } from "../entities/CashRegister";

export abstract class CashRegisterRepository {
    abstract open(cashRegister: CashRegister): Promise<CashRegister | null>
    abstract close(cashRegister: CashRegister): Promise<CashRegister | null>
}