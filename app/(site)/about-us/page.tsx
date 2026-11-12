import type { Metadata } from 'next'
import CtaBand from '@/app/components/cta-band'
import PageHero from '@/app/components/page-hero'
import Section from '@/app/components/section'
import { aboutPage as page, cta, images } from '../pages-content'

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
}

export default function AboutPage() {
  return (
    <>
      <PageHero title={page.title} intro={page.intro} image={images.page} />

      <Section title={page.mission.title}>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-700">{page.mission.text}</p>
      </Section>

      <Section title={page.values.title} soft>
        <div className="grid gap-6 md:grid-cols-3">
          {page.values.items.map((value) => (
            <article key={value.name} className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[color:var(--site-brand)]">{value.name}</h3>
              <p className="mt-3 text-gray-600">{value.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title={page.story.title}>
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-gray-700">
          {page.story.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <CtaBand title={page.closing.title} text={page.closing.text} cta={cta} />
    </>
  )
}