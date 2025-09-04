import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Star } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      <div className="absolute inset-0 bg-background/20" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 animate-bounce">
        <Heart className="h-8 w-8 text-love opacity-60" fill="currentColor" />
      </div>
      <div className="absolute top-32 right-32 animate-pulse">
        <Star className="h-6 w-6 text-friendship opacity-70" fill="currentColor" />
      </div>
      <div className="absolute bottom-40 left-32 animate-bounce" style={{ animationDelay: "1s" }}>
        <Sparkles className="h-7 w-7 text-gratitude opacity-60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-love" />
            <span className="text-sm font-medium text-foreground">
              ¡Gratis y sin registros!
            </span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
          <span className="text-foreground">Crea cartas</span>
          <br />
          <span className="bg-gradient-love bg-clip-text text-transparent">
            digitales hermosas
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-body leading-relaxed">
          Diseña tarjetas únicas para el amor y la amistad con herramientas intuitivas, 
          plantillas profesionales y textos generados por IA. ¡Todo en minutos!
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onGetStarted}
            className="text-lg px-8 py-6 h-auto"
          >
            <Heart className="h-5 w-5 mr-2" fill="currentColor" />
            Crear mi carta gratis
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 h-auto bg-white/10 backdrop-blur-sm border-white/30 text-foreground hover:bg-white/20"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Ver ejemplos
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-love rounded-full animate-pulse" />
            <span>100% Gratis</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-friendship rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
            <span>Sin registro</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gratitude rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            <span>Descarga inmediata</span>
          </div>
        </div>
      </div>
    </section>
  );
};