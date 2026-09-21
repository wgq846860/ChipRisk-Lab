import type { Inputs, RiskResult } from "./risk-model";

export type RiskDriver = {
  key: keyof Inputs;
  label: string;
  score: number;
};

const exposure = (value: number) => Math.round(((value - 1) / 4) * 100);

export function rankRiskDrivers(inputs: Inputs): RiskDriver[] {
  const drivers: RiskDriver[] = [
    { key: "platformDependence", label: "平台依赖", score: exposure(inputs.platformDependence) },
    { key: "migrationComplexity", label: "迁移复杂度", score: exposure(inputs.migrationComplexity) },
    { key: "alternativeMaturity", label: "替代方案不足", score: exposure(6 - inputs.alternativeMaturity) },
    { key: "supplyStability", label: "供应不稳定", score: exposure(6 - inputs.supplyStability) },
    { key: "adaptationCapability", label: "组织适配缺口", score: exposure(6 - inputs.adaptationCapability) },
    { key: "costSensitivity", label: "成本敏感度", score: exposure(inputs.costSensitivity) },
  ];

  return drivers.sort((a, b) => b.score - a.score);
}

export function buildExplanation(inputs: Inputs, result: RiskResult) {
  const [primary, secondary] = rankRiskDrivers(inputs);
  const migrationPressure = inputs.migrationComplexity >= 4 || inputs.platformDependence >= 4;
  const adaptationGap = inputs.adaptationCapability <= 2;
  const alternativeGap = inputs.alternativeMaturity <= 2;

  return {
    summary: `在该模拟条件下，${primary.label}与${secondary.label}是更突出的风险来源，综合脆弱性倾向于处于“${result.band}”区间。`,
    cost: migrationPressure
      ? "当前迁移链路较复杂。如果供应条件发生变化，组织可能需要追加软件适配、验证与培训投入，从而抬高总拥有成本并减缓应用扩散。"
      : "当前迁移阻力相对可控，但价格和采购条件变化仍可能通过运维、验证与时间成本影响技术扩散。",
    innovation: alternativeGap
      ? "替代方案成熟度偏低，外部压力可能推动新的适配与研发投入，同时也可能带来重复建设和多平台维护成本。"
      : "替代方案已有一定成熟度，组织倾向于获得更多技术选择，但并行维护仍可能增加协调和工程成本。",
    availability: adaptationGap
      ? "组织适配能力偏弱时，供应波动更可能转化为实际算力不可得问题，中小规模使用者受到的影响可能更明显。"
      : "组织具备一定适配能力，可能通过多平台调度和工程优化缓冲供应波动，但这并不消除关键节点依赖。",
  };
}
