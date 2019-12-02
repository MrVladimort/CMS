import axios from "axios";
import mainConfig from "../config";

export default {
    authSteam: () => axios.get(`${mainConfig.apiHost}/steam/auth`).then(res => res.data),
    getUserData: (userId: string | number) => axios.get(`${mainConfig.apiHost}/steam/${userId}`).then(res => res.data),
    getLastPlayedGames: (userId: string | number) => axios.get(`${mainConfig.apiHost}/steam/games/recently/${userId}`).then(res => res.data),
    getOwnedGames: (userId: string | number) => axios.get(`${mainConfig.apiHost}/steam/games/owned/${userId}`).then(res => res.data),
    getRecommendations: (userId: string | number) => axios.get(`${mainConfig.apiHost}/steam/games/recommendations/${userId}`).then(res => res.data),
}
