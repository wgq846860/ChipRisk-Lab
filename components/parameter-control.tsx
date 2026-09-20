"use client";

import { Slider } from "@/components/ui/slider";

type Props = {
  id: string;
  index: number;
  label: string;
  question: string;
  low: string;
  high: string;
  value: number;
  onChange: (value: number) => void;
};

export function ParameterControl({ id, index, label, question, low, high, value, onChange }: Props) {
  return (
    <div className="parameter-control">
      <div className="parameter-copy">
        <span className="parameter-index">{String(index).padStart(2, "0")}</span>
        <div>
          <label id={`${id}-label`} className="parameter-label">{label}</label>
          <p>{question}</p>
        </div>
        <output className="parameter-value" aria-live="polite">{value}</output>
      </div>
      <Slider
        aria-labelledby={`${id}-label`}
        min={1}
        max={5}
        step={1}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        className="parameter-slider"
      />
      <div className="parameter-scale"><span>1 · {low}</span><span>5 · {high}</span></div>
    </div>
  );
}
