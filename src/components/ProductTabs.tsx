"use client";

import { useMemo, useState } from "react";

import type { Product } from "@/types";

const tabs = [
  "The Coffee Farm & Producer",
  "The Coffee & The Process",
  "Brewing Guide",
] as const;

type ProductTab = (typeof tabs)[number];

function firstSentence(text: string): string {
  const sentence = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)[0]
    ?.trim();
  return sentence || text;
}

interface MetaColumnProps {
  label: string;
  value?: string;
}

function MetaColumn({ label, value }: MetaColumnProps) {
  return (
    <div className="flex min-h-20 flex-col items-center justify-center px-3 py-4 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#1c0f0a]/55">
        {label}
      </p>
      <p className="mt-1 text-[15px] font-medium text-[#1c0f0a]">
        {value || "-"}
      </p>
    </div>
  );
}

export function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<ProductTab>("The Coffee Farm & Producer");

  const farmQuote = useMemo(
    () => firstSentence(product.story.farmAndProducer.body),
    [product.story.farmAndProducer.body],
  );
  const processQuote = useMemo(
    () => firstSentence(product.story.coffeeAndProcess.body),
    [product.story.coffeeAndProcess.body],
  );

  return (
    <section className="mt-10">
      <div className="border-b border-[#C8D9E8]">
        <div className="flex flex-wrap gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 pb-3 text-sm font-medium transition-colors ${activeTab === tab
                ? "border-[#c9973a] text-[#1c0f0a]"
                : "border-transparent text-[#1c0f0a]/55 hover:text-[#1c0f0a]"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="py-10">
        {activeTab === "The Coffee Farm & Producer" && (
          <div className="w-full space-y-7">
            <blockquote className="border-l-[3px] border-[#c9973a] pl-5 text-[18px] italic leading-[1.7] text-[#1c0f0a]">
              {farmQuote}
            </blockquote>
            <div className="space-y-4 text-[16px] leading-[1.8] text-[#1c0f0a]/80">
              {product.story.farmAndProducer.body.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
            </div>
            <div className="grid grid-cols-1 divide-y divide-[#C8D9E8] rounded-xl border border-[#C8D9E8] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <MetaColumn label="Region" value={product.story.farmAndProducer.region} />
              <MetaColumn label="Altitude" value={product.story.farmAndProducer.altitude} />
              <MetaColumn label="Producer" value={product.story.farmAndProducer.producer} />
            </div>
          </div>
        )}

        {activeTab === "The Coffee & The Process" && (
          <div className="w-full space-y-7">
            <blockquote className="border-l-[3px] border-[#c9973a] pl-5 text-[18px] italic leading-[1.7] text-[#1c0f0a]">
              {processQuote}
            </blockquote>
            <div className="space-y-4 text-[16px] leading-[1.8] text-[#1c0f0a]/80">
              {product.story.coffeeAndProcess.body.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
            </div>
            <div className="grid grid-cols-1 divide-y divide-[#C8D9E8] rounded-xl border border-[#C8D9E8] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <MetaColumn label="Variety" value={product.story.coffeeAndProcess.variety || product.variety} />
              <MetaColumn
                label="Processing Method"
                value={product.story.coffeeAndProcess.processing || product.processingMethod}
              />
              <MetaColumn label="Harvest Season" value={product.story.coffeeAndProcess.harvest || product.harvest} />
            </div>
            {product.awards && product.awards.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.awards.map((award) => (
                  <span
                    key={award}
                    className="inline-flex items-center rounded-full bg-[#F5A623] px-3 py-1 text-xs font-semibold text-[#1c0f0a]"
                  >
                    🏆 {award}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "Brewing Guide" && (
          <div className="w-full space-y-7">
            <div className="flex flex-wrap gap-2">
              {product.story.brewGuide.recommended.map((method) => (
                <span
                  key={method}
                  className="rounded-full border border-[#1c0f0a]/20 bg-[#faf6ee] px-3 py-1 text-xs font-semibold text-[#1c0f0a]"
                >
                  {method}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 divide-y divide-[#C8D9E8] rounded-xl border border-[#C8D9E8] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <MetaColumn label="Ratio" value={product.story.brewGuide.ratio} />
              <MetaColumn label="Temperature" value={product.story.brewGuide.temperature} />
              <MetaColumn label="Grind Size" value={product.story.brewGuide.grindSize} />
            </div>
            <ol className="divide-y divide-[#C8D9E8] border-y border-[#C8D9E8]">
              {product.story.brewGuide.steps.map((step, index) => (
                <li key={index} className="grid grid-cols-[44px_1fr] gap-4 py-4">
                  <span className="text-2xl font-bold text-[#1c0f0a]/45">{index + 1}</span>
                  <p className="text-[15px] leading-[1.6] text-[#1c0f0a]">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
