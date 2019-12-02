import axios from 'axios';
import mainConfig from "../config";
import {FriendDTO, IResponse, UserDTO} from "../types";

interface IUserResponse extends IResponse {
    user: UserDTO
}

interface IFriendsResponse extends IResponse {
    friends: Array<FriendDTO>
}

interface IFriendResponse extends IResponse {
    friend: FriendDTO
}

export default {
    getAnotherUser: (id: string | number): Promise<IUserResponse> => axios.get(`${mainConfig.apiHost}/users/${id}`).then(res => res.data),
    addToFriends: (id: string | number): Promise<IFriendResponse> => axios.post(`${mainConfig.apiHost}/friends/${id}`).then(res => res.data),
    getFriends: (): Promise<IFriendsResponse> => axios.get(`${mainConfig.apiHost}/friends`).then(res => res.data),
    getFriendsRequest: (): Promise<IFriendsResponse> => axios.get(`${mainConfig.apiHost}/friends/requests`).then(res => res.data),
    acceptFriendRequest: (id: string | number): Promise<IFriendResponse> => axios.put(`${mainConfig.apiHost}/friends/${id}`).then(res => res.data),
    deleteFriend: (id: string | number): Promise<IResponse> => axios.delete(`${mainConfig.apiHost}/friends/${id}`).then(res => res.data),
}
