import { useState, useRef } from "react";
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
  AlignRight,
  Image,
  Upload,
  X,
  Eye,
  EyeOff,
  Square,
  RectangleHorizontal,
  RectangleVertical
} from "lucide-react";
import html2canvas from "html2canvas";
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

const cardOrientations = [
  { name: "Vertical", value: "vertical", aspect: "aspect-[3/4]", icon: RectangleVertical },
  { name: "Horizontal", value: "horizontal", aspect: "aspect-[4/3]", icon: RectangleHorizontal },
  { name: "Cuadrada", value: "square", aspect: "aspect-square", icon: Square }
];

export const CardEditor = ({ template, onBack }: CardEditorProps) => {
  const [cardText, setCardText] = useState("Querido/a [Nombre],\n\nEscribe aquí tu mensaje especial...\n\nCon amor,\n[Tu nombre]");
  const [selectedFont, setSelectedFont] = useState("font-display");
  const [selectedColor, setSelectedColor] = useState("text-foreground");
  const [textAlign, setTextAlign] = useState("text-left");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(template.image || null);
  const [isTextTransparent, setIsTextTransparent] = useState(false);
  const [customColor, setCustomColor] = useState("#000000");
  const [useCustomColor, setUseCustomColor] = useState(false);
  const [cardOrientation, setCardOrientation] = useState("vertical");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const getTextStyles = () => {
    let styles = `${selectedFont} ${textAlign}`;
    if (useCustomColor) {
      styles += " text-foreground"; // fallback for tailwind, will be overridden by inline style
    } else {
      styles += ` ${selectedColor}`;
    }
    if (isBold) styles += " font-bold";
    if (isItalic) styles += " italic";
    if (isUnderline) styles += " underline";
    return styles;
  };

  const getCurrentOrientation = () => {
    return cardOrientations.find(o => o.value === cardOrientation) || cardOrientations[0];
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackgroundImage = () => {
    setBackgroundImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true
      });

      const link = document.createElement('a');
      link.download = `carta-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error al descargar la imagen:', error);
    }
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
            <Button variant="hero" onClick={handleDownload} className="flex items-center gap-2">
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

              <Separator className="my-4" />

              {/* Text transparency */}
              <div className="space-y-3 mb-4">
                <label className="text-sm font-medium text-muted-foreground">Transparencia</label>
                <Button
                  variant={isTextTransparent ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsTextTransparent(!isTextTransparent)}
                  className="flex items-center gap-2"
                >
                  {isTextTransparent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {isTextTransparent ? "Transparente" : "Con fondo"}
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Colores
              </h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {colors.map((color) => (
                    <Button
                      key={color.value}
                      variant={selectedColor === color.value && !useCustomColor ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedColor(color.value);
                        setUseCustomColor(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-3 h-3 rounded-full ${color.bg} border`} />
                      {color.name}
                    </Button>
                  ))}
                </div>
                
                <Separator className="my-3" />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Paleta personalizada</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => {
                        setCustomColor(e.target.value);
                        setUseCustomColor(true);
                      }}
                      className="w-8 h-8 rounded border cursor-pointer"
                    />
                    <Button
                      variant={useCustomColor ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUseCustomColor(!useCustomColor)}
                      className="flex-1"
                    >
                      Usar color personalizado
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                <Square className="h-5 w-5 text-primary" />
                Formato de carta
              </h3>
              
              <div className="grid grid-cols-3 gap-2">
                {cardOrientations.map((orientation) => {
                  const IconComponent = orientation.icon;
                  return (
                    <Button
                      key={orientation.value}
                      variant={cardOrientation === orientation.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCardOrientation(orientation.value)}
                      className="flex flex-col items-center gap-1 h-auto py-3"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="text-xs">{orientation.name}</span>
                    </Button>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                Fondo de la carta
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Subir imagen
                  </Button>
                  
                  {backgroundImage && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={removeBackgroundImage}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                {backgroundImage && (
                  <div className="relative">
                    <img 
                      src={backgroundImage} 
                      alt="Background preview" 
                      className="w-full h-20 object-cover rounded-lg border"
                    />
                  </div>
                )}
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
                  ref={cardRef}
                  className={`${getCurrentOrientation().aspect} relative rounded-2xl overflow-hidden shadow-floating`}
                  style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {!backgroundImage && (
                    <div className={`w-full h-full bg-gradient-${template.color}`} />
                  )}
                  
                  <div className="absolute inset-0 p-8 flex items-center justify-center">
                    <div className={`w-full rounded-xl p-6 ${isTextTransparent ? 'bg-transparent' : 'bg-white/90 backdrop-blur-sm shadow-card'}`}>
                      <pre 
                        className={`whitespace-pre-wrap text-sm leading-relaxed ${getTextStyles()}`}
                        style={useCustomColor ? { color: customColor } : {}}
                      >
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