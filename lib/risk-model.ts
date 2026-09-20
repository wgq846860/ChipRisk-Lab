export type RiskBand = "低风险" | "中低风险" | "中高风险" | "高风险";

export type Inputs = {
  platformDependence: number;
  migrationComplexity: number;
  alternativeMaturity: number;
  supplyStability: number;
  adaptationCapability: number;
  costSensitivity: number;
};

export type RiskResult = {
  migrationDifficulty: number;
  supplyRisk: number;
  vulnerability: number;
  band: RiskBand;
};

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value));

const scaleWeightedFivePoint = (value: number) =>
  Math.round(clamp(((value - 1) / 4) * 100));

export function getRiskBand(score: number): RiskBand {
  if (score < 30) return "低风险";
  if (score < 50) return "中低风险";
  if (score < 70) return "中高风险";
  return "高风险";
}

export function calculateRisk(inputs: Inputs): RiskResult {
  const migrationWeighted =
    0.35 * inputs.platformDependence +
    0.35 * inputs.migrationComplexity +
    0.2 * (6 - inputs.alternativeMaturity) +
    0.1 * (6 - inputs.adaptationCapability);

  const supplyWeighted =
    0.45 * (6 - inputs.supplyStability) +
    0.25 * inputs.platformDependence +
    0.2 * inputs.costSensitivity +
    0.1 * (6 - inputs.adaptationCapability);

  const migrationDifficulty = scaleWeightedFivePoint(migrationWeighted);
  const supplyRisk = scaleWeightedFivePoint(supplyWeighted);
  const vulnerability = Math.round(clamp(0.55 * supplyRisk + 0.45 * migrationDifficulty));

  return {
    migrationDifficulty,
    supplyRisk,
    vulnerability,
    band: getRiskBand(vulnerability),
  };
}

export function calculateEfficiency(inputs: Inputs): number {
  const weighted =
    0.35 * inputs.platformDependence +
    0.25 * inputs.supplyStability +
    0.2 * inputs.adaptationCapability +
    0.2 * (6 - inputs.costSensitivity);
  return scaleWeightedFivePoint(weighted);
}

export function calculateResilience(inputs: Inputs): number {
  const weighted =
    0.35 * inputs.supplyStability +
    0.25 * inputs.alternativeMaturity +
    0.25 * inputs.adaptationCapability +
    0.15 * (6 - inputs.platformDependence);
  return scaleWeightedFivePoint(weighted);
}
