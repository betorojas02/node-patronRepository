import { ApplicationException } from './../common/exceptions/aplication.exception';
import { Subscription } from './repositories/domain/subscriptions';
import { SubscriptionRepository } from './repositories/subscriptionRepository';
export class SubscriptionService {
    constructor(private readonly subscriptionsRepository: SubscriptionRepository) {

    }

    public async find(id: number): Promise<Subscription | null> {
        return await this.subscriptionsRepository.find(id);
    }

    public async all(): Promise<Subscription[]> {

        return await this.subscriptionsRepository.all();
    }

    public async store(entry: SubscriptionCreateDto): Promise<void> {


        const originalEntry = await this.subscriptionsRepository.findByUserAndCode(entry.user_id, entry.code);

        if (!originalEntry) {
            this.subscriptionsRepository.store(entry as Subscription);
        } else {
            throw new ApplicationException('User subscriptions already exists');
        }
    }
    /**
     *
     *
     * @param {number} id
     * @param {SubscriptionUpdateDto} entry
     * @return {*}  {Promise<void>}
     * @memberof SubscriptionService
     */
    public async update(id: number, entry: SubscriptionUpdateDto): Promise<void> {

        let originalEntry = await this.subscriptionsRepository.find(id);
        if (originalEntry) {
            originalEntry.code = entry.code;
            originalEntry.amount = entry.amount;
            originalEntry.cron = entry.cron;
            this.subscriptionsRepository.update(originalEntry);
        } else {
            throw new ApplicationException('subscriptions not found');
        }
    }



    public async remove(id: number): Promise<void> {
        return await this.subscriptionsRepository.delete(id);

    }




}