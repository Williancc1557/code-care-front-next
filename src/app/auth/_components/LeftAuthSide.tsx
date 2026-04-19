import { BadgeCheck } from "lucide-react";

export function LeftAuthSide() {
  return (
    <section className="hidden md:block h-screen  w-[71%] bg-[#0123cd] text-white px-15">
      <div>
        <span className="text-3xl flex font-semibold tracking-wide mt-28">
          &lt;/CODE &amp; CARE&gt;
        </span>
        <span className="text-3xl uppercase flex font-semibold tracking-wide">
          Сommand Center
        </span>
      </div>
      <div className="mt-32 max-w-xl">
        <span
          className="block font-serif text-7xl font-bold leading-none text-white"
          aria-hidden
        >
          &ldquo;
        </span>
        <div className="space-y-4 text-lg leading-relaxed text-white">
          <p>
            Finally – a dashboard that shows you exactly what you&apos;re paying
            for.
          </p>
          <p>
            See how your team performs, track hours, review daily reports, and
            monitor code activity – all from one place.
          </p>
          <p>
            No guesswork. No micromanagement. Just full visibility and control.
          </p>
        </div>
        <div className="mt-12 flex items-center gap-2 text-lg">
          <span className="font-medium">Andrew Gromenko, CEO</span>
          <BadgeCheck
            className="size-6 shrink-0 text-white"
            aria-label="Verified"
          />
        </div>
      </div>
    </section>
  );
}
