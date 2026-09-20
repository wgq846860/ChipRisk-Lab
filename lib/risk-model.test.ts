import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  calculateEfficiency,
  calculateResilience,
  calculateRisk,
  getRiskBand,
  type Inputs,
} from "./risk-model.ts";

const low: Inputs = {
  platformDependence: 1,
  migrationComplexity: 1,
  alternativeMaturity: 5,
  supplyStability: 5,
  adaptationCapability: 5,
  costSensitivity: 1,
};

const high: Inputs = {
  platformDependence: 5,
  migrationComplexity: 5,
  alternativeMaturity: 1,
  supplyStability: 1,
  adaptationCapability: 1,
  costSensitivity: 5,
};

describe("calculateRisk", () => {
  it("maps the lowest-risk boundary to zero", () => {
    assert.deepEqual(calculateRisk(low), {
      migrationDifficulty: 0,
      supplyRisk: 0,
      vulnerability: 0,
      band: "低风险",
    });
  });

  it("maps the highest-risk boundary to one hundred", () => {
    assert.deepEqual(calculateRisk(high), {
      migrationDifficulty: 100,
      supplyRisk: 100,
      vulnerability: 100,
      band: "高风险",
    });
  });

  it("reduces vulnerability when positive capabilities improve", () => {
    const weak = calculateRisk({
      ...low,
      alternativeMaturity: 1,
      supplyStability: 1,
      adaptationCapability: 1,
    });
    const strong = calculateRisk({
      ...low,
      alternativeMaturity: 5,
      supplyStability: 5,
      adaptationCapability: 5,
    });
    assert.ok(strong.vulnerability < weak.vulnerability);
  });

  it("uses the specified score bands at every boundary", () => {
    assert.equal(getRiskBand(0), "低风险");
    assert.equal(getRiskBand(29), "低风险");
    assert.equal(getRiskBand(30), "中低风险");
    assert.equal(getRiskBand(49), "中低风险");
    assert.equal(getRiskBand(50), "中高风险");
    assert.equal(getRiskBand(69), "中高风险");
    assert.equal(getRiskBand(70), "高风险");
    assert.equal(getRiskBand(100), "高风险");
  });

  it("keeps efficiency and resilience inside zero to one hundred", () => {
    for (const inputs of [low, high]) {
      assert.ok(calculateEfficiency(inputs) >= 0 && calculateEfficiency(inputs) <= 100);
      assert.ok(calculateResilience(inputs) >= 0 && calculateResilience(inputs) <= 100);
    }
  });
});
