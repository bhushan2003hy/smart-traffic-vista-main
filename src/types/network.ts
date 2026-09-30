export interface NetworkNode {
  id: string;
  name: string;
  x: number;
  y: number;
  isActive: boolean;
  packetsSent: number;
  packetsReceived: number;
  neighbors: string[];
}

export interface NetworkConnection {
  id: string;
  from: string;
  to: string;
  isActive: boolean;
  delay: number;
  bandwidth: number;
  reliability: number;
}

export interface Packet {
  id: string;
  source: string;
  destination: string;
  currentNode: string;
  path: string[];
  timestamp: number;
  status: 'routing' | 'delivered' | 'failed';
  file?: FileTransfer;
}

export interface FileTransfer {
  name: string;
  size: number;
  type: string;
  data: string; // base64 encoded
  transferStartTime: number;
  algorithm: string;
}

export interface RoutingAlgorithm {
  name: string;
  type: 'AODV' | 'DSDV' | 'DSR';
  description: string;
  isProactive: boolean;
}

export interface SimulationMetrics {
  packetDeliveryRatio: number;
  averageDelay: number;
  routingOverhead: number;
  throughput: number;
  networkLoad: number;
  activeConnections: number;
}

export interface AlgorithmComparison {
  algorithm: string;
  fileTransferTime: number;
  packetDeliveryRatio: number;
  routingOverhead: number;
  pathLength: number;
}

export interface SimulationState {
  isRunning: boolean;
  currentTime: number;
  selectedAlgorithm: RoutingAlgorithm;
  nodes: NetworkNode[];
  connections: NetworkConnection[];
  packets: Packet[];
  metrics: SimulationMetrics;
}