import { PostType, PrismaClient } from '@prisma/client';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      title: 'Это прекрасное видео, которое заставит вас плакать',
      userId: FIRST_USER_ID,
      video: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      type: PostType.video,
    },
    {
      id: SECOND_POST_UUID,
      quoteText: 'Быть или не быть - вот в чем вопрос>',
      quoteAuthor: 'Вильям Шекспир',
      userId: FIRST_USER_ID,
      type: PostType.quote,
      comments: [
          {
            message: 'Это действительно отличная цитата!',
            userId: FIRST_USER_ID,
          },
          {
            message: 'Надо будет обязательно перечитать.',
            userId: SECOND_USER_ID,
          }
      ]
    }
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        title: post.title,
        video: post.video,
        quoteText: post.quoteText,
        quoteAuthor: post.quoteAuthor,
        userId: post.userId,
        type: post.type,
        comments: post.comments ? {
          create: post.comments
        } : undefined
      }
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
