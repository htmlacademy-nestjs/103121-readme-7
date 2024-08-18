import { Expose } from 'class-transformer';
import { CommentRdo } from './comment.rdo';

export class CommentWithPaginationRdo {
  @Expose()
  public entities: CommentRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
