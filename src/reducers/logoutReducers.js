import { addReducer } from 'reactn'

addReducer("logout", (global, dispatch) => {

    window.localStorage.clear();
    setCookie("token", null);

    return { ...global, user: null, token: null };
});