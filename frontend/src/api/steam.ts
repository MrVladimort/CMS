import axios from "axios";
import mainConfig from "../config";

export default {
    getUserData: (userId: string | number) => axios.get(`${mainConfig.apiHost}/steam/${userId}`).then(res => res.data),
    getLastPlayedGames: (userId: string | number) => axios.get(`${mainConfig.apiHost}/steam/games/recently/${userId}`).then(res => res.data),
}
