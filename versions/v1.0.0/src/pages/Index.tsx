import { useState } from 'react';
import { Header } from '@/components/Header';
import { HomeScreen } from '@/components/HomeScreen';
import { ConversationPanel } from '@/components/ConversationPanel';
import { KnowledgePanel } from '@/components/KnowledgePanel';
import { ConversationState, Message, Category } from '@/types/globe';
import { getRandomResponse } from '@/data/mockData';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  category: string;
  messages: Message[];
}

const Index = () => {
  const [state, setState] = useState<ConversationState>({
    messages: [],
    currentResponse: null,
    isLoading: false
  });

  const [showKnowledgeView, setShowKnowledgeView] = useState(false);
  const [lockedCategory, setLockedCategory] = useState<Category | undefined>();
  const [recentConversations, setRecentConversations] = useState<Conversation[]>([]);

  const handleSubmit = async (prompt: string, category: Category) => {
    // Set locked category on first submission
    if (!lockedCategory) {
      setLockedCategory(category);
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      isUser: true,
      timestamp: new Date(),
      category
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));

    setShowKnowledgeView(true);

    // Simulate API delay
    setTimeout(() => {
      const response = getRandomResponse(category);
      
      // Add AI response message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I found relevant information about "${prompt}". Please check the knowledge panel for detailed documentation and next steps.`,
        isUser: false,
        timestamp: new Date()
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        currentResponse: response,
        isLoading: false
      }));
    }, 2000);
  };

  const handleBackToHome = () => {
    // Save current conversation to recent conversations if it has messages
    if (state.messages.length > 0) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: state.messages[0]?.content.substring(0, 50) + '...' || 'Conversation',
        lastMessage: state.messages[state.messages.length - 1]?.content || '',
        timestamp: new Date(),
        category: lockedCategory || 'General',
        messages: state.messages
      };

      setRecentConversations(prev => [newConversation, ...prev.slice(0, 4)]); // Keep only 5 recent conversations
    }

    // Reset state
    setState({
      messages: [],
      currentResponse: null,
      isLoading: false
    });
    setShowKnowledgeView(false);
    setLockedCategory(undefined);
  };

  const handleResumeConversation = (conversation: Conversation) => {
    setState({
      messages: conversation.messages,
      currentResponse: null, // You might want to restore the last response too
      isLoading: false
    });
    setLockedCategory(conversation.category as Category);
    setShowKnowledgeView(true);
  };

  if (!showKnowledgeView) {
    return (
      <div className="min-h-screen bg-globe-bg">
        <Header />
        <HomeScreen 
          onSubmit={handleSubmit} 
          isLoading={state.isLoading}
          recentConversations={recentConversations}
          onResumeConversation={handleResumeConversation}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-globe-bg flex flex-col">
      <Header onBackToHome={handleBackToHome} showBackButton={true} />
      
      <div className="flex-1 flex">
        {/* Conversation Panel - 1/3 width */}
        <div className="w-1/3 border-r border-globe-border-subtle">
          <ConversationPanel 
            messages={state.messages}
            onSendMessage={handleSubmit}
            isLoading={state.isLoading}
            lockedCategory={lockedCategory}
          />
        </div>
        
        {/* Knowledge Panel - 2/3 width */}
        <div className="w-2/3">
          <KnowledgePanel response={state.currentResponse} />
        </div>
      </div>
    </div>
  );
};

export default Index;
