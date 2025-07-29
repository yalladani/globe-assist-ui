import { KnowledgeResponse } from '@/types/globe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface KnowledgePanelProps {
  response: KnowledgeResponse | null;
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

export const KnowledgePanel = ({ response }: KnowledgePanelProps) => {
  if (!response) {
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

  const StatusIcon = statusIcons[response.status];

  return (
    <div className="h-full bg-globe-surface">
      <div className="p-6 border-b border-globe-border-subtle">
        <h2 className="font-semibold text-globe-text-primary">Knowledge Response</h2>
      </div>
      
      <div className="p-6">
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
      </div>
    </div>
  );
};