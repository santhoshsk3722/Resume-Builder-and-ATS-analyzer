import { useState } from 'react';

export function useAtsAnalyzer() {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const analyze = async (resumeText: string, jobDescription: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3000/ats/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resumeText, jobDescription }),
            });

            if (!response.ok) {
                throw new Error('Analysis failed');
            }

            const data = await response.json();
            setReport(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { analyze, loading, report, error };
}
