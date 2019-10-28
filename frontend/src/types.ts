export interface IResponse {
    status: number,
    success: boolean,
}

interface AuditingDTO {
    createdAt: Date
    updatedAt: Date
}

export interface UserDTO extends AuditingDTO {
    userId: number;
    name: string;
    surname: string;
    email: string;
    userType: number;
}

export interface CommentDTO extends AuditingDTO {
    commentId: number;
    User: UserDTO;
    Post: PostDTO;
    text: string;
    grade: number;
}

export interface PostDTO extends AuditingDTO {
    postId: number;
    text: string;
    imageLink: string;
    title: string;
    User: UserDTO;
    views: number;
}

export interface MessageDTO extends AuditingDTO {

}
