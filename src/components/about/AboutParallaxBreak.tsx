const ROASTERY_WIDE = "https://picsum.photos/seed/smalldose-roastery-wide/1920/1080";

export function AboutParallaxBreak() {
  return (
    <div
      className="about-parallax-bg h-[70vh] w-full overflow-x-hidden"
      style={{ backgroundImage: `url(${ROASTERY_WIDE})` }}
      role="img"
      aria-label="Roastery"
    />
  );
}
