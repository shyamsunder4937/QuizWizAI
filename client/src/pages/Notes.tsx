import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useLocation } from "wouter";
import { Home, BookOpen, Cpu, Code, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import DigitalElectronicsNotes from "./notes/DigitalElectronicsNotes";
import VerilogNotes from "./notes/VerilogNotes";
import VLSINotes from "./notes/VLSINotes";

type NoteSection = "digital" | "verilog" | "vlsi";

export default function Notes() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1]);
  const sectionParam = urlParams.get('section') as NoteSection | null;
  
  const [activeSection, setActiveSection] = useState<NoteSection>(
    sectionParam && ["digital", "verilog", "vlsi"].includes(sectionParam) 
      ? sectionParam 
      : "digital"
  );

  useEffect(() => {
    if (sectionParam && ["digital", "verilog", "vlsi"].includes(sectionParam)) {
      setActiveSection(sectionParam);
    }
  }, [sectionParam]);

  const sections = [
    {
      id: "digital" as NoteSection,
      title: "Digital Electronics",
      icon: Zap,
      description: "Logic gates, circuits, and fundamentals"
    },
    {
      id: "verilog" as NoteSection,
      title: "Verilog HDL",
      icon: Code,
      description: "Hardware description language"
    },
    {
      id: "vlsi" as NoteSection,
      title: "VLSI Design",
      icon: Cpu,
      description: "Integrated circuit design"
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "digital":
        return <DigitalElectronicsNotes />;
      case "verilog":
        return <VerilogNotes />;
      case "vlsi":
        return <VLSINotes />;
      default:
        return <DigitalElectronicsNotes />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Home className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/learning">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <BookOpen className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Back to Resources</span>
              </button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Detailed Notes</h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border min-h-[calc(100vh-73px)] sticky top-[73px] hidden md:block bg-background">
          <ScrollArea className="h-[calc(100vh-73px)]">
            <div className="p-4 space-y-2">
              <div className="px-3 py-2">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Topics
                </h2>
              </div>
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <Button
                    key={section.id}
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start ${isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{section.title}</span>
                      <span className="text-xs text-muted-foreground">{section.description}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </aside>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40">
          <div className="flex justify-around p-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <Button
                  key={section.id}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={`flex-1 mx-1 ${isActive ? "bg-primary/10 text-primary" : ""}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  <span className="text-xs">{section.title.split(" ")[0]}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-5xl pb-20 md:pb-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
