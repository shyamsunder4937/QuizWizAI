import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "wouter";
import { BookOpen, Video, Library, Lightbulb, Home, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface VideoResource {
  title: string;
  channel: string;
  url: string;
  description: string;
  duration?: string;
}

interface TopicSection {
  title: string;
  description: string;
  subtopics: string[];
}

export default function LearningResources() {
  const [activeTab, setActiveTab] = useState("notes");

  const videoResources: Record<string, VideoResource[]> = {
    digitalElectronics: [
      {
        title: "Digital Electronics Full Course",
        channel: "Neso Academy",
        url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm",
        description: "Complete digital electronics course covering all fundamentals",
        duration: "15+ hours"
      },
      {
        title: "Boolean Algebra and Logic Gates",
        channel: "The Organic Chemistry Tutor",
        url: "https://www.youtube.com/watch?v=jCCGmvuGKqE",
        description: "Comprehensive guide to Boolean algebra and logic gates",
        duration: "1h 30m"
      },
      {
        title: "Combinational Logic Circuits",
        channel: "Neso Academy",
        url: "https://www.youtube.com/watch?v=VPw9vPN-3ac&list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm&index=20",
        description: "Understanding multiplexers, decoders, and encoders",
        duration: "Multiple videos"
      },
      {
        title: "Sequential Logic and Flip-Flops",
        channel: "Neso Academy",
        url: "https://www.youtube.com/watch?v=FPKLo2eGcVg&list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm&index=50",
        description: "Master flip-flops, counters, and registers",
        duration: "Multiple videos"
      }
    ],
    verilog: [
      {
        title: "Verilog HDL Tutorial for Beginners",
        channel: "Neso Academy",
        url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev",
        description: "Complete Verilog programming course from basics to advanced",
        duration: "10+ hours"
      },
      {
        title: "Verilog Basics and Syntax",
        channel: "Intel FPGA",
        url: "https://www.youtube.com/watch?v=PJGvZSlsLKs",
        description: "Introduction to Verilog syntax and basic constructs",
        duration: "45m"
      },
      {
        title: "Testbench Writing in Verilog",
        channel: "Neso Academy",
        url: "https://www.youtube.com/watch?v=8qQRYu_Iqq0&list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev&index=15",
        description: "Learn how to write effective testbenches",
        duration: "30m"
      },
      {
        title: "Finite State Machines in Verilog",
        channel: "Neso Academy",
        url: "https://www.youtube.com/watch?v=VKqnXrVi0Ys&list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev&index=25",
        description: "Design and implement FSMs using Verilog",
        duration: "Multiple videos"
      }
    ],
    vlsi: [
      {
        title: "VLSI Design Flow",
        channel: "NPTEL IIT Kharagpur",
        url: "https://www.youtube.com/watch?v=7SJG7VY7BhQ&list=PLbRMhDVUMngf8yZy_LbMRx5PqQqRvfn7K",
        description: "Complete VLSI design flow from specification to fabrication",
        duration: "40+ hours"
      },
      {
        title: "CMOS Technology and Design",
        channel: "NPTEL IIT Madras",
        url: "https://www.youtube.com/watch?v=Yz8kKMJd_Vc",
        description: "Understanding CMOS technology and circuit design",
        duration: "1h"
      },
      {
        title: "Digital VLSI Design",
        channel: "NPTEL IIT Kharagpur",
        url: "https://www.youtube.com/playlist?list=PLbRMhDVUMngf8yZy_LbMRx5PqQqRvfn7K",
        description: "Advanced digital VLSI design concepts",
        duration: "Multiple lectures"
      }
    ]
  };

  const topicLibrary: TopicSection[] = [
    {
      title: "Number Systems and Codes",
      description: "Foundation of digital systems",
      subtopics: [
        "Binary, Octal, Decimal, and Hexadecimal systems",
        "Binary arithmetic and 2's complement",
        "BCD, Gray code, and ASCII",
        "Error detection and correction codes"
      ]
    },
    {
      title: "Boolean Algebra and Logic Gates",
      description: "Mathematical foundation of digital circuits",
      subtopics: [
        "Boolean theorems and laws",
        "Logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR)",
        "De Morgan's theorems",
        "Karnaugh maps and minimization"
      ]
    },
    {
      title: "Combinational Logic Circuits",
      description: "Circuits without memory elements",
      subtopics: [
        "Multiplexers and Demultiplexers",
        "Encoders and Decoders",
        "Adders and Subtractors",
        "Comparators and Parity generators"
      ]
    },
    {
      title: "Sequential Logic Circuits",
      description: "Circuits with memory elements",
      subtopics: [
        "Latches and Flip-flops (SR, D, JK, T)",
        "Registers and Shift registers",
        "Counters (Synchronous and Asynchronous)",
        "State machines and timing diagrams"
      ]
    },
    {
      title: "Verilog HDL Fundamentals",
      description: "Hardware description language basics",
      subtopics: [
        "Module structure and syntax",
        "Data types (wire, reg, integer)",
        "Operators and expressions",
        "Behavioral, Dataflow, and Structural modeling"
      ]
    },
    {
      title: "Verilog Advanced Concepts",
      description: "Advanced Verilog programming",
      subtopics: [
        "Always blocks and sensitivity lists",
        "Blocking vs Non-blocking assignments",
        "Tasks and Functions",
        "Testbench development and simulation"
      ]
    },
    {
      title: "VLSI Design Fundamentals",
      description: "Integrated circuit design basics",
      subtopics: [
        "CMOS technology and transistors",
        "Logic design and optimization",
        "Timing analysis and clock distribution",
        "Power consumption and optimization"
      ]
    }
  ];

  const keyConcepts = [
    {
      category: "Digital Electronics",
      concepts: [
        {
          term: "Logic Levels",
          definition: "Binary states represented by voltage levels: Logic 0 (LOW) and Logic 1 (HIGH)"
        },
        {
          term: "Propagation Delay",
          definition: "Time taken for a signal to travel from input to output of a logic gate"
        },
        {
          term: "Fan-out",
          definition: "Maximum number of logic gates that can be driven by a single output"
        },
        {
          term: "Setup and Hold Time",
          definition: "Timing constraints for stable data capture in sequential circuits"
        }
      ]
    },
    {
      category: "Verilog",
      concepts: [
        {
          term: "Blocking Assignment (=)",
          definition: "Sequential execution within always block, used for combinational logic"
        },
        {
          term: "Non-blocking Assignment (<=)",
          definition: "Parallel execution, used for sequential logic and flip-flops"
        },
        {
          term: "Sensitivity List",
          definition: "List of signals that trigger execution of an always block"
        },
        {
          term: "Synthesis",
          definition: "Process of converting HDL code into gate-level netlist"
        }
      ]
    },
    {
      category: "VLSI",
      concepts: [
        {
          term: "CMOS",
          definition: "Complementary Metal-Oxide-Semiconductor technology using NMOS and PMOS transistors"
        },
        {
          term: "Clock Skew",
          definition: "Variation in arrival time of clock signal at different parts of the circuit"
        },
        {
          term: "Critical Path",
          definition: "Longest delay path in a circuit that determines maximum operating frequency"
        },
        {
          term: "Static Timing Analysis",
          definition: "Method to verify timing of a design without simulation"
        }
      ]
    }
  ];

  const notes = {
    digitalElectronics: [
      "Start with number systems - they're the foundation of everything. Master binary, octal, decimal, and hexadecimal conversions",
      "Practice Karnaugh maps extensively - they're crucial for circuit minimization. Learn both 3-variable and 4-variable K-maps",
      "Understand the difference between combinational and sequential circuits. Combinational has no memory, sequential uses flip-flops",
      "Draw timing diagrams for sequential circuits to visualize behavior. Pay attention to setup and hold times",
      "Master flip-flop conversions - they appear frequently in exams. Know how to convert SR to JK, D to T, etc.",
      "Boolean algebra is your best friend - memorize De Morgan's theorems and all basic laws (Commutative, Associative, Distributive)",
      "For multiplexers, remember: 2^n inputs need n select lines. They're data selectors used everywhere in digital systems",
      "Counters: Synchronous counters are faster and more reliable than asynchronous (ripple) counters due to simultaneous clock triggering",
      "Universal gates (NAND/NOR) can implement any Boolean function. Practice designing circuits using only NAND or only NOR gates",
      "Race conditions and hazards can cause glitches. Learn static-0, static-1, and dynamic hazards to debug timing issues",
      "Gray code is essential for rotary encoders - only one bit changes between consecutive values, preventing errors",
      "Shift registers are versatile: use them for serial-to-parallel conversion, data storage, and even multiplication/division"
    ],
    verilog: [
      "Always use non-blocking assignments (<=) for sequential logic in always @(posedge clk) blocks to avoid race conditions",
      "Use blocking assignments (=) for combinational logic in always @(*) blocks. This ensures proper synthesis",
      "Write testbenches for every module you create. Good testbenches catch 90% of bugs before synthesis",
      "Understand the difference between wire and reg data types. Wire for continuous assignments, reg for procedural blocks",
      "Use meaningful signal names and add comments to your code. Future you will thank present you",
      "Sensitivity lists matter! Use @(*) for combinational logic to auto-include all inputs, or @(posedge clk) for sequential",
      "Avoid latches unless intentional - incomplete if-else or case statements create unwanted latches during synthesis",
      "Parameters and localparam make your code reusable. Use them for bus widths, delays, and configuration values",
      "Initial blocks are for simulation only - they don't synthesize. Use them in testbenches, not in design modules",
      "Generate statements are powerful for creating repetitive structures like arrays of registers or parameterized modules",
      "System tasks like $display, $monitor, and $finish are your debugging tools. Use $time to track simulation time",
      "For FSMs, use separate always blocks: one for state transitions (sequential), one for next state logic (combinational)",
      "Timing control: # for delay, @ for event control. Remember #10 means 10 time units, not 10 clock cycles",
      "Vectors are declared [MSB:LSB]. Example: reg [7:0] data means 8-bit register with data[7] as MSB"
    ],
    vlsi: [
      "Understand CMOS transistor operation thoroughly - NMOS passes strong 0, PMOS passes strong 1. This affects circuit design",
      "Learn to calculate propagation delay and power consumption. Power = CV²f for dynamic power, critical for modern designs",
      "Study different logic families and their trade-offs: Static CMOS (robust), Dynamic logic (faster), Pass transistor (compact)",
      "Practice timing analysis problems regularly. Know the difference between setup time, hold time, and clock-to-Q delay",
      "Understand the complete VLSI design flow from RTL to GDSII: Specification → RTL → Synthesis → Place & Route → Verification",
      "Clock skew is the enemy - it reduces maximum operating frequency. Use clock trees and H-trees for distribution",
      "Stick diagrams help visualize layout before actual design. Practice drawing them for basic gates and complex circuits",
      "Elmore delay model is essential for RC delay calculations in interconnects. Longer wires = more delay",
      "Understand the difference between cell-based and full-custom design. Cell-based is faster, full-custom is optimized",
      "DRC (Design Rule Check) and LVS (Layout vs Schematic) are mandatory verification steps before fabrication",
      "Fanout affects delay - each additional load increases capacitance. Use buffers to drive large fanouts",
      "Power optimization techniques: Clock gating, voltage scaling, multi-threshold CMOS. Power is as important as performance",
      "Metastability occurs when setup/hold times are violated. Use synchronizers for clock domain crossing",
      "Moore vs Mealy FSMs: Moore outputs depend only on state (safer), Mealy depends on state and inputs (faster)"
    ]
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Learning Resources</h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Digital Electronics & Verilog Learning Hub
          </h2>
          <p className="text-muted-foreground">
            Curated resources from top educators to master digital electronics, Verilog HDL, and VLSI design
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Notes</span>
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Tutorials</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Library className="w-4 h-4" />
              <span className="hidden sm:inline">Topic Library</span>
            </TabsTrigger>
            <TabsTrigger value="concepts" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Key Concepts</span>
            </TabsTrigger>
          </TabsList>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <div className="mb-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Click on any card below to view detailed notes with comprehensive explanations, examples, and best practices.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Link href="/notes?section=digital">
                <Card className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">⚡</span>
                      Digital Electronics
                    </CardTitle>
                    <CardDescription>Essential tips and study notes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {notes.digitalElectronics.slice(0, 5).map((note, index) => (
                        <li key={index} className="flex gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{note}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-sm text-primary font-medium">
                      Click to view detailed notes →
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/notes?section=verilog">
                <Card className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">💻</span>
                      Verilog HDL
                    </CardTitle>
                    <CardDescription>Best practices and coding tips</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {notes.verilog.slice(0, 5).map((note, index) => (
                        <li key={index} className="flex gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{note}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-sm text-primary font-medium">
                      Click to view detailed notes →
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/notes?section=vlsi">
                <Card className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">🔬</span>
                      VLSI Design
                    </CardTitle>
                    <CardDescription>Important concepts to remember</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {notes.vlsi.slice(0, 5).map((note, index) => (
                        <li key={index} className="flex gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{note}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-sm text-primary font-medium">
                      Click to view detailed notes →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>

          {/* Tutorials Tab */}
          <TabsContent value="tutorials" className="space-y-6">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="digital" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <div className="text-left">
                      <h3 className="font-semibold">Digital Electronics</h3>
                      <p className="text-sm text-muted-foreground">
                        {videoResources.digitalElectronics.length} video resources
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 pt-4">
                    {videoResources.digitalElectronics.map((video, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{video.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {video.channel} {video.duration && `• ${video.duration}`}
                              </CardDescription>
                            </div>
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{video.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="verilog" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💻</span>
                    <div className="text-left">
                      <h3 className="font-semibold">Verilog HDL</h3>
                      <p className="text-sm text-muted-foreground">
                        {videoResources.verilog.length} video resources
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 pt-4">
                    {videoResources.verilog.map((video, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{video.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {video.channel} {video.duration && `• ${video.duration}`}
                              </CardDescription>
                            </div>
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{video.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="vlsi" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔬</span>
                    <div className="text-left">
                      <h3 className="font-semibold">VLSI Design</h3>
                      <p className="text-sm text-muted-foreground">
                        {videoResources.vlsi.length} video resources
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 pt-4">
                    {videoResources.vlsi.map((video, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{video.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {video.channel} {video.duration && `• ${video.duration}`}
                              </CardDescription>
                            </div>
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{video.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Topic Library Tab */}
          <TabsContent value="library" className="space-y-6">
            <div className="grid gap-6">
              {topicLibrary.map((topic, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{topic.title}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {topic.subtopics.map((subtopic, subIndex) => (
                        <li key={subIndex} className="flex gap-2 text-sm">
                          <span className="text-primary mt-1">→</span>
                          <span className="text-muted-foreground">{subtopic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Key Concepts Tab */}
          <TabsContent value="concepts" className="space-y-6">
            <div className="grid gap-6">
              {keyConcepts.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{section.category}</CardTitle>
                    <CardDescription>Essential terms and definitions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {section.concepts.map((concept, conceptIndex) => (
                        <div key={conceptIndex} className="border-l-2 border-primary pl-4 py-2">
                          <h4 className="font-semibold text-foreground mb-1">{concept.term}</h4>
                          <p className="text-sm text-muted-foreground">{concept.definition}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
