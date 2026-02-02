import { useState } from 'react';
import { Eye, Edit3, Download, Save } from 'lucide-react';
import ResumeEditor from '../components/resume-builder/ResumeEditor';
import ResumePreview from '../components/resume-builder/ResumePreview';

export default function Builder() {
    const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col">
            {/* Builder Toolbar */}
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm">
                <h1 className="text-xl font-bold text-gray-800">Untitled Resume</h1>
                <div className="flex gap-3">
                    <div className="flex bg-gray-100 p-1 rounded-lg mr-4 sm:hidden">
                        <button
                            onClick={() => setActiveTab('editor')}
                            className={`p-2 rounded-md transition-all ${activeTab === 'editor' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`p-2 rounded-md transition-all ${activeTab === 'preview' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                        <Save className="w-4 h-4" />
                        <span className="hidden sm:inline">Save Draft</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Export PDF</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden bg-gray-100">
                {/* Editor Side */}
                <div className={`w-full lg:w-1/2 overflow-y-auto bg-white border-r border-gray-200 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
                    <ResumeEditor />
                </div>

                {/* Preview Side */}
                <div className={`w-full lg:w-1/2 overflow-y-auto p-8 flex justify-center bg-gray-50 ${activeTab === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
                    <ResumePreview />
                </div>
            </div>
        </div>
    );
}
