import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { atlassianService } from '@/services/atlassianService';

interface AtlassianConfigProps {
  onConfigSaved: () => void;
}

const AtlassianConfig: React.FC<AtlassianConfigProps> = ({ onConfigSaved }) => {
  const [cloudId, setCloudId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    if (!cloudId.trim() || !accessToken.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Set the configuration
      atlassianService.setConfig({
        cloudId: cloudId.trim(),
        accessToken: accessToken.trim()
      });

      // Test the connection by searching for something simple
      await atlassianService.searchAll('test');
      
      setSuccess(true);
      setTimeout(() => {
        onConfigSaved();
      }, 1500);
    } catch (error) {
      setError('Failed to connect to Atlassian. Please check your credentials.');
      console.error('Atlassian connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Atlassian Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Configuration saved successfully!</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="cloudId">Cloud ID</Label>
          <Input
            id="cloudId"
            type="text"
            placeholder="Enter your Atlassian Cloud ID"
            value={cloudId}
            onChange={(e) => setCloudId(e.target.value)}
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500">
            Find this in your Atlassian URL: https://your-domain.atlassian.net
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accessToken">Access Token</Label>
          <Input
            id="accessToken"
            type="password"
            placeholder="Enter your Atlassian Access Token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500">
            Generate this in your Atlassian account settings
          </p>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={isLoading || !cloudId.trim() || !accessToken.trim()}
          className="w-full"
        >
          {isLoading ? 'Testing Connection...' : 'Save Configuration'}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          <p>This configuration will be stored locally in your browser.</p>
          <p>Your credentials are not shared with any external services.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AtlassianConfig; 