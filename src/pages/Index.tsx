import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { HomeScreen } from '@/components/HomeScreen';
import { ConversationPanel } from '@/components/ConversationPanel';
import { KnowledgePanel } from '@/components/KnowledgePanel';
import { ConversationState, Message, Category, JiraIssue, ConfluencePage, MessageFeedback, FeedbackStats } from '@/types/globe';
import { getRandomResponse } from '@/data/mockData';
import { atlassianService } from '@/services/atlassianService';
import FeedbackStatsComponent from '@/components/FeedbackStats';

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
  const [atlassianResults, setAtlassianResults] = useState<{
    jiraIssues: JiraIssue[];
    confluencePages: ConfluencePage[];
  } | null>(null);
  const [showFeedbackStats, setShowFeedbackStats] = useState(false);

  // Initialize Atlassian service with mock config (replace with real config)
  useEffect(() => {
    atlassianService.setConfig({
      cloudId: 'your-cloud-id',
      accessToken: 'your-access-token'
    });
  }, []);

  // Calculate feedback statistics
  const calculateFeedbackStats = (): FeedbackStats => {
    const aiMessages = state.messages.filter(msg => !msg.isUser);
    
    const stats: FeedbackStats = {
      totalMessages: state.messages.length,
      likedMessages: aiMessages.filter(msg => msg.feedback?.type === 'like').length,
      dislikedMessages: aiMessages.filter(msg => msg.feedback?.type === 'dislike').length,
      helpfulMessages: aiMessages.filter(msg => msg.feedback?.type === 'helpful').length,
      notHelpfulMessages: aiMessages.filter(msg => msg.feedback?.type === 'not_helpful').length,
      clarifyRequests: aiMessages.filter(msg => msg.feedback?.type === 'clarify').length
    };

    return stats;
  };

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

    try {
      // Search Atlassian data
      const atlassianSearchResult = await atlassianService.searchAll(prompt);
      setAtlassianResults({
        jiraIssues: atlassianSearchResult.jiraIssues,
        confluencePages: atlassianSearchResult.confluencePages
      });

      // Simulate API delay for knowledge response
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
    } catch (error) {
      console.error('Error searching Atlassian data:', error);
      
      // Still show knowledge response even if Atlassian search fails
      setTimeout(() => {
        const response = getRandomResponse(category);
        
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
    }
  };

  const handleFeedback = (messageId: string, feedback: MessageFeedback) => {
    setState(prev => ({
      ...prev,
      messages: prev.messages.map(message => 
        message.id === messageId 
          ? { ...message, feedback }
          : message
      )
    }));

    // Log feedback for analytics (you can send this to your backend)
    console.log('User feedback:', {
      messageId,
      feedback,
      timestamp: new Date().toISOString()
    });

    // You could also trigger follow-up actions based on feedback
    if (feedback.type === 'clarify') {
      // Maybe ask for more specific information
      console.log('User needs more clarification');
    } else if (feedback.type === 'dislike' || feedback.type === 'not_helpful') {
      // Maybe offer alternative solutions
      console.log('User found response unhelpful');
    }
  };

  const handleViewJiraIssue = async (issueKey: string) => {
    try {
      const issue = await atlassianService.getJiraIssue(issueKey);
      // You could open this in a new tab or modal
      window.open(`https://your-domain.atlassian.net/browse/${issueKey}`, '_blank');
    } catch (error) {
      console.error('Error fetching Jira issue:', error);
    }
  };

  const handleViewConfluencePage = async (pageId: string) => {
    try {
      const page = await atlassianService.getConfluencePage(pageId);
      // You could open this in a new tab or modal
      window.open(page._links.webui, '_blank');
    } catch (error) {
      console.error('Error fetching Confluence page:', error);
    }
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
    setAtlassianResults(null);
    setShowFeedbackStats(false);
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

  const feedbackStats = calculateFeedbackStats();

  return (
    <div className="min-h-screen bg-globe-bg flex flex-col">
      <Header onBackToHome={handleBackToHome} showBackButton={true} />
      
      <div className="flex-1 flex">
        {/* Conversation Panel - 1/3 width */}
        <div className="w-1/3 border-r border-globe-border-subtle">
          <ConversationPanel 
            messages={state.messages}
            onSendMessage={handleSubmit}
            onFeedback={handleFeedback}
            isLoading={state.isLoading}
            lockedCategory={lockedCategory}
          />
        </div>
        
        {/* Knowledge Panel - 2/3 width */}
        <div className="w-2/3">
          <KnowledgePanel 
            response={state.currentResponse}
            atlassianResults={atlassianResults}
            onViewJiraIssue={handleViewJiraIssue}
            onViewConfluencePage={handleViewConfluencePage}
          />
        </div>
      </div>

      {/* Feedback Stats Modal */}
      {showFeedbackStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <FeedbackStatsComponent stats={feedbackStats} />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowFeedbackStats(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Stats Button */}
      {state.messages.length > 0 && (
        <button
          onClick={() => setShowFeedbackStats(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          title="View Feedback Analytics"
        >
          📊
        </button>
      )}
    </div>
  );
};

export default Index;
