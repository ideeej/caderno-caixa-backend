import { CashRegister } from "../entities/CashRegister";
import { CashRegisterRepository } from "./cashRegisterRepository";

export class FakeCashRegisterRepository implements CashRegisterRepository {
    public cashRegisters: CashRegister[] = [];

    async open(cashRegister: CashRegister): Promise<CashRegister | null> {
        const result = this.cashRegisters.push(cashRegister);
        return new Promise((resolve, reject) => {
            
            if(result === 1) {
                resolve(cashRegister)
            }
             else {
                reject(null)
             }
            
        })
    }

    async close (cashRegister: CashRegister): Promise<CashRegister | null> {
        return new Promise((resolve, reject) => {
            const registerIndexToClose = this.cashRegisters.findIndex(register => (register.id === cashRegister.id))
            if(this.cashRegisters[registerIndexToClose]) {
                this.cashRegisters.splice(registerIndexToClose, 1);
                resolve(cashRegister)
            } else {
                reject(null)
            }
        })

    }

}