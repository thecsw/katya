import { url } from "./const.js";
import { katya_post } from "./http.js";
import { credentials } from "./stores.js";

function getCookie(what) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${what}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
}

function encode(user, pass) {
        return btoa(user + ":" + pass);
}

function makeToken(user) {
        return "Basic " + encode(user.user, user.pass);
}

function breakToken(token) {
        const val = atob(token.split("Basic ")[1]).split(":");
        return { user: val[0], pass: val[1] };
}

function check() {
        return login(getCookie("user"));
}

function login(auth_token) {
        return new Promise((resolve) => {
                if (auth_token !== "" && typeof auth_token !== "undefined") {
                        katya_post(url + "/auth", {}, auth_token).then(
                                (data) => {
                                        if (data[0] === 200) {
                                                credentials.set(
                                                        breakToken(auth_token)
                                                );
                                                resolve(true);
                                        }
                                }
                        );
                } else {
                        logout();
                        resolve(false);
                }
        });
}

function logout() {
        document.cookie = "user=";
}

export const encode_user = encode;
export const make_token = makeToken;
export const check_cookie = check;
export const login_user = login;
export const logout_user = logout;
export const get_cookie = getCookie;
