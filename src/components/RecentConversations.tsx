import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/globe';
import { Clock, MessageCircle } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  category: string;
  messages: Message[];
}

interface RecentConversationsProps {
  conversations: Conversation[];
  onResumeConversation: (conversation: Conversation) => void;
}

export const RecentConversations = ({ conversations, onResumeConversation }: RecentConversationsProps) => {
  if (conversations.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Conversations
        </CardTitle>
        <CardDescription>
          Continue where you left off
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-center justify-between p-3 rounded-lg border border-globe-border-subtle hover:bg-globe-accent-light/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <h3 className="font-medium text-globe-text-primary truncate">
                  {conversation.title}
                </h3>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  #{conversation.category}
                </span>
              </div>
              <p className="text-sm text-globe-text-secondary truncate">
                {conversation.lastMessage}
              </p>
              <p className="text-xs text-globe-text-secondary mt-1">
                {conversation.timestamp.toLocaleDateString()} at {conversation.timestamp.toLocaleTimeString()}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onResumeConversation(conversation)}
              className="ml-3 flex-shrink-0"
            >
              Resume
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};