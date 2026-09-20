"use client";

import { Building2, FlaskConical, Rocket, SlidersHorizontal } from "lucide-react";
import { SCENARIOS, type ScenarioId } from "@/lib/scenarios";

const icons = {
  startup: Rocket,
  enterprise: Building2,
  research: FlaskConical,
  custom: SlidersHorizontal,
};

export function ScenarioSelector({ active, onSelect }: { active: ScenarioId; onSelect: (id: ScenarioId) => void }) {
  return (
    <div className="scenario-list" role="radiogroup" aria-label="模拟场景">
      {SCENARIOS.map((scenario) => {
        const Icon = icons[scenario.id];
        const selected = active === scenario.id;
        return (
          <button
            type="button"
            role="radio"
            aria-checked={selected}
            className="scenario-card"
            data-selected={selected}
            key={scenario.id}
            onClick={() => onSelect(scenario.id)}
          >
            <span className="scenario-icon"><Icon aria-hidden="true" size={18} strokeWidth={1.7} /></span>
            <span className="scenario-code">{scenario.code}</span>
            <strong>{scenario.name}</strong>
            <small>{scenario.summary}</small>
          </button>
        );
      })}
    </div>
  );
}
