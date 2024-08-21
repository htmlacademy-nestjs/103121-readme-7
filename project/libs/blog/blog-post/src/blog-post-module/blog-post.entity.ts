import { BlogLikeEntity, BlogLikeFactory } from '@project/blog-like';
import { Entity, Post, StorableEntity, PostType, PostStatusType } from '@project/shared-core';
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public title?: string;
  public video?: string;
  public preview?: string;
  public text?: string;
  public quoteText?: string;
  public quoteAuthor?: string;
  public photo?: string;
  public link?: string;
  public description?: string;
  public tags?: string[];
  public type: PostType;
  public status?: PostStatusType;
  public createdAt?: Date;
  public updatedAt?: Date;
  public publicatedAt?: Date;
  public userId: string;
  public comments: BlogCommentEntity[];
  public likes: BlogLikeEntity[];

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.title = post.title ?? undefined;
    this.video = post.video ?? undefined;
    this.preview = post.preview ?? undefined;
    this.text = post.text ?? undefined;
    this.quoteText = post.quoteText ?? undefined;
    this.quoteAuthor = post.quoteAuthor ?? undefined;
    this.photo = post.photo ?? undefined;
    this.link = post.link ?? undefined;
    this.description = post.description ?? undefined;
    this.tags = post.tags ?? undefined;
    this.type = post.type;
    this.status = post.status;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.userId = post.userId;
    this.comments = [];
    this.likes = [];

    const blogCommentFactory = new BlogCommentFactory();
    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }

    const blogLikeFactory = new BlogLikeFactory();
    for (const like of post.likes) {
      const blogLikeEntity = blogLikeFactory.create(like);
      this.likes.push(blogLikeEntity);
    }
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      publicatedAt: this.publicatedAt,
      video: this.video,
      preview: this.preview,
      text: this.text,
      quoteText: this.quoteText,
      quoteAuthor: this.quoteAuthor,
      photo: this.photo,
      link: this.link,
      tags: this.tags,
      description: this.description,
      title: this.title,
      userId: this.userId,
      type: this.type,
      status: this.status,
      likes: this.likes.map((likeEntity) => likeEntity.toPOJO()),
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
    }
  }
}
