import { Comment } from './comment.interface';
import { PostStatusType } from './post-status-type.enum';
import { PostType } from './post-type.enum';

export interface Post {
  id?: string;
  title?: string;
  video?: string;
  preview?: string;
  text?: string;
  quoteText?: string;
  quoteAuthor?: string;
  photo?: string;
  link?: string;
  description?: string;
  tags?: string[];
  type: PostType;
  status: PostStatusType;
  createdAt?: Date;
  publicatedAt?: Date;
  updatedAt?: Date;
  userId: string;
  comments: Comment[];
}
