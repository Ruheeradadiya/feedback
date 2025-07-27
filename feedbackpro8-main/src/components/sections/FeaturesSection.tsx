
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, BarChart3, Users, Shield, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "User-Friendly Interface",
    description: "Intuitive forms that encourage participation and make feedback submission effortless.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Comprehensive insights and visual analytics to track feedback trends and patterns.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
  },
  {
    icon: Users,
    title: "Multi-Channel Access",
    description: "Collect feedback across multiple platforms and touchpoints seamlessly.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop"
  },
  {
    icon: Shield,
    title: "Secure & Encrypted",
    description: "Enterprise-grade security with data encryption and regular security audits.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop"
  },
  {
    icon: Zap,
    title: "Automated Notifications",
    description: "Stay updated with instant alerts and automated notification systems.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
  },
  {
    icon: Globe,
    title: "Integration Ready",
    description: "Connect with external platforms and export data with flexible APIs.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need for Effective Feedback Management
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools that scale with your organization and deliver real results
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-fade-in group overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="p-3 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/20">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
