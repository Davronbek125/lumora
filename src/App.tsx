import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export interface Video {
  src: string;
  label: string;
}

export type Timer = ReturnType<typeof setTimeout>;

const VIDEOS: Video[] = [
  {
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
    label: "Golden Hour",
  },
  {
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4",
    label: "Still Water",
  },
  {
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4",
    label: "Deep Woods",
  },
  {
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4",
    label: "Quiet Dawn",
  },
];

const OVERLAY_PNG =
  "https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png";

const NAV_LINKS = ["How It Works", "Features", "Pricing", "Community"];

export default function App() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const cooldownRef = useRef<Timer | null>(null);
  const isDarkMode = activeVideo === 2;
  const heroColor = isDarkMode ? "#182C41" : "#FFFFFF";
  const heroColorMuted = isDarkMode ? "rgba(24,44,65,0.78)" : "rgba(255,255,255,0.78)";

  useEffect(() => {
    const handle = cooldownRef.current;
    return () => {
      clearTimeout(handle);
    };
  }, []);

  const handleSwitch = (i: number) => {
    if (i === activeVideo || isTransitioning) return;
    setIsTransitioning(true);
    setActiveVideo(i);
    if (cooldownRef.current) clearTimeout(cooldownRef.current);
    cooldownRef.current = setTimeout(() => setIsTransitioning(false), 1000);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black font-sans">
      {/* Video background layer */}
      <div className="absolute inset-0 z-0">
        {VIDEOS.map((v, i) => (
          <video
            key={v.src}
            src={v.src}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === activeVideo ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* PNG overlay with train-bob */}
        <img
          src={OVERLAY_PNG}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover train-bob pointer-events-none"
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-5 sm:px-8 md:px-12 pt-5 sm:pt-8">
        <div
          className="font-serif italic text-white text-xl sm:text-2xl leading-none"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Lumora
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          <div className="liquid-glass rounded-full px-2 py-1.5 flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href="#"
                className="text-white/90 hover:text-white text-sm px-4 py-1.5 rounded-full transition-colors"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                {l}
              </a>
            ))}
            <button
              className="ml-1 bg-white text-black text-sm font-medium px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden liquid-glass rounded-full w-11 h-11 flex items-center justify-center text-white"
        >
          <span className="relative w-5 h-5">
            <Menu
              className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div className="relative h-full w-full flex flex-col items-center justify-center gap-8 px-8">
          {NAV_LINKS.map((l, idx) => (
            <a
              key={l}
              href="#"
              onClick={() => setMobileOpen(false)}
              className={`menu-link text-white text-3xl ${mobileOpen ? "is-open" : ""}`}
              style={{
                fontFamily: "'Instrument Serif', serif",
                transitionDelay: mobileOpen ? `${100 + idx * 50}ms` : "0ms",
              }}
            >
              {l}
            </a>
          ))}
          <button
            onClick={() => setMobileOpen(false)}
            className={`menu-link mt-4 bg-white text-black text-base font-medium px-7 py-3 rounded-full ${
              mobileOpen ? "is-open" : ""
            }`}
            style={{
              fontFamily: "system-ui, sans-serif",
              transitionDelay: mobileOpen ? "300ms" : "0ms",
              transform: mobileOpen ? "scale(1)" : "scale(0.85)",
            }}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 h-[calc(100vh-72px)] flex flex-col items-center justify-center px-5 sm:px-8 text-center">
        <div
          className="liquid-glass rounded-full px-4 sm:px-5 py-2 mb-6 sm:mb-8 inline-flex items-center"
          style={{
            color: heroColor,
            transition: "color 700ms ease",
            fontFamily: "system-ui, sans-serif",
            fontSize: "0.8rem",
          }}
        >
          Over 10,000 minds already finding their clarity
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl"
          style={{
            fontFamily: "'Instrument Serif', serif",
            color: heroColor,
            transition: "color 700ms ease",
          }}
        >
          Clarity in an Endlessly
          <br />
          Noisy Universe
        </h1>

        <p
          className="mt-5 sm:mt-6 max-w-xl leading-relaxed text-sm sm:text-base"
          style={{
            color: heroColorMuted,
            fontFamily: "system-ui, sans-serif",
            transition: "color 700ms ease",
          }}
        >
          Rise above the chaos of pings, infinite scrolling, and relentless
          demands. Discover how to protect your presence and create with
          intention.
        </p>

        <div
          className="liquid-glass rounded-full p-1.5 mt-7 sm:mt-8 flex items-center gap-2 w-full max-w-[320px] sm:max-w-sm"
        >
          <input
            type="email"
            placeholder="Your Best Email"
            className="flex-1 bg-transparent outline-none px-4 text-white placeholder:text-white/60 text-sm"
            style={{ fontFamily: "system-ui, sans-serif" }}
          />
          <button
            className="bg-white text-black text-sm font-medium px-4 sm:px-5 py-2 rounded-full whitespace-nowrap hover:bg-white/90 transition-colors"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Get Early Access
          </button>
        </div>

        <div
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          style={{
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {VIDEOS.map((v, i) => {
            const isActive = i === activeVideo;
            return (
              <button
                key={v.label}
                onClick={() => handleSwitch(i)}
                disabled={isTransitioning}
                className={`relative px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-full transition-all duration-300 ${
                  isActive
                    ? "border border-transparent"
                    : "border border-transparent opacity-50 hover:opacity-80"
                }`}
                style={{
                  color: heroColor,
                  backgroundColor: isActive ? heroColor : "transparent",
                  // For active: text becomes background color contrast. Since we want visible label,
                  // we keep the label color as the contrasting tone of heroColor.
                  // In light (white) bg, dark text; in dark mode (#182C41) bg, white text.
                  // We use mixBlendMode alternative: just compute the inverted color via opacity overlay.
                  // Simplest reliable approach: set background to a soft contrast and keep label color.
                  transition: "color 700ms ease, background-color 300ms ease, opacity 300ms ease",
                }}
              >
                <span
                  style={{
                    color: isActive
                      ? isDarkMode
                        ? "#FFFFFF"
                        : "#111111"
                      : heroColor,
                    transition: "color 700ms ease",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {v.label}
                </span>
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute left-3 right-3 -bottom-1 h-[2px] rounded-full"
                    style={{ background: heroColor, transition: "background 700ms ease" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Spacer pushes bottom stats to bottom */}
        <div className="flex-1" />

        {/* Bottom stats */}
        <div
          className="pb-6 sm:pb-8 text-white/70 text-xs sm:text-sm flex flex-wrap justify-center items-center gap-x-3 gap-y-2"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          {[
            "60+ Deep Sessions",
            "12,000+ Creators",
            "4.8 User Satisfaction",
            "Intentional-First Design",
          ].map((s, i, arr) => (
            <span key={s} className="flex items-center gap-3">
              <span>{s}</span>
              {i < arr.length - 1 && (
                <span aria-hidden className="hidden sm:inline text-white/40">
                  |
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
