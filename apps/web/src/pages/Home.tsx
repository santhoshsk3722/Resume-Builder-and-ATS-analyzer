import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="space-y-16 py-10">
            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
                <motion.h1
                    className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Build an <span className="text-blue-600">ATS-Ready</span> Resume in Minutes
                </motion.h1>
                <motion.p
                    className="text-xl text-gray-600 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Create professional resumes, analyze them against job descriptions, and get instant feedback to increase your interview chances.
                </motion.p>
                <motion.div
                    className="flex justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Link to="/builder" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                        Build Resume
                    </Link>
                    <Link to="/analyzer" className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 px-8 py-3 rounded-xl font-bold text-lg shadow-sm hover:shadow-md transition-all">
                        Analyze Resume
                    </Link>
                </motion.div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 px-4">
                <FeatureCard
                    icon={<FileText className="w-8 h-8 text-blue-500" />}
                    title="ATS-Friendly Templates"
                    description="Choose from 6+ professionally designed templates optimized for Applicant Tracking Systems."
                />
                <FeatureCard
                    icon={<CheckCircle className="w-8 h-8 text-green-500" />}
                    title="Smart Score Analysis"
                    description="Get a detailed 0-100 score based on keywords, skills, and formatting best practices."
                />
                <FeatureCard
                    icon={<Upload className="w-8 h-8 text-purple-500" />}
                    title="Resume Parsing"
                    description="Upload your existing PDF/DOCX resume and let our AI extract the details for you."
                />
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-gray-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}
