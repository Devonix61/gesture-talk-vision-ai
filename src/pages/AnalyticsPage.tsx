
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ArrowLeft, BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon, Calendar, ChevronDown, Download, Filter, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

// Mock data for charts
const usageData = [
  { name: 'Jan', translations: 65, minutes: 112, accuracy: 90 },
  { name: 'Feb', translations: 80, minutes: 144, accuracy: 88 },
  { name: 'Mar', translations: 92, minutes: 176, accuracy: 91 },
  { name: 'Apr', translations: 115, minutes: 198, accuracy: 92 },
  { name: 'May', translations: 130, minutes: 235, accuracy: 93 },
  { name: 'Jun', translations: 160, minutes: 290, accuracy: 94 },
  { name: 'Jul', translations: 180, minutes: 330, accuracy: 95 }
];

const gestureAccuracyData = [
  { name: 'Basic Greetings', accuracy: 98 },
  { name: 'Questions', accuracy: 92 },
  { name: 'Common Phrases', accuracy: 95 },
  { name: 'Technical Terms', accuracy: 86 },
  { name: 'Numbers', accuracy: 97 },
  { name: 'Complex Sentences', accuracy: 85 }
];

const languageDistributionData = [
  { name: 'Hindi', value: 45 },
  { name: 'English', value: 35 },
  { name: 'Tamil', value: 10 },
  { name: 'Marathi', value: 8 },
  { name: 'Other', value: 2 }
];

const deviceUsageData = [
  { name: 'Mobile', value: 55 },
  { name: 'Desktop', value: 30 },
  { name: 'Tablet', value: 15 }
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('30d');
  
  const handleExportData = () => {
    toast.success("Analytics data exported", {
      description: "The analytics report has been exported successfully."
    });
  };
  
  const handleRefresh = () => {
    toast.info("Refreshing data...");
    setTimeout(() => {
      toast.success("Analytics data refreshed");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-background/90">
      <Header />
      
      <main className="flex-1 container px-4 md:px-6 py-8 animate-fade-in">
        {/* Header with controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
              className="hover:bg-background/50 transition-colors group mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your ISL translation usage and performance metrics
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-2" onClick={handleExportData}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            
            <Button variant="outline" className="gap-2" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Statistics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Translations" 
            value="1,289" 
            change="+12.5%" 
            trend="up"
            description="Past 30 days"
            icon={<BarChartIcon className="h-4 w-4" />}
          />
          
          <StatCard 
            title="Usage Time" 
            value="24.5 hours" 
            change="+8.3%" 
            trend="up"
            description="Past 30 days"
            icon={<LineChartIcon className="h-4 w-4" />}
          />
          
          <StatCard 
            title="Avg. Accuracy" 
            value="94.2%" 
            change="+2.1%" 
            trend="up"
            description="Past 30 days"
            icon={<PieChartIcon className="h-4 w-4" />}
          />
          
          <StatCard 
            title="Active Devices" 
            value="5" 
            change="0%" 
            trend="neutral"
            description="No change"
            icon={<BarChartIcon className="h-4 w-4" />}
          />
        </div>
        
        {/* Charts section */}
        <div className="space-y-8">
          <Tabs defaultValue="usage">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
                <TabsTrigger value="accuracy">Accuracy Metrics</TabsTrigger>
                <TabsTrigger value="languages">Language Distribution</TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <TabsContent value="usage" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Translation Usage Over Time</CardTitle>
                  <CardDescription>
                    Number of translations performed and minutes of usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={usageData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Area
                          yAxisId="left"
                          type="monotone"
                          dataKey="translations"
                          name="Translations"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.3}
                        />
                        <Area
                          yAxisId="right"
                          type="monotone"
                          dataKey="minutes"
                          name="Minutes"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Usage Patterns</CardTitle>
                    <CardDescription>Usage distribution throughout the day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            {time: 'Morning', translations: 145},
                            {time: 'Afternoon', translations: 230},
                            {time: 'Evening', translations: 280},
                            {time: 'Night', translations: 120}
                          ]}
                          margin={{top: 10, right: 30, left: 10, bottom: 10}}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="translations" name="Translations" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Device Usage</CardTitle>
                    <CardDescription>Usage split by device type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={deviceUsageData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {deviceUsageData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="accuracy" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Translation Accuracy Over Time</CardTitle>
                  <CardDescription>
                    Percentage accuracy of translations by month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={usageData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[80, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="accuracy"
                          name="Accuracy %"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Gesture Recognition Accuracy</CardTitle>
                  <CardDescription>
                    Accuracy breakdown by gesture category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={gestureAccuracyData}
                        layout="vertical"
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" domain={[80, 100]} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                        <Bar dataKey="accuracy" name="Accuracy %" fill="#82ca9d">
                          {gestureAccuracyData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.accuracy > 90 ? '#82ca9d' : '#ffc658'} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="languages" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Output Language Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of translations by target language
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={languageDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {languageDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Most Frequently Translated Phrases</CardTitle>
                    <CardDescription>
                      Top phrases and their translation counts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            {phrase: 'Hello', count: 145},
                            {phrase: 'Thank you', count: 120},
                            {phrase: 'How are you?', count: 98},
                            {phrase: 'Yes', count: 85},
                            {phrase: 'No', count: 72},
                            {phrase: 'Please', count: 65},
                            {phrase: 'Good morning', count: 58}
                          ]}
                          layout="vertical"
                          margin={{top: 5, right: 30, left: 90, bottom: 5}}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                          <XAxis type="number" />
                          <YAxis dataKey="phrase" type="category" width={80} />
                          <Tooltip />
                          <Bar dataKey="count" name="Translations" fill="#8884d8" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Stat card component
const StatCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  description, 
  icon 
}: { 
  title: string; 
  value: string; 
  change: string; 
  trend: 'up' | 'down' | 'neutral'; 
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-muted-foreground text-sm font-medium">{title}</span>
          <div className="rounded-full p-1.5 bg-muted/50">
            {icon}
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div className={`text-sm flex items-center ${
            trend === 'up' ? 'text-green-500' : 
            trend === 'down' ? 'text-red-500' : 
            'text-muted-foreground'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''}
            {change}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default AnalyticsPage;
