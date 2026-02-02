// import { useSelector } from 'react-redux';
// import type { RootState } from '../../store/store';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
// import ProjectsForm from './forms/ProjectsForm';

export default function ResumeEditor() {
    return (
        <div className="max-w-3xl mx-auto p-6 space-y-8 pb-20">
            <section>
                <h2 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4">Personal Details</h2>
                <PersonalInfoForm />
            </section>

            <div className="w-full h-px bg-gray-200 my-8" />

            <section>
                <h2 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4">Professional Experience</h2>
                <ExperienceForm />
            </section>

            <div className="w-full h-px bg-gray-200 my-8" />

            <section>
                <h2 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4">Education</h2>
                <EducationForm />
            </section>

            <div className="w-full h-px bg-gray-200 my-8" />

            <section>
                <h2 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4">Skills</h2>
                <SkillsForm />
            </section>
        </div>
    );
}
