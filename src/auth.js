import { katya_get, katya_post } from "./http.js";

const url = "https://katya.sandyuraz.com:32000/api";
// const url = 'http://127.0.0.1:32000/api'

function getCookie(what) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${what}=`);
        if (parts.length === 2) {
                return parts.pop().split(";").shift();
        }
}

function setCookie(what) {
        document.cookie = `user=${what};max-age=172800;path=/;SameSite=None;Secure`;
}

function encode(user, pass) {
        return btoa(user + ":" + pass);
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
                                                setCookie(auth_token);
                                                resolve(true);
                                        }
                                }
                        );
                } else {
                        resolve(false);
                }
        });
}

function logout() {
        setCookie("");
}

export const encode_user = encode;
export const check_cookie = check;
export const login_user = login;
export const logout_user = logout;
