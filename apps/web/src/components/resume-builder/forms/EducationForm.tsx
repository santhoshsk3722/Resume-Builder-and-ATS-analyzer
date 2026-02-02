import { useDispatch, useSelector } from 'react-redux';
import { Plus, Trash2 } from 'lucide-react';
import type { RootState } from '../../../store/store';
import { addEducation, deleteEducation, updateEducation } from '../../../store/resumeSlice';

export default function EducationForm() {
    const dispatch = useDispatch();
    const education = useSelector((state: RootState) => state.resume.education);

    return (
        <div className="space-y-6">
            {education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group">
                    <button
                        onClick={() => dispatch(deleteEducation(edu.id))}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="School / University"
                            value={edu.school}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateEducation({ id: edu.id, data: { school: e.target.value } }))}
                        />
                        <Input
                            label="Degree"
                            value={edu.degree}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateEducation({ id: edu.id, data: { degree: e.target.value } }))}
                        />
                        <Input
                            label="Field of Study"
                            value={edu.field}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateEducation({ id: edu.id, data: { field: e.target.value } }))}
                        />
                        <Input
                            label="Graduation Date"
                            value={edu.graduationDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateEducation({ id: edu.id, data: { graduationDate: e.target.value } }))}
                        />
                    </div>
                </div>
            ))}

            <button
                onClick={() => dispatch(addEducation())}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center font-medium transition-colors"
            >
                <Plus className="w-5 h-5 mr-2" /> Add Education
            </button>
        </div>
    );
}

function Input({ label, ...props }: any) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                {...props}
            />
        </div>
    );
}
