import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  CreditCard, 
  Target, 
  PieChart, 
  Settings,
  Receipt,
  TrendingUp,
  Wallet,
  HelpCircle
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'expenses', label: 'Expenses', icon: CreditCard, badge: '12' },
  { id: 'budgets', label: 'Budgets', icon: Wallet },
  { id: 'goals', label: 'Goals', icon: Target, badge: '3' },
  { id: 'analytics', label: 'Analytics', icon: PieChart },
  { id: 'insights', label: 'AI Insights', icon: TrendingUp },
  { id: 'receipts', label: 'Receipts', icon: Receipt },
];

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-1 min-h-0 bg-card border-r border-border">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  activeSection === item.id ? "bg-primary/10 text-primary" : ""
                }`}
                onClick={() => onSectionChange(item.id)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <HelpCircle className="mr-3 h-5 w-5" />
            Help & Support
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;