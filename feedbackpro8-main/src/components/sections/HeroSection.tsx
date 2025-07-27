
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
      </div>
      
      <div className="container mx-auto text-center max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-2 animate-scale-in bg-primary/10 text-primary border-primary/20">
              <Star className="h-3 w-3 mr-1" />
              Trusted by 1000+ Organizations
            </Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight animate-fade-in [animation-delay:200ms]">
              Transform Your Feedback into
              <span className="text-primary block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Actionable Insights
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in [animation-delay:400ms]">
              Our comprehensive feedback collection system features customizable forms, 
              real-time analytics, and enterprise-grade security. Turn customer voices 
              into business growth with powerful tools designed for modern organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:600ms]">
              <Link to="/feedback">
                <Button size="lg" className="text-lg px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  Start Collecting Feedback
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="animate-fade-in [animation-delay:800ms]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop" 
                alt="Professional workspace with laptop and feedback dashboard"
                className="relative rounded-3xl shadow-2xl w-full h-auto transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
