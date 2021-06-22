import { SubscriptionService } from './services/subscription.service';
import { SubscriptionRepositoryImpl } from './services/repositories/impl/mysql/subscription.repository';
import express = require('express');
import { TestService } from './services/test.services';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { MovementRepositoryImpl } from './services/repositories/impl/mysql/movement.repository';
import { MovementService } from './services/movement.service';
import { BalanceRepositoryImpl } from './services/repositories/impl/mysql/balance.repository';
export default (app: express.Application) => {

    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({

        //repositories
        subscriptionsRepository: asClass(SubscriptionRepositoryImpl).scoped(),
        movementRepository: asClass(MovementRepositoryImpl).scoped(),
        balanceRepository: asClass(BalanceRepositoryImpl).scoped(),
        //services

        movementService: asClass(MovementService).scoped(),
        subscriptionService: asClass(SubscriptionService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));

};