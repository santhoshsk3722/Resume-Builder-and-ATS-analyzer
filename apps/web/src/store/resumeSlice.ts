import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ResumeState {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        title: string;
        summary: string;
        website: string;
        linkedin: string;
        github: string;
    };
    experience: {
        id: string;
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        current: boolean;
        description: string;
    }[];
    education: {
        id: string;
        school: string;
        degree: string;
        field: string;
        graduationDate: string;
        description: string;
    }[];
    skills: string[];
    projects: {
        id: string;
        name: string;
        description: string;
        link: string;
        technologies: string[];
    }[];
    activeTemplate: string;
}

const initialState: ResumeState = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        title: '',
        summary: '',
        website: '',
        linkedin: '',
        github: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    activeTemplate: 'modern', // default template
};

const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        updatePersonalInfo: (state, action: PayloadAction<Partial<ResumeState['personalInfo']>>) => {
            state.personalInfo = { ...state.personalInfo, ...action.payload };
        },
        addExperience: (state) => {
            state.experience.push({
                id: crypto.randomUUID(),
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
            });
        },
        updateExperience: (state, action: PayloadAction<{ id: string; data: Partial<ResumeState['experience'][0]> }>) => {
            const index = state.experience.findIndex((exp) => exp.id === action.payload.id);
            if (index !== -1) {
                state.experience[index] = { ...state.experience[index], ...action.payload.data };
            }
        },
        deleteExperience: (state, action: PayloadAction<string>) => {
            state.experience = state.experience.filter((exp) => exp.id !== action.payload);
        },
        addEducation: (state) => {
            state.education.push({
                id: crypto.randomUUID(),
                school: '',
                degree: '',
                field: '',
                graduationDate: '',
                description: '',
            });
        },
        updateEducation: (state, action: PayloadAction<{ id: string; data: Partial<ResumeState['education'][0]> }>) => {
            const index = state.education.findIndex((edu) => edu.id === action.payload.id);
            if (index !== -1) {
                state.education[index] = { ...state.education[index], ...action.payload.data };
            }
        },
        deleteEducation: (state, action: PayloadAction<string>) => {
            state.education = state.education.filter((edu) => edu.id !== action.payload);
        },
        updateSkills: (state, action: PayloadAction<string[]>) => {
            state.skills = action.payload;
        },
        setActiveTemplate: (state, action: PayloadAction<string>) => {
            state.activeTemplate = action.payload;
        },
        importResumeData: (_state, action: PayloadAction<ResumeState>) => {
            return action.payload;
        }
    },
});

export const {
    updatePersonalInfo,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    updateSkills,
    setActiveTemplate,
    importResumeData
} = resumeSlice.actions;

export default resumeSlice.reducer;
