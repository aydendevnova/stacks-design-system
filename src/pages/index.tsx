import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: string;
};

const features: FeatureItem[] = [
  {
    title: 'Web3-First Components',
    icon: '🧱',
    description: 'Purpose-built components for wallet connections, transactions, staking flows, and DeFi interfaces.',
  },
  {
    title: 'Stacks Design Tokens',
    icon: '🎨',
    description: 'Consistent colors, typography, and spacing aligned with the Stacks brand and ecosystem.',
  },
  {
    title: 'Mobile-First Patterns',
    icon: '📱',
    description: 'Every component designed with mobile users in mind, ensuring great experiences on any device.',
  },
  {
    title: 'WCAG AA Accessible',
    icon: '🛡️',
    description: 'All components meet accessibility standards with proper contrast, focus states, and screen reader support.',
  },
  {
    title: 'DeFi Best Practices',
    icon: '⚡',
    description: 'Patterns for fees, confirmations, risk modals, transaction progress, and recovery states.',
  },
  {
    title: 'Comprehensive Docs',
    icon: '📖',
    description: 'Detailed usage guidelines, theming documentation, and quick-start guides for rapid development.',
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--stacks', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroBadge}>Built for Bitcoin L2</div>
        <Heading as="h1" className={styles.heroTitle}>
          Design System for{' '}
          <span className={styles.heroHighlight}>Stacks</span>
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/introduction">
            Read the Guide
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/components/overview">
            Browse Components
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2">Everything You Need</Heading>
          <p>
            From basic components to complex Web3 patterns, the Stacks Design System
            provides everything you need to build great crypto experiences.
          </p>
        </div>
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageCTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <Heading as="h2">Ready to Get Started?</Heading>
        <p>
          Explore our comprehensive documentation, browse components, or jump
          straight into our quick-start guide.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/resources/quick-start">
            Quick Start Guide
          </Link>
          <Link
            className="button button--outline button--lg"
            href="https://figma.com"
            target="_blank"
            rel="noopener noreferrer">
            Open in Figma
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Design System for Stacks"
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
