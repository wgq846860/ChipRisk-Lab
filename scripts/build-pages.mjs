import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "out");
const nextBin = resolve(root, "node_modules", "next", "dist", "bin", "next");

rmSync(output, { recursive: true, force: true });

const build = spawnSync(process.execPath, [nextBin, "build"], {
  cwd: root,
  env: {
    ...process.env,
    GITHUB_PAGES: "true",
    NEXT_PUBLIC_BASE_PATH: "/ChipRisk-Lab",
  },
  stdio: "inherit",
});

if (build.status !== 0) process.exit(build.status ?? 1);

mkdirSync(output, { recursive: true });
writeFileSync(resolve(output, ".nojekyll"), "");
