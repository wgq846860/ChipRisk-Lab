import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "out");
const indexPath = resolve(output, "index.html");

assert.ok(existsSync(indexPath), "GitHub Pages export must create out/index.html");

const html = readFileSync(indexPath, "utf8");
assert.match(html, /\/ChipRisk-Lab\/_next\//, "framework assets must use the repository base path");
const chunksDirectory = resolve(output, "_next", "static", "chunks");
const clientBundle = readdirSync(chunksDirectory, { recursive: true })
  .filter((path) => String(path).endsWith(".js"))
  .map((path) => readFileSync(resolve(chunksDirectory, String(path)), "utf8"))
  .join("\n");
assert.match(clientBundle, /\/ChipRisk-Lab\/report\/%E8%8A%AF%E7%89%87%E6%88%98%E4%BA%89%E7%AE%80%E6%8A%A5\.pdf/, "the report link must remain inside the GitHub Pages project path");
assert.ok(existsSync(resolve(output, "report", "芯片战争简报.pdf")), "the report PDF must be exported");
assert.ok(existsSync(resolve(output, ".nojekyll")), "the deployment artifact must disable Jekyll processing");

console.log("GitHub Pages output verified");
