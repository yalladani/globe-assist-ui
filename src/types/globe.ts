export type Category = 'Shipments' | 'Payments' | 'Configuration';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  category?: Category;
  feedback?: MessageFeedback;
}

export interface MessageFeedback {
  type: 'like' | 'dislike' | 'clarify' | 'helpful' | 'not_helpful';
  timestamp: Date;
  comment?: string;
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

// Atlassian-related types
export interface JiraIssue {
  id: string;
  key: string;
  summary: string;
  description: string;
  status: string;
  priority: string;
  assignee?: string;
  reporter: string;
  created: string;
  updated: string;
  project: {
    key: string;
    name: string;
  };
  issueType: {
    name: string;
    iconUrl: string;
  };
}

export interface ConfluencePage {
  id: string;
  title: string;
  space: {
    key: string;
    name: string;
  };
  status: string;
  version: {
    number: number;
  };
  body: {
    storage: {
      value: string;
    };
  };
  _links: {
    webui: string;
  };
}

export interface AtlassianSearchResult {
  jiraIssues: JiraIssue[];
  confluencePages: ConfluencePage[];
  totalResults: number;
}

export interface AtlassianConfig {
  cloudId: string;
  accessToken: string;
}

// Feedback system types
export interface FeedbackButton {
  id: string;
  type: MessageFeedback['type'];
  icon: string;
  label: string;
  color: string;
  variant: 'default' | 'destructive' | 'outline' | 'secondary';
}

export interface FeedbackStats {
  totalMessages: number;
  likedMessages: number;
  dislikedMessages: number;
  helpfulMessages: number;
  notHelpfulMessages: number;
  clarifyRequests: number;
}