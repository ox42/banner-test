import { AuthenticationError } from "apollo-server-express";

export default {

    me: async (_, args, { user, db }) => {

        if (!user) {
            throw new AuthenticationError('You are not authenticated.')
        }

        const account = await db.Account.findByPk(user.id);
        return account;
    },

    records: async (_, args, { user, db }) => {

        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }

        const records = await db.Record.findAll({
            include: [{ model: db.Account }]
        });

        return records;
    }
};
