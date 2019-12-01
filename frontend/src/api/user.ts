import axios from 'axios';
import mainConfig from "../config";
import {FriendDTO, IResponse, UserDTO} from "../types";

interface IUserResponse extends IResponse {
    user: UserDTO
}

interface IFriendResponse extends IResponse {
    friends: Array<FriendDTO>
}

export default {
    getAnotherUser: (id: string | number): Promise<IUserResponse> => axios.get(`${mainConfig.apiHost}/users/${id}`).then(res => res.data),
    addToFriends: (id: string | number): Promise<IUserResponse> => axios.post(`${mainConfig.apiHost}/friends/${id}`).then(res => res.data),
    getFriends: (): Promise<IFriendResponse> => axios.get(`${mainConfig.apiHost}/friends`).then(res => res.data),
    getFriendsRequest: (): Promise<IFriendResponse> => axios.get(`${mainConfig.apiHost}/friends/requests`).then(res => res.data),
}
