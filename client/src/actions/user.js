import * as types from './types';
import UserService from '../services/userService';

export const login = (address) => (dispatch) => {
    console.log(address);
    return UserService.login(address).then(
        (response) => {
            dispatch({
                type: types.LOGIN_USER,
                payload: response.data.user
            });

            return Promise.resolve();
        },

        (error) => {
            const message = (error.response &&
                             error.response.data &&
                             error.response.data.message) ||
                             error.message ||
                             error.toString();
            dispatch({
                type: types.SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    );
}

export const logout = () => (dispatch) => {
    return dispatch({
        type: types.LOGOUT_USER
    });
}

export const updateUser = (user) => (dispatch) => {
    return UserService.updateUser(user).then(
        (response) => {
            console.log(response.data.message);
            dispatch(login({ address: user.address }));
            dispatch({
                type: types.SET_MESSAGE,
                payload: response.data.message
            });
            window.location.href = '/';

            return Promise.resolve();
        },
        
        (error) => {
            const message = (error.response &&
                             error.response.data &&
                             error.response.data.message) ||
                             error.message ||
                             error.toString();
            dispatch({
                type: types.SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    );
}