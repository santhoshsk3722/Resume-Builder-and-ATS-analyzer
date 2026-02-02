import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { updatePersonalInfo } from '../../../store/resumeSlice';
import { useEffect } from 'react';

export default function PersonalInfoForm() {
    const dispatch = useDispatch();
    const personalInfo = useSelector((state: RootState) => state.resume.personalInfo);
    const { register, watch } = useForm({ defaultValues: personalInfo });

    useEffect(() => {
        const subscription = watch((value) => {
            dispatch(updatePersonalInfo(value));
        });
        return () => subscription.unsubscribe();
    }, [watch, dispatch]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" {...register('fullName')} />
            <Input label="Job Title" {...register('title')} />
            <Input label="Email" type="email" {...register('email')} />
            <Input label="Phone" type="tel" {...register('phone')} />
            <Input label="Location" {...register('location')} />
            <Input label="LinkedIn URL" {...register('linkedin')} />
            <Input label="GitHub URL" {...register('github')} />
            <Input label="Website" {...register('website')} />
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                <textarea
                    {...register('summary')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief overview of your career..."
                />
            </div>
        </div>
    );
}

function Input({ label, type = 'text', ...props }: any) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                {...props}
            />
        </div>
    );
}
