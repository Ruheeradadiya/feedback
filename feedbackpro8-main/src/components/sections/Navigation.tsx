
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserButton } from "@/components/UserButton";

export const Navigation = () => {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MessageSquare className="h-8 w-8 text-primary transition-transform hover:scale-110" />
          </div>
          <span className="text-2xl font-bold text-foreground">FeedbackPro</span>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/feedback">
            <Button variant="ghost" className="transition-all duration-300 hover:scale-105">
              Submit Feedback
            </Button>
          </Link>
          <Link to="/admin">
            <Button className="transition-all duration-300 hover:scale-105">
              Admin Dashboard
            </Button>
          </Link>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
