import type { Inputs } from "./risk-model";

export type ScenarioId = "startup" | "enterprise" | "research" | "custom";

export type Scenario = {
  id: ScenarioId;
  name: string;
  code: string;
  summary: string;
  inputs: Inputs | null;
};

export const DEFAULT_INPUTS: Inputs = {
  platformDependence: 3,
  migrationComplexity: 3,
  alternativeMaturity: 3,
  supplyStability: 3,
  adaptationCapability: 3,
  costSensitivity: 3,
};

export const SCENARIOS: Scenario[] = [
  {
    id: "startup",
    name: "AI 创业公司",
    code: "SCN-01",
    summary: "团队精干、生态依赖高，对算力价格更敏感。",
    inputs: { platformDependence: 5, migrationComplexity: 4, alternativeMaturity: 2, supplyStability: 3, adaptationCapability: 4, costSensitivity: 5 },
  },
  {
    id: "enterprise",
    name: "大型互联网企业",
    code: "SCN-02",
    summary: "算力规模大、迁移链路长，具备多平台维护能力。",
    inputs: { platformDependence: 5, migrationComplexity: 5, alternativeMaturity: 3, supplyStability: 3, adaptationCapability: 5, costSensitivity: 3 },
  },
  {
    id: "research",
    name: "科研机构 / 高校",
    code: "SCN-03",
    summary: "预算约束明显，任务多样，依赖成熟软件框架。",
    inputs: { platformDependence: 4, migrationComplexity: 4, alternativeMaturity: 3, supplyStability: 3, adaptationCapability: 2, costSensitivity: 5 },
  },
  {
    id: "custom",
    name: "自定义场景",
    code: "SCN-00",
    summary: "从中性参数开始，构建你的计算环境。",
    inputs: null,
  },
];

export function getScenario(id: Exclude<ScenarioId, "custom">): Scenario & { inputs: Inputs } {
  const scenario = SCENARIOS.find((item) => item.id === id);
  if (!scenario?.inputs) throw new Error(`Unknown scenario: ${id}`);
  return scenario as Scenario & { inputs: Inputs };
}
