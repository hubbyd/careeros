import { Controller, Post, Get, Delete, Param, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ResumeAppService } from '../../application/services/resume-app.service';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

@ApiTags('简历管理')
@ApiBearerAuth()
@Controller('resume')
@UseGuards(AuthGuard('jwt'))
export class ResumeController {
  constructor(private readonly appService: ResumeAppService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async uploadResume(@Request() req: { user: { id: number } }, @UploadedFile() file: MulterFile) {
    const result = await this.appService.uploadAndAnalyze(req.user.id, file);
    return {
      id: result.id,
      fileName: result.fileName,
      fileUrl: result.fileUrl,
      status: result.status,
      analysisResult: result.analysisResult,
      createdAt: new Date(),
    };
  }

  @Get(':id')
  async getResume(@Param('id') id: number) {
    const resume = await this.appService.getResumeById(id);
    if (!resume) {
      return { error: 'Resume not found' };
    }
    return {
      id: resume.id,
      fileName: resume.fileName,
      fileUrl: resume.fileUrl,
      parsedData: resume.parsedData,
      analysisResult: resume.analysisResult,
      status: resume.status,
      createdAt: new Date(),
    };
  }

  @Get('')
  async getUserResumes(@Request() req: { user: { id: number } }) {
    const resumes = await this.appService.getUserResumes(req.user.id);
    return resumes.map((r) => ({
      id: r.id,
      fileName: r.fileName,
      fileUrl: r.fileUrl,
      status: r.status,
      createdAt: new Date(),
    }));
  }

  @Delete(':id')
  async deleteResume(@Param('id') id: number) {
    await this.appService.deleteResume(id);
    return { message: 'Resume deleted successfully' };
  }
}
