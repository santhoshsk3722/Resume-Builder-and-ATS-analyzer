import { Injectable } from '@nestjs/common';
import { ParsedResume } from '../resume/parsed-resume.interface';

export interface AtsReport {
    overall_score: number;
    breakdown: {
        keyword_match: number;
        skills_coverage: number;
        experience_relevance: number;
        formatting: number; // Mocked/Heuristic
    };
    missing_keywords: string[];
    suggestions: string[];
}

@Injectable()
export class AtsScoringService {

    analyze(resume: ParsedResume, jobDescription: string): AtsReport {
        const jdKeywords = this.extractKeywords(jobDescription);
        const resumeKeywords = new Set(resume.keywords);

        const matchStats = this.calculateKeywordMatch(resumeKeywords, jdKeywords);

        // Weighted scoring
        const keywordScore = matchStats.score; // 40% typically
        const skillScore = matchStats.score; // (Using same for now, normally specific entities)

        // Formatting Checks (Heuristic)
        const formattingScore = this.checkFormatting(resume);

        // Relevance (Mock logic for now)
        const relevanceScore = 50 + (matchStats.score / 2);

        const overall =
            (keywordScore * 0.4) +
            (skillScore * 0.2) +
            (relevanceScore * 0.25) +
            (formattingScore * 0.15);

        return {
            overall_score: Math.round(overall),
            breakdown: {
                keyword_match: Math.round(keywordScore),
                skills_coverage: Math.round(skillScore),
                experience_relevance: Math.round(relevanceScore),
                formatting: Math.round(formattingScore),
            },
            missing_keywords: matchStats.missing,
            suggestions: this.generateSuggestions(matchStats.missing, formattingScore),
        };
    }

    private extractKeywords(text: string): Set<string> {
        const stopWords = new Set(['and', 'the', 'is', 'in', 'at', 'of', 'for', 'to', 'a', 'with', 'an', 'or', 'be', 'are']);
        const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
        // Filter common terms + short words
        return new Set(words.filter(w => w.length > 2 && !stopWords.has(w)));
    }

    private calculateKeywordMatch(resumeKeywords: Set<string>, jdKeywords: Set<string>) {
        let matchCount = 0;
        const missing: string[] = [];

        jdKeywords.forEach(k => {
            if (resumeKeywords.has(k)) {
                matchCount++;
            } else {
                missing.push(k);
            }
        });

        const total = jdKeywords.size || 1; // Avoid div by zero
        const score = (matchCount / total) * 100;

        return { score, missing };
    }

    private checkFormatting(resume: ParsedResume): number {
        let score = 100;
        // Penalize if email is missing (critical)
        if (!resume.email) score -= 20;
        // Penalize if text is too short
        if (resume.text.length < 500) score -= 30;
        // Penalize if no sections detected (implies parsing failure or bad format)
        if (Object.keys(resume.sections).length < 2) score -= 40;

        return Math.max(0, score);
    }

    private generateSuggestions(missingKeywords: string[], formattingScore: number): string[] {
        const suggestions: string[] = [];

        if (formattingScore < 80) {
            suggestions.push('Ensure your resume has standard section headings like "Experience", "Education".');
        }

        if (missingKeywords.length > 0) {
            const topMissing = missingKeywords.slice(0, 5).join(', ');
            suggestions.push(`Try to include these keywords from the job description: ${topMissing}`);
        }

        return suggestions;
    }
}
