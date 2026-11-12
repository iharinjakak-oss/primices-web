import type { Metadata } from 'next'
import CtaBand from '@/app/components/cta-band'
import Faq from '@/app/components/faq'
import PageHero from '@/app/components/page-hero'
import Section from '@/app/components/section'
import { cta, faqPage as page, images } from '../pages-content'

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
}

export default function FaqPage() {
  return (
    <>
      <PageHero title={page.title} intro={page.intro} image={images.page} />

      <Section soft>
        <div className="mx-auto max-w-3xl">
          <Faq items={page.items} />
        </div>
      </Section>

      <CtaBand title={page.closing.title} text={page.closing.text} cta={cta} />
    </>
  )
}