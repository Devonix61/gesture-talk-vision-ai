
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

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
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = typeof value === 'number' ? value : 0;

  // Animate count up effect
  useEffect(() => {
    if (typeof value !== 'number') {
      return;
    }
    
    // Start animation after delay
    const timer = setTimeout(() => {
      let startTime: number;
      const duration = 1500; // 1.5 seconds
      
      const animateValue = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easedProgress = easeOutQuad(progress);
        
        setDisplayValue(Math.floor(easedProgress * targetValue));
        
        if (progress < 1) {
          requestAnimationFrame(animateValue);
        } else {
          setDisplayValue(targetValue);
        }
      };
      
      requestAnimationFrame(animateValue);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay, targetValue]);
  
  // Easing function for smoother animation
  const easeOutQuad = (t: number) => t * (2 - t);

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

  const displayFormatted = typeof value === 'number' ? displayValue : value;
  
  const getTrendColor = () => {
    if (trend === 'up') return 'bg-green-500/10 text-green-600 border-green-200';
    if (trend === 'down') return 'bg-red-500/10 text-red-600 border-red-200';
    return '';
  };

  return (
    <Card 
      className={`bg-gradient-to-br ${getColorClasses()} backdrop-blur-sm border hover:shadow-md transition-all duration-300 overflow-hidden group animate-slide-up hover:scale-[1.02]`}
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
        <div className="text-2xl font-bold">
          {displayFormatted}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend !== 'same' && (
          <div className="mt-2">
            <Badge 
              variant="outline" 
              className={`text-xs animate-slide-in-right border ${getTrendColor()}`}
              style={{ animationDelay: `${delay + 300}ms` }}
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
