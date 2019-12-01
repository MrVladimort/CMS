import axios from 'axios';
import mainConfig from "../config";
import {IResponse, UserDTO} from "../types";

interface IUserResponse extends IResponse {
    user: UserDTO
}

export default {
    getAnotherUser: (id: string | number): Promise<IUserResponse> => axios.get(`${mainConfig.apiHost}/users/${id}`).then(res => res.data),
    addToFriends: (id: string | number): Promise<IUserResponse> => axios.post(`${mainConfig.apiHost}/friends/${id}`).then(res => res.data),
}
