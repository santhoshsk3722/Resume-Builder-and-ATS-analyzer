import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import type { RootState } from '../../../store/store';
import { updateSkills } from '../../../store/resumeSlice';
import { useState } from 'react';

export default function SkillsForm() {
    const dispatch = useDispatch();
    const skills = useSelector((state: RootState) => state.resume.skills);
    const [input, setInput] = useState('');

    const handleAdd = (e: any) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();
            if (!skills.includes(input.trim())) {
                dispatch(updateSkills([...skills, input.trim()]));
            }
            setInput('');
        }
    };

    const handleDelete = (skillToDelete: string) => {
        dispatch(updateSkills(skills.filter(s => s !== skillToDelete)));
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add Skills (Press Enter)</label>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleAdd}
                    placeholder="e.g. React, Node.js, Leadership"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        {skill}
                        <button onClick={() => handleDelete(skill)} className="ml-2 hover:text-blue-600">
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}
