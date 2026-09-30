import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RoutingAlgorithm } from '@/types/network';
import { Play, Pause, RotateCcw, Settings, Zap, Network, Download } from 'lucide-react';

interface SimulationControlsProps {
  isRunning: boolean;
  selectedAlgorithm: RoutingAlgorithm;
  algorithms: RoutingAlgorithm[];
  simulationSpeed: number;
  packetGenerationRate: number;
  networkSize: number;
  packetCount: number;
  onStartStop: () => void;
  onReset: () => void;
  onAlgorithmChange: (algorithmName: string) => void;
  onSpeedChange: (speed: number) => void;
  onPacketRateChange: (rate: number) => void;
  onNetworkSizeChange: (size: number) => void;
  onPacketCountChange: (count: number) => void;
  onSendPackets: () => void;
  onExportZip: () => void;
  autoGenerate: boolean;
  onAutoGenerateChange: (enabled: boolean) => void;
}

export const SimulationControls = ({
  isRunning,
  selectedAlgorithm,
  algorithms,
  simulationSpeed,
  packetGenerationRate,
  networkSize,
  packetCount,
  onStartStop,
  onReset,
  onAlgorithmChange,
  onSpeedChange,
  onPacketRateChange,
  onNetworkSizeChange,
  onPacketCountChange,
  onSendPackets,
  onExportZip,
  autoGenerate,
  onAutoGenerateChange,
}: SimulationControlsProps) => {
  return (
    <Card className="p-6 bg-gradient-card border-border shadow-card">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Simulation Controls</h3>
            <p className="text-sm text-muted-foreground">
              Configure and control the network simulation
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onStartStop}
              variant={isRunning ? "destructive" : "default"}
              size="sm"
              className="shadow-glow"
            >
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </>
              )}
            </Button>
            <Button onClick={onReset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={onExportZip} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Algorithm Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-primary" />
            <Label className="text-sm font-medium">Routing Algorithm</Label>
          </div>
          <Select value={selectedAlgorithm.name} onValueChange={onAlgorithmChange}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {algorithms.map((algorithm) => (
                <SelectItem key={algorithm.name} value={algorithm.name}>
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{algorithm.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {algorithm.isProactive ? 'Proactive' : 'Reactive'}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {selectedAlgorithm.description}
          </p>
        </div>

        {/* Simulation Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Simulation Speed */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-warning" />
              <Label className="text-sm font-medium">
                Simulation Speed: {simulationSpeed}x
              </Label>
            </div>
            <Slider
              value={[simulationSpeed]}
              onValueChange={(value) => onSpeedChange(value[0])}
              max={5}
              min={0.5}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Packet Generation Rate */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Packet Rate: {packetGenerationRate}/sec
            </Label>
            <Slider
              value={[packetGenerationRate]}
              onValueChange={(value) => onPacketRateChange(value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Network Size */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Network Size: {networkSize} nodes
            </Label>
            <Slider
              value={[networkSize]}
              onValueChange={(value) => onNetworkSizeChange(value[0])}
              max={20}
              min={5}
              step={1}
              className="w-full"
            />
          </div>

          {/* Auto Generate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Auto Generate Packets</Label>
              <Switch
                checked={autoGenerate}
                onCheckedChange={onAutoGenerateChange}
              />
            </div>
          </div>
        </div>

        {/* Manual Packet Generation */}
        <div className="p-4 border border-border/50 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Manual Packet Generation</Label>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label className="text-sm font-medium mb-2 block">
                  Send {packetCount} packets
                </Label>
                <Slider
                  value={[packetCount]}
                  onValueChange={(value) => onPacketCountChange(value[0])}
                  max={20}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <Button 
                onClick={onSendPackets}
                variant="outline"
                size="sm"
                className="shadow-glow border-primary/50 hover:bg-primary/10"
              >
                Send Packets
              </Button>
            </div>
          </div>
        </div>

        {/* Algorithm Comparison */}
        <div className="p-4 border border-border/50 rounded-lg bg-gradient-to-br from-muted/30 to-transparent">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="h-4 w-4 text-accent" />
            <h4 className="text-sm font-semibold text-foreground">Algorithm Characteristics</h4>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-muted-foreground">Type: </span>
              <span className="text-foreground font-medium">
                {selectedAlgorithm.isProactive ? 'Proactive' : 'Reactive'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Protocol: </span>
              <span className="text-foreground font-medium">
                {selectedAlgorithm.type}
              </span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border/30">
            <div className="text-xs space-y-1">
              {selectedAlgorithm.type === 'AODV' && (
                <div className="text-muted-foreground">
                  • On-demand route discovery • Loop-free paths • Sequence numbers
                </div>
              )}
              {selectedAlgorithm.type === 'DSDV' && (
                <div className="text-muted-foreground">
                  • Table-driven • Periodic updates • Destination sequencing
                </div>
              )}
              {selectedAlgorithm.type === 'DSR' && (
                <div className="text-muted-foreground">
                  • Source routing • Route caching • No periodic messages
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};