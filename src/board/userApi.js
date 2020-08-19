import axios from 'axios';
import { DOMAIN } from './constant';


export async function loginApi(accountId, password) {
    try {
        return await axios.post(DOMAIN+'/api/users?type=LOGIN',
                {accountId: accountId, password: password});
    } catch (error) {
        const response = { data : {
                code : error.response.status,
                message: error.message
            }};
        return response;
    }
}

export async function joinApi(accountId, password) {
    try {
        return await axios.post(DOMAIN+'/api/users',
                {accountId: accountId, password: password});
    } catch (error) {
        const response = { data : {
                code : error.response.status,
                message: error.message
            }};
        return response;
    }
}

export async function logoutApi() {
    try {
        await axios.get(DOMAIN+'/logout');
    } catch (error) {
        /* error control */
    }
}
