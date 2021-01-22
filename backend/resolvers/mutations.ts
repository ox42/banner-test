import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from "config";
import moment from 'moment';

import { AuthenticationError, UserInputError } from "apollo-server-express";

function generateAuthPayload(account: { id, email, name }) {
    const token = jwt.sign(
        {
            id: account.id,
            name: account.name,
            email: account.email
        },
        config.get('jwt_secret'),
        { expiresIn: '7d'}
    );

    return {
        token, account
    };
}

export default {
    signIn: async (_, { email, password }, { db }) => {

        const account = await db.Account.findOne({
                where: {
                    email: email
                }
            });

        if (!account) {
            throw new UserInputError('Invalid email address.');
        }


        const validPassword = await bcrypt.compare(password, account.password)
        if (!validPassword) {
            throw new UserInputError('Invalid password.')
        }

        return generateAuthPayload(account);
    },

    register: async (_, { name, email, password }, { db }) => {

        const accountWithEmail = await db.Account.findOne({
            where: {
                email: email
            }
        });

        if (accountWithEmail) {
            throw new UserInputError('An account with that email already exists.');
        }

        const account = await db.Account.create({
            name,
            email,
            password: (await bcrypt.hash(password, 10))
        });

        return generateAuthPayload(account);
    },

    requestResetToken: async (_, { email }, { db }) => {

        const account = await db.Account.findOne({
            where: {
                email: email
            }
        });

        if (!account) {
            throw new UserInputError('Invalid email address.');
        }

        if (account.resetToken && moment().diff(account.resetTokenTimestamp, 'hours') < 24) {
            throw new UserInputError('You have already asked to reset your password. Please check your email.');
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        account.resetToken = resetToken;
        account.resetTokenTimestamp = new Date();
        await account.save();

        return {
            token: resetToken
        }
    },

    resetPasswordWithToken: async (_, { password, token }, { db }) => {

        const account = await db.Account.findOne({
            where: {
                resetToken: token
            }
        });

        if (!account) {
            throw new UserInputError('Invalid reset token.');
        }

        if (moment().diff(account.resetTokenTimestamp, 'hours') >= 24) {
            throw new UserInputError('The reset token has expired. Please ask for a new one.');
        }

        account.password = await bcrypt.hash(password, 10);
        account.resetToken = null;
        account.resetTokenTimestamp = null;
        await account.save();

        return generateAuthPayload(account);
    },

    addRecord: async (_, { title, description }, { user, db }) => {

        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }

        const record = await db.Record.create({
            title,
            description,
            account_id: user.id
        });

        return await db.Record.findByPk(record.id, {
            include: [{ model: db.Account }]
        });
    }
};
