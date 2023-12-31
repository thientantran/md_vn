import prismadb from "./prisma";

export async function getAllPosts() {
  const posts = await prismadb.post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return posts;
}

export async function getAllPublishedPosts({ title, categoryId, page }) {
  const offset = (page - 1) * Number(process.env.POST_PER_PAGE);

  const allPosts = await prismadb.post.findMany({
    where: {
      isPublished: true,
      title: {
        contains: title,
        mode: 'insensitive'
      },
      categoryId: categoryId
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      category: true,
      user: true
    }
  });
  const pageSize = allPosts.length / Number(process.env.POST_PER_PAGE)

  const posts = allPosts.slice(offset, offset + Number(process.env.POST_PER_PAGE));

  return { posts, pageSize };
}

export async function getAllPublishedPostsWithNoParams() {
  const posts = await prismadb.post.findMany({
    where: {
      isPublished: true,
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


export async function getPostById(id) {
  const post = await prismadb.post.findUnique({
    where: {
      id: id
    },
    include: {
      category: true,
      user: true,
      comments: {
        include: {
          user: true
        }
      }
    }
  });
  return post;
}

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export function extractTextFromHTML(htmlString) {
  const dom = new JSDOM(htmlString);
  return dom.window.document.body.textContent || "";
}

export function changeDate(data) {
  const date = new Date(data);

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formattedDate
}


export async function getAllCategories() {
  const categories = await prismadb.category.findMany({
    orderBy: {
      id: 'asc'
    }
  });
  return categories;
}
