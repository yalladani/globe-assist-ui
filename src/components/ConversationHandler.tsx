import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, MessageSquare, Search, Database, Wifi, AlertCircle } from 'lucide-react';
import { atlassianService } from '@/services/atlassianService';

interface ConversationHandlerProps {
  query: string;
  onResultsReady: (results: any) => void;
  className?: string;
}

interface ConversationState {
  status: 'idle' | 'searching' | 'processing' | 'complete' | 'error';
  message: string;
  dataSource: 'real' | 'mock';
  results?: any;
  error?: string;
}

export const ConversationHandler = ({ query, onResultsReady, className }: ConversationHandlerProps) => {
  const [state, setState] = useState<ConversationState>({
    status: 'idle',
    message: 'Ready to search Atlassian',
    dataSource: 'mock'
  });

  useEffect(() => {
    if (query.trim()) {
      handleConversation(query);
    }
  }, [query]);

  const handleConversation = async (searchQuery: string) => {
    setState({
      status: 'searching',
      message: 'Searching Atlassian services...',
      dataSource: 'mock'
    });

    try {
      // Check if we have a real MCP connection
      const isConnected = await atlassianService.checkConnection();
      
      setState({
        status: 'processing',
        message: isConnected ? 'Querying real Atlassian data...' : 'Using demonstration data...',
        dataSource: isConnected ? 'real' : 'mock'
      });

      // Perform the search
      const searchResults = await atlassianService.searchAll(searchQuery);

      setState({
        status: 'complete',
        message: `Found ${searchResults.totalResults} results`,
        dataSource: isConnected ? 'real' : 'mock',
        results: searchResults
      });

      // Pass results to parent component
      onResultsReady(searchResults);

    } catch (error) {
      console.error('Conversation error:', error);
      setState({
        status: 'error',
        message: 'Failed to search Atlassian services',
        dataSource: 'mock',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const retrySearch = () => {
    if (query.trim()) {
      handleConversation(query);
    }
  };

  const getStatusIcon = () => {
    switch (state.status) {
      case 'searching':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'processing':
        return <Search className="h-4 w-4" />;
      case 'complete':
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (state.status) {
      case 'searching':
      case 'processing':
        return 'bg-blue-500';
      case 'complete':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (state.status === 'idle') {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Atlassian Conversation
          </CardTitle>
          <CardDescription>
            Enter a question to search Atlassian services
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <CardTitle>
              {state.status === 'searching' && 'Searching...'}
              {state.status === 'processing' && 'Processing...'}
              {state.status === 'complete' && 'Search Complete'}
              {state.status === 'error' && 'Search Error'}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {state.dataSource === 'real' ? (
              <>
                <Wifi className="h-4 w-4 text-green-500" />
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Real MCP
                </Badge>
              </>
            ) : (
              <>
                <Database className="h-4 w-4 text-yellow-500" />
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Demo Data
                </Badge>
              </>
            )}
          </div>
        </div>
        <CardDescription>
          {state.message}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state.status === 'searching' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Connecting to Atlassian MCP...</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <span className="text-sm text-muted-foreground">Preparing search query...</span>
            </div>
          </div>
        )}

        {state.status === 'processing' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                {state.dataSource === 'real' 
                  ? 'Querying Jira and Confluence...' 
                  : 'Simulating Atlassian search...'
                }
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <span className="text-sm text-muted-foreground">Processing results...</span>
            </div>
          </div>
        )}

        {state.status === 'complete' && state.results && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-600">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Search completed successfully</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{state.results.jiraIssues.length}</Badge>
                <span>Jira Issues</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{state.results.confluencePages.length}</Badge>
                <span>Confluence Pages</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Query: "{query}"
            </div>
          </div>
        )}

        {state.status === 'error' && (
          <div className="space-y-3">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {state.error || 'An error occurred during the search'}
              </AlertDescription>
            </Alert>
            <Button 
              onClick={retrySearch} 
              variant="outline" 
              size="sm"
            >
              <Search className="h-4 w-4 mr-2" />
              Retry Search
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 