import { Injectable, Logger } from '@nestjs/common';
const pdfParse = require('pdf-parse');
// import * as mammoth from 'mammoth'; // Uncomment when ready
import { ParsedResume } from './parsed-resume.interface';

@Injectable()
export class ParsingService {
    private readonly logger = new Logger(ParsingService.name);

    async parseResume(buffer: Buffer, mimeType: string): Promise<ParsedResume> {
        let text = '';

        // Simplification: Assume PDF for now or plain text if failure
        if (mimeType === 'application/pdf') {
            try {
                const data = await pdfParse(buffer);
                text = data.text;
            } catch (e) {
                this.logger.error('Failed to parse PDF', e);
                throw new Error('PDF parsing failed');
            }
        } else {
            // Fallback for text/other
            text = buffer.toString('utf-8');
        }

        return this.extractStructuredData(text);
    }

    private extractStructuredData(text: string): ParsedResume {
        const cleanedText = this.cleanText(text);
        const sections = this.extractSections(cleanedText);
        const keywords = this.extractKeywords(cleanedText);
        const { email, phone, links } = this.extractContactInfo(cleanedText);

        return {
            text: cleanedText,
            sections,
            keywords,
            email,
            phone,
            links,
        };
    }

    private cleanText(text: string): string {
        return text.replace(/\s+/g, ' ').trim();
    }

    private extractSections(text: string): any {
        // Basic Heuristic Section Extraction
        const sections: any = {};

        const patterns = {
            experience: /(work experience|professional experience|experience|employment history)/i,
            education: /(education|academic background|qualifications)/i,
            skills: /(skills|technical skills|technologies|proficiencies)/i,
            projects: /(projects|side projects|personal projects)/i,
            summary: /(summary|professional summary|objective|about)/i,
        };

        // Very naive implementation: Split by keywords and take content between them
        // Real implementation would use more robust line-by-line analysis

        // Placeholder for robust logic
        sections.raw = text;

        return sections;
    }

    private extractKeywords(text: string): string[] {
        // Remove stop words and tokenise
        const stopWords = new Set(['and', 'the', 'is', 'in', 'at', 'of', 'for', 'to', 'a', 'with']);
        const words = text.toLowerCase().split(/\W+/);
        return [...new Set(words.filter(w => w.length > 2 && !stopWords.has(w)))];
    }

    private extractContactInfo(text: string) {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const phoneRegex = /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/;
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        const emailMatch = text.match(emailRegex);
        const phoneMatch = text.match(phoneRegex);
        const linksMatch = text.match(urlRegex);

        return {
            email: emailMatch ? emailMatch[0] : undefined,
            phone: phoneMatch ? phoneMatch[0] : undefined,
            links: linksMatch ? linksMatch : [],
        };
    }
}
