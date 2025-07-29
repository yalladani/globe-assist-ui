export type Category = 'Shipments' | 'Payments' | 'Configuration';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  category?: Category;
}

export interface KnowledgeResponse {
  id: string;
  summary: string;
  status: 'resolved' | 'pending' | 'needs_attention';
  source: string;
  link: string;
  details: string;
  category: Category;
}

export interface ConversationState {
  messages: Message[];
  currentResponse: KnowledgeResponse | null;
  isLoading: boolean;
}