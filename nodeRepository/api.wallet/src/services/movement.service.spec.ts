import assert = require('assert');
import { MovementCreateDto } from "../dtos/movement.dto";
import { MovementService } from "./movement.service";
import { BalanceRepositoryImplMock } from "./repositories/impl/mock/balance.repository";
import { MovementRepositoryImplMock } from "./repositories/impl/mock/movement.repository";




const movementService = new MovementService(new MovementRepositoryImplMock(), new BalanceRepositoryImplMock());

describe("Movement Service", () => {
    describe("Store", () => {
        it("tries to register an income movement", async () => {
            await movementService.store({
                user_id: 1,
                type: 0,
                amount: 200
            } as MovementCreateDto)
        });

        it("tries to register an outcome movement", async () => {
            await movementService.store({
                user_id: 1,
                type: 1,
                amount: 200
            } as MovementCreateDto)
        });

        it("tries to register an outcome movement with insufficient balance", async () => {
            try {
                await movementService.store({
                    user_id: 1,
                    type: 1,
                    amount: 200
                } as MovementCreateDto)
            } catch (error) {
                assert.strictEqual(error.message, "User does not have enough balance");


            }

        });

        it("tries to register an unexpected movement", async () => {
            try {
                await movementService.store({
                    user_id: 1,
                    type: 3,
                    amount: 200
                } )
            } catch (error) {
                assert.strictEqual(error.message, "Invalid moment type supplied");


            }
        });



    });
});