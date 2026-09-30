import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { NetworkNode, NetworkConnection, Packet } from '@/types/network';

interface NetworkTopologyProps {
  nodes: NetworkNode[];
  connections: NetworkConnection[];
  packets: Packet[];
  isSimulationRunning: boolean;
}

export const NetworkTopology = ({ 
  nodes, 
  connections, 
  packets, 
  isSimulationRunning 
}: NetworkTopologyProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first (behind nodes)
      connections.forEach(connection => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);
        
        if (fromNode && toNode) {
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          
          if (connection.isActive) {
            ctx.strokeStyle = '#22c55e'; // success color
            ctx.lineWidth = 3;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#22c55e';
          } else {
            ctx.strokeStyle = '#64748b'; // muted color
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
          }
          
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Draw bandwidth indicator
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          
          ctx.fillStyle = connection.isActive ? '#22c55e' : '#64748b';
          ctx.font = '10px monospace';
          ctx.fillText(`${connection.bandwidth}Mbps`, midX + 5, midY - 5);
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        
        if (node.isActive) {
          ctx.fillStyle = '#0ea5e9'; // primary color
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#0ea5e9';
        } else {
          ctx.fillStyle = '#64748b'; // muted color
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw node border
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        ctx.strokeStyle = node.isActive ? '#38bdf8' : '#94a3b8';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw node label
        ctx.fillStyle = '#f1f5f9';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + 4);

        // Draw packet count
        ctx.font = '8px monospace';
        ctx.fillText(`${node.packetsSent}/${node.packetsReceived}`, node.x, node.y + 35);
      });

      // Draw animated packets in transit with enhanced visibility
      packets.forEach((packet, index) => {
        if (packet.status === 'routing' && packet.path.length > 1) {
          const currentNodeIndex = packet.path.indexOf(packet.currentNode);
          const nextNodeIndex = currentNodeIndex + 1;
          
          if (nextNodeIndex < packet.path.length) {
            const currentNode = nodes.find(n => n.id === packet.path[currentNodeIndex]);
            const nextNode = nodes.find(n => n.id === packet.path[nextNodeIndex]);
            
            if (currentNode && nextNode) {
              // Smooth continuous animation with easing
              const animationSpeed = 2000 + (index * 300); // Slower, more staggered
              const rawProgress = ((Date.now() + index * 800) % animationSpeed) / animationSpeed;
              
              // Smooth easing function for natural movement
              const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
              const progress = easeInOutCubic(rawProgress);
              
              const x = currentNode.x + (nextNode.x - currentNode.x) * progress;
              const y = currentNode.y + (nextNode.y - currentNode.y) * progress;
              
              // Enhanced glow effect with pulsing
              const pulseIntensity = 0.7 + 0.3 * Math.sin(Date.now() * 0.008 + index);
              const glowRadius = 12 + 8 * pulseIntensity;
              
              // Outer glow
              ctx.beginPath();
              ctx.arc(x, y, glowRadius, 0, 2 * Math.PI);
              ctx.fillStyle = `rgba(250, 204, 21, ${0.3 * pulseIntensity})`;
              ctx.shadowBlur = 25;
              ctx.shadowColor = '#facc15';
              ctx.fill();
              ctx.shadowBlur = 0;
              
              // Main packet body
              ctx.beginPath();
              ctx.arc(x, y, 10, 0, 2 * Math.PI);
              ctx.fillStyle = '#facc15';
              ctx.shadowBlur = 20;
              ctx.shadowColor = '#facc15';
              ctx.fill();
              ctx.shadowBlur = 0;
              
              // Inner highlight
              ctx.beginPath();
              ctx.arc(x - 2, y - 2, 4, 0, 2 * Math.PI);
              ctx.fillStyle = '#fde047';
              ctx.fill();
              
              // Packet border with animation
              ctx.beginPath();
              ctx.arc(x, y, 10, 0, 2 * Math.PI);
              ctx.strokeStyle = '#f59e0b';
              ctx.lineWidth = 2 + pulseIntensity;
              ctx.stroke();
              
              // Draw packet ID with better visibility
              ctx.fillStyle = '#0f172a';
              ctx.font = 'bold 8px monospace';
              ctx.textAlign = 'center';
              ctx.fillText(packet.id.slice(-2), x, y + 2);
              
              // Trail effect
              for (let i = 1; i <= 3; i++) {
                const trailProgress = Math.max(0, progress - i * 0.15);
                if (trailProgress > 0) {
                  const trailX = currentNode.x + (nextNode.x - currentNode.x) * trailProgress;
                  const trailY = currentNode.y + (nextNode.y - currentNode.y) * trailProgress;
                  const trailAlpha = 0.3 - (i * 0.1);
                  
                  ctx.beginPath();
                  ctx.arc(trailX, trailY, 6 - i, 0, 2 * Math.PI);
                  ctx.fillStyle = `rgba(250, 204, 21, ${trailAlpha})`;
                  ctx.fill();
                }
              }
            }
          }
        }
      });

      ctx.textAlign = 'left'; // Reset text align
      
      // Continue animation if simulation is running
      if (isSimulationRunning) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Start animation
    if (isSimulationRunning) {
      animate();
    } else {
      // Draw static state when not running
      animate();
    }

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [nodes, connections, packets, isSimulationRunning]);

  return (
    <Card className="p-6 bg-gradient-card border-border shadow-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Network Topology</h3>
        <p className="text-sm text-muted-foreground">
          Real-time visualization of routing paths and packet flow
        </p>
      </div>
      
      <div className="relative bg-gradient-network rounded-lg p-4 border border-border">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="w-full h-auto rounded border border-border/50"
          style={{ background: 'linear-gradient(145deg, hsl(210 25% 8%), hsl(210 20% 12%))' }}
        />
        
        <div className="absolute top-2 right-2 flex gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary shadow-glow"></div>
            <span>Active Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span>Active Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span>Packet</span>
          </div>
        </div>
      </div>
    </Card>
  );
};