import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-background lg:h-screen lg:overflow-hidden">
      <SiteHeader />
      <HeroSection />
    </main>
  )
}
