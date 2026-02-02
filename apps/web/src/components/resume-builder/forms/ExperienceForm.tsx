import { useDispatch, useSelector } from 'react-redux';
import { Plus, Trash2 } from 'lucide-react';
import type { RootState } from '../../../store/store';
import { addExperience, deleteExperience, updateExperience } from '../../../store/resumeSlice';

export default function ExperienceForm() {
    const dispatch = useDispatch();
    const experiences = useSelector((state: RootState) => state.resume.experience);

    return (
        <div className="space-y-6">
            {experiences.map((exp) => (
                <div key={exp.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group">
                    <button
                        onClick={() => dispatch(deleteExperience(exp.id))}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Company"
                            value={exp.company}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateExperience({ id: exp.id, data: { company: e.target.value } }))}
                        />
                        <Input
                            label="Position"
                            value={exp.position}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateExperience({ id: exp.id, data: { position: e.target.value } }))}
                        />
                        <Input
                            label="Start Date"
                            type="text"
                            placeholder="MMM YYYY"
                            value={exp.startDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateExperience({ id: exp.id, data: { startDate: e.target.value } }))}
                        />
                        <Input
                            label="End Date"
                            type="text"
                            placeholder="MMM YYYY or Present"
                            value={exp.endDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateExperience({ id: exp.id, data: { endDate: e.target.value } }))}
                        />
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                rows={3}
                                value={exp.description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(updateExperience({ id: exp.id, data: { description: e.target.value } }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="• Achieved X by doing Y..."
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={() => dispatch(addExperience())}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center font-medium transition-colors"
            >
                <Plus className="w-5 h-5 mr-2" /> Add Experience
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
