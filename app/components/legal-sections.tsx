export type LegalSection = { title: string; paragraphs: string[] }

export default function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-6 py-12">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-2xl font-semibold text-[color:var(--site-brand)]">{section.title}</h2>
          <div className="mt-3 space-y-3 leading-relaxed text-gray-700">
            {section.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}