import {combineReducers} from 'redux';

import user from "./reducers/user";
import auth from "./reducers/auth";

export default combineReducers({
    user,
    auth
});
