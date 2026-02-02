import { Module } from '@nestjs/common';
import { AtsController } from './ats.controller';
import { AtsScoringService } from './ats-scoring.service';

@Module({
    controllers: [AtsController],
    providers: [AtsScoringService],
})
export class AtsModule { }
