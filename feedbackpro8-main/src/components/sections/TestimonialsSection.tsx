
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    content: "FeedbackPro transformed how we collect and analyze user feedback. The insights are invaluable!",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=60&h=60&fit=crop&crop=faces"
  },
  {
    name: "Mike Chen",
    role: "CEO",
    company: "StartupXYZ",
    content: "The real-time analytics helped us make data-driven decisions that boosted our user satisfaction by 40%.",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=60&h=60&fit=crop&crop=faces"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Loved by Teams Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our customers have to say about their experience
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">{`"${testimonial.content}"`}</p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
