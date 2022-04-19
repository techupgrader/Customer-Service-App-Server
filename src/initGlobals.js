import { setGlobal } from "reactn";
import { getCookie } from "./lib/cookies";

const getJsonItem = (key) => {
    const val = window.localStorage.getItem(key);
    if (!val) {
        return null;
    }
    return JSON.parse(val);
};

export async function init() {
    try {
        let user = window.localStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
        }

        setGlobal({
            user: getJsonItem("user"),
            token: getCookie("token") || null,

        });
    } catch (err) {
        console.log(err);
    }
}
