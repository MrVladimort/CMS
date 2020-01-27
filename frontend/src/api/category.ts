import axios from 'axios';
import mainConfig from "../config";

export default {
    getCategories: () => axios.get(`${mainConfig.apiHost}/categories`).then(res => res.data),
}
