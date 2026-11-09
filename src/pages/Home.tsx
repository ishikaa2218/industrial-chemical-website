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
        title="Industrial Chemicals for Metal Hardening & Heat Treatment"
        description="Geeta Paints and Chemicals (India), Ludhiana, Punjab — an established chemical business since the 1990s serving metal hardening, heat treatment, automotive component and textile dyeing applications."
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
