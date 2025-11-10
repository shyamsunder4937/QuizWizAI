import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function VerilogNotes() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Verilog HDL Notes</h2>
        <p className="text-muted-foreground">Complete guide to Verilog hardware description language</p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📦</span>
            Module Structure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <div>module module_name (</div>
            <div className="ml-4">input wire clk, reset,</div>
            <div className="ml-4">input wire [7:0] data_in,</div>
            <div className="ml-4">output reg [7:0] data_out</div>
            <div>);</div>
            <div className="mt-2">// Module body</div>
            <div className="mt-2">endmodule</div>
          </div>
          <p className="text-sm text-muted-foreground">
            Every Verilog design starts with a module. Ports can be input, output, or inout. Use meaningful names!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🔤</span>
            Data Types
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">wire</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Represents physical connections. Used with continuous assignments (assign). Cannot store values, must be driven continuously.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">reg</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Used in procedural blocks (always, initial). Can hold values. Despite the name, doesn't always synthesize to a register!
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">integer, real, time</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mainly for testbenches and simulation. Integer for loop counters, real for calculations, time for timestamps.
            </p>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <strong>Critical Rule:</strong> Use non-blocking (≤) for sequential logic, blocking (=) for combinational logic. Mixing them causes simulation/synthesis mismatches!
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            Assignments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Blocking Assignment (=)</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-2">
              <div>always @(*) begin</div>
              <div className="ml-4">temp = a & b;</div>
              <div className="ml-4">out = temp | c;</div>
              <div>end</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Executes sequentially, line by line. Use for combinational logic. Statements execute in order.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Non-blocking Assignment (≤)</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-2">
              <div>always @(posedge clk) begin</div>
              <div className="ml-4">q1 ≤ d;</div>
              <div className="ml-4">q2 ≤ q1;</div>
              <div>end</div>
            </div>
            <p className="text-sm text-muted-foreground">
              All assignments happen simultaneously at the end. Use for sequential logic. Creates proper flip-flop chains.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Continuous Assignment</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-2">
              <div>assign out = a & b | c;</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Used with wire. Always active, no sensitivity list needed. Perfect for simple combinational logic.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🔁</span>
            Always Blocks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Combinational Logic</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-2">
              <div>always @(*) begin</div>
              <div className="ml-4">// Use blocking assignments</div>
              <div className="ml-4">out = a & b;</div>
              <div>end</div>
            </div>
            <p className="text-sm text-muted-foreground">
              @(*) automatically includes all inputs in sensitivity list. Prevents latches from incomplete conditions.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Sequential Logic</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-2">
              <div>always @(posedge clk or negedge rst_n) begin</div>
              <div className="ml-4">if (!rst_n)</div>
              <div className="ml-8">q ≤ 0;</div>
              <div className="ml-4">else</div>
              <div className="ml-8">q ≤ d;</div>
              <div>end</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Triggered on clock edge. Use non-blocking assignments. Add async reset for proper initialization.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Finite State Machines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <div>// State encoding</div>
            <div>localparam IDLE = 2'b00;</div>
            <div>localparam ACTIVE = 2'b01;</div>
            <div>localparam DONE = 2'b10;</div>
            <div className="mt-2">// State register</div>
            <div>reg [1:0] state, next_state;</div>
            <div className="mt-2">// Sequential: state transitions</div>
            <div>always @(posedge clk) begin</div>
            <div className="ml-4">state ≤ next_state;</div>
            <div>end</div>
            <div className="mt-2">// Combinational: next state logic</div>
            <div>always @(*) begin</div>
            <div className="ml-4">case (state)</div>
            <div className="ml-8">IDLE: next_state = start ? ACTIVE : IDLE;</div>
            <div className="ml-8">// ...</div>
            <div className="ml-4">endcase</div>
            <div>end</div>
          </div>
          <p className="text-sm text-muted-foreground">
            Use separate always blocks for state transitions (sequential) and next state logic (combinational). This is the standard FSM template.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🧪</span>
            Testbench Essentials
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <div>module tb_example;</div>
            <div className="ml-2">reg clk, reset;</div>
            <div className="ml-2">reg [7:0] data_in;</div>
            <div className="ml-2">wire [7:0] data_out;</div>
            <div className="mt-2 ml-2">// Instantiate DUT</div>
            <div className="ml-2">example dut (</div>
            <div className="ml-6">.clk(clk),</div>
            <div className="ml-6">.reset(reset),</div>
            <div className="ml-6">.data_in(data_in),</div>
            <div className="ml-6">.data_out(data_out)</div>
            <div className="ml-2">);</div>
            <div className="mt-2 ml-2">// Clock generation</div>
            <div className="ml-2">initial clk = 0;</div>
            <div className="ml-2">always #5 clk = ~clk;</div>
            <div className="mt-2 ml-2">// Test stimulus</div>
            <div className="ml-2">initial begin</div>
            <div className="ml-6">$dumpfile("dump.vcd");</div>
            <div className="ml-6">$dumpvars(0, tb_example);</div>
            <div className="ml-6">reset = 1; #10;</div>
            <div className="ml-6">reset = 0;</div>
            <div className="ml-6">// Test cases...</div>
            <div className="ml-6">$finish;</div>
            <div className="ml-2">end</div>
            <div>endmodule</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Always initialize registers in reset condition to avoid X (unknown) states</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Use parameters for bus widths and constants - makes code reusable</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Avoid latches: ensure all paths in if-else and case statements are covered</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Use meaningful signal names: clk not c, data_valid not dv</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Comment your code! Explain the "why", not just the "what"</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="text-primary mt-1">→</span>
              <span>Test every module thoroughly before integration</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
