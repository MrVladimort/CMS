import {USER_LOGGED_IN, USER_LOGGED_OUT} from "../types/auth";

export default (state: any = {}, action: any = {}) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {tokens: action.tokens};
        case USER_LOGGED_OUT:
            return {};
        default: return state;
    }
}