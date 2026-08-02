/**
 * GPU Resource Manager
 * Manages GPU allocation across different AI models and tasks
 */

import EventEmitter from 'events';

export interface GPUResourceAllocation {
  visionModel: number; // %
  navigationAI: number; // %
  driverMonitoring: number; // %
  llmAssistant: number; // %
  otherTasks: number; // %
}

export interface ComputeLoad {
  totalLoad: number; // %
  visionProcessing: number;
  neuralInference: number;
  dataProcessing: number;
  edgeGPU: number;
  cloudGPU: number;
}

export class GPUResourceManager extends EventEmitter {
  private resourceAllocation: GPUResourceAllocation;
  private computeLoad: ComputeLoad;
  private edgeGPUCapacity: number = 12; // GB (in-car GPU)
  private cloudGPUCapacity: number = 24; // GB (cloud processing)
  private currentEdgeGPUUsage: number = 0;
  private currentCloudGPUUsage: number = 0;

  constructor() {
    super();
    this.resourceAllocation = {
      visionModel: 42,
      navigationAI: 28,
      driverMonitoring: 12,
      llmAssistant: 12,
      otherTasks: 6,
    };

    this.computeLoad = {
      totalLoad: 68,
      visionProcessing: 42,
      neuralInference: 18,
      dataProcessing: 8,
      edgeGPU: 54,
      cloudGPU: 46,
    };
  }

  public balance(): void {
    // Dynamically balance GPU resources based on task priority
    this.updateComputeLoad();
    this.optimizeAllocation();
  }

  private updateComputeLoad(): void {
    // Simulate GPU load fluctuations
    this.computeLoad.totalLoad = Math.min(
      100,
      Math.max(40, this.computeLoad.totalLoad + (Math.random() - 0.5) * 5)
    );

    this.computeLoad.visionProcessing = Math.min(
      100,
      Math.max(30, this.computeLoad.visionProcessing + (Math.random() - 0.5) * 3)
    );

    this.computeLoad.neuralInference = Math.min(
      100,
      Math.max(10, this.computeLoad.neuralInference + (Math.random() - 0.5) * 4)
    );

    this.currentEdgeGPUUsage = (this.computeLoad.edgeGPU / 100) * this.edgeGPUCapacity;
    this.currentCloudGPUUsage = (this.computeLoad.cloudGPU / 100) * this.cloudGPUCapacity;
  }

  private optimizeAllocation(): void {
    // Adjust resource allocation based on driving conditions
    const allocationAdjustments = {
      visionModel: this.computeLoad.visionProcessing > 80 ? -2 : 0,
      navigationAI: this.computeLoad.neuralInference > 75 ? 2 : 0,
    };

    this.resourceAllocation.visionModel = Math.max(
      30,
      this.resourceAllocation.visionModel + allocationAdjustments.visionModel
    );
    this.resourceAllocation.navigationAI = Math.min(
      35,
      this.resourceAllocation.navigationAI + allocationAdjustments.navigationAI
    );
  }

  public getLoad(): ComputeLoad {
    return { ...this.computeLoad };
  }

  public getAllocation(): GPUResourceAllocation {
    return { ...this.resourceAllocation };
  }

  public setAllocation(allocation: Partial<GPUResourceAllocation>): void {
    this.resourceAllocation = { ...this.resourceAllocation, ...allocation };
    this.emit('allocation-changed', this.resourceAllocation);
  }

  public getEdgeGPUStatus(): {
    used: number;
    available: number;
    capacity: number;
    utilization: number;
  } {
    return {
      used: this.currentEdgeGPUUsage,
      available: this.edgeGPUCapacity - this.currentEdgeGPUUsage,
      capacity: this.edgeGPUCapacity,
      utilization: (this.currentEdgeGPUUsage / this.edgeGPUCapacity) * 100,
    };
  }

  public getCloudGPUStatus(): {
    used: number;
    available: number;
    capacity: number;
    utilization: number;
    latency: number;
  } {
    return {
      used: this.currentCloudGPUUsage,
      available: this.cloudGPUCapacity - this.currentCloudGPUUsage,
      capacity: this.cloudGPUCapacity,
      utilization: (this.currentCloudGPUUsage / this.cloudGPUCapacity) * 100,
      latency: Math.random() * 50 + 20, // 20-70ms
    };
  }

  public allocateForTask(
    taskName: string,
    requiredGPU: number
  ): { allocated: boolean; gpuSource: 'edge' | 'cloud' | 'hybrid' } {
    if (this.currentEdgeGPUUsage + requiredGPU <= this.edgeGPUCapacity) {
      this.currentEdgeGPUUsage += requiredGPU;
      return { allocated: true, gpuSource: 'edge' };
    } else if (
      this.currentEdgeGPUUsage + this.currentCloudGPUUsage + requiredGPU <=
      this.edgeGPUCapacity + this.cloudGPUCapacity
    ) {
      this.currentCloudGPUUsage += requiredGPU;
      return { allocated: true, gpuSource: 'cloud' };
    } else {
      return { allocated: false, gpuSource: 'edge' };
    }
  }

  public getSystemHealth(): { efficiency: number; throttling: boolean; temperature: number } {
    const efficiency = Math.max(0, 100 - this.computeLoad.totalLoad);
    const throttling = this.computeLoad.totalLoad > 95;
    const temperature = 45 + (this.computeLoad.totalLoad / 100) * 35; // 45-80°C

    return { efficiency, throttling, temperature };
  }
}
