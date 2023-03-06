import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://10.21.75.107:4000',
    cache: new InMemoryCache(),
});

export default client;