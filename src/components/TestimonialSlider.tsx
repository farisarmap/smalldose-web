"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface Testimonial {
  quote: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The Geisha lot was super clean and expressive. Shipping was fast and the roast date was exactly what I wanted.",
    author: "Nadya, Jakarta",
  },
  {
    quote:
      "I like how each bag has clear tasting notes. Easy to dial in and consistently sweet on V60.",
    author: "Arif, Bandung",
  },
  {
    quote:
      "Great curation and beautiful packaging. Their brew guides helped me improve my home setup.",
    author: "Melissa, Surabaya",
  },
  {
    quote:
      "The roast profile is always consistent. I can trust each bag to brew sweet and clean.",
    author: "Bima, Yogyakarta",
  },
  {
    quote:
      "Love the packaging and the coffee quality. Their support team is also very responsive.",
    author: "Dewi, Semarang",
  },
  {
    quote:
      "I switched from capsules to pour-over because of their brew guides. Huge improvement.",
    author: "Kevin, Bali",
  },
  {
    quote:
      "Fast delivery, fresh roast, and easy notes to follow. Perfect for my daily morning brew.",
    author: "Rani, Makassar",
  },
  {
    quote:
      "Their single origins are vibrant and transparent. Great value for the quality level.",
    author: "Farhan, Medan",
  },
  {
    quote:
      "I bought beans and a dripper from one place. Everything arrived safely and looked premium.",
    author: "Alia, Tangerang",
  },
  {
    quote:
      "The tasting notes actually match the cup. It helped me learn flavor mapping faster.",
    author: "Rizky, Depok",
  },
];

export function TestimonialSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const totalSlides = useMemo(() => testimonials.length, []);
  const maxStartIndex = Math.max(totalSlides - cardsPerView, 0);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(4);
        return;
      }
      if (window.innerWidth >= 768) {
        setCardsPerView(3);
        return;
      }
      if (window.innerWidth >= 640) {
        setCardsPerView(2);
        return;
      }
      setCardsPerView(1);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [maxStartIndex]);

  useEffect(() => {
    if (!containerRef.current) return;
    const firstCard = containerRef.current.querySelector<HTMLElement>("[data-card='true']");
    if (!firstCard) return;
    const gap = 24; // matches gap-6
    const nextScrollLeft = currentIndex * (firstCard.offsetWidth + gap);
    containerRef.current.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
  }, [currentIndex, cardsPerView]);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const goPrev = () =>
    setCurrentIndex((prev) => (prev <= 0 ? maxStartIndex : prev - 1));
  const goNext = () => setCurrentIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));

  return (
    <div className="relative rounded-2xl border border-[#1c0f0a]/10 bg-white p-6 shadow-sm md:p-8">
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-hidden"
        aria-live="polite"
      >
        {testimonials.map((item) => (
          <article
            key={item.author}
            data-card="true"
            className="w-full shrink-0 snap-start rounded-xl border border-[#1c0f0a]/10 bg-[#faf6ee] p-5 sm:basis-[calc((100%-1.5rem)/2)] md:basis-[calc((100%-3rem)/3)] lg:basis-[calc((100%-4.5rem)/4)]"
            aria-label={`Testimonial from ${item.author}`}
          >
            <p className="text-sm leading-relaxed text-[#1c0f0a]/75">
              &ldquo;{item.quote}&rdquo;
            </p>
            <p className="mt-5 text-sm font-semibold text-[#1c0f0a]">{item.author}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Array.from({ length: maxStartIndex + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                currentIndex === index ? "bg-[#1c0f0a]" : "bg-[#1c0f0a]/20"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="rounded-full border border-[#1c0f0a]/20 px-3 py-1 text-sm transition-colors hover:bg-[#1c0f0a]/5"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="rounded-full border border-[#1c0f0a]/20 px-3 py-1 text-sm transition-colors hover:bg-[#1c0f0a]/5"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
