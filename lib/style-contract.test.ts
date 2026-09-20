import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const simulator = readFileSync(new URL("../components/simulator.tsx", import.meta.url), "utf8");
const radarPanel = readFileSync(new URL("../components/radar-panel.tsx", import.meta.url), "utf8");

describe("mobile navigation layout", () => {
  it("removes the header backdrop containing block before fixing navigation to the viewport", () => {
    assert.match(css, /@media \(max-width: 720px\)[\s\S]*?\.site-header\s*\{[^}]*backdrop-filter:\s*none/);
    assert.match(css, /@media \(max-width: 720px\)[\s\S]*?\.site-header nav\s*\{[^}]*bottom:\s*1rem/);
  });
});

describe("primary navigation behavior", () => {
  it("routes the brand control through application state", () => {
    assert.match(simulator, /function Brand\(\{ onHome \}:/);
    assert.match(simulator, /<Brand onHome=\{\(\) => setView\("home"\)\} \/>/);
    assert.doesNotMatch(simulator, /location\.assign\("#home"\)/);
  });
});

describe("console-clean component contracts", () => {
  it("does not spread React's key into parameter props", () => {
    assert.match(simulator, /PARAMETERS\.map\(\(\{ key, \.\.\.item \}, index\) =>/);
    assert.doesNotMatch(simulator, /key=\{item\.key\}[\s\S]*?\{\.\.\.item\}/);
  });

  it("gives the responsive chart a positive initial size", () => {
    assert.match(radarPanel, /initialDimension=\{\{ width: 480, height: 330 \}\}/);
  });
});
