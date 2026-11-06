import { Seo } from '../components/common/Seo'
import { CtaBand } from '../components/sections/CtaBand'
import { Hero } from '../components/sections/home/Hero'
import { Industries } from '../components/sections/home/Industries'
import { Intro } from '../components/sections/home/Intro'
import { ProcessBand } from '../components/sections/home/ProcessBand'
import { ProductNavigator } from '../components/sections/home/ProductNavigator'
import { WhyUs } from '../components/sections/home/WhyUs'

export default function Home() {
  return (
    <>
      <Seo
        title="Industrial Chemical Manufacturing & Trading"
        description="Manufacturer and trader of industrial chemicals for steel hardening, heat treatment, metal processing and automotive component manufacturing."
        path="/"
      />
      <Hero />
      <Intro />
      <ProductNavigator />
      <Industries />
      <ProcessBand />
      <WhyUs />
      <CtaBand />
    </>
  )
}
