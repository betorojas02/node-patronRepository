import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/controllers/base.controller';
import { MovementCreateDto } from '../dtos/movement.dto';
import { MovementService } from '../services/movement.service';
import { SubscriptionService } from '../services/subscription.service';

@route('/movements')
export class MovementController extends BaseController {


    constructor(private readonly movementService: MovementService) {

        super();
    }

    @GET()
    public async all(req: Request, res: Response) {

        try {
            res.send(await this.movementService.all());
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


            const result = await this.movementService.find(id);
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

            await this.movementService.store({
                type: req.body.type,
                amount: req.body.amount, 
                user_id: req.body.user_id
            } as MovementCreateDto);
            res.status(200).json(req.body);
        } catch (error) {

            this.handleException(error, res);
        }

    }



   



}