import axios from 'axios';
import mainConfig from "../config";
import {CommentDTO, IResponse} from "../types";

interface ICommentResponse extends IResponse {
    comment: CommentDTO
}

interface ICommentListResponse extends IResponse {
    comments: CommentDTO[]
}

export default {
    getAllCommentsByPostId: (postId: string | number): Promise<ICommentListResponse> => axios.get(`${mainConfig.apiHost}/comments/post/${postId}`).then(res => res.data),
    getAllComments: (): Promise<ICommentListResponse> => axios.get(`${mainConfig.apiHost}/comments`).then(res => res.data),
    getComment: (commentId: string | number): Promise<ICommentResponse> => axios.get(`${mainConfig.apiHost}/comments/${commentId}`).then(res => res.data),
    createComment: (commentData: any, postId: number): Promise<ICommentResponse> => axios.post(`${mainConfig.apiHost}/comments`, commentData, {params: {postId}}).then(res => res.data),
    editComment: (commentId: string | number, commentData: any): Promise<ICommentResponse> => axios.put(`${mainConfig.apiHost}/comments/${commentId}`, commentData).then(res => res.data),
    deleteComment: (commentId: string | number): Promise<IResponse> => axios.delete(`${mainConfig.apiHost}/comments/${commentId}`).then(res => res.data),
}
