import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { JiraIssue, ConfluencePage } from '@/services/atlassianService';
import { ExternalLink, FileText, Bug, Users, Calendar, Tag } from 'lucide-react';

interface AtlassianResultsProps {
  jiraIssues: JiraIssue[];
  confluencePages: ConfluencePage[];
  onViewJiraIssue: (issueKey: string) => void;
  onViewConfluencePage: (pageId: string) => void;
}

export const AtlassianResults = ({ 
  jiraIssues, 
  confluencePages, 
  onViewJiraIssue, 
  onViewConfluencePage 
}: AtlassianResultsProps) => {
  const totalResults = jiraIssues.length + confluencePages.length;

  if (totalResults === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Atlassian Search Results
          </CardTitle>
          <CardDescription>
            No relevant results found in Jira or Confluence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Try refining your search terms or check the knowledge base for general information.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Atlassian Search Results</h3>
          <p className="text-sm text-muted-foreground">
            Found {totalResults} relevant items
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">
            {jiraIssues.length} Jira Issues
          </Badge>
          <Badge variant="secondary">
            {confluencePages.length} Confluence Pages
          </Badge>
        </div>
      </div>

      {/* Jira Issues */}
      {jiraIssues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5" />
              Jira Issues ({jiraIssues.length})
            </CardTitle>
            <CardDescription>
              Related issues and feature requests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {jiraIssues.map((issue) => (
              <div key={issue.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">
                      {issue.key}
                    </Badge>
                    <Badge 
                      variant={issue.status === 'In Progress' ? 'default' : 'secondary'}
                    >
                      {issue.status}
                    </Badge>
                    <Badge variant="outline">
                      {issue.priority}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewJiraIssue(issue.key)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                
                <h4 className="font-medium mb-2">{issue.summary}</h4>
                
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    <span>Project: {issue.project.name} ({issue.project.key})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-3 w-3" />
                    <span>Type: {issue.issueType.name}</span>
                  </div>
                  {issue.assignee && (
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>Assignee: {issue.assignee}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>Updated: {new Date(issue.updated).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Confluence Pages */}
      {confluencePages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Confluence Pages ({confluencePages.length})
            </CardTitle>
            <CardDescription>
              Documentation and knowledge base articles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {confluencePages.map((page) => (
              <div key={page.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {page.space.name}
                    </Badge>
                    <Badge variant="secondary">
                      v{page.version.number}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewConfluencePage(page.id)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                
                <h4 className="font-medium mb-2">{page.title}</h4>
                
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3 w-3" />
                    <span>Space: {page.space.name} ({page.space.key})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-3 w-3" />
                    <span>Status: {page.status}</span>
                  </div>
                </div>
                
                {/* Preview of content */}
                {page.body.storage.value && (
                  <div className="mt-3 p-3 bg-muted/30 rounded text-sm">
                    <div 
                      className="line-clamp-3 text-muted-foreground"
                      dangerouslySetInnerHTML={{ 
                        __html: page.body.storage.value.replace(/<[^>]*>/g, '').substring(0, 200) + '...' 
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://global-e.atlassian.net', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Jira
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://global-e.atlassian.net/wiki', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Confluence
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 