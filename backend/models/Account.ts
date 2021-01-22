import {Table, Column, Model, HasMany, Index, IsEmail} from 'sequelize-typescript';
import {Record} from './Record';

@Table
export class Account extends Model {
    @Column
    name!: string;

    @IsEmail
    @Column
    email!: string;

    @Column
    password!: string;

    @Column
    @Index
    resetToken?: string;

    @Column
    resetTokenTimestamp?: Date;

    @HasMany(() => Record, { foreignKey: 'account_id' })
    records!: Record[];
}
