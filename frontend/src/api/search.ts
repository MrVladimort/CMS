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
    searchPosts: (title: string): Promise<IPostListResponse> => axios.get(`${mainConfig.apiHost}/search/post`, {params: {title}}).then(res => res.data),
}
