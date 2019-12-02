import axios from 'axios';
import mainConfig from "../config";
import {IResponse, PostDTO} from "../types";

interface IPostResponse extends IResponse {
    post: PostDTO
}

interface IPostListResponse extends IResponse {
    posts: PostDTO[]
}

export default {
    getPost: (postId: string | number): Promise<IPostResponse> => axios.get(`${mainConfig.apiHost}/posts/${postId}`).then(res => res.data),
    getAllPosts: (): Promise<IPostListResponse> => axios.get(`${mainConfig.apiHost}/posts`).then(res => res.data),
    getUserPosts: (userId: string | number): Promise<IPostListResponse> => axios.get(`${mainConfig.apiHost}/posts/user/${userId}`).then(res => res.data),
    createPost: (postData: any): Promise<IPostResponse> => axios.post(`${mainConfig.apiHost}/posts`, {postData}).then(res => res.data),
    editPost: (postId: string | number, postData: any): Promise<IPostResponse> => axios.put(`${mainConfig.apiHost}/posts/${postId}`, postData).then(res => res.data),
    deletePost: (postId: string | number): Promise<void> => axios.delete(`${mainConfig.apiHost}/posts/${postId}`).then(res => res.data),
}
