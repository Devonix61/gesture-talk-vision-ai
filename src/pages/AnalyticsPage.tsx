
import { useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, BarChart as BarChartIcon, Calendar } from "lucide-react";
import { Link } from 'react-router-dom';

// Analytics data
const usageData = [
  { name: 'Jan', translations: 65, conversations: 45 },
  { name: 'Feb', translations: 80, conversations: 55 },
  { name: 'Mar', translations: 95, conversations: 60 },
  { name: 'Apr', translations: 120, conversations: 75 },
  { name: 'May', translations: 150, conversations: 90 },
  { name: 'Jun', translations: 190, conversations: 110 },
  { name: 'Jul', translations: 220, conversations: 130 },
];

const accuracyData = [
  { name: 'Jan', accuracy: 88 },
  { name: 'Feb', accuracy: 89 },
  { name: 'Mar', accuracy: 91 },
  { name: 'Apr', accuracy: 92 },
  { name: 'May', accuracy: 94 },
  { name: 'Jun', accuracy: 95 },
  { name: 'Jul', accuracy: 97 },
];

const gestureDistributionData = [
  { name: 'Common Words', value: 45 },
  { name: 'Greetings', value: 20 },
  { name: 'Questions', value: 15 },
  { name: 'Statements', value: 10 },
  { name: 'Others', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsPage = () => {
  useEffect(() => {
    toast.success('Analytics Dashboard Loaded', {
      description: 'View your translation metrics and performance analytics',
      duration: 3000,
    });
  }, []);

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DashboardHeader />
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Last 30 Days
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-4 animate-fade-in">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
              <TabsTrigger value="accuracy" className="py-2">Accuracy</TabsTrigger>
              <TabsTrigger value="usage" className="py-2">Usage Patterns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300 border-muted/40">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Translation Activity</CardTitle>
                    <CardDescription>Number of translations and conversations over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ChartContainer 
                      config={{
                        translations: {
                          label: "Translations",
                          color: "hsl(var(--primary))"
                        },
                        conversations: {
                          label: "Conversations",
                          color: "hsl(var(--secondary))"
                        }
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={usageData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="translations" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2} 
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            animationDuration={1500}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="conversations" 
                            stroke="hsl(var(--secondary))" 
                            strokeWidth={2} 
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }} 
                            animationDuration={1500}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
                
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-muted/40">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Gesture Distribution</CardTitle>
                    <CardDescription>Types of gestures translated</CardDescription>
                  </CardHeader>
                  <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={gestureDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          animationDuration={1000}
                          animationBegin={200}
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {gestureDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-muted/40">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-semibold">Weekly Performance</CardTitle>
                      <CardDescription>Translation accuracy by week</CardDescription>
                    </div>
                    <div className="p-2 rounded-full bg-primary/10">
                      <BarChartIcon className="h-5 w-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={accuracyData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[80, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          dataKey="accuracy" 
                          fill="hsl(var(--primary))" 
                          name="Accuracy (%)" 
                          radius={[4, 4, 0, 0]}
                          animationDuration={1500}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center mt-8">
                <Link to="/dashboard">
                  <Button className="gap-2 group">
                    Return to Dashboard
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="accuracy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Accuracy Metrics</CardTitle>
                  <CardDescription>Detailed view of translation accuracy over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">The accuracy tab content will display more detailed accuracy metrics.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="usage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Patterns</CardTitle>
                  <CardDescription>Analysis of how the system is being used</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">The usage patterns tab will display detailed usage statistics.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
