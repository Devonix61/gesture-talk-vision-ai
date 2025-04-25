
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  trend: 'up' | 'down' | 'same';
  percentage: number;
  icon: React.ReactNode;
  color: 'isl-primary' | 'isl-secondary' | 'isl-accent' | 'muted';
  delay: number;
}

const StatCard = ({ title, value, description, trend, percentage, icon, color, delay }: StatCardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case 'isl-primary':
        return 'from-isl-primary/20 to-isl-primary/5 border-isl-primary/20';
      case 'isl-secondary':
        return 'from-isl-secondary/20 to-isl-secondary/5 border-isl-secondary/20';
      case 'isl-accent':
        return 'from-isl-accent/20 to-isl-accent/5 border-isl-accent/20';
      default:
        return 'from-muted/20 to-muted/5 border-muted/20';
    }
  };

  return (
    <Card 
      className={`bg-gradient-to-br ${getColorClasses()} border hover:shadow-md transition-all duration-300 overflow-hidden group animate-slide-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="p-2 rounded-full bg-background/50 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold animate-count-up">
          {value}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend !== 'same' && (
          <div className="mt-2">
            <Badge 
              variant={trend === 'up' ? 'default' : 'destructive'} 
              className="text-xs animate-slide-in-right"
            >
              {trend === 'up' ? '↑' : '↓'} {percentage}%
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
