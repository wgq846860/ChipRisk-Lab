"use client";

import { ArrowLeft, ArrowRight, BarChart3, CircuitBoard, FileText, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { calculateRisk, type Inputs, type RiskResult } from "@/lib/risk-model";
import { DEFAULT_INPUTS, getScenario, type ScenarioId } from "@/lib/scenarios";
import { normalizeToolInputs, simulationInputSchema } from "@/lib/webmcp";
import { ParameterControl } from "./parameter-control";
import { ScenarioSelector } from "./scenario-selector";
import { ImpactPaths } from "./impact-paths";
import { RadarPanel } from "./radar-panel";
import { ResilienceMatrix } from "./resilience-matrix";
import { RiskSummary } from "./risk-summary";
import { ResearchPage } from "./research-page";

type View = "home" | "parameters" | "results" | "research";

const PARAMETERS: Array<{
  key: keyof Inputs;
  label: string;
  question: string;
  low: string;
  high: string;
}> = [
  { key: "platformDependence", label: "现有平台依赖度", question: "代码、工具链和员工经验在多大程度上依赖当前平台？", low: "很低", high: "很高" },
  { key: "migrationComplexity", label: "软件迁移复杂度", question: "更换平台时，重写代码、验证模型和培训人员的程度？", low: "很低", high: "很高" },
  { key: "alternativeMaturity", label: "替代平台成熟度", question: "市场上是否存在成熟、稳定且兼容性较好的替代平台？", low: "不成熟", high: "很成熟" },
  { key: "supplyStability", label: "供应稳定性", question: "当前算力供应、交付周期和采购渠道是否稳定？", low: "不稳定", high: "很稳定" },
  { key: "adaptationCapability", label: "企业适配能力", question: "组织是否具备迁移、性能调优和多平台维护能力？", low: "很弱", high: "很强" },
  { key: "costSensitivity", label: "成本敏感度", question: "硬件、云服务或迁移投入上涨会在多大程度上影响业务？", low: "不敏感", high: "很敏感" },
];

function Brand({ onHome }: { onHome: () => void }) {
  return (
    <button type="button" className="brand" onClick={onHome} aria-label="返回首页">
      <span className="brand-mark"><CircuitBoard aria-hidden="true" size={19} strokeWidth={1.6} /></span>
      <span><strong>芯链决策器</strong><small>ChipRisk Lab</small></span>
    </button>
  );
}

function SystemMap() {
  return (
    <div className="system-map" aria-label="报告核心逻辑图">
      <div className="map-heading"><span>竞争结构</span><span className="font-mono">SYSTEM MAP</span></div>
      <div className="map-stage">
        <div className="map-node"><span>01</span><strong>企业生态</strong><small>平台依赖 · 软件迁移</small></div>
        <div className="map-line" aria-hidden="true" />
        <div className="map-node"><span>02</span><strong>产业协同</strong><small>关键节点 · 供应稳定</small></div>
        <div className="map-line" aria-hidden="true" />
        <div className="map-node"><span>03</span><strong>政策约束</strong><small>获取风险 · 制度环境</small></div>
      </div>
      <div className="map-output"><span>输出</span><strong>效率 × 韧性 × 安全</strong></div>
    </div>
  );
}

export function Simulator() {
  const [view, setView] = useState<View>("home");
  const [scenario, setScenario] = useState<ScenarioId>("custom");
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<RiskResult>(() => calculateRisk(DEFAULT_INPUTS));

  useEffect(() => {
    type ToolContext = { registerTool: (tool: Record<string, unknown>, options?: { signal?: AbortSignal }) => void | Promise<void> };
    const context = (document as Document & { modelContext?: ToolContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: "configure_and_run_chip_risk_simulation",
      title: "配置并运行芯片风险模拟",
      description: "设置六项 1 到 5 的参数，运行教学型芯片供应风险与迁移成本分析，并在页面中显示结果。",
      inputSchema: simulationInputSchema,
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input: unknown) {
        const nextInputs = normalizeToolInputs(input);
        const nextResult = calculateRisk(nextInputs);
        setInputs(nextInputs);
        setScenario("custom");
        setResult(nextResult);
        setView("results");
        return { ...nextResult, disclaimer: "教学型模拟指标，不代表真实企业风险评级。" };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  const selectScenario = (id: ScenarioId) => {
    setScenario(id);
    setInputs(id === "custom" ? DEFAULT_INPUTS : { ...getScenario(id).inputs });
  };

  const updateInput = (key: keyof Inputs, value: number) => {
    setScenario("custom");
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const analyze = () => {
    setResult(calculateRisk(inputs));
    setView("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main id="home" className="min-h-screen bg-background text-foreground">
      <header className="site-header">
        <Brand onHome={() => setView("home")} />
        <nav aria-label="主要导航">
          <button type="button" data-active={view === "parameters" || view === "results"} onClick={() => setView("parameters")}><Settings2 size={15} />模拟器</button>
          <button type="button" data-active={view === "research"} onClick={() => setView("research")}><FileText size={15} />研究说明</button>
        </nav>
        <span className="model-code">MODEL / 01</span>
      </header>

      {view === "home" ? (
        <section className="home-layout">
          <div className="home-copy">
            <p className="eyebrow">COMPUTE SUPPLY / MIGRATION COST / RESILIENCE</p>
            <h1>芯片选择，真的只是比较性能吗？</h1>
            <p className="lede">调整软件生态、迁移成本与供应风险，观察芯片战争如何改变企业的算力决策。</p>
            <div className="action-row">
              <button className="primary-button" type="button" onClick={() => setView("parameters")}>开始模拟 <ArrowRight size={17} /></button>
              <span>约 3 分钟 · 六项参数 · 教学型模型</span>
            </div>
          </div>
          <SystemMap />
        </section>
      ) : null}

      {view === "parameters" ? (
        <section className="workspace-page">
          <div className="page-intro">
            <p className="eyebrow">INPUT CONSOLE / STEP 01</p>
            <h1>构建算力使用场景</h1>
            <p>先选择一个预设，再根据实际情况调整六项参数。数值越高，代表该特征越明显。</p>
          </div>
          <div className="parameter-layout">
            <aside><div className="section-label"><span>场景预设</span><span>01 / 02</span></div><ScenarioSelector active={scenario} onSelect={selectScenario} /></aside>
            <div className="control-panel">
              <div className="section-label"><span>核心变量</span><span>02 / 02</span></div>
              {PARAMETERS.map(({ key, ...item }, index) => (
                <ParameterControl key={key} id={key} index={index + 1} {...item} value={inputs[key]} onChange={(value) => updateInput(key, value)} />
              ))}
              <div className="control-actions">
                <button className="secondary-button" type="button" onClick={() => setView("home")}><ArrowLeft size={16} />返回</button>
                <button className="primary-button" type="button" onClick={analyze}>开始分析<BarChart3 size={17} /></button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {view === "results" ? (
        <section className="workspace-page result-page">
          <div className="result-toolbar">
            <div><p className="eyebrow">ANALYSIS OUTPUT / STEP 02</p><h1>风险结构分析</h1></div>
            <button className="secondary-button" type="button" onClick={() => setView("parameters")}><ArrowLeft size={16} />重新模拟</button>
          </div>
          <RiskSummary inputs={inputs} result={result} />
          <div className="dashboard-grid"><RadarPanel inputs={inputs} /><ResilienceMatrix inputs={inputs} /></div>
          <ImpactPaths inputs={inputs} result={result} />
          <p className="model-disclaimer">本指数为基于课程简报分析框架构建的教学型模拟指标，不代表真实企业风险评级或投资建议。</p>
        </section>
      ) : null}

      {view === "research" ? (
        <ResearchPage />
      ) : null}
    </main>
  );
}
