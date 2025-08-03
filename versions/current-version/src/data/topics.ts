import { Category } from '@/types/globe';

export interface SubTopic {
  id: string;
  title: string;
  description: string;
  prompt: string;
}

export interface MainTopic {
  id: string;
  title: string;
  description: string;
  category: Category;
  subTopics: SubTopic[];
}

export const mainTopics: MainTopic[] = [
  {
    id: 'shipment-delay',
    title: 'Shipment Delay',
    description: 'Help with delayed shipment resolution',
    category: 'Shipments',
    subTopics: [
      {
        id: 'delay-investigation',
        title: 'Investigate Delay Cause',
        description: 'Find out why shipment is delayed',
        prompt: 'How do I investigate the cause of a shipment delay?'
      },
      {
        id: 'delay-notification',
        title: 'Notify Customer',
        description: 'Inform customer about delay',
        prompt: 'How do I properly notify a customer about a shipment delay?'
      },
      {
        id: 'delay-resolution',
        title: 'Resolve Delay',
        description: 'Steps to resolve the delay',
        prompt: 'What are the steps to resolve a shipment delay?'
      },
      {
        id: 'delay-compensation',
        title: 'Compensation Options',
        description: 'Offer compensation for delay',
        prompt: 'What compensation options can I offer for a delayed shipment?'
      }
    ]
  },
  {
    id: 'tracking-update',
    title: 'Tracking Update',
    description: 'Update shipment tracking information',
    category: 'Shipments',
    subTopics: [
      {
        id: 'update-tracking-info',
        title: 'Update Tracking Info',
        description: 'Add or modify tracking information',
        prompt: 'How do I update tracking information for an existing shipment?'
      },
      {
        id: 'tracking-notification',
        title: 'Send Tracking Update',
        description: 'Notify customer of tracking changes',
        prompt: 'How do I notify customers about tracking updates?'
      },
      {
        id: 'tracking-troubleshoot',
        title: 'Troubleshoot Tracking',
        description: 'Fix tracking issues',
        prompt: 'How do I troubleshoot tracking information issues?'
      }
    ]
  },
  {
    id: 'shipping-rates',
    title: 'Shipping Rates',
    description: 'Calculate shipping costs and rates',
    category: 'Shipments',
    subTopics: [
      {
        id: 'calculate-rates',
        title: 'Calculate Rates',
        description: 'Calculate shipping costs',
        prompt: 'How do I calculate shipping rates for different destinations?'
      },
      {
        id: 'rate-configuration',
        title: 'Configure Rates',
        description: 'Set up shipping rate rules',
        prompt: 'How do I configure shipping rate rules?'
      },
      {
        id: 'rate-optimization',
        title: 'Optimize Rates',
        description: 'Find best shipping options',
        prompt: 'How do I optimize shipping rates for customers?'
      }
    ]
  },
  {
    id: 'payment-decline',
    title: 'Payment Decline',
    description: 'Resolve declined payment issues',
    category: 'Payments',
    subTopics: [
      {
        id: 'decline-investigation',
        title: 'Investigate Decline',
        description: 'Find out why payment was declined',
        prompt: 'How do I investigate why a payment was declined?'
      },
      {
        id: 'decline-resolution',
        title: 'Resolve Decline',
        description: 'Steps to resolve payment decline',
        prompt: 'What steps should I take to resolve a payment decline?'
      },
      {
        id: 'alternative-payment',
        title: 'Alternative Payment',
        description: 'Offer alternative payment methods',
        prompt: 'What alternative payment methods can I offer?'
      }
    ]
  },
  {
    id: 'refund-process',
    title: 'Refund Process',
    description: 'Process customer refunds',
    category: 'Payments',
    subTopics: [
      {
        id: 'initiate-refund',
        title: 'Initiate Refund',
        description: 'Start the refund process',
        prompt: 'How do I initiate a refund for a customer?'
      },
      {
        id: 'refund-status',
        title: 'Check Refund Status',
        description: 'Track refund progress',
        prompt: 'How do I check the status of a refund?'
      },
      {
        id: 'refund-troubleshoot',
        title: 'Troubleshoot Refund',
        description: 'Resolve refund issues',
        prompt: 'How do I troubleshoot refund problems?'
      }
    ]
  },
  {
    id: 'merchant-onboarding',
    title: 'Merchant Onboarding',
    description: 'Complete merchant setup process',
    category: 'Configuration',
    subTopics: [
      {
        id: 'onboarding-steps',
        title: 'Onboarding Steps',
        description: 'Complete setup process',
        prompt: 'What are the steps for merchant onboarding?'
      },
      {
        id: 'onboarding-documents',
        title: 'Required Documents',
        description: 'Documents needed for onboarding',
        prompt: 'What documents are required for merchant onboarding?'
      },
      {
        id: 'onboarding-troubleshoot',
        title: 'Troubleshoot Onboarding',
        description: 'Resolve onboarding issues',
        prompt: 'How do I troubleshoot onboarding problems?'
      }
    ]
  }
];

export const getMainTopicsByCategory = (category: Category): MainTopic[] => {
  return mainTopics.filter(topic => topic.category === category);
};

export const getMainTopicById = (topicId: string): MainTopic | undefined => {
  return mainTopics.find(topic => topic.id === topicId);
};

export const getSubTopicById = (topicId: string, subTopicId: string): SubTopic | undefined => {
  const topic = getMainTopicById(topicId);
  return topic?.subTopics.find(subTopic => subTopic.id === subTopicId);
}; 