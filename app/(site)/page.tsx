import type { Metadata } from 'next'
import CtaBand from '@/app/components/cta-band'
import Steps from '@/app/components/home/steps'
import PageHero from '@/app/components/page-hero'
import ProgramCard from '@/app/components/program-card'
import Section from '@/app/components/section'
import { cta, images, programsPage as page } from '../pages-content'

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
}

export default function CoachingPage() {
  return (
    <>
      <PageHero title={page.title} intro={page.intro} image={images.page} />

      <Section title={page.sectionTitle} soft>
        <div className="grid gap-6 md:grid-cols-3">
          {page.programs.map((program) => (
            <ProgramCard
              key={program.name}
              name={program.name}
              description={program.description}
              points={program.points}
              cta={cta}
            />
          ))}
        </div>
      </Section>

      <Steps title={page.steps.title} subtitle={page.steps.subtitle} items={page.steps.items} />

      <CtaBand title={page.closing.title} text={page.closing.text} cta={cta} />
    </>
  )
}