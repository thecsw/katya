import { url } from "./const.js";
import { make_token } from "./auth.js";
import { katya_get } from "./http.js";
import { credentials } from "./stores.js";

let user;
credentials.subscribe((value) => {
        user = value;
});

function get_sources() {
        return new Promise((resolve) => {
                katya_get(
                        url + "/sources",
                        make_token(user)
                ).then((data) => {
                        if (data[0] === 200) {
                                resolve(data[1]);
                        } else {
                                resolve([]);
                        }
                });
        });
}

export const getSources = get_sources;
