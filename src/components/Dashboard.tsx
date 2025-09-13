import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Target, 
  AlertTriangle,
  Plus,
  DollarSign,
  CreditCard,
  PieChart
} from "lucide-react";

interface StatCardProps {
  title: string;
  amount: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

const StatCard = ({ title, amount, change, trend, icon }: StatCardProps) => (
  <Card className="stat-card">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{amount}</p>
        </div>
      </div>
      <div className={`flex items-center space-x-1 text-sm font-medium ${
        trend === 'up' ? 'text-success' : 'text-danger'
      }`}>
        {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        <span>{change}</span>
      </div>
    </div>
  </Card>
);

interface BudgetCardProps {
  category: string;
  spent: number;
  budget: number;
  color: string;
}

const BudgetCard = ({ category, spent, budget, color }: BudgetCardProps) => {
  const percentage = (spent / budget) * 100;
  const isOverBudget = percentage > 100;

  return (
    <Card className="stat-card">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{category}</h3>
          <Badge variant={isOverBudget ? "destructive" : "secondary"}>
            ${spent.toFixed(0)} / ${budget.toFixed(0)}
          </Badge>
        </div>
        <Progress 
          value={Math.min(percentage, 100)} 
          className="h-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{percentage.toFixed(1)}% used</span>
          <span>${(budget - spent).toFixed(0)} remaining</span>
        </div>
      </div>
    </Card>
  );
};

interface GoalCardProps {
  title: string;
  current: number;
  target: number;
  deadline: string;
}

const GoalCard = ({ title, current, target, deadline }: GoalCardProps) => {
  const percentage = (current / target) * 100;

  return (
    <Card className="stat-card">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">{title}</h3>
          </div>
          <Badge variant="outline">{deadline}</Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">${current.toFixed(0)}</span>
            <span className="text-muted-foreground">${target.toFixed(0)}</span>
          </div>
          <Progress value={percentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {percentage.toFixed(1)}% complete
          </p>
        </div>
      </div>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Student Finance Manager</h1>
            <p className="text-muted-foreground">Track expenses, manage budgets, and achieve your financial goals</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <PieChart className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button size="sm" className="gradient-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Current Balance"
            amount="$2,543.20"
            change="+12.5%"
            trend="up"
            icon={<Wallet className="h-5 w-5" />}
          />
          <StatCard
            title="This Month Spent"
            amount="$1,284.50"
            change="-8.2%"
            trend="down"
            icon={<CreditCard className="h-5 w-5" />}
          />
          <StatCard
            title="Budget Remaining"
            amount="$715.50"
            change="+5.8%"
            trend="up"
            icon={<DollarSign className="h-5 w-5" />}
          />
          <StatCard
            title="Savings Goal"
            amount="$3,200.00"
            change="+15.3%"
            trend="up"
            icon={<Target className="h-5 w-5" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Budget Overview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Budget Overview</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              <BudgetCard
                category="Food & Dining"
                spent={420}
                budget={500}
                color="primary"
              />
              <BudgetCard
                category="Transportation"
                spent={180}
                budget={200}
                color="success"
              />
              <BudgetCard
                category="Entertainment"
                spent={250}
                budget={150}
                color="warning"
              />
              <BudgetCard
                category="Shopping"
                spent={95}
                budget={200}
                color="secondary"
              />
            </div>
          </div>

          {/* Financial Goals */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Financial Goals</h2>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                New Goal
              </Button>
            </div>
            <div className="space-y-4">
              <GoalCard
                title="Emergency Fund"
                current={1200}
                target={2000}
                deadline="Dec 2024"
              />
              <GoalCard
                title="Laptop Purchase"
                current={450}
                target={1200}
                deadline="Mar 2024"
              />
              <GoalCard
                title="Spring Break Trip"
                current={320}
                target={800}
                deadline="Feb 2024"
              />
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <Card className="stat-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Smart Alerts</h2>
              <Badge variant="secondary">3 Active</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <div className="flex-1">
                  <p className="font-medium text-warning-foreground">Entertainment Budget Alert</p>
                  <p className="text-sm text-muted-foreground">You've exceeded your entertainment budget by $100 this month</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Savings Milestone</p>
                  <p className="text-sm text-muted-foreground">Great job! You're 60% towards your emergency fund goal</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;