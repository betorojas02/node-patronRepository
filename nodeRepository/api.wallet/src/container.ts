import { SubscriptionService } from './services/subscription.service';
import { SubscriptionRepositoryImpl } from './services/repositories/impl/mysql/subscription.repository';
import express = require('express');
import { TestService } from './services/test.services';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
export default (app: express.Application) => {

    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({

        //repositories
        subscriptionsRepository: asClass(SubscriptionRepositoryImpl).scoped(),

        //services

        subscriptionService: asClass(SubscriptionService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));

};