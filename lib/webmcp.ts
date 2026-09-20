import type { Inputs } from "./risk-model";

const keys: Array<keyof Inputs> = [
  "platformDependence",
  "migrationComplexity",
  "alternativeMaturity",
  "supplyStability",
  "adaptationCapability",
  "costSensitivity",
];

export function normalizeToolInputs(input: unknown): Inputs {
  if (!input || typeof input !== "object") throw new Error("必须提供完整的六项参数。");
  const record = input as Record<string, unknown>;
  const complete = keys.every((key) => Number.isInteger(record[key]) && Number(record[key]) >= 1 && Number(record[key]) <= 5);
  if (!complete) throw new Error("必须提供完整的六项参数，且每项均为 1 到 5 的整数。");
  return Object.fromEntries(keys.map((key) => [key, Number(record[key])])) as Inputs;
}

export const simulationInputSchema = {
  type: "object",
  properties: Object.fromEntries(keys.map((key) => [key, { type: "integer", minimum: 1, maximum: 5 }])),
  required: keys,
  additionalProperties: false,
} as const;
