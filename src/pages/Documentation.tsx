import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, BookOpen } from "lucide-react";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

export const Documentation = () => {
  const { toast } = useToast();

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const maxWidth = 170;

    const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * fontSize * 0.5 + 5;
    };

    const addSection = (title: string, content: string) => {
      addText(title, 14, true);
      addText(content, 10, false);
      yPosition += 5;
    };

    // Title Page
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Network Routing Simulation", margin, yPosition);
    yPosition += 15;
    doc.setFontSize(12);
    doc.text("MANET Protocol Analysis and Comparison", margin, yPosition);
    yPosition += 20;

    // 1. INTRODUCTION
    addSection("1. INTRODUCTION", "");
    
    addSection("1.1 Overview", 
      "This project implements a comprehensive network routing simulation system that visualizes and compares three prominent Mobile Ad-hoc Network (MANET) routing protocols: AODV (Ad-hoc On-Demand Distance Vector), DSDV (Destination-Sequenced Distance Vector), and DSR (Dynamic Source Routing). The system provides real-time visualization of network topology, packet routing, and performance metrics analysis through an interactive web-based interface.");

    addSection("1.2 Objectives",
      "• Simulate and visualize multiple routing algorithms in a dynamic network environment\n• Compare performance metrics across different routing protocols\n• Provide real-time analysis of packet delivery ratio, throughput, and routing overhead\n• Enable file transfer simulation to demonstrate practical applications\n• Offer an interactive platform for understanding MANET routing behavior\n• Generate comparative performance reports for algorithm analysis");

    addSection("1.3 Challenges",
      "• Implementing accurate routing algorithm behavior in a simulated environment\n• Real-time visualization of dynamic packet movement across network nodes\n• Calculating and updating performance metrics during simulation\n• Managing complex state for multiple simultaneous packet transfers\n• Ensuring accurate path finding and route optimization\n• Handling network topology changes and connection reliability\n• Performance optimization for smooth animation and large networks");

    addSection("1.4 Scope",
      "• Simulation of three major routing protocols (AODV, DSDV, DSR)\n• Dynamic network topology with configurable node count (5-20 nodes)\n• Adjustable simulation parameters (speed, packet generation rate)\n• Real-time performance metrics visualization\n• File transfer simulation with algorithm comparison\n• CSV export functionality for performance data analysis\n• Responsive web-based user interface\n• Network visualization with animated packet routing");

    // 2. EXISTING SYSTEM
    addSection("2. EXISTING SYSTEM AND DISADVANTAGES", "");
    addText("Existing Systems: NS-2/NS-3 Network Simulators, OPNET Modeler, OMNeT++ Simulation Framework, GloMoSim", 10, false);
    addText("Disadvantages:\n• Complex setup and steep learning curve\n• Limited visualization capabilities\n• Command-line based interfaces\n• Requires extensive configuration files\n• Not web-accessible or cross-platform\n• Difficult to compare algorithms in real-time\n• Poor user interaction and experience\n• No built-in performance comparison tools", 10, false);

    // 3. LITERATURE SURVEY
    addSection("3. LITERATURE SURVEY", "");
    const references = [
      "1. Perkins & Royer (1999) - Ad-hoc On-Demand Distance Vector Routing",
      "2. Johnson & Maltz (1996) - Dynamic Source Routing in Ad Hoc Wireless Networks",
      "3. Perkins & Bhagwat (1994) - DSDV Protocol",
      "4. Abolhasan et al. (2004) - Review of routing protocols for MANETs",
      "5. Boukerche et al. (2011) - Routing protocols in ad hoc networks survey",
      "6. Mohseni et al. (2010) - Comparative Review of Reactive and Proactive Routing",
      "7. Jacquet et al. (2001) - Optimized Link State Routing Protocol",
      "8. Haas et al. (2002) - Zone Routing Protocol for Ad-Hoc Networks",
      "9. Marina & Das (2001) - On-demand Multipath Distance Vector Routing",
      "10. Broch et al. (1998) - Performance Comparison of Multi-Hop Wireless Protocols",
      "11. Das et al. (2000) - Simulation-based performance evaluation",
      "12. Royer & Toh (1999) - Review of Current Routing Protocols",
      "13. Lee et al. (2000) - AODV-BR: Backup Routing in Ad hoc Networks",
      "14. Hu & Johnson (2000) - Caching Strategies in On-Demand Routing",
      "15. Maleki et al. (2002) - Distance Routing Effect Algorithm for Mobility",
      "16. Boukerche (2004) - Performance Evaluation of Routing Protocols",
      "17. Clausen & Jacquet (2003) - OLSR Protocol RFC 3626",
      "18. Mittal & Kaur (2009) - Performance Comparison of AODV, DSR and ZRP",
      "19. Kumar et al. (2012) - Comparative Study of MANET Routing Protocols",
      "20. Singh & Kumar (2015) - Survey on Routing Protocols for WSN"
    ];
    addText(references.join("\n"), 9, false);

    // 4. PROBLEM DEFINITION
    addSection("4. PROBLEM DEFINITION",
      "The challenge is to create an accessible, visual, and interactive platform for understanding and comparing MANET routing protocols. Traditional network simulators require extensive technical knowledge and provide limited visualization, making it difficult for researchers and students to grasp routing algorithm behavior. There is a need for a web-based solution that provides real-time visual feedback of routing decisions, enables easy comparison of multiple algorithms, offers intuitive parameter adjustment, generates meaningful performance metrics, and requires no installation or complex setup.");

    // 5. PROPOSED SYSTEM
    addSection("5. PROPOSED SYSTEM", "");
    addSection("5.1 Overview",
      "A React-based web application that simulates network routing algorithms with interactive visualization, real-time metrics calculation, and performance comparison capabilities. The system uses canvas-based rendering for smooth animations and provides comprehensive controls for simulation parameters.");

    addSection("5.2 System Architecture",
      "• Frontend Layer: React components with TypeScript\n• State Management: React hooks (useState, useEffect)\n• Visualization Engine: HTML5 Canvas API\n• Routing Algorithms: BFS-based path finding with algorithm-specific logic\n• Data Layer: In-memory state with network graph structure\n• Export Module: JSZip for CSV generation");

    // 6. METHODOLOGY
    addSection("6. METHODOLOGY", "");
    addSection("6.1 Proposed Algorithms",
      "AODV (Reactive): On-demand route discovery, Route maintenance through RERR messages, Sequence numbers for loop prevention\n\nDSDV (Proactive): Table-driven routing, Periodic route updates, Destination sequence numbers\n\nDSR (Reactive): Source routing approach, Route caching mechanism, Route discovery via RREQ/RREP");

    addSection("6.2 Technology Used",
      "• React 18.3.1: Component-based UI framework\n• TypeScript: Type-safe development\n• Tailwind CSS: Utility-first styling\n• Vite: Build tool and dev server\n• Canvas API: Network visualization\n• Lucide React: Icon library\n• JSZip: File export functionality\n• Recharts: Performance charting");

    // 7. SYSTEM DESIGN - Use Case Diagram (Full Page)
    doc.addPage();
    yPosition = 20;
    
    addText("7. SYSTEM DESIGN", 16, true);
    addText("7.1 Use Case Diagram", 14, true);
    yPosition += 5;
    
    // Draw Use Case Diagram on A4 page
    const centerX = doc.internal.pageSize.width / 2;
    const diagramStartY = yPosition;
    
    // Draw Actor (User) on left side
    const actorX = 35;
    const actorY = diagramStartY + 80;
    
    // Actor stick figure
    doc.circle(actorX, actorY, 5);
    doc.line(actorX, actorY + 5, actorX, actorY + 20);
    doc.line(actorX, actorY + 10, actorX - 8, actorY + 18);
    doc.line(actorX, actorY + 10, actorX + 8, actorY + 18);
    doc.line(actorX, actorY + 20, actorX - 6, actorY + 35);
    doc.line(actorX, actorY + 20, actorX + 6, actorY + 35);
    doc.setFontSize(9);
    doc.text("User", actorX, actorY + 42, { align: 'center' });
    
    // Draw System Boundary Box
    const boxX = 60;
    const boxY = diagramStartY + 15;
    const boxWidth = 140;
    const boxHeight = 160;
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(boxX, boxY, boxWidth, boxHeight);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Network Routing Simulation System", centerX, boxY + 8, { align: 'center' });
    
    // Draw Use Cases (Ovals)
    const useCases = [
      { name: "Configure\nNetwork", x: 120, y: diagramStartY + 35 },
      { name: "Select Routing\nProtocol", x: 155, y: diagramStartY + 35 },
      { name: "Start/Pause\nSimulation", x: 85, y: diagramStartY + 65 },
      { name: "View Real-time\nMetrics", x: 155, y: diagramStartY + 65 },
      { name: "Transfer\nFiles", x: 120, y: diagramStartY + 95 },
      { name: "Compare\nPerformance", x: 85, y: diagramStartY + 125 },
      { name: "Export\nResults", x: 155, y: diagramStartY + 125 },
      { name: "View Network\nVisualization", x: 120, y: diagramStartY + 155 }
    ];
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    
    useCases.forEach(useCase => {
      // Draw oval
      doc.ellipse(useCase.x, useCase.y, 18, 10);
      // Draw text
      const lines = useCase.name.split('\n');
      lines.forEach((line, index) => {
        doc.text(line, useCase.x, useCase.y + (index - 0.3) * 3, { align: 'center' });
      });
      // Draw connecting line from actor to use case
      doc.line(actorX + 8, actorY + 10, useCase.x - 18, useCase.y);
    });
    
    // Add actors legend at bottom
    yPosition = boxY + boxHeight + 15;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Primary Actors:", margin, yPosition);
    yPosition += 5;
    doc.setFont("helvetica", "normal");
    doc.text("• Students - Learning network routing concepts", margin, yPosition);
    yPosition += 5;
    doc.text("• Researchers - Analyzing protocol performance", margin, yPosition);
    yPosition += 5;
    doc.text("• Network Engineers - Testing routing strategies", margin, yPosition);
    yPosition += 10;

    // 8. HARDWARE AND SOFTWARE REQUIREMENTS
    addSection("7. HARDWARE AND SOFTWARE REQUIREMENTS", "");
    addText("Hardware:\n• Processor: Intel Core i3 or equivalent\n• RAM: 4GB minimum (8GB recommended)\n• Storage: 500MB free space\n• Display: 1366x768 minimum resolution", 10, false);
    addText("Software:\n• Operating System: Windows 10/11, macOS, or Linux\n• Web Browser: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+\n• Node.js: v18.0.0 or higher\n• NPM/Bun: Package manager", 10, false);

    // 8. APPLICATIONS
    addSection("8. APPLICATIONS",
      "• Educational: Teaching network routing concepts\n• Research: Protocol performance analysis\n• Development: Testing routing algorithm improvements\n• Demonstration: Visualizing network behavior\n• Training: Network administrator certification\n• Analysis: Understanding MANET protocol characteristics\n• Prototyping: Rapid testing of routing strategies");

    // 9. RESULT ANALYSIS
    addSection("9. RESULT ANALYSIS",
      "Key Metrics Evaluated:\n• Packet Delivery Ratio: Percentage of successfully delivered packets\n• Average Delay: Mean time for packet delivery\n• Routing Overhead: Control message count vs data packets\n• Throughput: Data transmission rate\n• Network Load: Resource utilization\n• Path Length: Hop count for packet delivery\n\nExpected Results:\n• AODV: Lower overhead for sparse traffic, efficient route discovery\n• DSDV: Predictable performance, higher overhead in dynamic networks\n• DSR: Good for static topologies, cache benefits");

    // 10. CONCLUSION
    addSection("10. CONCLUSION",
      "This project successfully implements a comprehensive network routing simulation platform that addresses the limitations of traditional simulators. The web-based approach provides accessibility, while the visual interface enhances understanding of complex routing behaviors. The system demonstrates that AODV performs well in dynamic scenarios, DSDV suits stable networks with consistent traffic, and DSR benefits from route caching in moderately dynamic environments. The platform serves as an effective educational and research tool for MANET protocol analysis.");

    doc.save("Network_Routing_Simulation_Documentation.pdf");
    
    toast({
      title: "PDF Generated Successfully",
      description: "Documentation has been downloaded",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Project Documentation</h1>
          </div>
          <Button onClick={generatePDF} className="gap-2">
            <FileDown className="w-4 h-4" />
            Download PDF
          </Button>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle>1. INTRODUCTION</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1.1 Overview</h3>
                <p className="text-muted-foreground">
                  This project implements a comprehensive network routing simulation system that visualizes and compares three prominent Mobile Ad-hoc Network (MANET) routing protocols: AODV (Ad-hoc On-Demand Distance Vector), DSDV (Destination-Sequenced Distance Vector), and DSR (Dynamic Source Routing). The system provides real-time visualization of network topology, packet routing, and performance metrics analysis through an interactive web-based interface.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">1.2 Objectives</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Simulate and visualize multiple routing algorithms in a dynamic network environment</li>
                  <li>Compare performance metrics across different routing protocols</li>
                  <li>Provide real-time analysis of packet delivery ratio, throughput, and routing overhead</li>
                  <li>Enable file transfer simulation to demonstrate practical applications</li>
                  <li>Offer an interactive platform for understanding MANET routing behavior</li>
                  <li>Generate comparative performance reports for algorithm analysis</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">1.3 Challenges</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Implementing accurate routing algorithm behavior in a simulated environment</li>
                  <li>Real-time visualization of dynamic packet movement across network nodes</li>
                  <li>Calculating and updating performance metrics during simulation</li>
                  <li>Managing complex state for multiple simultaneous packet transfers</li>
                  <li>Ensuring accurate path finding and route optimization</li>
                  <li>Handling network topology changes and connection reliability</li>
                  <li>Performance optimization for smooth animation and large networks</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">1.4 Scope</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Simulation of three major routing protocols (AODV, DSDV, DSR)</li>
                  <li>Dynamic network topology with configurable node count (5-20 nodes)</li>
                  <li>Adjustable simulation parameters (speed, packet generation rate)</li>
                  <li>Real-time performance metrics visualization</li>
                  <li>File transfer simulation with algorithm comparison</li>
                  <li>CSV export functionality for performance data analysis</li>
                  <li>Responsive web-based user interface</li>
                  <li>Network visualization with animated packet routing</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Existing System */}
          <Card>
            <CardHeader>
              <CardTitle>2. EXISTING SYSTEM AND DISADVANTAGES</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Existing Systems</h3>
                <p className="text-muted-foreground">NS-2/NS-3 Network Simulators, OPNET Modeler, OMNeT++ Simulation Framework, GloMoSim</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Disadvantages</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Complex setup and steep learning curve</li>
                  <li>Limited visualization capabilities</li>
                  <li>Command-line based interfaces</li>
                  <li>Requires extensive configuration files</li>
                  <li>Not web-accessible or cross-platform</li>
                  <li>Difficult to compare algorithms in real-time</li>
                  <li>Poor user interaction and experience</li>
                  <li>No built-in performance comparison tools</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Literature Survey */}
          <Card>
            <CardHeader>
              <CardTitle>3. LITERATURE SURVEY</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-3">3.1 Key References (20 Reviews)</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2 text-sm">
                <li>Perkins & Royer (1999) - "Ad-hoc On-Demand Distance Vector Routing" - Introduced AODV protocol fundamentals</li>
                <li>Johnson & Maltz (1996) - "Dynamic Source Routing in Ad Hoc Wireless Networks" - Established DSR principles</li>
                <li>Perkins & Bhagwat (1994) - "DSDV: Highly Dynamic Destination-Sequenced Distance-Vector Routing"</li>
                <li>Abolhasan et al. (2004) - "A review of routing protocols for mobile ad hoc networks"</li>
                <li>Boukerche et al. (2011) - "Routing protocols in ad hoc networks: A survey"</li>
                <li>Mohseni et al. (2010) - "Comparative Review Study of Reactive and Proactive Routing Protocols"</li>
                <li>Jacquet et al. (2001) - "Optimized Link State Routing Protocol"</li>
                <li>Haas et al. (2002) - "Zone Routing Protocol for Ad-Hoc Networks"</li>
                <li>Marina & Das (2001) - "On-demand Multipath Distance Vector Routing in Ad Hoc Networks"</li>
                <li>Broch et al. (1998) - "Performance Comparison of Multi-Hop Wireless Ad Hoc Network Routing Protocols"</li>
                <li>Das et al. (2000) - "Simulation-based performance evaluation of routing protocols for MANETs"</li>
                <li>Royer & Toh (1999) - "A Review of Current Routing Protocols for Ad Hoc Mobile Wireless Networks"</li>
                <li>Lee et al. (2000) - "AODV-BR: Backup Routing in Ad hoc Networks"</li>
                <li>Hu & Johnson (2000) - "Caching Strategies in On-Demand Routing Protocols"</li>
                <li>Maleki et al. (2002) - "Distance Routing Effect Algorithm for Mobility"</li>
                <li>Boukerche (2004) - "Performance Evaluation of Routing Protocols for Ad Hoc Wireless Networks"</li>
                <li>Clausen & Jacquet (2003) - "Optimized Link State Routing Protocol" - RFC 3626</li>
                <li>Mittal & Kaur (2009) - "Performance Comparison of AODV, DSR and ZRP Routing Protocols"</li>
                <li>Kumar et al. (2012) - "Comparative Study of MANET Routing Protocols"</li>
                <li>Singh & Kumar (2015) - "A Survey on Routing Protocols for Wireless Sensor Networks"</li>
              </ol>
            </CardContent>
          </Card>

          {/* Problem Definition */}
          <Card>
            <CardHeader>
              <CardTitle>4. PROBLEM DEFINITION</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The challenge is to create an accessible, visual, and interactive platform for understanding and comparing MANET routing protocols. Traditional network simulators require extensive technical knowledge and provide limited visualization, making it difficult for researchers and students to grasp routing algorithm behavior. There is a need for a web-based solution that provides real-time visual feedback of routing decisions, enables easy comparison of multiple algorithms, offers intuitive parameter adjustment, generates meaningful performance metrics, and requires no installation or complex setup.
              </p>
            </CardContent>
          </Card>

          {/* Proposed System */}
          <Card>
            <CardHeader>
              <CardTitle>5. PROPOSED SYSTEM</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">5.1 Overview</h3>
                <p className="text-muted-foreground">
                  A React-based web application that simulates network routing algorithms with interactive visualization, real-time metrics calculation, and performance comparison capabilities. The system uses canvas-based rendering for smooth animations and provides comprehensive controls for simulation parameters.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">5.2 Block Diagram</h3>
                <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground font-mono">
                  User Interface Layer<br/>
                  ↓<br/>
                  Control Components (SimulationControls, FileTransfer)<br/>
                  ↓<br/>
                  Simulation Engine (State Management, Algorithm Logic)<br/>
                  ↓<br/>
                  Visualization Layer (NetworkTopology Canvas)<br/>
                  ↓<br/>
                  Metrics Calculator (PerformanceMetrics)<br/>
                  ↓<br/>
                  Data Export (CSV Generation)
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">5.3 System Architecture</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Frontend Layer: React components with TypeScript</li>
                  <li>State Management: React hooks (useState, useEffect)</li>
                  <li>Visualization Engine: HTML5 Canvas API</li>
                  <li>Routing Algorithms: BFS-based path finding with algorithm-specific logic</li>
                  <li>Data Layer: In-memory state with network graph structure</li>
                  <li>Export Module: JSZip for CSV generation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Methodology */}
          <Card>
            <CardHeader>
              <CardTitle>6. METHODOLOGY</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">6.1 Proposed Algorithms</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>AODV (Reactive):</strong></p>
                  <ul className="list-disc list-inside ml-4">
                    <li>On-demand route discovery</li>
                    <li>Route maintenance through RERR messages</li>
                    <li>Sequence numbers for loop prevention</li>
                  </ul>
                  <p><strong>DSDV (Proactive):</strong></p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Table-driven routing</li>
                    <li>Periodic route updates</li>
                    <li>Destination sequence numbers</li>
                  </ul>
                  <p><strong>DSR (Reactive):</strong></p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Source routing approach</li>
                    <li>Route caching mechanism</li>
                    <li>Route discovery via RREQ/RREP</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">6.2 Technology Used</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>React 18.3.1: Component-based UI framework</li>
                  <li>TypeScript: Type-safe development</li>
                  <li>Tailwind CSS: Utility-first styling</li>
                  <li>Vite: Build tool and dev server</li>
                  <li>Canvas API: Network visualization</li>
                  <li>Lucide React: Icon library</li>
                  <li>JSZip: File export functionality</li>
                  <li>Recharts: Performance charting</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* System Design */}
          <Card>
            <CardHeader>
              <CardTitle>7. SYSTEM DESIGN</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">7.1 Use Case Diagram</h3>
                <p className="text-muted-foreground mb-4">
                  The following diagram illustrates the main interactions between users and the system:
                </p>
                <div className="bg-muted p-6 rounded-lg border-2 border-primary/20">
                  <div className="space-y-4 text-sm font-mono">
                    <div className="text-center mb-6">
                      <div className="inline-block bg-primary/10 px-4 py-2 rounded-full">
                        <span className="font-bold">👤 User/Researcher</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="bg-background p-3 rounded border border-primary/30">
                        <div className="font-bold text-primary mb-2">Network Configuration</div>
                        <div className="text-xs space-y-1">
                          <div>→ Configure Topology</div>
                          <div>→ Set Node Count</div>
                          <div>→ Adjust Connection Range</div>
                        </div>
                      </div>
                      
                      <div className="bg-background p-3 rounded border border-primary/30">
                        <div className="font-bold text-primary mb-2">Protocol Selection</div>
                        <div className="text-xs space-y-1">
                          <div>→ Select AODV</div>
                          <div>→ Select DSDV</div>
                          <div>→ Select DSR</div>
                        </div>
                      </div>
                      
                      <div className="bg-background p-3 rounded border border-primary/30">
                        <div className="font-bold text-primary mb-2">Simulation Control</div>
                        <div className="text-xs space-y-1">
                          <div>→ Start Simulation</div>
                          <div>→ Pause/Resume</div>
                          <div>→ Reset Simulation</div>
                        </div>
                      </div>
                      
                      <div className="bg-background p-3 rounded border border-primary/30">
                        <div className="font-bold text-primary mb-2">Performance Analysis</div>
                        <div className="text-xs space-y-1">
                          <div>→ View Real-time Metrics</div>
                          <div>→ Compare Protocols</div>
                          <div>→ Generate Reports</div>
                        </div>
                      </div>
                      
                      <div className="bg-background p-3 rounded border border-primary/30">
                        <div className="font-bold text-primary mb-2">Visualization</div>
                        <div className="text-xs space-y-1">
                          <div>→ View Network Graph</div>
                          <div>→ Track Packet Flow</div>
                          <div>→ Monitor Connections</div>
                        </div>
                      </div>
                      
                      <div className="bg-background p-3 rounded border border-primary/30">
                        <div className="font-bold text-primary mb-2">Data Export</div>
                        <div className="text-xs space-y-1">
                          <div>→ Export CSV Data</div>
                          <div>→ Generate PDF Report</div>
                          <div>→ Transfer Files</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p><strong>Primary Actors:</strong> Students, Researchers, Network Engineers</p>
                  <p><strong>Key Use Cases:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Configure Network: Set node count, connection range, topology parameters</li>
                    <li>Select Protocol: Choose between AODV, DSDV, or DSR routing algorithms</li>
                    <li>Run Simulation: Execute real-time packet routing visualization</li>
                    <li>Monitor Metrics: Track PDR, throughput, delay, and routing overhead</li>
                    <li>Compare Performance: Analyze differences between routing protocols</li>
                    <li>Export Data: Download simulation results in CSV or PDF format</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hardware and Software */}
          <Card>
            <CardHeader>
              <CardTitle>8. HARDWARE AND SOFTWARE REQUIREMENTS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Hardware Requirements</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Processor: Intel Core i3 or equivalent</li>
                  <li>RAM: 4GB minimum (8GB recommended)</li>
                  <li>Storage: 500MB free space</li>
                  <li>Display: 1366x768 minimum resolution</li>
                  <li>Network: Internet connection for initial setup</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Software Requirements</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Operating System: Windows 10/11, macOS, or Linux</li>
                  <li>Web Browser: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+</li>
                  <li>Node.js: v18.0.0 or higher</li>
                  <li>NPM/Bun: Package manager</li>
                  <li>VS Code: Recommended IDE</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Applications */}
          <Card>
            <CardHeader>
              <CardTitle>9. APPLICATIONS</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Educational: Teaching network routing concepts in computer networks courses</li>
                <li>Research: Protocol performance analysis and comparison</li>
                <li>Development: Testing routing algorithm improvements</li>
                <li>Demonstration: Visualizing network behavior for presentations</li>
                <li>Training: Network administrator certification preparation</li>
                <li>Analysis: Understanding MANET protocol characteristics</li>
                <li>Prototyping: Rapid testing of routing strategies</li>
              </ul>
            </CardContent>
          </Card>

          {/* Result Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>11. RESULT ANALYSIS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Key Metrics Evaluated</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Packet Delivery Ratio: Percentage of successfully delivered packets</li>
                  <li>Average Delay: Mean time for packet delivery</li>
                  <li>Routing Overhead: Control message count vs data packets</li>
                  <li>Throughput: Data transmission rate</li>
                  <li>Network Load: Resource utilization</li>
                  <li>Path Length: Hop count for packet delivery</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Expected Results</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>AODV: Lower overhead for sparse traffic, efficient route discovery</li>
                  <li>DSDV: Predictable performance, higher overhead in dynamic networks</li>
                  <li>DSR: Good for static topologies, cache benefits</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Conclusion */}
          <Card>
            <CardHeader>
              <CardTitle>12. CONCLUSION</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This project successfully implements a comprehensive network routing simulation platform that addresses the limitations of traditional simulators. The web-based approach provides accessibility, while the visual interface enhances understanding of complex routing behaviors. The system demonstrates that AODV performs well in dynamic scenarios, DSDV suits stable networks with consistent traffic, and DSR benefits from route caching in moderately dynamic environments. The platform serves as an effective educational and research tool for MANET protocol analysis.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
