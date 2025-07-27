
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Star, Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    rating: [4],
    satisfaction: "",
    features: [],
    comments: "",
    priority: "",
    anonymous: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, feature]
        : prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store feedback in localStorage for demo purposes
    const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    const newFeedback = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    localStorage.setItem('feedback', JSON.stringify([...existingFeedback, newFeedback]));
    
    setIsSubmitting(false);
    toast({
      title: "Feedback Submitted Successfully!",
      description: "Thank you for your valuable feedback. We'll review it shortly.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      category: "",
      rating: [4],
      satisfaction: "",
      features: [],
      comments: "",
      priority: "",
      anonymous: false
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-6 w-6 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">Secure Form</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Share Your Feedback</h1>
          <p className="text-lg text-muted-foreground">
            Help us improve by sharing your thoughts and experiences
          </p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Feedback Form</CardTitle>
            <CardDescription>
              All fields are optional unless marked as required. Your feedback is valuable to us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={formData.anonymous}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, anonymous: !!checked }))}
                  />
                  <Label htmlFor="anonymous" className="text-sm">Submit anonymously</Label>
                </div>
              </div>

              {/* Feedback Category */}
              <div className="space-y-2">
                <Label>Feedback Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feature-request">Feature Request</SelectItem>
                    <SelectItem value="bug-report">Bug Report</SelectItem>
                    <SelectItem value="general-feedback">General Feedback</SelectItem>
                    <SelectItem value="user-experience">User Experience</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div className="space-y-3">
                <Label>Overall Rating: {formData.rating[0]}/5</Label>
                <div className="flex items-center space-x-2">
                  {renderStars(formData.rating[0])}
                </div>
                <Slider
                  value={formData.rating}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, rating: value }))}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Satisfaction */}
              <div className="space-y-3">
                <Label>How satisfied are you with our service?</Label>
                <RadioGroup value={formData.satisfaction} onValueChange={(value) => setFormData(prev => ({ ...prev, satisfaction: value }))}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-satisfied" id="very-satisfied" />
                    <Label htmlFor="very-satisfied">Very Satisfied</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="satisfied" id="satisfied" />
                    <Label htmlFor="satisfied">Satisfied</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="neutral" id="neutral" />
                    <Label htmlFor="neutral">Neutral</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dissatisfied" id="dissatisfied" />
                    <Label htmlFor="dissatisfied">Dissatisfied</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-dissatisfied" id="very-dissatisfied" />
                    <Label htmlFor="very-dissatisfied">Very Dissatisfied</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <Label>Which features are most important to you? (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['Real-time Analytics', 'Custom Forms', 'Email Notifications', 'Data Export', 'API Integration', 'Mobile App'].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={formData.features.includes(feature)}
                        onCheckedChange={(checked) => handleFeatureChange(feature, !!checked)}
                      />
                      <Label htmlFor={feature} className="text-sm">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label>Priority Level</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments</Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                  placeholder="Please share any additional thoughts, suggestions, or details..."
                  rows={5}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Feedback
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackForm;
