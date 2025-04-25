
import { BarChart, LineChart, PieChart, MessageSquare } from 'lucide-react';
import StatCard from './StatCard';

export interface UsageStatsData {
  translations: { value: number; trend: 'up' | 'down' | 'same'; percentage: number };
  accuracy: { value: number; trend: 'up' | 'down' | 'same'; percentage: number };
  conversations: { value: number; trend: 'up' | 'down' | 'same'; percentage: number };
  savedTranslations: { value: number; trend: 'up' | 'down' | 'same'; percentage: number };
}

interface UsageStatsProps {
  data: UsageStatsData;
}

const UsageStats = ({ data }: UsageStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        title="Total Translations"
        value={data.translations.value}
        description="Sign language translations performed"
        trend={data.translations.trend}
        percentage={data.translations.percentage}
        icon={<LineChart className="h-5 w-5 text-isl-primary" />}
        color="isl-primary"
        delay={0}
      />
      
      <StatCard
        title="Accuracy"
        value={`${data.accuracy.value}%`}
        description="Average gesture recognition accuracy"
        trend={data.accuracy.trend}
        percentage={data.accuracy.percentage}
        icon={<PieChart className="h-5 w-5 text-isl-secondary" />}
        color="isl-secondary"
        delay={100}
      />
      
      <StatCard
        title="Conversations"
        value={data.conversations.value}
        description="AI-assisted conversations"
        trend={data.conversations.trend}
        percentage={data.conversations.percentage}
        icon={<MessageSquare className="h-5 w-5 text-isl-accent" />}
        color="isl-accent"
        delay={200}
      />
      
      <StatCard
        title="Saved Translations"
        value={data.savedTranslations.value}
        description="Translations saved to your account"
        trend={data.savedTranslations.trend}
        percentage={data.savedTranslations.percentage}
        icon={<BarChart className="h-5 w-5 text-muted-foreground" />}
        color="muted"
        delay={300}
      />
    </div>
  );
};

export default UsageStats;
