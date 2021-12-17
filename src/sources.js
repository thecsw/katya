import { url } from "./const.js";
import { make_token } from "./auth.js";
import { katya_get, katya_post, katya_delete } from "./http.js";
import { credentials } from "./stores.js";

let user;
credentials.subscribe((value) => {
        user = value;
});

function create_source(label, link, disabled) {
        return new Promise((resolve) => {
                katya_post(
                        url + "/source",
                        { label: label, link: link, disabled: disabled },
                        make_token(user)
                ).then((data) => {
                        if (data[0] === 200) {
                                resolve(true);
                        }
                });
        });
}

function crawl_source(link) {
        return new Promise((resolve) => {
                katya_post(
                        url + "/trigger",
                        { link: link },
                        make_token(user)
                ).then((data) => {
                        if (data[0] === 200) {
                                resolve(true);
                        }
                });
        });
}

function delete_source(link) {
        return new Promise((resolve) => {
                katya_delete(
                        url + "/source",
                        { link: link },
                        make_token(user)
                ).then((data) => {
                        if (data[0] === 200) {
                                resolve(true);
                        }
                });
        });
}

function get_sources() {
        return new Promise((resolve) => {
                katya_get(url + "/sources", make_token(user)).then((data) => {
                        if (data[0] === 200) {
                                resolve(data[1]);
                        } else {
                                resolve([]);
                        }
                });
        });
}

export const getSources = get_sources;
export const createSource = create_source;
export const deleteSource = delete_source;
export const crawlSource = crawl_source;
