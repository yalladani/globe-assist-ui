import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message, MessageFeedback } from '@/types/globe';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/globe';
import { Bot, User, Send } from 'lucide-react';

interface ConversationPanelProps {
  messages: Message[];
  onSendMessage: (prompt: string, category: Category) => void;
  onFeedback: (messageId: string, feedback: MessageFeedback) => void;
  isLoading: boolean;
  lockedCategory?: Category;
  selectedTopic?: string;
}

export const ConversationPanel = ({ 
  messages, 
  onSendMessage, 
  onFeedback,
  isLoading, 
  lockedCategory,
  selectedTopic
}: ConversationPanelProps) => {
  const [currentMessage, setCurrentMessage] = useState('');

  const handleSendMessage = () => {
    if (currentMessage.trim() && lockedCategory) {
      onSendMessage(currentMessage.trim(), lockedCategory);
      setCurrentMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-globe-surface">
      {/* Header - Fixed at top */}
      <div className="p-4 border-b border-globe-border-subtle flex-shrink-0">
        <h2 className="font-semibold text-globe-text-primary">Conversation</h2>
        {selectedTopic && (
          <p className="text-sm text-globe-text-secondary mt-1">
            Topic: {selectedTopic}
          </p>
        )}
      </div>
      
      {/* Messages - Scrollable area */}
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
      
      {/* Input area - Fixed at bottom */}
      <div className="p-4 border-t border-globe-border-subtle flex-shrink-0 bg-globe-surface">
        <div className="space-y-3">
          <Textarea
            placeholder="Type your message here..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-20 bg-globe-surface border-globe-border-subtle resize-none text-globe-text-primary placeholder:text-globe-text-secondary"
            disabled={isLoading}
          />
          
          <div className="flex justify-between items-center">
            <p className="text-xs text-globe-text-secondary">
              Press Enter to send, Shift+Enter for new line
            </p>
            
            <Button 
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || !lockedCategory || isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};