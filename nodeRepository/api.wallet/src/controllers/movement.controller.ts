import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/controllers/base.controller';
import { SubscriptionService } from '../services/subscription.service';

@route('/subscriptions')
export class SubscriptionController extends BaseController {


    constructor(private readonly subscriptionService: SubscriptionService) {

        super();
    }

    @GET()
    public async all(req: Request, res: Response) {

        try {
            res.send(await this.subscriptionService.all());
        } catch (error) {

            this.handleException(error, res);
        }


    }


    //Ex: subscriptions/1

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);


            const result = await this.subscriptionService.find(id);
            if (result) {

                res.send(result);
            } else {
                res.status(404).send();
            }
            res.send();

        } catch (error) {

            this.handleException(error, res);
        }
    }

    //Ex: subscriptions/1

    @POST()
    public async store(req: Request, res: Response) {
        try {

            await this.subscriptionService.store({
                user_id: req.body.user_id,
                code: req.body.code,
                amount: req.body.amount,
                cron: req.body.cron
            } as SubscriptionCreateDto);
            res.status(200).json(req.body);
        } catch (error) {

            this.handleException(error, res);
        }

    }



    //Ex: subscriptions/1
    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.subscriptionService.update(id, {

                code: req.body.code,
                amount: req.body.amount,
                cron: req.body.cron
            } as SubscriptionUpdateDto);

            res.status(200).json(req.body);

        } catch (error) {

            this.handleException(error, res);
        }

    }



    @route('/:id')
    @DELETE()
    public async remove(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            res.send(await this.subscriptionService.remove(id));

        } catch (error) {

            this.handleException(error, res);
        }
    }



}