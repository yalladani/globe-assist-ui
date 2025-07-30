import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, ThumbsDown, HelpCircle, MessageSquare, TrendingUp } from 'lucide-react';
import { FeedbackStats } from '@/types/globe';

interface FeedbackStatsProps {
  stats: FeedbackStats;
}

const FeedbackStatsComponent: React.FC<FeedbackStatsProps> = ({ stats }) => {
  const totalFeedback = stats.likedMessages + stats.dislikedMessages + 
                       stats.helpfulMessages + stats.notHelpfulMessages + 
                       stats.clarifyRequests;

  const satisfactionRate = totalFeedback > 0 
    ? Math.round(((stats.likedMessages + stats.helpfulMessages) / totalFeedback) * 100)
    : 0;

  const getSatisfactionColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Feedback Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Satisfaction */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Satisfaction</span>
            <Badge className={getSatisfactionColor(satisfactionRate)}>
              {satisfactionRate}%
            </Badge>
          </div>
          <Progress value={satisfactionRate} className="h-2" />
        </div>

        {/* Feedback Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-green-600" />
              <span className="text-sm">Helpful</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Liked</span>
              <span className="text-sm font-medium">{stats.likedMessages}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Very Helpful</span>
              <span className="text-sm font-medium">{stats.helpfulMessages}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ThumbsDown className="h-4 w-4 text-red-600" />
              <span className="text-sm">Not Helpful</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Disliked</span>
              <span className="text-sm font-medium">{stats.dislikedMessages}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Not Useful</span>
              <span className="text-sm font-medium">{stats.notHelpfulMessages}</span>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            <span className="text-sm">Need More Info</span>
            <Badge variant="secondary" className="ml-auto">
              {stats.clarifyRequests}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gray-600" />
            <span className="text-sm">Total Messages</span>
            <Badge variant="outline" className="ml-auto">
              {stats.totalMessages}
            </Badge>
          </div>
        </div>

        {/* Summary */}
        {totalFeedback > 0 && (
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Based on {totalFeedback} feedback responses
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackStatsComponent; 