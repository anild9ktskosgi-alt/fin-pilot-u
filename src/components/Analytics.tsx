import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  AlertCircle,
  Calendar,
  DollarSign,
  Target,
  Zap
} from "lucide-react";

const Analytics = () => {
  const spendingTrends = [
    { month: "Sep", amount: 1450, change: 12 },
    { month: "Oct", amount: 1620, change: 18 },
    { month: "Nov", amount: 1380, change: -8 },
    { month: "Dec", amount: 1580, change: 15 },
  ];

  const aiInsights = [
    {
      type: "prediction",
      title: "Budget Alert Prediction",
      description: "Based on your spending pattern, you're likely to exceed your food budget by $85 this month",
      confidence: 87,
      action: "Consider meal prepping to reduce dining expenses",
      icon: AlertCircle,
      color: "warning"
    },
    {
      type: "optimization",
      title: "Savings Opportunity",
      description: "AI detected you could save $120/month by switching transportation habits",
      confidence: 73,
      action: "Try using campus shuttle or bike sharing more often",
      icon: Target,
      color: "success"
    },
    {
      type: "trend",
      title: "Spending Pattern Analysis",
      description: "Your entertainment spending increases by 40% during exam weeks",
      confidence: 91,
      action: "Plan stress-relief activities in advance to avoid impulse purchases",
      icon: TrendingUp,
      color: "primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              AI Financial Insights
            </h1>
            <p className="text-muted-foreground">Predictive analytics and smart recommendations for your finances</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Custom Range
            </Button>
            <Button size="sm" className="gradient-primary text-primary-foreground">
              <Zap className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Spending Trend Overview */}
        <Card className="stat-card">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Spending Trend Analysis</h2>
              <Badge variant="secondary">4 Months</Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {spendingTrends.map((trend, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-2xl font-bold">${trend.amount}</div>
                  <div className="text-sm text-muted-foreground">{trend.month} 2024</div>
                  <div className={`flex items-center justify-center space-x-1 text-sm font-medium ${
                    trend.change > 0 ? 'text-danger' : 'text-success'
                  }`}>
                    {trend.change > 0 ? 
                      <TrendingUp className="h-3 w-3" /> : 
                      <TrendingDown className="h-3 w-3" />
                    }
                    <span>{Math.abs(trend.change)}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start space-x-3">
                <Brain className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-primary">AI Prediction</p>
                  <p className="text-sm text-muted-foreground">
                    Based on historical data, your January spending is predicted to be $1,420 (↓12% from December)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Insights */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Smart Recommendations</h2>
          <div className="grid gap-6">
            {aiInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              const colorClasses = {
                warning: "bg-warning/10 border-warning/20 text-warning",
                success: "bg-success/10 border-success/20 text-success",
                primary: "bg-primary/10 border-primary/20 text-primary"
              };

              return (
                <Card key={index} className="stat-card">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${colorClasses[insight.color as keyof typeof colorClasses]}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{insight.title}</h3>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-4">
                        {insight.confidence}% confident
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">AI Confidence Level</span>
                        <span>{insight.confidence}%</span>
                      </div>
                      <Progress value={insight.confidence} className="h-2" />
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium text-foreground">💡 Recommended Action:</p>
                      <p className="text-sm text-muted-foreground mt-1">{insight.action}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Category Insights */}
        <Card className="stat-card">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Category Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Food & Dining</span>
                  <span className="text-sm text-danger">+23%</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-muted-foreground">Higher than typical for this time of year</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Transportation</span>
                  <span className="text-sm text-success">-15%</span>
                </div>
                <Progress value={45} className="h-2" />
                <p className="text-xs text-muted-foreground">Great improvement from last month!</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Entertainment</span>
                  <span className="text-sm text-warning">+8%</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-muted-foreground">Slightly above budget, watch closely</p>
              </div>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Analytics;