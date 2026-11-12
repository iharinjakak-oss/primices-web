import type { Metadata } from 'next'
import LegalSections from '@/app/components/legal-sections'
import PageHero from '@/app/components/page-hero'
import { images, privacyPage as page } from '../pages-content'

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero title={page.title} intro={page.intro} image={images.page} />
      <LegalSections sections={page.sections} />
    </>
  )
}