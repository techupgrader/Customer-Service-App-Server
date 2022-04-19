import { addReducer } from 'reactn'

addReducer("signin", (global, dispatch, userObj) => {

    let user = { ...userObj };
    let token = userObj._token;

    window.localStorage.setItem("user", JSON.stringify(user));

    return {
        ...global,
        user: userObj,
        token,
    }
})
