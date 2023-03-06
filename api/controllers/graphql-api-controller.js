import { RESTDataSource } from '@apollo/datasource-rest';

// This wraps the old REST API with GraphQL
class MessagesAPI extends RESTDataSource {
    baseURL = 'http://localhost:3004/api/';

    async getMessages() {
        return this.get('messages');
    }

    async addMessage(message) {
        return this.post('messages',
            { body: message }
        );
    }
}

export default MessagesAPI;