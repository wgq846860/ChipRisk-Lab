import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildExplanation, rankRiskDrivers } from "./explanations.ts";
import { calculateRisk, type Inputs } from "./risk-model.ts";

const stressed: Inputs = {
  platformDependence: 5,
  migrationComplexity: 5,
  alternativeMaturity: 1,
  supplyStability: 1,
  adaptationCapability: 1,
  costSensitivity: 5,
};

describe("result explanations", () => {
  it("ranks an actual high-valued risk driver first", () => {
    const drivers = rankRiskDrivers(stressed);
    assert.ok(["平台依赖", "迁移复杂度", "供应不稳定", "成本敏感度"].includes(drivers[0].label));
  });

  it("uses qualified rather than deterministic language", () => {
    const copy = Object.values(buildExplanation(stressed, calculateRisk(stressed))).join(" ");
    assert.match(copy, /可能|倾向于|在该模拟条件下/);
    assert.doesNotMatch(copy, /必然|一定会|注定/);
  });

  it("changes its leading driver when supply stability improves", () => {
    const before = rankRiskDrivers(stressed);
    const after = rankRiskDrivers({ ...stressed, supplyStability: 5 });
    const beforeSupply = before.find((driver) => driver.key === "supplyStability")?.score ?? 0;
    const afterSupply = after.find((driver) => driver.key === "supplyStability")?.score ?? 0;
    assert.ok(afterSupply < beforeSupply);
  });
});
