import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Type, 
  Palette, 
  Download, 
  ArrowLeft, 
  Sparkles,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react";
import type { Template } from "./TemplateSelector";

interface CardEditorProps {
  template: Template;
  onBack: () => void;
}

const fonts = [
  { name: "Poppins", value: "font-display", preview: "Hola mundo" },
  { name: "Dancing Script", value: "font-script", preview: "Hola mundo" },
  { name: "Playfair Display", value: "font-elegant", preview: "Hola mundo" },
  { name: "Inter", value: "font-body", preview: "Hola mundo" }
];

const colors = [
  { name: "Rosa", value: "text-love", bg: "bg-love" },
  { name: "Lavanda", value: "text-friendship", bg: "bg-friendship" },
  { name: "Durazno", value: "text-gratitude", bg: "bg-gratitude" },
  { name: "Menta", value: "text-inspiration", bg: "bg-inspiration" },
  { name: "Negro", value: "text-foreground", bg: "bg-foreground" },
  { name: "Blanco", value: "text-white", bg: "bg-white" }
];

export const CardEditor = ({ template, onBack }: CardEditorProps) => {
  const [cardText, setCardText] = useState("Querido/a [Nombre],\n\nEscribe aquí tu mensaje especial...\n\nCon amor,\n[Tu nombre]");
  const [selectedFont, setSelectedFont] = useState("font-display");
  const [selectedColor, setSelectedColor] = useState("text-foreground");
  const [textAlign, setTextAlign] = useState("text-left");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const getTextStyles = () => {
    let styles = `${selectedFont} ${selectedColor} ${textAlign}`;
    if (isBold) styles += " font-bold";
    if (isItalic) styles += " italic";
    if (isUnderline) styles += " underline";
    return styles;
  };

  const generateAIText = () => {
    // Placeholder for AI text generation
    const sampleTexts = [
      "Querido/a amor mío,\n\nCada día a tu lado es una nueva aventura llena de sonrisas y momentos únicos. Gracias por ser la luz que ilumina mi camino.\n\nCon todo mi amor,\n❤️",
      "Mi querido/a amigo/a,\n\nLa amistad que compartimos es uno de los tesoros más valiosos de mi vida. Gracias por estar siempre ahí, en las buenas y en las malas.\n\nCon cariño infinito,\n🌟",
      "Para ti, persona especial,\n\nQuiero que sepas lo agradecido/a que estoy por todo lo que has hecho. Tu generosidad y bondad no tienen límites.\n\nCon gratitud,\n🙏"
    ];
    
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setCardText(randomText);
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a plantillas
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="hero" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Descargar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                <Type className="h-5 w-5 text-primary" />
                Texto de la carta
              </h3>
              
              <Textarea
                value={cardText}
                onChange={(e) => setCardText(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                className="min-h-[200px] resize-none"
              />
              
              <Button 
                variant="outline" 
                onClick={generateAIText}
                className="w-full mt-3 flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                ✨ Generar texto con IA
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                <Type className="h-5 w-5 text-primary" />
                Estilo del texto
              </h3>
              
              {/* Font Selection */}
              <div className="space-y-3 mb-4">
                <label className="text-sm font-medium text-muted-foreground">Fuente</label>
                <div className="grid grid-cols-2 gap-2">
                  {fonts.map((font) => (
                    <Button
                      key={font.value}
                      variant={selectedFont === font.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFont(font.value)}
                      className={font.value}
                    >
                      {font.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Text formatting */}
              <div className="space-y-3 mb-4">
                <label className="text-sm font-medium text-muted-foreground">Formato</label>
                <div className="flex gap-1">
                  <Button
                    variant={isBold ? "default" : "outline"}
                    size="icon"
                    onClick={() => setIsBold(!isBold)}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={isItalic ? "default" : "outline"}
                    size="icon"
                    onClick={() => setIsItalic(!isItalic)}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={isUnderline ? "default" : "outline"}
                    size="icon"
                    onClick={() => setIsUnderline(!isUnderline)}
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Text alignment */}
              <div className="space-y-3 mb-4">
                <label className="text-sm font-medium text-muted-foreground">Alineación</label>
                <div className="flex gap-1">
                  <Button
                    variant={textAlign === "text-left" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setTextAlign("text-left")}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={textAlign === "text-center" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setTextAlign("text-center")}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={textAlign === "text-right" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setTextAlign("text-right")}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Colores
              </h3>
              
              <div className="grid grid-cols-3 gap-2">
                {colors.map((color) => (
                  <Button
                    key={color.value}
                    variant={selectedColor === color.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color.value)}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-3 h-3 rounded-full ${color.bg} border`} />
                    {color.name}
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <Card className="p-8 min-h-[600px]">
              <h3 className="text-lg font-display font-semibold mb-6 text-center">
                Vista previa de tu carta
              </h3>
              
              <div className="relative mx-auto max-w-md">
                <div 
                  className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-floating"
                  style={{
                    backgroundImage: template.image ? `url(${template.image})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {!template.image && (
                    <div className={`w-full h-full bg-gradient-${template.color}`} />
                  )}
                  
                  <div className="absolute inset-0 p-8 flex items-center justify-center">
                    <div className="w-full bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-card">
                      <pre className={`whitespace-pre-wrap text-sm leading-relaxed ${getTextStyles()}`}>
                        {cardText}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};