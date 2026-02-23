import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'introduction',
    'getting-started',
    {
      type: 'category',
      label: 'Foundations',
      items: ['foundations/tokens', 'foundations/colors'],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/overview',
        'components/button',
        'components/card',
        'components/dialog',
        'components/input',
      ],
    },
    {
      type: 'category',
      label: 'Web3 Designs',
      items: [
        'web3-designs/overview',
        'web3-designs/address-display',
        'web3-designs/balance-display',
      ],
    },
    {
      type: 'category',
      label: 'Web3 Patterns',
      items: [
        'patterns/overview',
        'patterns/wallet-connect',
        'patterns/transactions/states',
      ],
    },
    {
      type: 'category',
      label: 'Guidelines',
      items: [
        'guidelines/accessibility',
        'guidelines/mobile',
        'guidelines/theming',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'resources/overview',
        'resources/quick-start',
      ],
    },
  ],
};

export default sidebars;
