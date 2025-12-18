/**
 * Project Form Store
 * Zustand store for managing project creation form state with persistence
 */

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type {
  ProjectType,
  UrgencyLevel,
  BudgetType,
  MediaType,
} from "../apis/types/project.types";

export interface ProjectFormData {
  // Step 1: Project Type & Basic Info
  projectType: ProjectType | null;
  title: string;

  // Step 2: Description
  description: string;

  // Step 3: Skills, Budget, Timeline
  skillsRequired: string[];
  budget: BudgetType | null;
  durationEstimate: string;
  urgencyLevel: UrgencyLevel | null;

  // Step 4: Developer Assignment (for direct projects)
  developerId: string[];

  // Step 5: Media & SOW
  media: MediaType[];
  sowUrl: string;

  // Additional metadata
  location: string;
  aiSuggestedSkills: string[];
  aiSuggestedBudget: BudgetType | null;
}

interface ProjectFormState {
  // Form data
  formData: ProjectFormData;

  // Current step tracking
  currentStep: number;

  // Actions
  setFormField: <K extends keyof ProjectFormData>(
    field: K,
    value: ProjectFormData[K]
  ) => void;
  setFormData: (data: Partial<ProjectFormData>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;

  // Helper actions
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  setSkills: (skills: string[]) => void;
  addDeveloper: (developerId: string) => void;
  removeDeveloper: (developerId: string) => void;
  addMedia: (media: MediaType) => void;
  removeMedia: (url: string) => void;
}

const initialFormData: ProjectFormData = {
  projectType: null,
  title: "",
  description: "",
  skillsRequired: [],
  budget: null,
  durationEstimate: "",
  urgencyLevel: null,
  developerId: [],
  media: [],
  sowUrl: "",
  location: "",
  aiSuggestedSkills: [],
  aiSuggestedBudget: null,
};

export const useProjectFormStore = create<ProjectFormState>()(
  devtools(
    persist(
      (set) => ({
        // Initial State
        formData: initialFormData,
        currentStep: 1,

        // Set a single form field
        setFormField: (field, value) =>
          set((state) => ({
            formData: {
              ...state.formData,
              [field]: value,
            },
          })),

        // Set multiple form fields at once
        setFormData: (data) =>
          set((state) => ({
            formData: {
              ...state.formData,
              ...data,
            },
          })),

        // Step navigation
        setCurrentStep: (step) =>
          set({
            currentStep: step,
          }),

        nextStep: () =>
          set((state) => ({
            currentStep: state.currentStep + 1,
          })),

        prevStep: () =>
          set((state) => ({
            currentStep: Math.max(1, state.currentStep - 1),
          })),

        // Reset form to initial state
        resetForm: () =>
          set({
            formData: initialFormData,
            currentStep: 1,
          }),

        // Skill management
        addSkill: (skill) =>
          set((state) => ({
            formData: {
              ...state.formData,
              skillsRequired: [...state.formData.skillsRequired, skill],
            },
          })),

        removeSkill: (skill) =>
          set((state) => ({
            formData: {
              ...state.formData,
              skillsRequired: state.formData.skillsRequired.filter(
                (s) => s !== skill
              ),
            },
          })),

        setSkills: (skills) =>
          set((state) => ({
            formData: {
              ...state.formData,
              skillsRequired: skills,
            },
          })),

        // Developer management
        addDeveloper: (developerId) =>
          set((state) => ({
            formData: {
              ...state.formData,
              developerId: [...state.formData.developerId, developerId],
            },
          })),

        removeDeveloper: (developerId) =>
          set((state) => ({
            formData: {
              ...state.formData,
              developerId: state.formData.developerId.filter(
                (id) => id !== developerId
              ),
            },
          })),

        // Media management
        addMedia: (media) =>
          set((state) => ({
            formData: {
              ...state.formData,
              media: [...state.formData.media, media],
            },
          })),

        removeMedia: (url) =>
          set((state) => ({
            formData: {
              ...state.formData,
              media: state.formData.media.filter((m) => m.url !== url),
            },
          })),
      }),
      {
        name: "project-form-storage", // LocalStorage key
        partialize: (state) => ({
          formData: state.formData,
          currentStep: state.currentStep,
        }),
      }
    ),
    { name: "ProjectFormStore" }
  )
);
