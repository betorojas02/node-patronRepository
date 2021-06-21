import { TestService } from './../services/test.services';
import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';

@route('/check')
export class CheckController {
    constructor(private readonly testService: TestService){

    }


    @route('/test')
    @GET()
    public index(req: Request, res: Response): void {

        const a  = this.testService.get();
        
        res.send(a);

        
    }

}