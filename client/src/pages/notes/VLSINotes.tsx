import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap } from "lucide-react";

export default function VLSINotes() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">VLSI Design Notes</h2>
        <p className="text-muted-foreground">Comprehensive guide to Very Large Scale Integration design</p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">⚛️</span>
            CMOS Technology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">NMOS Transistor</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              N-type Metal-Oxide-Semiconductor. Conducts when gate voltage is HIGH. Passes strong 0, weak 1. Used as pull-down network.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">PMOS Transistor</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              P-type Metal-Oxide-Semiconductor. Conducts when gate voltage is LOW. Passes strong 1, weak 0. Used as pull-up network.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Complementary CMOS</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Combines NMOS and PMOS in complementary fashion. One network always OFF, minimizing static power. Industry standard for low power.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🔌</span>
            Logic Families
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Static CMOS</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Most robust and widely used. Pull-up (PMOS) and pull-down (NMOS) networks. No static power consumption.
            </p>
            <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
              ✓ Advantages: Robust, low static power, good noise margins<br/>
              ✗ Disadvantages: Slower, larger area
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Dynamic Logic</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Uses clock phases for evaluation. Faster and smaller than static CMOS. Stores charge on capacitance.
            </p>
            <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
              ✓ Advantages: Faster, smaller area, lower power<br/>
              ✗ Disadvantages: Charge leakage, needs refresh, complex timing
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Pass Transistor Logic</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Uses transistors as switches to pass logic values. Compact but can have voltage degradation.
            </p>
            <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
              ✓ Advantages: Very compact, fewer transistors<br/>
              ✗ Disadvantages: Voltage drop, slower, needs buffers
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
        <Zap className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Power Formula:</strong> Dynamic Power = C × V² × f | Static Power = V × I_leakage. Modern designs focus heavily on power optimization!
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">⏱️</span>
            Timing Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Propagation Delay</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Time for output to change after input changes. Depends on load capacitance, transistor size, and supply voltage. t_pd = (C_L × V_DD) / I_avg
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Setup Time (t_setup)</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Minimum time data must be stable BEFORE clock edge. Violation causes metastability. Critical for timing closure.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Hold Time (t_hold)</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Minimum time data must be stable AFTER clock edge. Hold violations are harder to fix than setup violations.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Clock-to-Q Delay</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Time from clock edge to output change in flip-flop. Adds to path delay in timing calculations.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🔄</span>
            VLSI Design Flow
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div>
                <h4 className="font-semibold text-foreground">Specification</h4>
                <p className="text-sm text-muted-foreground">Define functionality, performance, power, and area requirements</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div>
                <h4 className="font-semibold text-foreground">RTL Design</h4>
                <p className="text-sm text-muted-foreground">Write HDL code (Verilog/VHDL) describing circuit behavior</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div>
                <h4 className="font-semibold text-foreground">Functional Verification</h4>
                <p className="text-sm text-muted-foreground">Simulate and verify RTL using testbenches</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
              <div>
                <h4 className="font-semibold text-foreground">Synthesis</h4>
                <p className="text-sm text-muted-foreground">Convert RTL to gate-level netlist using standard cells</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
              <div>
                <h4 className="font-semibold text-foreground">Place & Route</h4>
                <p className="text-sm text-muted-foreground">Physical design: place cells and route interconnections</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">6</div>
              <div>
                <h4 className="font-semibold text-foreground">Timing Analysis (STA)</h4>
                <p className="text-sm text-muted-foreground">Verify all timing constraints are met</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">7</div>
              <div>
                <h4 className="font-semibold text-foreground">Physical Verification</h4>
                <p className="text-sm text-muted-foreground">DRC (Design Rule Check) and LVS (Layout vs Schematic)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">8</div>
              <div>
                <h4 className="font-semibold text-foreground">GDSII Generation</h4>
                <p className="text-sm text-muted-foreground">Create final layout file for fabrication</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🕐</span>
            Clock Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Clock Skew</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Difference in arrival time of clock at different flip-flops. Reduces maximum frequency. Minimize using balanced clock trees.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Clock Tree Synthesis</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Builds balanced tree structure to distribute clock. H-tree, X-tree, and mesh topologies. Buffers inserted to drive load.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Clock Gating</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Power optimization technique. Disable clock to unused blocks. Can save 20-50% dynamic power in typical designs.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            Power Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Dynamic Power Reduction</h4>
            <ul className="space-y-2 text-sm text-muted-foreground mt-2">
              <li className="flex gap-2"><span className="text-primary">•</span>Clock gating - disable unused blocks</li>
              <li className="flex gap-2"><span className="text-primary">•</span>Voltage scaling - lower V_DD reduces power quadratically</li>
              <li className="flex gap-2"><span className="text-primary">•</span>Frequency scaling - reduce clock frequency when possible</li>
              <li className="flex gap-2"><span className="text-primary">•</span>Activity reduction - minimize switching activity</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Static Power Reduction</h4>
            <ul className="space-y-2 text-sm text-muted-foreground mt-2">
              <li className="flex gap-2"><span className="text-primary">•</span>Multi-threshold CMOS - use high V_th for non-critical paths</li>
              <li className="flex gap-2"><span className="text-primary">•</span>Power gating - completely shut off unused blocks</li>
              <li className="flex gap-2"><span className="text-primary">•</span>Body biasing - adjust substrate voltage to reduce leakage</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Critical Path & Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The critical path is the longest delay path from input to output, determining maximum clock frequency.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-sm font-mono">
              T_clk ≥ t_clk-to-Q + t_logic + t_setup + t_skew
            </div>
          </div>
          <div className="space-y-3 mt-4">
            <h4 className="font-semibold text-foreground">Optimization Techniques:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">→</span>Pipelining - break long paths into stages</li>
              <li className="flex gap-2"><span className="text-primary">→</span>Retiming - move registers to balance delays</li>
              <li className="flex gap-2"><span className="text-primary">→</span>Logic restructuring - optimize Boolean expressions</li>
              <li className="flex gap-2"><span className="text-primary">→</span>Transistor sizing - increase drive strength on critical paths</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>CMOS is dominant because of zero static power and good noise margins</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Timing closure is critical - setup and hold violations must be fixed</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Power optimization is as important as performance in modern designs</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Clock distribution affects both timing and power significantly</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Physical verification (DRC/LVS) is mandatory before fabrication</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Understanding the complete design flow from RTL to GDSII is essential</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
