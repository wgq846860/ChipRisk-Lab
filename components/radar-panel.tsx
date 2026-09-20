"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";
import type { Inputs } from "@/lib/risk-model";

const toExposure = (value: number) => Math.round(((value - 1) / 4) * 100);

export function RadarPanel({ inputs }: { inputs: Inputs }) {
  const data = [
    { label: "平台依赖", value: toExposure(inputs.platformDependence) },
    { label: "迁移成本", value: toExposure(inputs.migrationComplexity) },
    { label: "供应风险", value: toExposure(6 - inputs.supplyStability) },
    { label: "成本敏感", value: toExposure(inputs.costSensitivity) },
    { label: "适配缺口", value: toExposure(6 - inputs.adaptationCapability) },
    { label: "替代不足", value: toExposure(6 - inputs.alternativeMaturity) },
  ];

  return (
    <section className="dashboard-panel chart-panel" aria-labelledby="radar-heading">
      <div className="panel-heading"><div><span className="panel-kicker">RISK STRUCTURE</span><h2 id="radar-heading">风险结构雷达图</h2></div><span className="panel-code">FIG / 01</span></div>
      <div className="radar-layout">
        <div className="radar-chart" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 480, height: 330 }}>
            <RadarChart data={data} outerRadius="68%">
              <PolarGrid stroke="#30363B" radialLines />
              <PolarAngleAxis dataKey="label" tick={{ fill: "#A9B0B6", fontSize: 12 }} />
              <Radar dataKey="value" stroke="#5E8FA3" fill="#5E8FA3" fillOpacity={0.23} strokeWidth={2} dot={{ fill: "#E5E7E9", r: 3 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <ul className="radar-values" aria-label="六项风险暴露值">
          {data.map((item) => <li key={item.label}><span>{item.label}</span><strong>{item.value}</strong></li>)}
        </ul>
      </div>
    </section>
  );
}
