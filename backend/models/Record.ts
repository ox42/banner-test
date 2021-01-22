import {Table, Column, Model, BelongsTo} from 'sequelize-typescript';
import {Account} from './Account';

@Table
export class Record extends Model {

    @Column
    title!: string;

    @Column
    description!: string;

    @BelongsTo(() => Account, { foreignKey: 'account_id' })
    account!: Account;
}
