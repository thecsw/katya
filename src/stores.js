import { writable } from "svelte/store";

export const pageLoaded = writable(false);

export const loggedIn = writable(false);

export const credentials = writable({ user: "", pass: "" });

export const results = writable([]);

export const currentPage = writable("search");
