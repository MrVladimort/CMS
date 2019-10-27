export interface UserDTO {
    userId: number;
    name: string;
    surname: string;
    email: string;
    userType: number;
}

export interface CommentDTO {

}

export interface PostDTO {
    postId: number | string
    comments: CommentDTO[]
}

export interface MessageDTO {

}
