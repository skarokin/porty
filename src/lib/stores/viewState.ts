import { writable } from "svelte/store";
import type { Project } from "$lib/components/projects";
import type { Experience } from "$lib/components/experiences";

export const viewState = writable<{
    inputValue: string;
    prevInputValue: string;
    projectSelected: boolean;
    selectedProjectIndex: number;
    experienceSelected: boolean;
    selectedExperienceIndex: number;
}>({
    inputValue: "",
    prevInputValue: "",
    projectSelected: false,
    selectedProjectIndex: 0,
    experienceSelected: false,
    selectedExperienceIndex: 0,
});

export const selectedProject = writable<Project | null>(null);
export const selectedExperience = writable<Experience | null>(null);

export function resetViewState() {
    viewState.set({
        inputValue: "",
        prevInputValue: "",
        projectSelected: false,
        selectedProjectIndex: 0,
        experienceSelected: false,
        selectedExperienceIndex: 0,
    });
    selectedProject.set(null);
    selectedExperience.set(null);
}