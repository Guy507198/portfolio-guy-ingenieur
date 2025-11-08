import fs from "fs";
import path from "path";

const root = process.cwd();

export function listPosts() {
  const dir = path.join(root, "src", "content", "blog");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".md"))
    .map(f => f.replace(/\.md$/, ""));
}

export function readPost(slug: string) {
  const p = path.join(root, "src", "content", "blog", `${slug}.md`);
  const raw = fs.readFileSync(p, "utf8");
  const match = raw.match(/^---\n([\s\S]+?)\n---/);
  let meta:any = {};
  let body = raw;
  if (match) {
    body = raw.slice(match[0].length);
    meta = Object.fromEntries(
      match[1].split("\n").map(l=>l.trim()).filter(Boolean).map(l=>{
        const i=l.indexOf(":");
        return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^"|"$/g,"")];
      })
    );
  }
  return { meta, body };
}
