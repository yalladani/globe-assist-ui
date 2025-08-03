import { Category } from '@/types/globe';

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: Category;
}

export const promptTemplates: PromptTemplate[] = [
  // Shipments Category
  {
    id: 'shipment-delay',
    title: 'Shipment Delay',
    description: 'Help with delayed shipment resolution',
    prompt: 'How do I resolve a delayed shipment issue for a customer?',
    category: 'Shipments'
  },
  {
    id: 'tracking-update',
    title: 'Tracking Update',
    description: 'Update shipment tracking information',
    prompt: 'How do I update tracking information for an existing shipment?',
    category: 'Shipments'
  },
  {
    id: 'shipping-rates',
    title: 'Shipping Rates',
    description: 'Calculate shipping costs and rates',
    prompt: 'How do I calculate shipping rates for different destinations?',
    category: 'Shipments'
  },
  {
    id: 'customs-clearance',
    title: 'Customs Clearance',
    description: 'Help with customs documentation',
    prompt: 'What documentation is required for customs clearance?',
    category: 'Shipments'
  },
  {
    id: 'return-shipping',
    title: 'Return Shipping',
    description: 'Process return shipments',
    prompt: 'How do I process a return shipment for a customer?',
    category: 'Shipments'
  },

  // Payments Category
  {
    id: 'payment-decline',
    title: 'Payment Decline',
    description: 'Resolve declined payment issues',
    prompt: 'How do I troubleshoot a declined payment transaction?',
    category: 'Payments'
  },
  {
    id: 'refund-process',
    title: 'Refund Process',
    description: 'Process customer refunds',
    prompt: 'How do I process a refund for a customer?',
    category: 'Payments'
  },
  {
    id: 'payment-gateway',
    title: 'Payment Gateway',
    description: 'Configure payment gateway settings',
    prompt: 'How do I configure payment gateway settings?',
    category: 'Payments'
  },
  {
    id: 'currency-conversion',
    title: 'Currency Conversion',
    description: 'Handle multi-currency transactions',
    prompt: 'How does currency conversion work in transactions?',
    category: 'Payments'
  },
  {
    id: 'fraud-detection',
    title: 'Fraud Detection',
    description: 'Identify and prevent fraud',
    prompt: 'What are the fraud detection measures in place?',
    category: 'Payments'
  },

  // Configuration Category
  {
    id: 'merchant-onboarding',
    title: 'Merchant Onboarding',
    description: 'Complete merchant setup process',
    prompt: 'What is the complete merchant onboarding process?',
    category: 'Configuration'
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    description: 'Integrate with Global-e APIs',
    prompt: 'How do I integrate with Global-e APIs?',
    category: 'Configuration'
  },
  {
    id: 'webhook-setup',
    title: 'Webhook Setup',
    description: 'Configure webhook notifications',
    prompt: 'How do I set up webhook notifications?',
    category: 'Configuration'
  },
  {
    id: 'tax-configuration',
    title: 'Tax Configuration',
    description: 'Configure tax settings',
    prompt: 'How do I configure tax settings for different regions?',
    category: 'Configuration'
  },
  {
    id: 'shipping-zones',
    title: 'Shipping Zones',
    description: 'Set up shipping zones and rates',
    prompt: 'How do I configure shipping zones and rates?',
    category: 'Configuration'
  }
];

export const getPromptsByCategory = (category: Category): PromptTemplate[] => {
  return promptTemplates.filter(prompt => prompt.category === category);
}; 