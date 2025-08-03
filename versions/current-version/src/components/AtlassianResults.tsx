import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Search, FileText, AlertCircle, Clock, User, Tag, Database, Wifi } from 'lucide-react';
import { atlassianService, JiraIssue, ConfluencePage } from '@/services/atlassianService';

interface AtlassianResultsProps {
  query: string;
  className?: string;
}

interface SearchResults {
  jiraIssues: JiraIssue[];
  confluencePages: ConfluencePage[];
  totalResults: number;
  loading: boolean;
  error: string | null;
  dataSource: 'real' | 'mock';
}

export const AtlassianResults = ({ query, className }: AtlassianResultsProps) => {
  const [results, setResults] = useState<SearchResults>({
    jiraIssues: [],
    confluencePages: [],
    totalResults: 0,
    loading: false,
    error: null,
    dataSource: 'mock'
  });

  useEffect(() => {
    if (query.trim()) {
      searchAtlassian(query);
    }
  }, [query]);

  const searchAtlassian = async (searchQuery: string) => {
    setResults(prev => ({ ...prev, loading: true, error: null }));

    try {
      const searchResults = await atlassianService.searchAll(searchQuery);
      
      // Check if we're getting real data (this would be determined by the service)
      const isRealData = atlassianService.getConnectionStatus();
      
      setResults({
        jiraIssues: searchResults.jiraIssues,
        confluencePages: searchResults.confluencePages,
        totalResults: searchResults.totalResults,
        loading: false,
        error: null,
        dataSource: isRealData ? 'real' : 'mock'
      });
    } catch (error) {
      console.error('Error searching Atlassian:', error);
      setResults(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to search Atlassian services',
        dataSource: 'mock'
      }));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-500';
      case 'to do':
        return 'bg-gray-500';
      case 'done':
        return 'bg-green-500';
      case 'in review':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (results.loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-4 w-4 animate-spin" />
            Searching Atlassian...
          </CardTitle>
          <CardDescription>
            Searching for "{query}" in Jira and Confluence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Searching for results...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (results.error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            Search Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {results.error}
            </AlertDescription>
          </Alert>
          <Button 
            onClick={() => searchAtlassian(query)} 
            variant="outline" 
            className="mt-4"
          >
            <Search className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!query.trim()) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Atlassian Search
          </CardTitle>
          <CardDescription>
            Enter a search query to find information in Jira and Confluence
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Atlassian Search Results
            </CardTitle>
            <CardDescription>
              Found {results.totalResults} results for "{query}"
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {results.dataSource === 'real' ? (
              <>
                <Wifi className="h-4 w-4 text-green-500" />
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  Real Data
                </Badge>
              </>
            ) : (
              <>
                <Database className="h-4 w-4 text-yellow-500" />
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                  Demo Data
                </Badge>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All ({results.totalResults})</TabsTrigger>
            <TabsTrigger value="jira">Jira ({results.jiraIssues.length})</TabsTrigger>
            <TabsTrigger value="confluence">Confluence ({results.confluencePages.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Jira Issues */}
            {results.jiraIssues.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Jira Issues
                </h3>
                {results.jiraIssues.map((issue) => (
                  <Card key={issue.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="font-mono">
                              {issue.key}
                            </Badge>
                            <Badge className={getPriorityColor(issue.priority)}>
                              {issue.priority}
                            </Badge>
                            <Badge className={getStatusColor(issue.status)}>
                              {issue.status}
                            </Badge>
                          </div>
                          <h4 className="font-semibold mb-2">{issue.summary}</h4>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {issue.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {issue.assignee || 'Unassigned'}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(issue.updated)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {issue.project.name}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`https://global-e.atlassian.net/browse/${issue.key}`, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Confluence Pages */}
            {results.confluencePages.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Confluence Pages
                </h3>
                {results.confluencePages.map((page) => (
                  <Card key={page.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">
                              {page.space.name}
                            </Badge>
                            <Badge variant="secondary">
                              Version {page.version.number}
                            </Badge>
                          </div>
                          <h4 className="font-semibold mb-2">{page.title}</h4>
                          <div 
                            className="text-sm text-muted-foreground mb-3 line-clamp-3"
                            dangerouslySetInnerHTML={{ 
                              __html: page.body.storage.value.replace(/<[^>]*>/g, '').substring(0, 200) + '...' 
                            }}
                          />
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {page.space.key}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Version {page.version.number}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(page._links.webui, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="jira" className="space-y-3">
            {results.jiraIssues.length > 0 ? (
              results.jiraIssues.map((issue) => (
                <Card key={issue.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="font-mono">
                            {issue.key}
                          </Badge>
                          <Badge className={getPriorityColor(issue.priority)}>
                            {issue.priority}
                          </Badge>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status}
                          </Badge>
                        </div>
                        <h4 className="font-semibold mb-2">{issue.summary}</h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {issue.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {issue.assignee || 'Unassigned'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(issue.updated)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {issue.project.name}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`https://global-e.atlassian.net/browse/${issue.key}`, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No Jira issues found for "{query}"
              </div>
            )}
          </TabsContent>

          <TabsContent value="confluence" className="space-y-3">
            {results.confluencePages.length > 0 ? (
              results.confluencePages.map((page) => (
                <Card key={page.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">
                            {page.space.name}
                          </Badge>
                          <Badge variant="secondary">
                            Version {page.version.number}
                          </Badge>
                        </div>
                        <h4 className="font-semibold mb-2">{page.title}</h4>
                        <div 
                          className="text-sm text-muted-foreground mb-3 line-clamp-3"
                          dangerouslySetInnerHTML={{ 
                            __html: page.body.storage.value.replace(/<[^>]*>/g, '').substring(0, 200) + '...' 
                          }}
                        />
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {page.space.key}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Version {page.version.number}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(page._links.webui, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No Confluence pages found for "{query}"
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}; 