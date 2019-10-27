import {Dispatch} from "redux";
import {USER_LOGGED_IN, USER_LOGGED_OUT} from "../types/auth";
import authApi from '../../api/auth';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";

const userLoggedIn = ({tokens, user}: any) => ({
    type: USER_LOGGED_IN,
    tokens,
    user
});

const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

const loginAction = (loginData: any, dispatch: Dispatch) => {
    const {tokens} = loginData;
    localStorage.setItem("CMS_pro", tokens.accessToken);
    setAuthorizationHeader(tokens.accessToken);
    dispatch(userLoggedIn(loginData));
};

const logoutAction = (dispatch: Dispatch) => {
    localStorage.removeItem("CMS_pro");
    setAuthorizationHeader();
    dispatch(userLoggedOut());
};

export default {
    loginEmailAndPass:
        (emailAndPass: any) => (dispatch: Dispatch) => authApi.loginEmail(emailAndPass)
            .then(loginData => loginAction(loginData, dispatch)),

    loginAccessToken: (accessToken: string, dispatch: Dispatch) => authApi.loginAccessToken(accessToken)
        .then(loginData => loginAction(loginData, dispatch)),

    loginRefreshTokenAndEmail:
        (emailAndrefreshToken: string) => (dispatch: Dispatch) => authApi.loginRefreshTokenAndEmail(emailAndrefreshToken)
            .then(loginData => loginAction(loginData, dispatch)),

    confirmEmail:
        (confirmEmailToken: any) => (dispatch: Dispatch) => authApi.confirmEmail(confirmEmailToken)
            .then(loginData => loginAction(loginData, dispatch)),

    logout: () => (dispatch: Dispatch) => logoutAction(dispatch),
}
