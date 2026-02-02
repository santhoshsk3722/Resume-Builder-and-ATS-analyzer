import { Controller, Post, Body } from '@nestjs/common';
import { AtsScoringService } from './ats-scoring.service';
import { ParsingService } from '../resume/parsing.service'; // We might need to import ParsingModule

@Controller('ats')
export class AtsController {
    constructor(
        private readonly atsService: AtsScoringService,
        // in a real app, parsing usually happens in ResumeService, but here we can demo it
    ) { }

    @Post('analyze')
    async analyze(@Body() body: { resumeText: string; jobDescription: string }) {
        // Mocking parsed resume structure from raw text for the demo
        const mockParsed = {
            text: body.resumeText,
            keywords: body.resumeText.toLowerCase().split(/\W+/),
            sections: { raw: body.resumeText },
            email: 'test@example.com'
        };

        return this.atsService.analyze(mockParsed, body.jobDescription);
    }
}
