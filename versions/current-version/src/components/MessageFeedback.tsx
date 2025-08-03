import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ThumbsUp, ThumbsDown, HelpCircle, MessageSquare, MoreHorizontal } from 'lucide-react';
import { MessageFeedback, FeedbackButton } from '@/types/globe';

interface MessageFeedbackProps {
  messageId: string;
  currentFeedback?: MessageFeedback;
  onFeedback: (messageId: string, feedback: MessageFeedback) => void;
  showExtended?: boolean;
}

const MessageFeedbackComponent: React.FC<MessageFeedbackProps> = ({
  messageId,
  currentFeedback,
  onFeedback,
  showExtended = false
}) => {
  const [showMore, setShowMore] = useState(false);

  const basicButtons: FeedbackButton[] = [
    {
      id: 'like',
      type: 'like',
      icon: '👍',
      label: 'Helpful',
      color: 'text-green-600',
      variant: 'outline'
    },
    {
      id: 'dislike',
      type: 'dislike',
      icon: '👎',
      label: 'Not Helpful',
      color: 'text-red-600',
      variant: 'outline'
    }
  ];

  const extendedButtons: FeedbackButton[] = [
    {
      id: 'helpful',
      type: 'helpful',
      icon: '✅',
      label: 'Very Helpful',
      color: 'text-green-600',
      variant: 'default'
    },
    {
      id: 'not_helpful',
      type: 'not_helpful',
      icon: '❌',
      label: 'Not Useful',
      color: 'text-red-600',
      variant: 'destructive'
    },
    {
      id: 'clarify',
      type: 'clarify',
      icon: '❓',
      label: 'Need More Info',
      color: 'text-blue-600',
      variant: 'secondary'
    }
  ];

  const handleFeedback = (type: MessageFeedback['type']) => {
    const feedback: MessageFeedback = {
      type,
      timestamp: new Date()
    };
    onFeedback(messageId, feedback);
  };

  const getButtonVariant = (buttonType: string) => {
    if (currentFeedback?.type === buttonType) {
      return 'default';
    }
    return 'outline';
  };

  const getButtonColor = (buttonType: string) => {
    if (currentFeedback?.type === buttonType) {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    return '';
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 mt-2">
        {/* Basic Feedback Buttons */}
        <div className="flex items-center gap-1">
          {basicButtons.map((button) => (
            <Tooltip key={button.id}>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={getButtonVariant(button.type)}
                  className={`h-8 px-2 ${getButtonColor(button.type)}`}
                  onClick={() => handleFeedback(button.type)}
                >
                  <span className="text-sm">{button.icon}</span>
                  <span className="ml-1 text-xs hidden sm:inline">
                    {button.label}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{button.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Extended Feedback Options */}
        {showExtended && (
          <>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2"
              onClick={() => setShowMore(!showMore)}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>

            {showMore && (
              <div className="flex items-center gap-1 ml-2">
                {extendedButtons.map((button) => (
                  <Tooltip key={button.id}>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant={getButtonVariant(button.type)}
                        className={`h-8 px-2 ${getButtonColor(button.type)}`}
                        onClick={() => handleFeedback(button.type)}
                      >
                        <span className="text-sm">{button.icon}</span>
                        <span className="ml-1 text-xs hidden sm:inline">
                          {button.label}
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{button.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            )}
          </>
        )}

        {/* Feedback Status Badge */}
        {currentFeedback && (
          <Badge variant="secondary" className="ml-2 text-xs">
            {currentFeedback.type === 'like' && '👍 Liked'}
            {currentFeedback.type === 'dislike' && '👎 Disliked'}
            {currentFeedback.type === 'helpful' && '✅ Very Helpful'}
            {currentFeedback.type === 'not_helpful' && '❌ Not Useful'}
            {currentFeedback.type === 'clarify' && '❓ Need More Info'}
          </Badge>
        )}
      </div>
    </TooltipProvider>
  );
};

export default MessageFeedbackComponent; 