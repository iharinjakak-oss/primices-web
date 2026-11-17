import Closing from '@/app/components/home/closing'
import FeatureSection from '@/app/components/home/feature-section'
import Hero from '@/app/components/home/hero'
import Steps from '@/app/components/home/steps'
import { cta, home, images } from './pages-content'

export default function HomePage() {
  return (
    <>
      <Hero
        title={home.hero.title}
        subtitle={home.hero.subtitle}
        cta={cta}
        stats={home.stats}
        testimonial={home.testimonial}
        image={images.hero}
      />

      <FeatureSection
        title={home.guide.title}
        subtitle={home.guide.subtitle}
        points={home.guide.points}
        cta={cta}
        image={images.guide}
        soft
      />

      <FeatureSection
        title={home.life.title}
        subtitle={home.life.subtitle}
        points={home.life.points}
        cta={cta}
      />

      <FeatureSection
        title={home.questions.title}
        subtitle={home.questions.subtitle}
        points={home.questions.points}
        cta={cta}
        columns
        soft
      />

      <FeatureSection
        title={home.balance.title}
        subtitle={home.balance.subtitle}
        points={home.balance.points}
        cta={cta}
      />

      <Steps title={home.steps.title} subtitle={home.steps.subtitle} items={home.steps.items} />

      <Closing
        title={home.closing.title}
        subtitle={home.closing.subtitle}
        text={home.closing.text}
        cta={cta}
        image={images.closing}
      />
    </>
  )
}