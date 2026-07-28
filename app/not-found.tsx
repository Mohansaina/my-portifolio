import type { Metadata } from "next";
import { ButtonLink } from "./components/ui/Button";
import { GlobalBackground } from "./components/GlobalBackground";
import { site } from "./lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * The default Next 404 renders unstyled on a white page, which is a jarring
 * exit from a dark site. An error page is still a page: say what happened and
 * give a way forward.
 */
export default function NotFound() {
  return (
    <>
      <GlobalBackground />
      <main className="relative z-10 grid min-h-screen place-items-center px-6">
        <div className="max-w-md text-center">
          <p className="t-label mb-6">Error 404</p>

          <h1 className="t-display-l">This page does not exist.</h1>

          <p className="t-body mx-auto mt-6">
            The link may be out of date, or the address may have a typo. The
            portfolio itself is one page — everything lives there.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" variant="primary" size="lg" icon="arrow-right">
              Go to the portfolio
            </ButtonLink>
            <ButtonLink
              href={`mailto:${site.email}`}
              variant="secondary"
              size="lg"
              icon="mail"
            >
              Email me
            </ButtonLink>
          </div>
        </div>
      </main>
    </>
  );
}
