import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, Gift, Lightbulb, Smile, Cake, Plus } from "lucide-react";
import templateLove from "@/assets/template-love.jpg";
import templateFriendship from "@/assets/template-friendship.jpg";
import templateGratitude from "@/assets/template-gratitude.jpg";

interface Template {
  id: string;
  name: string;
  category: "love" | "friendship" | "gratitude" | "inspiration" | "humor" | "birthday" | "blank";
  icon: React.ReactNode;
  color: string;
  description: string;
  image?: string;
}

const templates: Template[] = [
  {
    id: "love-1",
    name: "Carta de Amor",
    category: "love",
    icon: <Heart className="h-5 w-5" />,
    color: "love",
    description: "Expresa tus sentimientos más profundos",
    image: templateLove
  },
  {
    id: "friendship-1",
    name: "Para mi Amigo/a",
    category: "friendship",
    icon: <Users className="h-5 w-5" />,
    color: "friendship",
    description: "Celebra la amistad verdadera",
    image: templateFriendship
  },
  {
    id: "gratitude-1",
    name: "Agradecimiento",
    category: "gratitude",
    icon: <Gift className="h-5 w-5" />,
    color: "gratitude",
    description: "Da las gracias de corazón",
    image: templateGratitude
  },
  {
    id: "inspiration-1",
    name: "Inspiración",
    category: "inspiration",
    icon: <Lightbulb className="h-5 w-5" />,
    color: "inspiration",
    description: "Motiva y alienta a alguien especial"
  },
  {
    id: "humor-1",
    name: "Divertida",
    category: "humor",
    icon: <Smile className="h-5 w-5" />,
    color: "primary",
    description: "Arranca una sonrisa"
  },
  {
    id: "birthday-1",
    name: "Cumpleaños",
    category: "birthday",
    icon: <Cake className="h-5 w-5" />,
    color: "secondary",
    description: "Celebra un día especial"
  },
  {
    id: "blank",
    name: "Crear desde cero",
    category: "blank",
    icon: <Plus className="h-5 w-5" />,
    color: "outline",
    description: "Diseña tu propia carta única"
  }
];

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
}

export const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "Todas", icon: <Heart className="h-4 w-4" /> },
    { id: "love", name: "Amor", icon: <Heart className="h-4 w-4" /> },
    { id: "friendship", name: "Amistad", icon: <Users className="h-4 w-4" /> },
    { id: "gratitude", name: "Gratitud", icon: <Gift className="h-4 w-4" /> },
    { id: "inspiration", name: "Inspiración", icon: <Lightbulb className="h-4 w-4" /> }
  ];

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-foreground mb-3">
            Elige tu plantilla perfecta
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Selecciona una categoría y personaliza tu carta con herramientas fáciles de usar
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id}
              className="group cursor-pointer hover:shadow-card transition-smooth border-2 hover:border-primary/30 overflow-hidden"
              onClick={() => onSelectTemplate(template)}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                {template.image ? (
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-${template.color} flex items-center justify-center`}>
                    <div className="text-6xl opacity-20">
                      {template.icon}
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`text-white`}>
                      {template.icon}
                    </div>
                    <h3 className="font-display font-semibold text-white">
                      {template.name}
                    </h3>
                  </div>
                  <p className="text-white/90 text-sm font-body">
                    {template.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export type { Template };