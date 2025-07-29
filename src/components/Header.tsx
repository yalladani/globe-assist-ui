import { Button } from '@/components/ui/button';
import { Share2, Home } from 'lucide-react';

interface HeaderProps {
  onBackToHome?: () => void;
  showBackButton?: boolean;
}

export const Header = ({ onBackToHome, showBackButton }: HeaderProps) => {
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
      
      <div className="flex items-center gap-2">
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