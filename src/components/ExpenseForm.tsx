import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Utensils, 
  Car, 
  ShoppingBag, 
  GraduationCap, 
  Home, 
  Heart, 
  Coffee,
  Gamepad2,
  Sparkles
} from "lucide-react";

const categories = [
  { id: "food", name: "Food & Dining", icon: Utensils, color: "bg-orange-100 text-orange-700" },
  { id: "transport", name: "Transportation", icon: Car, color: "bg-blue-100 text-blue-700" },
  { id: "shopping", name: "Shopping", icon: ShoppingBag, color: "bg-purple-100 text-purple-700" },
  { id: "education", name: "Education", icon: GraduationCap, color: "bg-green-100 text-green-700" },
  { id: "housing", name: "Housing", icon: Home, color: "bg-red-100 text-red-700" },
  { id: "healthcare", name: "Healthcare", icon: Heart, color: "bg-pink-100 text-pink-700" },
  { id: "coffee", name: "Coffee & Snacks", icon: Coffee, color: "bg-amber-100 text-amber-700" },
  { id: "entertainment", name: "Entertainment", icon: Gamepad2, color: "bg-indigo-100 text-indigo-700" },
];

const ExpenseForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
  });
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDescriptionChange = (description: string) => {
    setFormData({ ...formData, description });
    
    // Simulate AI categorization
    if (description.length > 5) {
      setIsAnalyzing(true);
      setTimeout(() => {
        const suggestions = generateAISuggestions(description);
        setAiSuggestions(suggestions);
        setIsAnalyzing(false);
      }, 1000);
    } else {
      setAiSuggestions([]);
    }
  };

  const generateAISuggestions = (description: string): string[] => {
    const desc = description.toLowerCase();
    const suggestions: string[] = [];

    if (desc.includes('coffee') || desc.includes('starbucks') || desc.includes('cafe')) {
      suggestions.push('coffee');
    }
    if (desc.includes('uber') || desc.includes('bus') || desc.includes('gas') || desc.includes('parking')) {
      suggestions.push('transport');
    }
    if (desc.includes('lunch') || desc.includes('dinner') || desc.includes('restaurant') || desc.includes('food')) {
      suggestions.push('food');
    }
    if (desc.includes('book') || desc.includes('course') || desc.includes('tuition')) {
      suggestions.push('education');
    }
    if (desc.includes('movie') || desc.includes('game') || desc.includes('netflix')) {
      suggestions.push('entertainment');
    }
    if (desc.includes('amazon') || desc.includes('store') || desc.includes('shopping')) {
      suggestions.push('shopping');
    }

    return suggestions.slice(0, 3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.description || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate expense submission
    toast({
      title: "Expense Added",
      description: `Successfully recorded $${formData.amount} expense`,
    });

    // Reset form
    setFormData({
      amount: "",
      description: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
    });
    setAiSuggestions([]);
  };

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  return (
    <Card className="stat-card max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Add New Expense</h2>
          <p className="text-muted-foreground">AI-powered expense categorization</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="What did you spend money on?"
              rows={3}
            />
            {isAnalyzing && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>AI analyzing expense...</span>
              </div>
            )}
          </div>

          {aiSuggestions.length > 0 && (
            <div className="space-y-2">
              <Label>AI Suggestions</Label>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map((suggestion) => {
                  const category = categories.find(cat => cat.id === suggestion);
                  if (!category) return null;
                  
                  return (
                    <Button
                      key={suggestion}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, category: suggestion })}
                      className="text-xs"
                    >
                      <category.icon className="h-3 w-3 mr-1" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category">
                  {selectedCategory && (
                    <div className="flex items-center space-x-2">
                      <selectedCategory.icon className="h-4 w-4" />
                      <span>{selectedCategory.name}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center space-x-2">
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full gradient-primary text-primary-foreground">
            Add Expense
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ExpenseForm;