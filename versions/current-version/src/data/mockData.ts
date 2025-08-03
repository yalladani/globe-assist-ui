import { KnowledgeResponse, Category } from '@/types/globe';

export const mockResponses: Record<Category, KnowledgeResponse[]> = {
  Shipments: [
    {
      id: '1',
      summary: 'Shipping delay resolution for expedited orders',
      status: 'resolved',
      source: 'Shipping Policy Document v3.2',
      link: 'https://docs.global-e.com/shipping-policy#expedited',
      details: 'For expedited orders experiencing delays, merchants can request priority processing through the merchant portal. This typically reduces shipping time by 1-2 business days.',
      category: 'Shipments'
    },
    {
      id: '2',
      summary: 'International shipping restrictions for electronics',
      status: 'needs_attention',
      source: 'Compliance Ticket #SH-2024-0156',
      link: 'https://support.global-e.com/tickets/SH-2024-0156',
      details: 'New regulations require additional documentation for electronics shipments to EU countries. Update merchant onboarding process to include battery declaration forms.',
      category: 'Shipments'
    }
  ],
  Payments: [
    {
      id: '3',
      summary: 'Payment failure troubleshooting for UK merchants',
      status: 'resolved',
      source: 'Payment Gateway Documentation',
      link: 'https://docs.global-e.com/payments#uk-regulations',
      details: 'Recent changes to UK payment regulations require 3DS authentication for transactions over £30. Ensure merchant has enabled 3DS in their payment settings.',
      category: 'Payments'
    }
  ],
  Configuration: [
    {
      id: '4',
      summary: 'Multi-currency setup for new merchants',
      status: 'pending',
      source: 'Configuration Guide v2.1',
      link: 'https://docs.global-e.com/configuration#multi-currency',
      details: 'Standard multi-currency setup includes EUR, GBP, and USD by default. Additional currencies can be enabled through the merchant dashboard with proper documentation.',
      category: 'Configuration'
    }
  ]
};

export const getRandomResponse = (category: Category): KnowledgeResponse => {
  const responses = mockResponses[category];
  return responses[Math.floor(Math.random() * responses.length)];
};