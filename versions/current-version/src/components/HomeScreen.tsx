import { PromptInput } from './PromptInput';
import { RecentConversations } from './RecentConversations';
import { Footer } from './Footer';
import { Category, Message } from '@/types/globe';
import { Zap, Shield, Users } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  category: string;
  messages: Message[];
}

interface HomeScreenProps {
  onSubmit: (prompt: string, category: Category) => void;
  isLoading: boolean;
  recentConversations: Conversation[];
  onResumeConversation: (conversation: Conversation) => void;
}

export const HomeScreen = ({ onSubmit, isLoading, recentConversations, onResumeConversation }: HomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-surface flex flex-col">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 overflow-hidden">
              <img 
                src="/lovable-uploads/4f32f21f-fed1-468d-853c-353dbeb293a5.png" 
                alt="Global-e Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            
            <h1 className="text-4xl font-bold text-globe-text-primary mb-4">
              Welcome to Global-e Agent
            </h1>
            
            <p className="text-lg text-globe-text-secondary mb-8 leading-relaxed">
              Your AI-powered Customer Success assistant. Get instant access to product knowledge,
              troubleshooting guides, and merchant support resources.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-globe-surface px-4 py-2 rounded-full border border-globe-border-subtle">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm text-globe-text-secondary">Instant Answers</span>
              </div>
              <div className="flex items-center gap-2 bg-globe-surface px-4 py-2 rounded-full border border-globe-border-subtle">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-globe-text-secondary">Verified Sources</span>
              </div>
              <div className="flex items-center gap-2 bg-globe-surface px-4 py-2 rounded-full border border-globe-border-subtle">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm text-globe-text-secondary">CSM Focused</span>
              </div>
            </div>
          </div>

          {/* Prompt Input */}
          <div className="bg-globe-surface rounded-2xl p-8 shadow-globe-lg border border-globe-border-subtle">
            <h2 className="text-lg font-semibold text-globe-text-primary mb-6">
              What can I help you with today?
            </h2>
            <PromptInput onSubmit={onSubmit} isLoading={isLoading} />
          </div>

          {/* Recent Conversations */}
          {recentConversations.length > 0 && (
            <div className="mt-8">
              <RecentConversations 
                conversations={recentConversations}
                onResumeConversation={onResumeConversation}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};