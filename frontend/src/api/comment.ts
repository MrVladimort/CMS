import axios from 'axios';
import mainConfig from "../config";

export default {
    getAllCommentsByEventId: (postId: string | number) => axios.get(`${mainConfig.apiHost}/comments/post/${postId}`).then(res => res.data),
    getAllComments: () => axios.get(`${mainConfig.apiHost}/comments`).then(res => res.data),
    getComment: (commentId: string | number) => axios.get(`${mainConfig.apiHost}/comments/${commentId}`).then(res => res.data),
    createComment: (commentData: any, postId: number) => axios.post(`${mainConfig.apiHost}/comments`, commentData, {params: {postId}}).then(res => res.data),
    editComment: (commentId: string | number, commentData: any) => axios.put(`${mainConfig.apiHost}/comments/${commentId}`, commentData).then(res => res.data),
    deleteComment: (commentId: string | number) => axios.delete(`${mainConfig.apiHost}/comments/${commentId}`).then(res => res.data),
}
