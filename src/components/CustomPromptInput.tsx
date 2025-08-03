import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send } from 'lucide-react';
import { MainTopic } from '@/data/topics';

interface CustomPromptInputProps {
  topic: MainTopic;
  onBackToSubTopics: () => void;
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
}

export const CustomPromptInput = ({ 
  topic, 
  onBackToSubTopics, 
  onSubmit, 
  isLoading 
}: CustomPromptInputProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with back button */}
      <div className="flex items-center gap-3 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBackToSubTopics}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-globe-text-primary">
            Custom Question
          </h3>
          <p className="text-sm text-globe-text-secondary">
            Ask about {topic.title}
          </p>
        </div>
      </div>

      {/* Custom prompt input */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-globe-text-primary">
          Describe your question:
        </label>
        <Textarea
          placeholder="Type your specific question here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-24 bg-globe-surface border-globe-border-subtle resize-none text-globe-text-primary placeholder:text-globe-text-secondary"
          disabled={isLoading}
        />
        
        <Button 
          onClick={handleSubmit}
          disabled={!prompt.trim() || isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Send className="w-4 h-4" />
          Send Question
        </Button>
      </div>
    </div>
  );
}; 