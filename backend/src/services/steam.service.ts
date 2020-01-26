import steamConfig from "../configs/steam.config";
// tslint:disable-next-line:no-var-requires
const SteamApi = require("steamapi");
const steam = new SteamApi(steamConfig.key);
import {winstonLogger} from "./logger.service";
import * as recommendationService from "./recommendations.service";

export const getSteamID64 = (userId: string) => steam.resolve(steamConfig.IdUrl + userId);

export const getUserData = (userId: string) => steam.getUserSummary(userId);

export const getConvertedUserData = async (userId: string) => {
    const userData = await getUserData(userId);
    const steamLevel = await steam.getUserLevel(userId);
    const createDate = new Date(userData.created * 1000);

    return {
        avatar: userData.avatar.large,
        profileUrl: userData.url,
        createDate: createDate.getFullYear(),
        nickname: userData.nickname,
        realName: userData.realName,
        countryCode: userData.countryCode ? userData.countryCode.toLowerCase() : "en",
        level: steamLevel,
    };
};

export const getAvatarAndURL = async (userId: string) => {
    const ID64 = await getSteamID64(userId);
    const user = await getUserData(ID64);
    return {
        nickname: user.nickname,
        avatar: user.avatar.large,
        url: user.url,
    };
};

export const getFriends = async (userId: string) => {
    const ID64 = await getSteamID64(userId);
    const friends = await steam.getUserFriends(ID64);
    const convertedFriends = new Array();

    await Promise.all(friends.slice(0, 48).map(async (friend: any) => {
        const user = await getAvatarAndURL(friend.steamID);
        convertedFriends.push(user);
    }));

    return convertedFriends;
};

// change size to Enum small, medium, large
export const getUserAvatar = async (userId: string, size: string) => {
    const user = await getUserData(userId);
    return user.avatar[size];
};

export const getUserFriends = (userId: string) => steam.getUserFriends(userId);

export const getRecentlyPlayedGames = (userId: string) => steam.getUserRecentGames(userId);

export const getUserStats = (userId: string, appId: number) => steam.getUserStats(userId, appId);

export const getUserOwnedGames = (userId: string) => steam.getUserOwnedGames(userId);

export const getGamesRecommendations = async (userId: string) => {
    const ID64 = await getSteamID64(userId);
    const gamesIds = await recommendationService.getGamesRecommendations(ID64);
    const gamesResponseWithNulls =  await Promise.all(gamesIds.map(async (gameId: number) => getGameDetails(gameId)));
    return gamesResponseWithNulls.filter((game: any) => game);
};

export const getUserRecommendations = async (userId: string) => {
    const ID64 = await getSteamID64(userId);
    const gamesIds = await recommendationService.getUserRecommendations(ID64);
    return await Promise.all(gamesIds.map(async (gameId: number) => getGameDetails(gameId)).filter((game: any) => game != null));
};

const getGameDetails = async (gameId: number) => {
    try {
        return await steam.getGameDetails(gameId);
    } catch (e) {
        return null;
    }
};
