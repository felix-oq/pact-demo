import axios from 'axios';
import { User } from './user';

class API {

    url: string;

    constructor(url : string) {
        this.url = url;
    }

    async getUsers() : Promise<User[]> {
        const response = await axios.get('/api/users', {
            baseURL: this.url,
        });
        return response.data;
    }

    async getUser(id: number) : Promise<User> {
        const response = await axios.get(`api/users/${id}`, {
            baseURL: this.url
        });
        return response.data;
    }

    async addUser(name: String, email: String) : Promise<User> {
        const response = await axios.post('api/users/', {
            baseURL: this.url,
            data: {name, email},
        });
        return response.data;
    }

    async updateUser(id: number, name: String, email: String) : Promise<User> {
        const response = await axios.put(`api/users/${id}`, {
            baseURL: this.url,
            data: {name, email},
        });
        return response.data;
    }

    async deleteUser(id: number) : Promise<void> {
        const response = await axios.put(`api/users/${id}`, {
            baseURL: this.url
        });
        return response.data;
    }
}

export {API};