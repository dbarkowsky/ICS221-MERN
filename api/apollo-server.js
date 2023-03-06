import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './models/graphql-schema.js';
import MessagesAPI from './controllers/graphql-api-controller.js';

// Initialize server with created schemas and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Starting the server and getting url for log
const { url } = await startStandaloneServer(server, {
    context: async () => {
        const { cache } = server;
        return {
            // A new instance of the data source is created with each request,
            // passing in the server's cache.
            dataSources: {
                messagesAPI: new MessagesAPI({ cache })
            },
        };
    },
    listen: { port: 4000 }
});

console.log(`Server ready at ${url}`);