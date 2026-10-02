import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "DDM — Download Manager",
  description:
    "DDM is a modern Windows download manager built for faster, reliable file transfers.",
};

const features = [
  {
    number: "01",
    title: "Download at full speed",
    description:
      "DDM splits supported files into smart connections, helping you make the most of your available bandwidth.",
    icon: "speed",
  },
  {
    number: "02",
    title: "Pause. Resume. Keep moving.",
    description:
      "Interrupted download? DDM keeps track of progress so you can resume compatible transfers without starting over.",
    icon: "resume",
  },
  {
    number: "03",
    title: "Keep every file in order",
    description:
      "Organise downloads with a clear queue, priorities, categories, and real-time status in one focused desktop workspace.",
    icon: "queue",
  },
  {
    number: "04",
    title: "Download on your schedule",
    description:
      "Set active hours and bandwidth limits, then let DDM handle downloads when it suits your connection.",
    icon: "schedule",
  },
] as const;

function FeatureIcon({ type }: { type: (typeof features)[number]["icon"] }) {
  const shared = "h-7 w-7";
  if (type === "speed") return <svg className={shared} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M4 16a8 8 0 1 1 16 0" /><path d="m12 12 4.5-3.5" /><path d="M12 16h.01" /></svg>;
  if (type === "resume") return <svg className={shared} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M20 11a8 8 0 1 0 2 5.3" /><path d="M20 4v7h-7" /></svg>;
  if (type === "queue") return <svg className={shared} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M4 6h16M4 12h16M4 18h10" /><circle cx="18" cy="18" r="2" fill="currentColor" stroke="none" /></svg>;
  return <svg className={shared} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M7 11h10M12 14v4M10 16h4" /></svg>;
}

export default function DdmPage() {
  return (
    <main className="flex-1 bg-[#f4f4f1] text-[#151515]">
      <section className="overflow-hidden bg-[#171717] px-5 pb-16 pt-14 text-white sm:px-6 sm:pb-20 sm:pt-20">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16">
          <div className="relative z-10">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#fc0000]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#ff5757] uppercase">Windows download manager</span>
            </div>
            <Image src="/DALLFIEXTRA.png" alt="Dallfi Extra" width={1972} height={494} priority className="h-auto w-[240px] object-contain sm:w-[300px]" />
            <p className="mt-8 text-sm font-semibold tracking-[0.2em] text-white/60 uppercase">DDM / Download Manager</p>
            <h1 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-[clamp(2.75rem,6vw,5.3rem)] leading-[.98] tracking-[-0.04em]">
              Downloads, under control.
            </h1>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-white/72 sm:text-[1.15rem]">
              A reliable Windows download manager for faster transfers, smarter queues, and less waiting around.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#early-access" className="inline-flex items-center gap-2 bg-[#fc0000] px-5 py-3.5 text-sm font-bold tracking-[0.04em] text-white transition-colors hover:bg-[#d40000]">
                Get early access <span aria-hidden>↓</span>
              </a>
              <a href="#features" className="inline-flex items-center border border-white/25 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10">Explore features</a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[530px]">
            <div className="overflow-hidden border border-white/15 bg-[#262626] p-3 shadow-[20px_24px_0_rgba(252,0,0,.9)] sm:p-4">
              <div className="flex h-8 items-center gap-1.5 border-b border-white/10 px-2 text-[10px] text-white/45"><span className="h-2 w-2 rounded-full bg-[#fc0000]" /><span className="h-2 w-2 rounded-full bg-white/25" /><span className="h-2 w-2 rounded-full bg-white/25" /><span className="ml-3">DDM / active downloads</span></div>
              <div className="grid grid-cols-[96px_1fr] gap-3 pt-3 sm:grid-cols-[120px_1fr]">
                <aside className="space-y-2 border-r border-white/10 pr-2 text-[10px] text-white/55"><p className="bg-white/10 px-2 py-2 text-white">All downloads</p><p className="px-2 py-1.5">In progress <span className="float-right text-[#ff5757]">03</span></p><p className="px-2 py-1.5">Completed</p><p className="px-2 py-1.5">Scheduled</p></aside>
                <div className="space-y-3 py-1">
                  {[['setup-ddm.exe', '74%', '8.4 MB/s'], ['creative-assets.zip', '42%', '5.1 MB/s'], ['documentary.mp4', '18%', '3.8 MB/s']].map(([name, progress, speed]) => <div key={name} className="rounded border border-white/10 bg-black/20 p-2.5"><div className="flex justify-between gap-2 text-[10px] text-white/85"><span className="truncate">{name}</span><span>{progress}</span></div><div className="mt-2 h-1.5 overflow-hidden bg-white/10"><div className="h-full bg-[#fc0000]" style={{ width: progress }} /></div><p className="mt-1.5 text-[9px] text-white/45">{speed} · Resumable</p></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white px-5 py-8 sm:px-6">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5 text-sm font-semibold text-[#555]">
          <p>Built for Windows</p><p>Multi-connection transfers</p><p>Resume-ready downloads</p><p>Smart queue control</p>
        </div>
      </section>

      <section id="features" className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-2xl"><p className="text-xs font-bold tracking-[0.18em] text-[#fc0000] uppercase">A better way to download</p><h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.3rem,5vw,4rem)] leading-none tracking-[-0.03em]">More momentum. Less manual work.</h2></div>
          <div className="mt-14 grid border-l border-t border-black/15 sm:grid-cols-2">
            {features.map((feature) => <article key={feature.number} className="min-h-64 border-b border-r border-black/15 bg-[#f4f4f1] p-7 transition-colors hover:bg-white sm:p-9"><div className="flex items-start justify-between text-[#fc0000]"><FeatureIcon type={feature.icon} /><span className="text-xs font-bold tracking-[0.12em]">{feature.number}</span></div><h3 className="mt-12 text-2xl font-semibold tracking-tight">{feature.title}</h3><p className="mt-4 max-w-md text-[15px] leading-7 text-[#555]">{feature.description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#fc0000] px-5 py-18 text-white sm:px-6 sm:py-24" id="early-access">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-2xl"><p className="text-xs font-bold tracking-[0.18em] text-white/70 uppercase">DDM is in development</p><h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.3rem,5vw,4rem)] leading-none tracking-[-0.03em]">Be first in the download queue.</h2><p className="mt-5 text-[1.05rem] leading-7 text-white/85">Follow product updates for early access and the first public Windows build.</p></div><Link href="/releases" className="inline-flex shrink-0 items-center justify-center bg-white px-6 py-4 text-sm font-bold text-[#171717] transition-colors hover:bg-[#171717] hover:text-white">View DDM releases <span className="ml-2" aria-hidden>→</span></Link></div>
      </section>
    </main>
  );
}
