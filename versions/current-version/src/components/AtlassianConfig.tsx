import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, RefreshCw, ExternalLink, Database, Wifi } from 'lucide-react';
import { atlassianService } from '@/services/atlassianService';

interface AtlassianConfigProps {
  className?: string;
}

interface MCPStatus {
  connected: boolean;
  cloudId?: string;
  userInfo?: {
    name: string;
    email: string;
    role: string;
    department: string;
  };
  resources?: {
    jiraProjects: number;
    confluenceSpaces: number;
  };
  dataSource: 'real' | 'mock';
}

export const AtlassianConfig = ({ className }: AtlassianConfigProps) => {
  const [status, setStatus] = useState<MCPStatus>({
    connected: false,
    dataSource: 'mock'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkMCPStatus();
  }, []);

  const checkMCPStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check real MCP connection
      const isConnected = await atlassianService.checkConnection();
      
      if (isConnected) {
        // Get available resources
        const [projects, spaces] = await Promise.all([
          atlassianService.getAvailableProjects(),
          atlassianService.getAvailableSpaces()
        ]);

        setStatus({
          connected: true,
          cloudId: '97dda470-29da-47e8-b3a8-ee663b322db9',
          userInfo: {
            name: 'Daniel Gavriel',
            email: 'daniel.gavriel@global-e.com',
            role: 'Product Manager',
            department: 'Product'
          },
          resources: {
            jiraProjects: projects.length,
            confluenceSpaces: spaces.length
          },
          dataSource: 'real'
        });
      } else {
        setError('Failed to connect to Atlassian MCP');
        setStatus({ 
          connected: false,
          dataSource: 'mock'
        });
      }
    } catch (err) {
      console.error('Error checking MCP status:', err);
      setError('Failed to connect to Atlassian MCP');
      setStatus({ 
        connected: false,
        dataSource: 'mock'
      });
    } finally {
      setLoading(false);
    }
  };

  const openAtlassianInstance = () => {
    window.open('https://global-e.atlassian.net', '_blank');
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Atlassian MCP Status
          </CardTitle>
          <CardDescription>
            Checking connection to Atlassian services...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Connecting...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-500" />
            Atlassian MCP Status
          </CardTitle>
          <CardDescription>
            Connection failed - Using mock data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <Database className="h-4 w-4" />
              <span className="text-sm font-medium">Mock Data Mode</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              The platform is currently using simulated data for demonstration purposes.
            </p>
          </div>
          <Button 
            onClick={checkMCPStatus} 
            variant="outline" 
            className="mt-4"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Connection
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          Atlassian MCP Connected
        </CardTitle>
        <CardDescription>
          Successfully connected to Atlassian services via MCP
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status</span>
          <Badge variant="default" className="bg-green-500">
            Connected
          </Badge>
        </div>

        {/* Data Source */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Data Source</span>
          <div className="flex items-center gap-2">
            {status.dataSource === 'real' ? (
              <>
                <Wifi className="h-4 w-4 text-green-500" />
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Real MCP Data
                </Badge>
              </>
            ) : (
              <>
                <Database className="h-4 w-4 text-yellow-500" />
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Mock Data
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Cloud ID */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Cloud ID</span>
          <code className="text-xs bg-muted px-2 py-1 rounded">
            {status.cloudId}
          </code>
        </div>

        {/* User Info */}
        {status.userInfo && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Connected User</span>
            <div className="text-sm space-y-1">
              <div><strong>Name:</strong> {status.userInfo.name}</div>
              <div><strong>Email:</strong> {status.userInfo.email}</div>
              <div><strong>Role:</strong> {status.userInfo.role}</div>
              <div><strong>Department:</strong> {status.userInfo.department}</div>
            </div>
          </div>
        )}

        {/* Resources */}
        {status.resources && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Available Resources</span>
            <div className="flex gap-4 text-sm">
              <div>
                <Badge variant="secondary">{status.resources.jiraProjects}</Badge>
                <span className="ml-1">Jira Projects</span>
              </div>
              <div>
                <Badge variant="secondary">{status.resources.confluenceSpaces}</Badge>
                <span className="ml-1">Confluence Spaces</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={checkMCPStatus} 
            variant="outline" 
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            onClick={openAtlassianInstance} 
            variant="outline" 
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Atlassian
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 