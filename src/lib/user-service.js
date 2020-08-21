import axios from 'axios';

class User {
    constructor() {
        this.user = axios.create({
            baseURL: 'http://localhost:4000/api',
            withCredentials: true,
        });
    };

    getOne(){
        return this.user
        .get('/myprofile')
        .then(({data}) => data);
    }

    updateOne(userUpdated) {
        return this.user
        .put('/myprofile/edit', userUpdated)
        .then(({data}) => data)
    }
}

const userService = new User();
export default userService;