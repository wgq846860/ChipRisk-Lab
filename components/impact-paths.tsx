import { Boxes, Network, Waypoints } from "lucide-react";
import { buildExplanation } from "@/lib/explanations";
import type { Inputs, RiskResult } from "@/lib/risk-model";

export function ImpactPaths({ inputs, result }: { inputs: Inputs; result: RiskResult }) {
  const copy = buildExplanation(inputs, result);
  const paths = [
    { code: "PATH / 01", title: "成本与扩散", text: copy.cost, icon: Boxes },
    { code: "PATH / 02", title: "创新与组织", text: copy.innovation, icon: Network },
    { code: "PATH / 03", title: "可得性与风险", text: copy.availability, icon: Waypoints },
  ];
  return (
    <section className="impact-section" aria-labelledby="impact-heading">
      <div className="panel-heading"><div><span className="panel-kicker">TRANSMISSION PATHS</span><h2 id="impact-heading">对数字经济的三条影响路径</h2></div></div>
      <div className="impact-grid">
        {paths.map(({ code, title, text, icon: Icon }) => (
          <article key={title}><div><Icon aria-hidden="true" size={18} /><span>{code}</span></div><h3>{title}</h3><p>{text}</p></article>
        ))}
      </div>
    </section>
  );
}
