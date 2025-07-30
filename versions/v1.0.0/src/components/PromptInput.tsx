import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CategorySelect } from './CategorySelect';
import { Send } from 'lucide-react';
import { Category } from '@/types/globe';

interface PromptInputProps {
  onSubmit: (prompt: string, category: Category) => void;
  isLoading?: boolean;
  lockedCategory?: Category;
}

export const PromptInput = ({ onSubmit, isLoading, lockedCategory }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState<Category | undefined>(lockedCategory);

  const handleSubmit = () => {
    const selectedCategory = lockedCategory || category;
    if (prompt.trim() && selectedCategory) {
      onSubmit(prompt.trim(), selectedCategory);
      setPrompt('');
      if (!lockedCategory) {
        setCategory(undefined);
      }
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
      <Textarea
        placeholder="Describe your question or issue..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        className="min-h-24 bg-globe-surface border-globe-border-subtle resize-none text-globe-text-primary placeholder:text-globe-text-secondary"
        disabled={isLoading}
      />
      
      <div className="flex items-center gap-4">
        <CategorySelect 
          value={lockedCategory || category} 
          onValueChange={setCategory}
          disabled={!!lockedCategory}
        />
        
        <Button 
          onClick={handleSubmit}
          disabled={!prompt.trim() || !(lockedCategory || category) || isLoading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Send className="w-4 h-4" />
          Send
        </Button>
      </div>
    </div>
  );
};