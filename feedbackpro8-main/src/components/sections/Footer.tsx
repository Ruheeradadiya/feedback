
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border bg-muted/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MessageSquare className="h-6 w-6 text-primary transition-transform hover:scale-110" />
            </div>
            <span className="text-xl font-bold text-foreground">FeedbackPro</span>
          </div>
          <p className="text-muted-foreground text-center">
            Enterprise feedback collection system with advanced analytics and security.
          </p>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
};
