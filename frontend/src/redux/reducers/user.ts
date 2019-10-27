import {USER_LOGGED_IN, USER_LOGGED_OUT} from "../types/auth";
import {USER_UPDATED} from "../types/user";

export default (state: any = {}, action: any = {}) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.user;
        case USER_LOGGED_OUT:
            return {};
        case USER_UPDATED:
            return action.user;
        default: return state;
    }
}