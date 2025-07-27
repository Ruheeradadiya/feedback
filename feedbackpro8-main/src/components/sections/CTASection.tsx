
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='white' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
        }}></div>
      </div>
      <div className="container mx-auto text-center max-w-3xl relative z-10">
        <Heart className="h-16 w-16 mx-auto mb-6 animate-pulse" />
        <h2 className="text-4xl font-bold mb-4 animate-fade-in">
          Ready to Start Collecting Better Feedback?
        </h2>
        <p className="text-lg mb-8 opacity-90 animate-fade-in [animation-delay:200ms]">
          Join thousands of organizations that trust our platform for their feedback management needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:400ms]">
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/feedback">
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 hover:scale-105">
              Try Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
