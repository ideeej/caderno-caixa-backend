import { makeUser } from "src/modules/user/factories/userFactory";
import { FakeCashRegisterRepository } from "../../repositories/fakeCashRegisterRepository"

import { User } from "src/modules/user/entities/User";

import { CloseCashRegister } from "./closeCashRegister";
import { OpenCashRegister } from "../openCashRegister/openCashRegister";
import { CashRegister } from "../../entities/CashRegister";

let fakeCashRegisterRepository : FakeCashRegisterRepository;

let closeCashRegister: CloseCashRegister;
let openCashRegister : OpenCashRegister;

let user: User;

describe("Close Cash Register", () => {
    beforeEach(() => {
        fakeCashRegisterRepository = new FakeCashRegisterRepository()
        closeCashRegister = new CloseCashRegister(fakeCashRegisterRepository)
        openCashRegister = new OpenCashRegister(fakeCashRegisterRepository)
        user = makeUser({})

    })

    it("Should close a cash register.", async () => {
        const cashRegister = await openCashRegister.execute({
            initialAmount: 1000,
            userId: user.id
        })

        expect(fakeCashRegisterRepository.cashRegisters).toEqual([cashRegister])

        await closeCashRegister.execute(cashRegister!)

        expect(fakeCashRegisterRepository.cashRegisters).toEqual([])
    })
})