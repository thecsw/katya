import { url } from "./const.js";
import { katya_get } from "./http.js";
import { make_token } from "./auth.js";
import { credentials } from "./stores.js";

let user;
credentials.subscribe((value) => {
        user = value;
});

function doHitSearch(source) {
        return new Promise((resolve) => {
                katya_get(
                        url + "/frequencies?source=" + source,
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

function doSearch(query, part) {
        return new Promise((resolve) => {
                katya_get(
                        url + "/find?query=" + query + "&part=" + part,
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

export const findKatya = doSearch;
export const findKatyaHits = doHitSearch;
