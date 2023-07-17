import axios from 'axios';

const userApi = '/api/user/';

const login = (address) => {
    return axios.post(userApi+'login', { address })
};

const logout = () => {
    localStorage.removeItem('auth');
};

const startFlip = () => {
    return axios.post(userApi+'flip');
}

const updateUser = (user) => {
    return axios.post(userApi+'update', { user });
}

export default {
    login,
    logout,
    startFlip,
    updateUser
}