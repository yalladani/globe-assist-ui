import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { JiraIssue, ConfluencePage } from '@/types/globe';

interface AtlassianResultsProps {
  jiraIssues: JiraIssue[];
  confluencePages: ConfluencePage[];
  onViewJiraIssue: (issueKey: string) => void;
  onViewConfluencePage: (pageId: string) => void;
}

const AtlassianResults: React.FC<AtlassianResultsProps> = ({
  jiraIssues,
  confluencePages,
  onViewJiraIssue,
  onViewConfluencePage
}) => {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done':
      case 'resolved':
      case 'closed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in progress':
      case 'in review':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'highest':
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
      case 'lowest':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Jira Issues Section */}
      {jiraIssues.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Jira Issues ({jiraIssues.length})
          </h3>
          <div className="space-y-3">
            {jiraIssues.map((issue) => (
              <Card key={issue.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base flex items-center gap-2">
                        <span className="font-mono text-sm text-blue-600">
                          {issue.key}
                        </span>
                        {issue.summary}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusIcon(issue.status)}
                        <Badge variant="outline" className="text-xs">
                          {issue.status}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {issue.issueType.name}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewJiraIssue(issue.key)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {issue.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>Project: {issue.project.name}</span>
                    <span>Updated: {new Date(issue.updated).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Confluence Pages Section */}
      {confluencePages.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentation ({confluencePages.length})
          </h3>
          <div className="space-y-3">
            {confluencePages.map((page) => (
              <Card key={page.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{page.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {page.space.name}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          v{page.version.number}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewConfluencePage(page.id)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div 
                    className="text-sm text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: page.body.storage.value.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
                    }}
                  />
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>Space: {page.space.key}</span>
                    <span>Status: {page.status}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {jiraIssues.length === 0 && confluencePages.length === 0 && (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No relevant issues or documentation found.</p>
        </div>
      )}
    </div>
  );
};

export default AtlassianResults; 