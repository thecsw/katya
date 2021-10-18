import { writable } from "svelte/store";

export const pageLoaded = writable(false);

export const loggedIn = writable(false);

export const credentials = writable({ user: null, pass: null });
