import { ApolloClient, InMemoryCache } from '@apollo/client';
import {apiBase} from '../../URLs'

const createApolloClient = () => {
    return new ApolloClient({
        uri: apiBase, // Replace with your GraphQL endpoint
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;