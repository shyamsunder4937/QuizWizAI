import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
export default function DigitalElectronicsNotes() {
  const sections = [
    {
      title: "Number Systems",
      icon: "🔢",
      topics: [
        {
          heading: "Binary System",
          content: "Base-2 number system using only 0 and 1. Each position represents a power of 2. Essential for all digital systems."
        },
        {
          heading: "Conversions",
          content: "Master conversions between Binary, Octal, Decimal, and Hexadecimal. Use division method for decimal to binary, grouping for binary to octal/hex."
        },
        {
          heading: "2's Complement",
          content: "Used for representing negative numbers. Invert all bits and add 1. Makes subtraction easier using addition circuits."
        },
        {
          heading: "BCD and Gray Code",
          content: "BCD: Each decimal digit encoded in 4 bits. Gray Code: Only one bit changes between consecutive numbers, prevents errors in encoders."
        }
      ]
    },
    {
      title: "Boolean Algebra",
      icon: "🧮",
      topics: [
        {
          heading: "Basic Laws",
          content: "Commutative: A+B = B+A, A·B = B·A | Associative: (A+B)+C = A+(B+C) | Distributive: A·(B+C) = A·B + A·C"
        },
        {
          heading: "De Morgan's Theorems",
          content: "(A+B)' = A'·B' and (A·B)' = A'+B'. Critical for converting between AND/OR gates and simplifying expressions."
        },
        {
          heading: "Karnaugh Maps",
          content: "Visual method for Boolean minimization. Group 1s in powers of 2 (1,2,4,8). Larger groups = simpler expressions. Don't forget wraparound!"
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Digital Electronics Notes</h2>
        <p className="text-muted-foreground">Comprehensive study material for digital electronics fundamentals</p>
      </div>

      <Separator />

      {sections.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">{section.icon}</span>
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {section.topics.map((topic, topicIndex) => (
              <div key={topicIndex}>
                <h4 className="font-semibold text-foreground mb-2">{topic.heading}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{topic.content}</p>
                {topicIndex < section.topics.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🚪</span>
            Logic Gates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border-l-2 border-primary pl-4">
              <h4 className="font-semibold mb-1">Basic Gates</h4>
              <p className="text-sm text-muted-foreground">AND, OR, NOT - fundamental building blocks</p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <h4 className="font-semibold mb-1">Universal Gates</h4>
              <p className="text-sm text-muted-foreground">NAND, NOR - can implement any Boolean function</p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <h4 className="font-semibold mb-1">Special Gates</h4>
              <p className="text-sm text-muted-foreground">XOR, XNOR - used for parity and comparison</p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <h4 className="font-semibold mb-1">Propagation Delay</h4>
              <p className="text-sm text-muted-foreground">Time for output to respond to input change</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🔄</span>
            Combinational Circuits
          </CardTitle>
          <CardDescription>Circuits without memory elements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Multiplexers (MUX)</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Data selector with 2^n inputs and n select lines. Acts as a digital switch. Used in data routing, function implementation, and parallel-to-serial conversion.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Demultiplexers (DEMUX)</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Opposite of MUX - routes one input to 2^n outputs. Used for serial-to-parallel conversion and data distribution.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Encoders & Decoders</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Encoder: 2^n inputs to n outputs. Decoder: n inputs to 2^n outputs. Priority encoders handle multiple active inputs.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Adders & Subtractors</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Half Adder: 2 inputs (A,B), 2 outputs (Sum, Carry). Full Adder: 3 inputs (A,B,Cin), 2 outputs. Ripple carry vs Carry lookahead.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">💾</span>
            Sequential Circuits
          </CardTitle>
          <CardDescription>Circuits with memory elements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Flip-Flops</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Basic memory elements triggered by clock edges. Types: SR (Set-Reset), D (Data/Delay), JK (Jack-Kilby), T (Toggle).
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">•</span>SR: Can have invalid state (S=1, R=1)</li>
              <li className="flex gap-2"><span className="text-primary">•</span>D: Most common, stores single bit</li>
              <li className="flex gap-2"><span className="text-primary">•</span>JK: Universal flip-flop, no invalid states</li>
              <li className="flex gap-2"><span className="text-primary">•</span>T: Toggles on T=1, used in counters</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Registers</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Group of flip-flops storing multiple bits. Shift registers move data left/right. SISO, SIPO, PISO, PIPO configurations.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Counters</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Asynchronous (Ripple): Simple but slow, clock triggers cascade. Synchronous: All flip-flops triggered simultaneously, faster and more reliable.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Key Tips for Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Practice K-maps daily - they're the fastest way to minimize Boolean expressions</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Draw timing diagrams for every sequential circuit to understand behavior</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Master flip-flop conversions - use excitation tables</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Understand setup and hold time violations - they cause metastability</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Universal gates (NAND/NOR) can implement any circuit - practice this skill</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
