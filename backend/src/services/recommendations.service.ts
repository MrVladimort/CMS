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

export async function getRecommendations(steamUserId: number): Promise<number[]> {
    const authorizeToken = await authorize();
    try {
        return await axios.get(`http://anfatum.pythonanywhere.com/recommend/user/${steamUserId}`, {
            headers: {
                Authorization: `Token ${authorizeToken.token}`,
            },
        }).then((res) => res.data.games);
    } catch (e) {
        winstonLogger.error(e);
        throw new HttpError(418, "Recommendations service failed for userId " + steamUserId);
    }
}
