// Defines schema for messages, including what's expected from POST and GET requests
// Note for Query -> If no parameters are required, don't put (). It causes failure to start server.
const typeDefs = `#graphql
    """
    A Message contains a name and a msgText
    """

    type Message {
        id: ID!
        name: String!
        msgText: String!
    }

    input MessageInput {
        name: String!
        msgText: String!
    }

    "This schema allows the following query:"
    type Query {
        messages : [Message!]!
    }

    "Schema allows the following mutation:"
    type Mutation {
        addMessage(message: MessageInput): Message!
    }
`
// Defines how these schema are used
const resolvers = {
    Query: {
        messages: async (_, __, { dataSources }) => {
            return dataSources.messagesAPI.messages();
        }
    },
    Mutation: {
        addMessage: async (_, { message }, { dataSources }) => {
            return dataSources.messagesAPI.addMessage(message);
        }
    }
}

export { typeDefs, resolvers };