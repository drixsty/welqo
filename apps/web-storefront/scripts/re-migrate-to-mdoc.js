const fs = require("fs");
const path = require("path");

let YAML;
try {
  YAML = require("yaml");
} catch (e) {
  try {
    const jsYaml = require("js-yaml");
    YAML = {
      parse: (str) => jsYaml.load(str),
      stringify: (obj) => jsYaml.dump(obj),
    };
  } catch (err) {
    console.error("YAML parser not found. Please run within web-storefront context.");
    process.exit(1);
  }
}

const postsDir = path.join(__dirname, "../content/posts");
const pagesDir = path.join(__dirname, "../content/pages");

function serializeInlines(children) {
  if (!children || !Array.isArray(children)) return "";
  let result = "";
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    let content = "";
    if (child.type === "link") {
      content = `[${serializeInlines(child.children)}](${child.href})`;
    } else {
      content = child.text || "";
      if (child.bold) {
        let leadingSpace = "";
        let trailingSpace = "";
        if (content.startsWith(" ")) {
          leadingSpace = " ";
          content = content.trimStart();
        }
        if (content.endsWith(" ")) {
          trailingSpace = " ";
          content = content.trimEnd();
        }
        content = `${leadingSpace}**${content}**${trailingSpace}`;
      }
    }

    if (result && content) {
      const lastChar = result.slice(-1);
      const firstChar = content.charAt(0);
      
      // Check space after bold closing asterisks
      if (result.endsWith("**") && !firstChar.match(/^[\s,.;:!?)]/)) {
        result += " ";
      }
      // Check space before bold opening asterisks
      else if (firstChar === "*" && content.startsWith("**") && !lastChar.match(/^[\s([]/)) {
        result += " ";
      }
      // Check space before link opening bracket
      else if (firstChar === "[" && !lastChar.match(/^[\s([]/)) {
        result += " ";
      }
      // Check space after link closing parenthesis
      else if (result.endsWith(")") && !firstChar.match(/^[\s,.;:!?)]/)) {
        result += " ";
      }
    }
    
    result += content;
  }
  return result;
}

function slateToMarkdown(nodes) {
  if (!nodes || !Array.isArray(nodes)) return "";

  let markdown = "";

  nodes.forEach((node) => {
    switch (node.type) {
      case "heading": {
        const hashes = "#".repeat(node.level || 2);
        const text = serializeInlines(node.children);
        markdown += `${hashes} ${text}\n\n`;
        break;
      }
      case "paragraph": {
        const text = serializeInlines(node.children);
        markdown += `${text}\n\n`;
        break;
      }
      case "unordered-list": {
        node.children.forEach((item) => {
          let inlines = item.children;
          if (
            item.children &&
            item.children.length === 1 &&
            item.children[0].type === "paragraph"
          ) {
            inlines = item.children[0].children;
          }
          const text = serializeInlines(inlines);
          markdown += `- ${text}\n`;
        });
        markdown += "\n";
        break;
      }
      case "ordered-list": {
        node.children.forEach((item, index) => {
          let inlines = item.children;
          if (
            item.children &&
            item.children.length === 1 &&
            item.children[0].type === "paragraph"
          ) {
            inlines = item.children[0].children;
          }
          const text = serializeInlines(inlines);
          markdown += `${index + 1}. ${text}\n`;
        });
        markdown += "\n";
        break;
      }
      case "table": {
        node.children.forEach((row, rowIndex) => {
          const cells = row.children.map((cell) =>
            serializeInlines(cell.children)
          );
          markdown += `| ${cells.join(" | ")} |\n`;
          if (rowIndex === 0) {
            const align = row.children.map(() => "---");
            markdown += `| ${align.join(" | ")} |\n`;
          }
        });
        markdown += "\n";
        break;
      }
      case "divider": {
        markdown += "---\n\n";
        break;
      }
      default:
        if (node.text) {
          markdown += node.text;
        } else if (node.children) {
          markdown += serializeInlines(node.children) + "\n\n";
        }
        break;
    }
  });

  return markdown.trim() + "\n";
}

// 1. Process Posts
if (fs.existsSync(postsDir)) {
  const files = fs.readdirSync(postsDir);
  files.forEach((file) => {
    if (file.endsWith(".json") && file !== "package.json") {
      const slug = file.replace(".json", "");
      if (slug === "Test Article") return; // Skip our test article

      const filePath = path.join(postsDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      if (data.contentFr || data.contentEn) {
        console.log(`Processing Post: ${slug}`);

        const postSubDir = path.join(postsDir, slug);
        if (!fs.existsSync(postSubDir)) {
          fs.mkdirSync(postSubDir, { recursive: true });
        }

        if (data.contentFr) {
          const markdownFr = slateToMarkdown(data.contentFr);
          fs.writeFileSync(
            path.join(postSubDir, "contentFr.mdoc"),
            markdownFr,
            "utf-8"
          );
          delete data.contentFr;
        }

        if (data.contentEn) {
          const markdownEn = slateToMarkdown(data.contentEn);
          fs.writeFileSync(
            path.join(postSubDir, "contentEn.mdoc"),
            markdownEn,
            "utf-8"
          );
          delete data.contentEn;
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
        console.log(`Successfully migrated ${slug} to separate mdoc files.`);
      }
    }
  });
}

// 2. Process Pages
if (fs.existsSync(pagesDir)) {
  const files = fs.readdirSync(pagesDir);
  files.forEach((file) => {
    if (file.endsWith(".yaml")) {
      const slug = file.replace(".yaml", "");
      const filePath = path.join(pagesDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const data = YAML.parse(fileContent);

      if (data.contentFr || data.contentEn) {
        console.log(`Processing Page: ${slug}`);

        const pageSubDir = path.join(pagesDir, slug);
        if (!fs.existsSync(pageSubDir)) {
          fs.mkdirSync(pageSubDir, { recursive: true });
        }

        if (data.contentFr) {
          const markdownFr = slateToMarkdown(data.contentFr);
          fs.writeFileSync(
            path.join(pageSubDir, "contentFr.mdoc"),
            markdownFr,
            "utf-8"
          );
          delete data.contentFr;
        }

        if (data.contentEn) {
          const markdownEn = slateToMarkdown(data.contentEn);
          fs.writeFileSync(
            path.join(pageSubDir, "contentEn.mdoc"),
            markdownEn,
            "utf-8"
          );
          delete data.contentEn;
        }

        fs.writeFileSync(filePath, YAML.stringify(data), "utf-8");
        console.log(`Successfully migrated page ${slug} to separate mdoc files.`);
      }
    }
  });
}

console.log("Re-migration to separate mdoc files completed successfully!");
