import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SimulationMetrics } from '@/types/network';
import { Activity, Zap, Network, Clock, Cpu, Link } from 'lucide-react';

interface PerformanceMetricsProps {
  metrics: SimulationMetrics;
  algorithmName: string;
}

export const PerformanceMetrics = ({ metrics, algorithmName }: PerformanceMetricsProps) => {
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;
  const formatDelay = (value: number) => `${value.toFixed(2)}ms`;
  const formatThroughput = (value: number) => `${value.toFixed(1)} Mbps`;

  const metricCards = [
    {
      title: 'Packet Delivery Ratio',
      value: formatPercentage(metrics.packetDeliveryRatio),
      progress: metrics.packetDeliveryRatio * 100,
      icon: Activity,
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Successfully delivered packets'
    },
    {
      title: 'Average Delay',
      value: formatDelay(metrics.averageDelay),
      progress: Math.max(0, 100 - (metrics.averageDelay / 50 * 100)),
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'End-to-end packet delay'
    },
    {
      title: 'Throughput',
      value: formatThroughput(metrics.throughput),
      progress: (metrics.throughput / 100) * 100,
      icon: Zap,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Data transmission rate'
    },
    {
      title: 'Routing Overhead',
      value: formatPercentage(metrics.routingOverhead),
      progress: Math.max(0, 100 - (metrics.routingOverhead * 100)),
      icon: Cpu,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      description: 'Control packet overhead'
    },
    {
      title: 'Network Load',
      value: formatPercentage(metrics.networkLoad),
      progress: metrics.networkLoad * 100,
      icon: Network,
      color: 'text-foreground',
      bgColor: 'bg-muted/50',
      description: 'Current network utilization'
    },
    {
      title: 'Active Connections',
      value: metrics.activeConnections.toString(),
      progress: (metrics.activeConnections / 20) * 100,
      icon: Link,
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Established network paths'
    }
  ];

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-card border-border shadow-card">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Performance Metrics</h3>
          <p className="text-sm text-muted-foreground">
            Real-time analysis for {algorithmName} algorithm
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {metricCards.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div 
                key={metric.title}
                className="p-4 rounded-lg border border-border bg-gradient-to-br from-card to-card/80 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                  <span className="text-xl font-bold text-foreground">
                    {metric.value}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">
                      {metric.title}
                    </span>
                  </div>
                  
                  <Progress 
                    value={metric.progress} 
                    className="h-2"
                  />
                  
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-4 bg-gradient-card border-border shadow-card">
        <h4 className="font-semibold text-foreground mb-3">Algorithm Performance</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded border border-border/50 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="text-lg font-bold text-primary">
              {formatPercentage(metrics.packetDeliveryRatio)}
            </div>
            <div className="text-xs text-muted-foreground">Reliability</div>
          </div>
          <div className="p-3 rounded border border-border/50 bg-gradient-to-br from-success/10 to-transparent">
            <div className="text-lg font-bold text-success">
              {formatDelay(metrics.averageDelay)}
            </div>
            <div className="text-xs text-muted-foreground">Latency</div>
          </div>
          <div className="p-3 rounded border border-border/50 bg-gradient-to-br from-warning/10 to-transparent">
            <div className="text-lg font-bold text-warning">
              {formatThroughput(metrics.throughput)}
            </div>
            <div className="text-xs text-muted-foreground">Speed</div>
          </div>
        </div>
      </Card>
    </div>
  );
};