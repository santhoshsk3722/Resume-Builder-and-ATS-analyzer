import type { ResumeState } from '../../../store/resumeSlice';

export default function ModernTemplate({ data }: { data: ResumeState }) {
    const { personalInfo, experience, education, skills } = data;

    return (
        <div className="font-sans text-gray-900 leading-normal" id="resume-preview">
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-4 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">{personalInfo.fullName || 'Your Name'}</h1>
                <p className="text-lg text-gray-600 mb-2">{personalInfo.title || 'Professional Title'}</p>

                <div className="flex flex-wrap gap-x-4 text-sm text-gray-600">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                    {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                    {personalInfo.github && <span>• {personalInfo.github}</span>}
                </div>
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1 tracking-wider">Professional Summary</h2>
                    <p className="text-sm text-gray-700 leading-relaxed max-w-prose">
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wider">Experience</h2>
                    <div className="space-y-5">
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                                    <span className="text-sm text-gray-600 whitespace-nowrap">
                                        {exp.startDate} – {exp.endDate || (exp.current ? 'Present' : '')}
                                    </span>
                                </div>
                                <div className="text-sm font-semibold text-gray-700 mb-2">{exp.company}</div>
                                <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                                    {exp.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wider">Education</h2>
                    <div className="space-y-4">
                        {education.map(edu => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-800">{edu.school}</h3>
                                    <span className="text-sm text-gray-600">
                                        {edu.graduationDate}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-700">
                                    {edu.degree} {edu.field && `in ${edu.field}`}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1 tracking-wider">Skills</h2>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                        {skills.join(' • ')}
                    </div>
                </section>
            )}
        </div>
    );
}
