import { AlertTriangle, ArrowDownRight, PackageSearch } from "lucide-react";
import { rankRiskDrivers } from "@/lib/explanations";
import type { Inputs, RiskResult } from "@/lib/risk-model";

export function RiskSummary({ inputs, result }: { inputs: Inputs; result: RiskResult }) {
  const [primary] = rankRiskDrivers(inputs);
  return (
    <section className="risk-summary" aria-labelledby="risk-heading">
      <div className="score-block">
        <p id="risk-heading">综合脆弱性指数</p>
        <div><strong>{result.vulnerability}</strong><span>/ 100</span></div>
        <span className="risk-badge" data-band={result.band}>{result.band}</span>
      </div>
      <div className="risk-takeaway">
        <span className="panel-kicker"><AlertTriangle size={14} />PRIMARY SIGNAL</span>
        <h2>主要风险来源：{primary.label}</h2>
        <p>在该模拟条件下，风险并非只来自硬件性能，而更可能来自生态依赖、迁移阻力与供应条件的共同作用。</p>
      </div>
      <div className="metric-stack">
        <div><span><ArrowDownRight size={14} />迁移难度</span><strong>{result.migrationDifficulty}</strong></div>
        <div><span><PackageSearch size={14} />供应风险</span><strong>{result.supplyRisk}</strong></div>
      </div>
    </section>
  );
}
