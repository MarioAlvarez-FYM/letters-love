import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TemplateSelector } from "@/components/TemplateSelector";
import { CardEditor } from "@/components/CardEditor";
import type { Template } from "@/components/TemplateSelector";

const Index = () => {
  const [currentView, setCurrentView] = useState<"home" | "templates" | "editor">("home");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleGetStarted = () => {
    setCurrentView("templates");
  };

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentView("editor");
  };

  const handleBackToTemplates = () => {
    setCurrentView("templates");
    setSelectedTemplate(null);
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {currentView === "home" && (
        <>
          <HeroSection onGetStarted={handleGetStarted} />
          <div className="py-12">
            <TemplateSelector onSelectTemplate={handleSelectTemplate} />
          </div>
        </>
      )}
      
      {currentView === "templates" && (
        <div className="py-12">
          <TemplateSelector onSelectTemplate={handleSelectTemplate} />
        </div>
      )}
      
      {currentView === "editor" && selectedTemplate && (
        <CardEditor 
          template={selectedTemplate} 
          onBack={handleBackToTemplates}
        />
      )}
    </div>
  );
};

export default Index;
