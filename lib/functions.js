import prismadb from "./prisma";

export async function getAllPosts() {
  const posts = await prismadb.post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return posts;
}

export async function getAllPublishedPosts() {
  const posts = await prismadb.post.findMany({
    where: {
      isPublished: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      category: true,
      user: true
    }
  });
  return posts;
}

export function formatDate(data){
  const date = new Date(data);

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formatDate
}