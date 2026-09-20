import { calculateEfficiency, calculateResilience, type Inputs } from "@/lib/risk-model";

export function ResilienceMatrix({ inputs }: { inputs: Inputs }) {
  const efficiency = calculateEfficiency(inputs);
  const resilience = calculateResilience(inputs);
  const efficiencyLabel = efficiency >= 50 ? "高效率" : "低效率";
  const resilienceLabel = resilience >= 50 ? "高韧性" : "低韧性";

  return (
    <section className="dashboard-panel matrix-panel" aria-labelledby="matrix-heading">
      <div className="panel-heading"><div><span className="panel-kicker">TRADE-OFF MAP</span><h2 id="matrix-heading">效率—韧性矩阵</h2></div><span className="panel-code">FIG / 02</span></div>
      <div className="matrix-wrap">
        <span className="axis-y">长期韧性</span>
        <div className="matrix-grid">
          <div><span>低效率 × 高韧性</span></div><div><span>高效率 × 高韧性</span></div>
          <div><span>低效率 × 低韧性</span></div><div><span>高效率 × 低韧性</span></div>
          <span className="matrix-point" style={{ left: `${efficiency}%`, bottom: `${resilience}%` }}><i /><b>当前方案</b></span>
        </div>
        <span className="axis-x">短期效率</span>
      </div>
      <p className="matrix-note">当前位于“{efficiencyLabel} × {resilienceLabel}”区域，体现了短期使用效率与长期供应韧性之间的资源配置选择。</p>
    </section>
  );
}
