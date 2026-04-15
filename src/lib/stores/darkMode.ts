import { writable } from "svelte/store";

export const themeLoaded = writable<boolean>(false);
export const darkChecked = writable<boolean>(false);
