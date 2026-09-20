import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getScenario, SCENARIOS } from "./scenarios.ts";

describe("scenario presets", () => {
  it("provides six valid values for every preset", () => {
    for (const id of ["startup", "enterprise", "research"] as const) {
      const preset = getScenario(id);
      assert.equal(Object.values(preset.inputs).length, 6);
      assert.ok(Object.values(preset.inputs).every((value) => value >= 1 && value <= 5));
    }
  });

  it("models the enterprise as more capable of adaptation than the research lab", () => {
    assert.ok(
      getScenario("enterprise").inputs.adaptationCapability >
        getScenario("research").inputs.adaptationCapability,
    );
  });

  it("includes a custom scenario without silently inventing preset values", () => {
    const custom = SCENARIOS.find((scenario) => scenario.id === "custom");
    assert.ok(custom);
    assert.equal(custom.inputs, null);
  });
});
