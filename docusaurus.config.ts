import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Stacks Design System',
  tagline: 'A comprehensive design system for building Web3 applications on Stacks, the Bitcoin L2.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://design.stacks.co',
  baseUrl: '/',

  organizationName: 'stacks-network',
  projectName: 'stacks-design-system',

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/stacks-network/stacks-design-system/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/stx-logo.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Stacks Design System',
      logo: {
        alt: 'Stacks Design System',
        src: 'img/stx-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Guide',
        },
        {
          to: '/docs/web3-designs/overview',
          label: 'Web3 Designs',
          position: 'left',
        },
        {
          to: '/docs/patterns/overview',
          label: 'Patterns',
          position: 'left',
        },
        {
          to: '/docs/resources/overview',
          label: 'Resources',
          position: 'left',
        },
        {
          href: 'https://github.com/stacks-network',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Introduction', to: '/docs/introduction'},
            {label: 'Getting Started', to: '/docs/getting-started'},
            {label: 'Design Tokens', to: '/docs/foundations/tokens'},
          ],
        },
        {
          title: 'Patterns',
          items: [
            {label: 'Wallet Connection', to: '/docs/patterns/wallet-connect'},
            {label: 'Transaction States', to: '/docs/patterns/transactions/states'},
            {label: 'Accessibility', to: '/docs/guidelines/accessibility'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Discord', href: 'https://discord.gg/stacks'},
            {label: 'Twitter/X', href: 'https://twitter.com/staboratory'},
            {label: 'Stacks Forum', href: 'https://forum.stacks.org'},
            {label: 'GitHub', href: 'https://github.com/stacks-network'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Stacks Foundation. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      additionalLanguages: ['bash', 'json', 'tsx', 'css'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
