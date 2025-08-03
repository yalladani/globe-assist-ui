import { MainTopic, SubTopic } from '@/data/topics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';

interface SubTopicsListProps {
  topic: MainTopic;
  onSelectSubTopic: (subTopic: SubTopic) => void;
  onBackToMainTopics: () => void;
  onCustomPrompt: () => void;
}

export const SubTopicsList = ({ 
  topic, 
  onSelectSubTopic, 
  onBackToMainTopics,
  onCustomPrompt 
}: SubTopicsListProps) => {
  return (
    <div className="space-y-4">
      {/* Header with back button */}
      <div className="flex items-center gap-3 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBackToMainTopics}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-globe-text-primary">
            {topic.title}
          </h3>
          <p className="text-sm text-globe-text-secondary">
            {topic.description}
          </p>
        </div>
      </div>

      <h4 className="text-md font-medium text-globe-text-primary mb-3">
        Choose a specific question:
      </h4>
      
      <div className="grid gap-3">
        {topic.subTopics.map((subTopic) => (
          <Card 
            key={subTopic.id} 
            className="cursor-pointer hover:shadow-md transition-shadow border-globe-border-subtle bg-globe-surface"
            onClick={() => onSelectSubTopic(subTopic)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base text-globe-text-primary">
                    {subTopic.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-globe-text-secondary mt-1">
                    {subTopic.description}
                  </CardDescription>
                </div>
                <Send className="w-4 h-4 text-globe-text-secondary" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Custom prompt option */}
      <div className="pt-4 border-t border-globe-border-subtle">
        <p className="text-sm text-globe-text-secondary mb-3">
          Can't find what you're looking for?
        </p>
        <Button 
          variant="outline" 
          onClick={onCustomPrompt}
          className="w-full"
        >
          Ask a custom question
        </Button>
      </div>
    </div>
  );
}; 