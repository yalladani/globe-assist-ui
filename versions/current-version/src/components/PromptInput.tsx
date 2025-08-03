import { useState } from 'react';
import { CategorySelect } from './CategorySelect';
import { MainTopicsList } from './MainTopicsList';
import { SubTopicsList } from './SubTopicsList';
import { CustomPromptInput } from './CustomPromptInput';
import { getMainTopicsByCategory } from '@/data/topics';
import { MainTopic, SubTopic } from '@/data/topics';
import { Category } from '@/types/globe';

type ViewState = 'category' | 'main-topics' | 'sub-topics' | 'custom-prompt';

interface PromptInputProps {
  onSubmit: (prompt: string, category: Category, topic?: string) => void;
  isLoading?: boolean;
  lockedCategory?: Category;
}

export const PromptInput = ({ onSubmit, isLoading, lockedCategory }: PromptInputProps) => {
  const [category, setCategory] = useState<Category | undefined>(lockedCategory);
  const [selectedTopic, setSelectedTopic] = useState<MainTopic | null>(null);
  const [viewState, setViewState] = useState<ViewState>('category');

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setSelectedTopic(null);
    setViewState('main-topics');
  };

  const handleMainTopicSelect = (topic: MainTopic) => {
    setSelectedTopic(topic);
    setViewState('sub-topics');
  };

  const handleSubTopicSelect = (subTopic: SubTopic) => {
    onSubmit(subTopic.prompt, category!, selectedTopic!.title);
  };

  const handleCustomPrompt = (prompt: string) => {
    onSubmit(prompt, category!, selectedTopic!.title);
  };

  const handleBackToMainTopics = () => {
    setSelectedTopic(null);
    setViewState('main-topics');
  };

  const handleBackToSubTopics = () => {
    setViewState('sub-topics');
  };

  const handleCustomPromptClick = () => {
    setViewState('custom-prompt');
  };

  const handleBackToCategory = () => {
    setCategory(undefined);
    setSelectedTopic(null);
    setViewState('category');
  };

  const mainTopics = category ? getMainTopicsByCategory(category) : [];

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      {viewState === 'category' && (
        <div className="space-y-4">
          <label className="text-sm font-medium text-globe-text-primary">
            Select a category to get started:
          </label>
          <CategorySelect 
            value={lockedCategory || category} 
            onValueChange={handleCategoryChange}
            disabled={!!lockedCategory}
          />
        </div>
      )}

      {/* Main Topics */}
      {viewState === 'main-topics' && category && (
        <MainTopicsList 
          topics={mainTopics}
          onSelectTopic={handleMainTopicSelect}
        />
      )}

      {/* Sub Topics */}
      {viewState === 'sub-topics' && selectedTopic && (
        <SubTopicsList 
          topic={selectedTopic}
          onSelectSubTopic={handleSubTopicSelect}
          onBackToMainTopics={handleBackToMainTopics}
          onCustomPrompt={handleCustomPromptClick}
        />
      )}

      {/* Custom Prompt */}
      {viewState === 'custom-prompt' && selectedTopic && (
        <CustomPromptInput 
          topic={selectedTopic}
          onBackToSubTopics={handleBackToSubTopics}
          onSubmit={handleCustomPrompt}
          isLoading={isLoading}
        />
      )}

      {/* Back to category button for main topics view */}
      {viewState === 'main-topics' && (
        <div className="pt-4 border-t border-globe-border-subtle">
          <button
            onClick={handleBackToCategory}
            className="text-sm text-globe-text-secondary hover:text-globe-text-primary transition-colors"
          >
            ← Back to categories
          </button>
        </div>
      )}
    </div>
  );
};