import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Star, 
  Search, 
  Filter, 
  Download,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import { ExportButton } from "@/components/ExportButton";
import { useToast } from "@/hooks/use-toast";

interface FeedbackItem {
  id: number;
  name: string;
  email: string;
  category: string;
  rating: number[];
  satisfaction: string;
  features: string[];
  comments: string;
  priority: string;
  anonymous: boolean;
  timestamp: string;
  status: string;
}

const AdminDashboard = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<FeedbackItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    // Load feedback from localStorage
    const storedFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    setFeedback(storedFeedback);
    setFilteredFeedback(storedFeedback);
  }, []);

  useEffect(() => {
    let filtered = feedback;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.comments.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredFeedback(filtered);
  }, [feedback, searchTerm, categoryFilter, statusFilter]);

  const updateFeedbackStatus = (id: number, newStatus: string) => {
    const updatedFeedback = feedback.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    );
    setFeedback(updatedFeedback);
    localStorage.setItem('feedback', JSON.stringify(updatedFeedback));
  };

  const deleteFeedback = (id: number) => {
    const updatedFeedback = feedback.filter(item => item.id !== id);
    setFeedback(updatedFeedback);
    localStorage.setItem('feedback', JSON.stringify(updatedFeedback));
    toast({
      title: "Feedback deleted",
      description: "The feedback item has been successfully removed.",
    });
  };

  const stats = {
    total: feedback.length,
    new: feedback.filter(f => f.status === 'new').length,
    inProgress: feedback.filter(f => f.status === 'in-progress').length,
    resolved: feedback.filter(f => f.status === 'resolved').length,
    averageRating: feedback.length > 0 
      ? (feedback.reduce((acc, f) => acc + f.rating[0], 0) / feedback.length).toFixed(1)
      : "0"
  };

  const categoryStats = feedback.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Link>
              <Separator orientation="vertical" className="h-6 hidden sm:block" />
              <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <ExportButton data={feedback} filename="feedback_export" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="feedback" className="text-xs sm:text-sm">Feedback</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Total Feedback</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">All time submissions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">{stats.averageRating}/5</div>
                  <p className="text-xs text-muted-foreground">Customer satisfaction</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">New Feedback</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">{stats.new}</div>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Resolution Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">
                    {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">Resolved issues</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Recent Feedback</CardTitle>
                <CardDescription>Latest 5 feedback submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {feedback.slice(0, 5).map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 p-4 border border-border rounded-lg">
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h4 className="font-medium text-sm sm:text-base">
                              {item.anonymous ? "Anonymous User" : item.name}
                            </h4>
                            <div className="flex items-center space-x-2">
                              {renderStars(item.rating[0])}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-none">{item.comments}</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                            <Badge className={`${getStatusColor(item.status)} text-xs`}>
                              {getStatusIcon(item.status)}
                              <span className="ml-1">{item.status}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Filter & Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search feedback..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="feature-request">Feature Request</SelectItem>
                        <SelectItem value="bug-report">Bug Report</SelectItem>
                        <SelectItem value="general-feedback">General Feedback</SelectItem>
                        <SelectItem value="user-experience">User Experience</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Feedback Items ({filteredFeedback.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {filteredFeedback.map((item) => (
                      <div key={item.id} className="border border-border rounded-lg p-4 sm:p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <h3 className="font-medium text-sm sm:text-base">
                                {item.anonymous ? "Anonymous User" : item.name}
                              </h3>
                              <div className="flex items-center space-x-1">
                                {renderStars(item.rating[0])}
                              </div>
                            </div>
                            {!item.anonymous && (
                              <p className="text-xs sm:text-sm text-muted-foreground break-all sm:break-normal">{item.email}</p>
                            )}
                          </div>
                          <div className="flex items-center justify-between sm:justify-end space-x-2">
                            <div className="text-xs text-muted-foreground">
                              {new Date(item.timestamp).toLocaleDateString()}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteFeedback(item.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          {item.priority && (
                            <Badge className={`${getPriorityColor(item.priority)} text-xs`}>
                              {item.priority} priority
                            </Badge>
                          )}
                          <Badge className={`${getStatusColor(item.status)} text-xs`}>
                            {getStatusIcon(item.status)}
                            <span className="ml-1">{item.status}</span>
                          </Badge>
                        </div>

                        {item.comments && (
                          <p className="text-xs sm:text-sm bg-muted p-3 rounded break-words">{item.comments}</p>
                        )}

                        {item.features.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs sm:text-sm font-medium">Important Features:</p>
                            <div className="flex flex-wrap gap-1">
                              {item.features.map((feature) => (
                                <Badge key={feature} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                          <Select 
                            value={item.status} 
                            onValueChange={(value) => updateFeedbackStatus(item.id, value)}
                          >
                            <SelectTrigger className="w-full sm:w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Feedback by Category</CardTitle>
                <CardDescription>Distribution of feedback across different categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(categoryStats).map(([category, count]) => (
                    <div key={category} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                      <span className="text-xs sm:text-sm font-medium capitalize">
                        {category.replace('-', ' ')}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-full sm:w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(count / stats.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status Distribution */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600 text-sm sm:text-base">New</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold">{stats.new}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Pending review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-yellow-600 text-sm sm:text-base">In Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold">{stats.inProgress}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Being addressed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600 text-sm sm:text-base">Resolved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold">{stats.resolved}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Successfully handled</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
