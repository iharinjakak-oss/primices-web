import type { Metadata } from 'next'
import LegalSections from '@/app/components/legal-sections'
import PageHero from '@/app/components/page-hero'
import { images, legalPage as page } from '../pages-content'

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
}

export default function LegalNoticePage() {
  return (
    <>
      <PageHero title={page.title} intro={page.intro} image={images.page} />
      <LegalSections sections={page.sections} />
    </>
  )
}