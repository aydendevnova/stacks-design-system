import type {ReactNode} from 'react'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'

import styles from './index.module.css'

interface SectionItem {
  title: string
  description: string
  tags: string[]
  href: string
}

const sections: SectionItem[] = [
  {
    title: 'Foundations',
    description: 'Design tokens, colors, and typography for consistent interfaces.',
    tags: ['Tokens', 'Colors'],
    href: '/docs/foundations/tokens',
  },
  {
    title: 'Components',
    description: '15+ UI components built with Radix UI primitives.',
    tags: ['Accordion', 'Button', 'Dialog', 'Input'],
    href: '/docs/components/overview',
  },
  {
    title: 'Web3 Designs',
    description: 'Blockchain-specific UI patterns for addresses and balances.',
    tags: ['Address Display', 'Balance Display'],
    href: '/docs/web3-designs/overview',
  },
  {
    title: 'Web3 Patterns',
    description: 'End-to-end flows for wallet connection and transactions.',
    tags: ['Wallet Connect', 'Transaction States'],
    href: '/docs/patterns/overview',
  },
  {
    title: 'Guidelines',
    description: 'Accessibility, responsive design, and theming standards.',
    tags: ['Accessibility', 'Mobile', 'Theming'],
    href: '/docs/guidelines/accessibility',
  },
  {
    title: 'Resources',
    description: 'Quick start guides and development tooling.',
    tags: ['Quick Start', 'Overview'],
    href: '/docs/resources/overview',
  },
]

function GeometricArt() {
  return (
    <div className={styles.heroArt} aria-hidden="true">
      <div className={styles.artStack}>
        <div className={`${styles.artRect} ${styles.artRect4}`} />
        <div className={`${styles.artRect} ${styles.artRect3}`} />
        <div className={`${styles.artRect} ${styles.artRect2}`} />
        <div className={`${styles.artRect} ${styles.artRect1}`}>
          <div className={styles.artCircles}>
            <div className={styles.artCircle} />
            <div className={`${styles.artCircle} ${styles.artCircleMd}`} />
            <div className={`${styles.artCircle} ${styles.artCircleSm}`} />
          </div>
        </div>
        <img
          src="/img/stx-logo.png"
          alt=""
          className={styles.artLogo}
        />
      </div>
    </div>
  )
}

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <div className={styles.versionBadge}>
            <span className={styles.versionDot} />
            <span style={{marginTop:'4px'}}>VERSION 1.2</span>
          </div>

          <Heading as="h1" className={styles.heroTitle}>
            Stacks Web3{'\n'}Design System
          </Heading>

          <p className={styles.heroSubtitle}>
            A comprehensive design system for building decentralized
            applications on the Stacks blockchain.
          </p>

          <div className={styles.heroActions}>
            <Link to="/docs/resources/quick-start" className={styles.heroBtnPrimary}>
              Get Started
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link to="/docs/components/overview" className={styles.heroBtnSecondary}>
              Browse Components
            </Link>
          </div>

          <p className={styles.heroCredit}>Created by Red Block Labs</p>
        </div>

        <GeometricArt />
      </div>
    </header>
  )
}

function SectionCard({title, description, tags, href}: SectionItem) {
  return (
    <Link to={href} className={styles.sectionLink}>
      <article className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <Heading as="h3" className={styles.sectionTitle}>{title}</Heading>
          <span className={styles.sectionArrow} aria-hidden="true">&rarr;</span>
        </div>
        <p className={styles.sectionDesc}>{description}</p>
        <div className={styles.sectionTags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.sectionTag}>{tag}</span>
          ))}
        </div>
      </article>
    </Link>
  )
}

function HomepageSections() {
  return (
    <section className={styles.sections}>
      <div className="container">
        <div className={styles.sectionsGrid}>
          {sections.map((section) => (
            <SectionCard key={section.title} {...section} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HomepageCTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <Heading as="h2" className={styles.ctaTitle}>
          Start building with Stacks
        </Heading>
        <p className={styles.ctaDesc}>
          Explore the documentation, browse components, or jump into the quick-start guide.
        </p>
        <div className={styles.ctaButtons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/resources/quick-start">
            Quick Start Guide
          </Link>
          <Link
            className="button button--outline button--lg"
            href="https://www.figma.com/design/6IlYjVCUtZOtKzGHJHNwnK/Stacks-Web3-Design-System--Shared-"
            target="_blank"
            rel="noopener noreferrer">
            Open in Figma
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Stacks Web3 Design System"
      description="A comprehensive design system for building decentralized applications on the Stacks blockchain.">
      <HomepageHeader />
      <main>
        <HomepageSections />
        <HomepageCTA />
      </main>
    </Layout>
  )
}
