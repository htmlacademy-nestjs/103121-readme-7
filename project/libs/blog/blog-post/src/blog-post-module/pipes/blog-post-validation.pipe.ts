import { ArgumentMetadata, HttpException, HttpStatus, Injectable, NotImplementedException, PipeTransform } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { PostType } from '@project/shared-core';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { CreateQuotePostDto } from '../dto/create-quote-post.dto';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';

@Injectable()
export class PostValidationPipe implements PipeTransform {
  public async transform(post: CreatePostDto, { type }: ArgumentMetadata) {
    if (type !== 'body') {
      throw new Error('This pipe must used only with body!')
    }

    let postDto = null;

    switch (post.type) {
      case PostType.Video:
        postDto = CreateVideoPostDto;
        break;
      case PostType.Text:
        postDto = CreateTextPostDto;
        break;
      case PostType.Quote:
        postDto = CreateQuotePostDto;
        break;
      case PostType.Photo:
        postDto = CreatePhotoPostDto;
        break;
      case PostType.Link:
        postDto = CreateLinkPostDto;
        break;

      default:
        throw new NotImplementedException('Post type not implemented');
    }

    const errors = await validate(plainToClass(postDto, post));

    if (errors.length > 0) {
      throw new HttpException({ errors: this.formatError(errors) }, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return post;
  }

  private formatError(errors: ValidationError[]) {
    return errors.reduce((result, error) => {
      result[error.property] = Object.values(error.constraints);
      return result;
    }, {});
  }
}
