import { ScrollArea } from '@/components/ui/scroll-area';
import { Message, MessageFeedback } from '@/types/globe';
import { PromptInput } from './PromptInput';
import { Category } from '@/types/globe';
import { Bot, User } from 'lucide-react';
import MessageFeedbackComponent from './MessageFeedback';

interface ConversationPanelProps {
  messages: Message[];
  onSendMessage: (prompt: string, category: Category) => void;
  onFeedback: (messageId: string, feedback: MessageFeedback) => void;
  isLoading: boolean;
  lockedCategory?: Category;
}

export const ConversationPanel = ({ 
  messages, 
  onSendMessage, 
  onFeedback,
  isLoading, 
  lockedCategory 
}: ConversationPanelProps) => {
  return (
    <div className="h-full flex flex-col bg-globe-surface">
      <div className="p-4 border-b border-globe-border-subtle">
        <h2 className="font-semibold text-globe-text-primary">Conversation</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!message.isUser && (
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              
              <div
                className={`max-w-xs rounded-lg px-3 py-2 ${
                  message.isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-globe-text-primary'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
                {message.category && (
                  <p className="text-xs opacity-70">#{message.category}</p>
                )}
                
                {/* Feedback buttons for AI messages */}
                {!message.isUser && (
                  <MessageFeedbackComponent
                    messageId={message.id}
                    currentFeedback={message.feedback}
                    onFeedback={onFeedback}
                    showExtended={true}
                  />
                )}
              </div>
              
              {message.isUser && (
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted rounded-lg px-3 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-globe-text-secondary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-globe-text-secondary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-globe-text-secondary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-globe-border-subtle">
        <PromptInput onSubmit={onSendMessage} isLoading={isLoading} lockedCategory={lockedCategory} />
      </div>
    </div>
  );
};