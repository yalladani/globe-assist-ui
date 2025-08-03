import { PromptTemplate } from '@/data/prompts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface PromptTemplatesProps {
  templates: PromptTemplate[];
  onSelectTemplate: (template: PromptTemplate) => void;
}

export const PromptTemplates = ({ templates, onSelectTemplate }: PromptTemplatesProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-globe-text-primary mb-4">
        Choose a question to get started:
      </h3>
      
      <div className="grid gap-3">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className="cursor-pointer hover:shadow-md transition-shadow border-globe-border-subtle bg-globe-surface"
            onClick={() => onSelectTemplate(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base text-globe-text-primary">
                    {template.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-globe-text-secondary mt-1">
                    {template.description}
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