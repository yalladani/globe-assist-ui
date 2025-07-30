import { KnowledgeResponse, JiraIssue, ConfluencePage } from '@/types/globe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AtlassianResults from './AtlassianResults';

interface KnowledgePanelProps {
  response: KnowledgeResponse | null;
  atlassianResults?: {
    jiraIssues: JiraIssue[];
    confluencePages: ConfluencePage[];
  };
  onViewJiraIssue?: (issueKey: string) => void;
  onViewConfluencePage?: (pageId: string) => void;
}

const statusIcons = {
  resolved: CheckCircle,
  pending: Clock,
  needs_attention: AlertTriangle
};

const statusColors = {
  resolved: 'bg-green-100 text-green-800 border-green-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  needs_attention: 'bg-red-100 text-red-800 border-red-200'
};

export const KnowledgePanel = ({ 
  response, 
  atlassianResults,
  onViewJiraIssue,
  onViewConfluencePage 
}: KnowledgePanelProps) => {
  if (!response && (!atlassianResults || (atlassianResults.jiraIssues.length === 0 && atlassianResults.confluencePages.length === 0))) {
    return (
      <div className="h-full bg-globe-surface flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-globe-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-globe-text-primary mb-2">
            No Knowledge Selected
          </h3>
          <p className="text-globe-text-secondary">
            Submit a question to view relevant knowledge and documentation
          </p>
        </div>
      </div>
    );
  }

  const StatusIcon = response ? statusIcons[response.status] : null;

  return (
    <div className="h-full bg-globe-surface">
      <div className="p-6 border-b border-globe-border-subtle">
        <h2 className="font-semibold text-globe-text-primary">Knowledge Response</h2>
      </div>
      
      <div className="h-full flex flex-col">
        <Tabs defaultValue="knowledge" className="flex-1 flex flex-col">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              <TabsTrigger value="atlassian">Atlassian Data</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="knowledge" className="flex-1 p-6 pt-4">
            {response && (
              <Card className="border-globe-border-subtle shadow-globe-sm">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-globe-text-primary leading-relaxed">
                      {response.summary}
                    </CardTitle>
                    <Badge className={statusColors[response.status]}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {response.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-globe-text-primary mb-2">Details</h4>
                    <p className="text-sm text-globe-text-secondary leading-relaxed">
                      {response.details}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-globe-text-primary mb-1">Source</h4>
                      <p className="text-sm text-globe-text-secondary">{response.source}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-globe-text-primary mb-2">Reference</h4>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 border-globe-border-subtle hover:bg-globe-accent-light"
                        onClick={() => window.open(response.link, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Documentation
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-globe-border-subtle">
                    <Badge variant="outline" className="text-xs">
                      #{response.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="atlassian" className="flex-1 p-6 pt-4 overflow-y-auto">
            {atlassianResults ? (
              <AtlassianResults
                jiraIssues={atlassianResults.jiraIssues}
                confluencePages={atlassianResults.confluencePages}
                onViewJiraIssue={onViewJiraIssue || (() => {})}
                onViewConfluencePage={onViewConfluencePage || (() => {})}
              />
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No Atlassian data available.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};