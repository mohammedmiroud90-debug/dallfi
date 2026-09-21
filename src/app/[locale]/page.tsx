import EcosystemCards from "@/components/EcosystemCards";
import Hero from "@/components/Hero";
import HomeIntro from "@/components/HomeIntro";
import BlogList from "@/components/BlogList";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <HomeIntro />
      <EcosystemCards />
      <BlogList />
    </main>
  );
}
