
export const StatsSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-2 animate-fade-in [animation-delay:200ms]">
            <div className="text-4xl font-bold text-primary transition-all duration-300 hover:scale-110">10K+</div>
            <div className="text-muted-foreground">Organizations</div>
          </div>
          <div className="space-y-2 animate-fade-in [animation-delay:400ms]">
            <div className="text-4xl font-bold text-primary transition-all duration-300 hover:scale-110">2M+</div>
            <div className="text-muted-foreground">Feedback Collected</div>
          </div>
          <div className="space-y-2 animate-fade-in [animation-delay:600ms]">
            <div className="text-4xl font-bold text-primary transition-all duration-300 hover:scale-110">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
          <div className="space-y-2 animate-fade-in [animation-delay:800ms]">
            <div className="text-4xl font-bold text-primary transition-all duration-300 hover:scale-110">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};
