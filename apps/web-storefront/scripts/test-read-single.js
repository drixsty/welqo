const { createReader } = require("@keystatic/core/reader");
const keystaticConfig = require("../keystatic.config").default;
const path = require("path");

const reader = createReader(path.join(__dirname, ".."), keystaticConfig);

async function main() {
  const post = await reader.collections.posts.read("conciergerie-airbnb-douai-guide");
  console.log("Post found:", post !== null);
  if (post) {
    console.log("titleFr:", post.titleFr);
  }
}

main().catch(console.error);
