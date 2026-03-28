import { ScrollTrackerLayout } from "@/components/scroll-tracker-layout"
import { Intro } from "@/components/sections/intro"
import { Work } from "@/components/sections/work"
import { Thoughts } from "@/components/sections/thoughts"
import { Connect } from "@/components/sections/connect"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <ScrollTrackerLayout>
      <Intro />
      <Work />
      <Thoughts />
      <Connect />
      <Footer />
    </ScrollTrackerLayout>
  )
}
