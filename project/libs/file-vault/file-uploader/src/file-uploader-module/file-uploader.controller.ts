import 'multer';
import { Express } from 'express';
import { BadRequestException, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { FileUploaderService } from './file-uploader.service';
import { MongoIdValidationPipe } from '@project/pipes';
import { fillDto } from '@project/shared-helpers';

import { UploadedFileRdo } from './rdo/uploaded-file.rdo';

@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      const fileExtension = extname(file.originalname).toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        return cb(new BadRequestException('Only .jpg and .png files are allowed'), false);
      }
      cb(null, true);
    },
    limits: {
      fileSize: 1024 * 500
    },
  }))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);
    return fillDto(UploadedFileRdo, existFile);
  }
}
