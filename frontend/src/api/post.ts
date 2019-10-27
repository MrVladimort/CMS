import axios from 'axios';
import mainConfig from "../config";

export default {
    getPost: (postId: string | number) => axios.get(`${mainConfig.apiHost}/posts/${postId}`).then(res => res.data),
    getAllPosts: () => axios.get(`${mainConfig.apiHost}/posts`).then(res => res.data),
    createPost: (postData: any) => axios.post(`${mainConfig.apiHost}/event`, {postData}).then(res => res.data),
    editPost: (postId: string | number, postData: any) => axios.put(`${mainConfig.apiHost}/posts/${postId}`, postData).then(res => res.data),
    deletePost: (postId: string | number) => axios.delete(`${mainConfig.apiHost}/posts/${postId}`).then(res => res.data),
}
