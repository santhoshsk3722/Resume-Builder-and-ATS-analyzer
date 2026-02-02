import { motion } from 'framer-motion';

interface AtsReport {
    overall_score: number;
    breakdown: {
        keyword_match: number;
        skills_coverage: number;
        experience_relevance: number;
        formatting: number;
    };
}

export default function AtsScoreCard({ report }: { report: AtsReport }) {
    const scoreColor = report.overall_score >= 80 ? 'text-green-600' : report.overall_score >= 50 ? 'text-yellow-600' : 'text-red-600';
    const scoreBg = report.overall_score >= 80 ? 'bg-green-100' : report.overall_score >= 50 ? 'bg-yellow-100' : 'bg-red-100';

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center mb-8">
                <h3 className="text-lg font-medium text-gray-500 mb-2">Overall ATS Score</h3>
                <motion.div
                    className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-8 ${scoreBg} ${scoreColor} text-5xl font-bold`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    {report.overall_score}
                </motion.div>
            </div>

            <div className="space-y-4">
                <ScoreItem label="Keyword Match" score={report.breakdown.keyword_match} />
                <ScoreItem label="Skills Coverage" score={report.breakdown.skills_coverage} />
                <ScoreItem label="Experience Relevance" score={report.breakdown.experience_relevance} />
                <ScoreItem label="Formatting" score={report.breakdown.formatting} />
            </div>
        </div>
    );
}

function ScoreItem({ label, score }: { label: string, score: number }) {
    return (
        <div>
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>{label}</span>
                <span>{score}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${score}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1 }}
                />
            </div>
        </div>
    );
}
