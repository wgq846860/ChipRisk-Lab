import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { normalizeToolInputs } from "./webmcp.ts";

describe("WebMCP simulation input", () => {
  it("accepts six values inside the one-to-five scale", () => {
    assert.deepEqual(normalizeToolInputs({
      platformDependence: 5,
      migrationComplexity: 4,
      alternativeMaturity: 3,
      supplyStability: 2,
      adaptationCapability: 4,
      costSensitivity: 3,
    }), {
      platformDependence: 5,
      migrationComplexity: 4,
      alternativeMaturity: 3,
      supplyStability: 2,
      adaptationCapability: 4,
      costSensitivity: 3,
    });
  });

  it("rejects incomplete or out-of-range input", () => {
    assert.throws(() => normalizeToolInputs({ platformDependence: 6 }), /六项参数/);
  });
});
