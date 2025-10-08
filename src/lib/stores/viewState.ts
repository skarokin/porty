import { writable } from "svelte/store";
import type { Project } from "$lib/components/projects";

export const viewState = writable<{
    inputValue: string;
    prevInputValue: string;
    projectSelected: boolean;
    selectedProjectIndex: number;
}>({
    inputValue: "",
    prevInputValue: "",
    projectSelected: false,
    selectedProjectIndex: 0,
});

export const selectedProject = writable<Project | null>(null);

export function resetViewState() {
    viewState.set({
        inputValue: "",
        prevInputValue: "",
        projectSelected: false,
        selectedProjectIndex: 0,
    });
    selectedProject.set(null);
}