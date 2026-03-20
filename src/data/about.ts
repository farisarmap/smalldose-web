const img = (seed: string, w = 1400, h = 900) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const aboutData = {
  chapters: [
    {
      year: "2018",
      moment: "The Question",
      statement: "Why does the same coffee taste\ndifferent everywhere you buy it?",
      detail: "Cirebon, Indonesia. A small table. One bad cup too many.",
      image: img("smalldose-about-ch1"),
    },
    {
      year: "2019",
      moment: "The Search",
      statement: "We visited 12 countries\nto find the answer.",
      detail: "Ethiopia. Colombia. Panama. Rwanda. Papua. The answer was always the same — it starts at the farm.",
      image: img("smalldose-about-ch2"),
    },
    {
      year: "2020",
      moment: "The Roastery",
      statement: "A garage.\nA sample roaster.\nOne obsession.",
      detail: "We built our first roasting setup in 40 square meters. Every batch profiled by hand.",
      image: img("smalldose-about-ch3"),
    },
    {
      year: "2021",
      moment: "The First Bean",
      statement: "Rwanda Lake Kivu.\nOur first farm partnership.",
      detail: "We flew to meet the Gisheke cooperative. We haven't stopped sourcing direct since.",
      image: img("smalldose-about-ch4"),
    },
    {
      year: "2024",
      moment: "The Platform",
      statement: "Now we ship\nto the world.",
      detail: "What started as a local obsession became a global platform for traceable specialty coffee.",
      image: img("smalldose-about-ch5"),
    },
  ],
  stats: [
    { value: "40+", label: "Farm Partners" },
    { value: "12", label: "Countries" },
    { value: "6", label: "Years Roasting" },
    { value: "IDR", label: "Local Roots" },
  ],
  values: [
    {
      number: "01",
      title: "Trace Everything",
      body: "If we can't name the farm, we don't sell the coffee.",
    },
    {
      number: "02",
      title: "Roast With Intention",
      body: "Every origin gets its own profile. No shortcuts.",
    },
    {
      number: "03",
      title: "Tell the Story",
      body: "The farmer's name belongs on the bag, not just ours.",
    },
    {
      number: "04",
      title: "Ship Everywhere",
      body: "Great coffee has no borders. Neither do we.",
    },
  ],
} as const;

export type AboutChapter = (typeof aboutData.chapters)[number];
