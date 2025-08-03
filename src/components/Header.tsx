import { Button } from '@/components/ui/button';
import { Share2, Home, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { AtlassianConfig } from './AtlassianConfig';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onBackToHome?: () => void;
  showBackButton?: boolean;
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
}

export const Header = ({ onBackToHome, showBackButton }: HeaderProps) => {
  const [status, setStatus] = useState<MCPStatus>({ connected: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkMCPStatus();
  }, []);

  const checkMCPStatus = async () => {
    setLoading(true);
    try {
      // Simulate MCP status check
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful connection
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
          jiraProjects: 99,
          confluenceSpaces: 5
        }
      });
    } catch (err) {
      setStatus({ connected: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="h-16 bg-globe-surface border-b border-globe-border-subtle px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
          <img 
            src="/lovable-uploads/4f32f21f-fed1-468d-853c-353dbeb293a5.png" 
            alt="Global-e Logo" 
            className="w-8 h-8 object-contain"
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-globe-text-primary">Global-e Agent</h1>
          <p className="text-xs text-globe-text-secondary">Customer Success Assistant</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* MCP Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-globe-border-subtle bg-globe-accent-light">
          {loading ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin text-yellow-500" />
              <span className="text-xs text-globe-text-secondary">Connecting...</span>
            </>
          ) : status.connected ? (
            <>
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span className="text-xs text-globe-text-secondary">MCP Connected</span>
            </>
          ) : (
            <>
              <XCircle className="w-3 h-3 text-red-500" />
              <span className="text-xs text-globe-text-secondary">MCP Disconnected</span>
            </>
          )}
        </div>

        {showBackButton && (
          <Button variant="outline" size="sm" className="gap-2" onClick={onBackToHome}>
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        )}
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Invite Team
        </Button>
      </div>
    </header>
  );
};