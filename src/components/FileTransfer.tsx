import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { NetworkNode, AlgorithmComparison } from '@/types/network';
import { Upload, FileText, Play, BarChart3 } from 'lucide-react';

interface FileTransferProps {
  nodes: NetworkNode[];
  onFileTransfer: (file: File, sourceNodeId: string, destinationNodeId: string) => Promise<AlgorithmComparison[]>;
}

export const FileTransfer = ({ nodes, onFileTransfer }: FileTransferProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sourceNode, setSourceNode] = useState<string>('');
  const [destinationNode, setDestinationNode] = useState<string>('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);
  const [comparisons, setComparisons] = useState<AlgorithmComparison[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Limit file size to 10MB for demo
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  }, []);

  const handleStartTransfer = useCallback(async () => {
    if (!selectedFile || !sourceNode || !destinationNode || sourceNode === destinationNode) {
      alert('Please select a file, source node, and different destination node');
      return;
    }

    setIsTransferring(true);
    setTransferProgress(0);
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setTransferProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const results = await onFileTransfer(selectedFile, sourceNode, destinationNode);
      
      clearInterval(progressInterval);
      setTransferProgress(100);
      setComparisons(results);
      
      // Reset after showing results
      setTimeout(() => {
        setTransferProgress(0);
        setIsTransferring(false);
      }, 2000);
      
    } catch (error) {
      console.error('File transfer failed:', error);
      setIsTransferring(false);
      setTransferProgress(0);
    }
  }, [selectedFile, sourceNode, destinationNode, onFileTransfer]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const activeNodes = nodes.filter(node => node.isActive);

  return (
    <Card className="p-6 bg-gradient-card border-border shadow-card">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">File Transfer</h3>
            <p className="text-sm text-muted-foreground">
              Upload and transfer files across routing algorithms
            </p>
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Select File</Label>
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept="*/*"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="border-dashed border-primary/50 hover:bg-primary/5"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
            {selectedFile && (
              <div className="text-sm text-muted-foreground">
                <div className="font-medium">{selectedFile.name}</div>
                <div>{formatFileSize(selectedFile.size)}</div>
              </div>
            )}
          </div>
        </div>

        {/* Node Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Source Node</Label>
            <Select value={sourceNode} onValueChange={setSourceNode}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                {activeNodes.map((node) => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Destination Node</Label>
            <Select value={destinationNode} onValueChange={setDestinationNode}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {activeNodes
                  .filter(node => node.id !== sourceNode)
                  .map((node) => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Transfer Progress */}
        {isTransferring && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Transfer Progress</Label>
            <Progress value={transferProgress} className="w-full" />
            <div className="text-sm text-muted-foreground text-center">
              {transferProgress}% - Testing all algorithms...
            </div>
          </div>
        )}

        {/* Start Transfer Button */}
        <Button
          onClick={handleStartTransfer}
          disabled={!selectedFile || !sourceNode || !destinationNode || sourceNode === destinationNode || isTransferring}
          className="w-full shadow-glow"
        >
          <Play className="h-4 w-4 mr-2" />
          {isTransferring ? 'Transferring...' : 'Start File Transfer'}
        </Button>

        {/* Algorithm Comparison Results */}
        {comparisons.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-success" />
              <Label className="text-sm font-medium">Algorithm Comparison Results</Label>
            </div>
            
            <div className="space-y-3">
              {comparisons.map((comparison, index) => (
                <div
                  key={comparison.algorithm}
                  className={`p-4 rounded-lg border ${
                    index === 0 
                      ? 'border-success bg-success/5' 
                      : 'border-border bg-muted/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-foreground">
                      {comparison.algorithm}
                      {index === 0 && (
                        <span className="ml-2 text-xs bg-success text-success-foreground px-2 py-1 rounded">
                          Best Performance
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {comparison.fileTransferTime.toFixed(1)}s
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className="text-muted-foreground">Delivery Ratio</div>
                      <div className="font-medium">{(comparison.packetDeliveryRatio * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Overhead</div>
                      <div className="font-medium">{(comparison.routingOverhead * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Path Length</div>
                      <div className="font-medium">{comparison.pathLength} hops</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};