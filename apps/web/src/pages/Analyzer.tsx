import { useState } from 'react';
import { Upload } from 'lucide-react';
import AtsScoreCard from '../components/AtsScoreCard';
import { useAtsAnalyzer } from '../hooks/useAtsAnalyzer';
// import pdfToText from 'react-pdftotext';

export default function Analyzer() {
    const { analyze, loading, report, error } = useAtsAnalyzer();
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    // const handleFileUpload = async (event: any) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const text = await file.text();
    //         setResumeText(text);
    //     }
    // };

    const handleAnalyze = () => {
        analyze(resumeText, jobDescription);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <h1 className="text-3xl font-extrabold text-gray-900">ATS Resume Analyzer</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Upload Resume
                        </h3>
                        <textarea
                            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                            placeholder="Paste your resume text here or upload..."
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                        />
                        {/* <input type="file" onChange={handleFileUpload} className="..." /> */}
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4">Job Description</h3>
                        <textarea
                            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Paste the job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !resumeText || !jobDescription}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Analyzing...' : 'Analyze Resume'}
                    </button>

                    {error && <p className="text-red-500">{error}</p>}
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    {report ? (
                        <>
                            <AtsScoreCard report={report} />

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold mb-4 text-orange-600">Missing Keywords</h3>
                                <div className="flex flex-wrap gap-2">
                                    {report.missing_keywords.map((kw: string) => (
                                        <span key={kw} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium border border-orange-100">
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold mb-4 text-blue-600">Improvement Suggestions</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    {report.suggestions.map((suggestion: string, idx: number) => (
                                        <li key={idx}>{suggestion}</li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 h-full flex items-center justify-center text-gray-400">
                            Results will appear here
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
