const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDirectory = path.join(process.cwd(), "src/content");

function generatePostsJson() {
  const slugs = fs.readdirSync(postsDirectory);
  const postsData = {};

  slugs.forEach((slug) => {
    const fullPath = path.join(postsDirectory, slug);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const realSlug = slug.replace(/\.md$/, "");
    postsData[realSlug] = {
      meta: {
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        published: data.published,
        excerpt: data.excerpt || "",
      },
      content,
    };
  });

  fs.writeFileSync(
    path.join(process.cwd(), "src/lib/posts.json"),
    JSON.stringify(postsData, null, 2)
  );
}

generatePostsJson();
