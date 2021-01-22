import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import logger from 'morgan';
import config from 'config';
import database from './database';
import {ApolloServer, gql} from "apollo-server-express";

import schema from './schema';
import resolvers from './resolvers';

function getUser(token: string) {
    try {
        return (token ? jwt.verify(token, config.get('jwt_secret')) : null);
    } catch (error) {
        return null;
    }
}

database.sync().then(() => {
    const server = new ApolloServer({
        typeDefs: gql(schema),
        resolvers,
        context: ({ req }) => {
            const token = req.get('Authorization') || '';
            return { user: getUser(token.replace('Bearer ', '')), db: database.models };
        },
        introspection: true,
        playground: true
    } as any);

    const app = express();
    app.use(cors());
    app.use(logger('dev'));
    server.applyMiddleware({app});

    app.listen({ port: config.get("port") }, () =>
        console.log(`# Server ready at http://localhost:${config.get("port")}${server.graphqlPath}`)
    );
});
