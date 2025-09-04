import { Heart, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Heart className="h-8 w-8 text-love animate-pulse" fill="currentColor" />
              <Sparkles className="h-4 w-4 text-primary absolute -top-1 -right-1 animate-bounce" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-display font-bold text-foreground">
                Corazón Express
              </h1>
              <p className="text-sm text-muted-foreground font-body">
                Crea cartas digitales hermosas
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">¡Gratis para siempre!</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};