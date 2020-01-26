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
    steamId: string;
}

export interface FriendDTO extends AuditingDTO {
    User: UserDTO;
    Friend: UserDTO;
    friendId: number;
    accepted: boolean;
}

export interface CommentDTO extends AuditingDTO {
    commentId: number;
    User: UserDTO;
    Post: PostDTO;
    text: string;
    grade: number;
}

export interface CategoryDTO extends AuditingDTO {
    categoryId: number;
    name: string;
    imageLink: string;
}

export interface PostDTO extends AuditingDTO {
    postId: number;
    text: string;
    imageLink: string;
    title: string;
    User: UserDTO;
    Category: CategoryDTO;
    views: number;
    createAt: Date;
    updatedAt: Date;
}

export interface SteamUserDTO {
    avatar: string;
    profileUrl: string;
    createDate: string;
    nickname: string;
    realName: string;
    countryCode: string;
    level: number;
}

export interface SteamFriendUserDTO {
    nickname: string,
    avatar: string;
    url:string;
}

export interface SteamGameDTO {
    name: string,
    appID: string;
    playTime: string;
    playTime2: string;
    logoURL: string;
    iconURL: string;
}

export interface MessageDTO extends AuditingDTO {

}

export interface ConversationDTO {
}
