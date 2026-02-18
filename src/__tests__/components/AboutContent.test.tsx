import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));

vi.mock("@/i18n/routing", () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("framer-motion", () => {
  const mc = (Tag: string) => {
    const FM_PROPS = new Set([
      "initial", "animate", "exit", "transition", "whileInView",
      "viewport", "variants", "whileHover", "whileTap", "layout",
      "layoutId",
    ]);
    const C = ({ children, ...props }: Record<string, unknown>) => {
      const safe: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(props)) {
        if (!FM_PROPS.has(k) && typeof v !== "object" && typeof v !== "function") {
          safe[k] = v;
        }
      }
      const El = Tag as unknown as React.ElementType;
      return <El {...safe}>{children as React.ReactNode}</El>;
    };
    C.displayName = `motion.${Tag}`;
    return C;
  };
  return {
    motion: {
      div: mc("div"),
      span: mc("span"),
      button: mc("button"),
      section: mc("section"),
      a: mc("a"),
      h1: mc("h1"),
      h2: mc("h2"),
      h3: mc("h3"),
      p: mc("p"),
      create: (tag: string) => mc(tag),
    },
    animate: () => ({ stop: () => {} }),
    useInView: () => true,
    useScroll: () => ({ scrollYProgress: { get: () => 0.5 } }),
    useTransform: () => 0,
    useMotionValue: (v: number = 0) => ({ set: () => {}, get: () => v }),
    useSpring: () => ({ set: () => {}, get: () => 0 }),
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => (
    <img alt={props.alt} src={props.src} />
  ),
}));

vi.mock("@/components/animations/TextReveal", () => ({
  TextReveal: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <h2>{children}</h2>,
}));

vi.mock("@/components/animations/AuroraBackground", () => ({
  AuroraBackground: () => <div data-testid="aurora" />,
}));

vi.mock("@/components/animations/LineReveal", () => ({
  LineReveal: () => <div data-testid="line-reveal" />,
}));

vi.mock("@/components/animations/FloatingElement", () => ({
  FloatingElement: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/animations/MagneticButton", () => ({
  MagneticButton: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/animations/CountUp", () => ({
  CountUp: ({ to, suffix }: { to: number; suffix: string }) => (
    <span>
      {to}
      {suffix}
    </span>
  ),
}));

vi.mock("@/components/ui/AnimatedSection", () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import { AboutContent } from "@/components/pages/AboutContent";

afterEach(cleanup);

describe("AboutContent", () => {
  it("renders the main element", () => {
    render(<AboutContent />);
    expect(document.querySelector("main")).toBeInTheDocument();
  });

  it("renders hero title", () => {
    render(<AboutContent />);
    expect(screen.getByText("hero.title")).toBeInTheDocument();
  });

  it("renders story section", () => {
    render(<AboutContent />);
    expect(screen.getByText("story.title")).toBeInTheDocument();
    expect(screen.getByText("story.p1")).toBeInTheDocument();
  });

  it("renders philosophy section", () => {
    render(<AboutContent />);
    expect(screen.getByText("philosophy.title")).toBeInTheDocument();
  });

  it("renders value cards", () => {
    render(<AboutContent />);
    expect(screen.getByText("precision.title")).toBeInTheDocument();
    expect(screen.getByText("collaboration.title")).toBeInTheDocument();
    expect(screen.getByText("results.title")).toBeInTheDocument();
  });

  it("renders values section title", () => {
    render(<AboutContent />);
    expect(screen.getByText("values.title")).toBeInTheDocument();
  });
});
