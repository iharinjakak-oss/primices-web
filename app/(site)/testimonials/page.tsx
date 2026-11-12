import type { Metadata } from 'next'
import CtaBand from '@/app/components/cta-band'
import PageHero from '@/app/components/page-hero'
import Section from '@/app/components/section'
import StatRow from '@/app/components/stat-row'
import TestimonialCard from '@/app/components/testimonial-card'
import { cta, images, testimonialsPage as page } from '../pages-content'

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
}

export default function TestimonialsPage() {
  return (
    <>
      <PageHero title={page.title} intro={page.intro} image={images.page} />

      <Section soft>
        <StatRow stats={page.stats} />
      </Section>

      <Section title={page.sectionTitle}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {page.items.map((item) => (
            <TestimonialCard key={item.name} name={item.name} role={item.role} text={item.text} />
          ))}
        </div>
      </Section>

      <CtaBand title={page.closing.title} text={page.closing.text} cta={cta} />
    </>
  )
}