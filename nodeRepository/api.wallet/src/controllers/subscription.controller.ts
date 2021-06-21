import { GET, POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import { SubscriptionService } from '../services/subscription.service';

@route('/subscriptions')
export class SubscriptionController {


    constructor(private readonly subscriptionService: SubscriptionService) {

    }

    @GET()
    public async all(req: Request, res: Response) {


        res.send(await this.subscriptionService.all());
    }


    //Ex: subscriptions/1

    @route(':id')
    @GET()
    public async find(req: Request, res: Response) {
    
        const id = parseInt(req.params.id);

        res.send(await this.subscriptionService.find(id));
    }

       //Ex: subscriptions/1

       @route(':id')
       @POST()
       public async store(req: Request, res: Response) {
       
        
        await this.subscriptionService.store({
            user_id: req.body.user_id,
            code: req.body.code,
            amount: req.body.amount,
            cron: req.body.cron
        } as SubscriptionCreateDto);

       }



}