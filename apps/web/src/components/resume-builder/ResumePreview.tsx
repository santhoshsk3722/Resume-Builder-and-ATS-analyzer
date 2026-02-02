import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import ModernTemplate from './templates/ModernTemplate';

export default function ResumePreview() {
    const resumeData = useSelector((state: RootState) => state.resume);
    // const activeTemplate = resumeData.activeTemplate;

    return (
        <div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[10mm] text-sm">
            {/* Template Switcher Logic would go here */}
            <ModernTemplate data={resumeData} />
        </div>
    );
}
