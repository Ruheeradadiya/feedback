
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Eye, EyeOff, ArrowRight, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await signUp(email, password, name);
      if (success) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to FeedbackPro! You're now signed in.",
        });
        navigate('/');
      } else {
        toast({
          title: "Sign up failed",
          description: "Email already exists or invalid information. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
      </div>
      
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md space-y-8 animate-fade-in relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8 group">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300">
              <MessageSquare className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            </div>
            <span className="text-2xl font-bold text-foreground">FeedbackPro</span>
          </Link>
          
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg ring-2 ring-primary/10">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=faces" 
                alt="Join our community" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Join FeedbackPro</h1>
            <p className="text-muted-foreground">Create your account to start collecting valuable insights</p>
          </div>
        </div>

        <Card className="shadow-2xl border-border/50 transition-all duration-300 hover:shadow-xl backdrop-blur-sm bg-background/95">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold text-center flex items-center justify-center space-x-2">
              <UserPlus className="h-5 w-5 text-primary" />
              <span>Create Your Account</span>
            </CardTitle>
            <CardDescription className="text-center text-sm">
              Get started with your feedback collection journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Must be at least 6 characters long</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Already have an account?</span>
                </div>
              </div>
              
              <Link to="/signin">
                <Button variant="outline" className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                  Sign In Instead
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
