import axios from "axios";
import HttpError from "../errors/http.error";
import {winstonLogger} from "./logger.service";

export async function authorize(): Promise<any> {
    try {
        return await axios.post("http://anfatum.pythonanywhere.com/authenticate/login", {
            username: "anfatum",
            password: "Epsilon123",
        }).then((res) => res.data);
    } catch (e) {
        winstonLogger.error(e);
        throw new HttpError(418, "Recommendations service auth failed");
    }
}

export async function getUserRecommendations(steamUserId: number): Promise<number[]> {
    return await axios.get(`http://anfatum.pythonanywhere.com/recommend/users/${steamUserId}`).then((res) => res.data.games);
}

export async function getGamesRecommendations(steamUserId: number): Promise<number[]> {
    return await axios.get(`http://anfatum.pythonanywhere.com/recommend/games/${steamUserId}`).then((res) => res.data.games);
}
