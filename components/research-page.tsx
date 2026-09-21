import { ExternalLink, FileDown, Sigma } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const references = [
  "NVIDIA（2025）：2026 财年第一季度财务结果",
  "NVIDIA Developer（2026）：CUDA Zone",
  "Ascend（2026）：TorchNPU 项目资料",
  "Zhou et al.（2025）：昇腾训练分析与优化系统",
  "ASML（2026）：EUV lithography systems",
  "TSMC（2024）：2024 Annual Report",
  "TSMC（2025）：2025 Annual Report",
  "ASML（2023）：荷兰出口管制声明",
  "国务院（2020）：集成电路产业和软件产业高质量发展若干政策",
  "NIST（2026）：CHIPS for America",
  "AWS News Blog（2025）：EC2 NVIDIA GPU 实例价格调整",
  "Katz & Shapiro（1994）：Systems Competition and Network Effects",
  "Brynjolfsson, Rock & Syverson（2021）：The Productivity J-Curve",
  "Farrell & Newman（2019）：Weaponized Interdependence",
];

export function ResearchPage() {
  return (
    <section className="workspace-page research-page">
      <div className="page-intro">
        <p className="eyebrow">RESEARCH NOTES / MODEL DISCLOSURE</p>
        <h1>模型如何连接简报框架</h1>
        <p>本工具将微观企业竞争、中观产业链协同和宏观政策约束转化为六项可调变量，用于课堂演示机制关系，而非预测真实企业表现。</p>
      </div>

      <div className="framework-strip" aria-label="三层研究框架">
        <article><span>MICRO / 01</span><h2>企业生态</h2><p>平台依赖、软件迁移与组织适配共同决定替换硬件的真实成本。</p></article>
        <article><span>MESO / 02</span><h2>产业协同</h2><p>设备、制造、封装和软件等关键环节影响算力的稳定交付。</p></article>
        <article><span>MACRO / 03</span><h2>政策约束</h2><p>许可、投资与产业政策会改变企业可选择的路径及其风险权重。</p></article>
      </div>

      <div className="research-grid">
        <article className="formula-card">
          <div className="panel-heading"><div><span className="panel-kicker"><Sigma size={14} />FORMULA / 01</span><h2>迁移难度指数</h2></div></div>
          <code>0.35 × 平台依赖度<br />+ 0.35 × 软件迁移复杂度<br />+ 0.20 × (6 − 替代平台成熟度)<br />+ 0.10 × (6 − 企业适配能力)</code>
        </article>
        <article className="formula-card">
          <div className="panel-heading"><div><span className="panel-kicker"><Sigma size={14} />FORMULA / 02</span><h2>供应风险指数</h2></div></div>
          <code>0.45 × (6 − 供应稳定性)<br />+ 0.25 × 平台依赖度<br />+ 0.20 × 成本敏感度<br />+ 0.10 × (6 − 企业适配能力)</code>
        </article>
        <article className="formula-card formula-card-wide">
          <div className="panel-heading"><div><span className="panel-kicker"><Sigma size={14} />FORMULA / 03</span><h2>综合脆弱性指数</h2></div></div>
          <code>0.55 × 供应风险 + 0.45 × 迁移难度</code>
          <div className="threshold-row"><span>0–29 低风险</span><span>30–49 中低风险</span><span>50–69 中高风险</span><span>70–100 高风险</span></div>
        </article>
      </div>

      <div className="limitations-grid">
        <article><span className="panel-kicker">BOUNDARY / 01</span><h2>它能说明什么</h2><p>通过参数变化展示风险结构和效率—韧性权衡，帮助读者理解芯片竞争为何是系统能力竞争。</p></article>
        <article><span className="panel-kicker">BOUNDARY / 02</span><h2>它不能说明什么</h2><p>指数没有使用真实企业微观数据，不能用于厂商排名、经营预测、投资判断或国家竞争结果推断。</p></article>
      </div>

      <section className="reference-panel" aria-labelledby="references-heading">
        <div className="panel-heading"><div><span className="panel-kicker">EVIDENCE BASE</span><h2 id="references-heading">简报参考材料</h2></div><span className="panel-code">14 SOURCES</span></div>
        <ol>{references.map((reference) => <li key={reference}>{reference}</li>)}</ol>
      </section>

      <div className="research-actions">
        <a className="primary-button" href={`${basePath}/report/%E8%8A%AF%E7%89%87%E6%88%98%E4%BA%89%E7%AE%80%E6%8A%A5.pdf`} target="_blank" rel="noreferrer">查看完整简报 <FileDown size={17} /></a>
        <a className="secondary-button" href="https://github.com/Ascend/pytorch" target="_blank" rel="noreferrer">查看示例资料源 <ExternalLink size={16} /></a>
      </div>
    </section>
  );
}
