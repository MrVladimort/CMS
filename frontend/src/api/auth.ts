import axios from 'axios';
import mainConfig from "../config";

export default {
    loginEmail: (credentials: any) => axios.post(`${mainConfig.apiHost}/auth/email`, credentials).then(res => res.data),
    loginAccessToken: (accessToken: string) => axios.post(`${mainConfig.apiHost}/auth/token`, {accessToken}).then(res => res.data),
    loginRefreshTokenAndEmail: (tokenAndEmail: any) => axios.post(`${mainConfig.apiHost}/auth/refresh-token`, tokenAndEmail)
        .then(res => res.data),

    register: (registerData: any) => axios.post(`${mainConfig.apiHost}/register`, registerData).then(res => res.data),
    confirmEmail: (token: string) => axios.get(`${mainConfig.apiHost}/register/confirm-email/${token}`).then(res => res.data),
}
