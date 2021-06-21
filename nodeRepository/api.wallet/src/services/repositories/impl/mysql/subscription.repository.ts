import { SubscriptionRepository } from './../../subscriptionRepository';


import connector from '../../../../common/persistence/mysql.persistence';
import { Subscription } from '../../domain/subscriptions';

export class SubscriptionRepositoryImpl implements SubscriptionRepository {

    public async all(): Promise<Subscription[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM wallet_subscription ORDER BY id DESC'
        );
        return rows as Subscription[];
    }

    public async find(id: number): Promise<Subscription | null> {
        const [rows]: any = await connector.execute(
            'SELECT * FROM wallet_subscription where id = ?',
            [id]
        );
        if (rows.length) {
            return rows[0] as Subscription;
        }
        return null;
    }


    public async store(entry: Subscription): Promise<void> {

        const date = new Date();

        await connector.execute(
            'INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES (?,?,?,?,?)',
            [entry.user_id, entry.code, entry.amount, entry.cron, date]
        )
    }


    public async update(entry: Subscription): Promise<void> {

        const date = new Date();

        await connector.execute(
            'UPDATE wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? where user_id = ?',
            [entry.user_id, entry.code, entry.amount, entry.cron, date, entry.user_id]
        )
    }


    public async delete(id: number): Promise<void> {
        await connector.execute(
            'DELETE FROM wallet_subscription WHERE user_id = ?',
            [id]
        )
    }


    public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null>{
        const [rows]: any = await connector.execute(
            'SELECT * FROM wallet_subscription where user_id = ? and code = ?',
            [user_id, code]
        );
        if (rows.length) {
            return rows[0] as Subscription;
        }
        return null;
    }
}

