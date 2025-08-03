import { MainTopic } from '@/data/topics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface MainTopicsListProps {
  topics: MainTopic[];
  onSelectTopic: (topic: MainTopic) => void;
}

export const MainTopicsList = ({ topics, onSelectTopic }: MainTopicsListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-globe-text-primary mb-4">
        Choose a main topic:
      </h3>
      
      <div className="grid gap-3">
        {topics.map((topic) => (
          <Card 
            key={topic.id} 
            className="cursor-pointer hover:shadow-md transition-shadow border-globe-border-subtle bg-globe-surface"
            onClick={() => onSelectTopic(topic)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base text-globe-text-primary">
                    {topic.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-globe-text-secondary mt-1">
                    {topic.description}
                  </CardDescription>
                </div>
                <ChevronRight className="w-4 h-4 text-globe-text-secondary" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}; 