import { ToastProvider } from "./components/Toast";
import { GlobalBackground } from "./components/GlobalBackground";
import { ScrollAnimations } from "./components/ScrollAnimations";
import { CustomCursor } from "./components/CustomCursor";
import { CommandPalette } from "./components/CommandPalette";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Proof } from "./components/Proof";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Timeline } from "./components/Timeline";
import { Skills } from "./components/Skills";
import { CodePlayground } from "./components/CodePlayground";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";

/**
 * Order is an argument: show the work, then what it would cost to hire that,
 * then who is behind it, then the evidence. The page used to open with a
 * simulated terminal before any of that.
 *
 * This is a server component — only the sections that need browser APIs pull
 * in a client boundary of their own.
 */
export default function Home() {
  return (
    <ToastProvider>
      <GlobalBackground />
      <ScrollAnimations />
      <CustomCursor />
      <CommandPalette />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        {/* Proof sits directly under the hero: the figures that stand up to a
            click belong before the argument, not after it. */}
        <Proof />
        <Marquee />
        <Projects />
        <Services />
        <About />
        <Timeline />
        <Skills />
        <CodePlayground />
        <Testimonials />
        <Contact />
      </main>
    </ToastProvider>
  );
}
