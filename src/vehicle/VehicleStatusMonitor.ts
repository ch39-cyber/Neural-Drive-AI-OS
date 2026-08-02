/**
 * Vehicle Status Monitor
 * Monitors and reports all vehicle telemetry in real-time
 */

import EventEmitter from 'events';

export interface VehicleStatus {
  speed: number; // km/h
  speedLimit: number; // km/h
  mode: 'D' | 'P' | 'R' | 'N' | 'AUTO';
  battery: number; // percentage
  range: number; // km
  temperature: number; // celsius
  tirePressure: number; // bar
  isCharging: boolean;
  chargingStations: number;
  cloudSync: number; // percentage
}

export class VehicleStatusMonitor extends EventEmitter {
  private status: VehicleStatus;
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.status = {
      speed: 78,
      speedLimit: 80,
      mode: 'D',
      battery: 67,
      range: 312,
      temperature: 24,
      tirePressure: 2.3,
      isCharging: false,
      chargingStations: 0,
      cloudSync: 0,
    };
  }

  public start(): void {
    this.updateInterval = setInterval(() => {
      this.update();
    }, 100);
  }

  public stop(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  public update(): void {
    const previousStatus = { ...this.status };

    // Simulate speed changes based on traffic
    const speedVariation = (Math.random() - 0.5) * 5;
    this.status.speed = Math.max(
      0,
      Math.min(120, this.status.speed + speedVariation)
    );

    // Simulate battery drain
    if (!this.status.isCharging) {
      this.status.battery = Math.max(0, this.status.battery - 0.001);
      this.status.range = Math.max(0, this.status.range - 0.001);
    }

    // Simulate temperature fluctuation
    this.status.temperature += (Math.random() - 0.5) * 0.1;

    // Check for significant changes
    if (this.hasSignificantChange(previousStatus)) {
      this.emit('status-change', this.status);
    }
  }

  private hasSignificantChange(previousStatus: VehicleStatus): boolean {
    return (
      Math.abs(previousStatus.speed - this.status.speed) > 1 ||
      Math.abs(previousStatus.battery - this.status.battery) > 0.1 ||
      previousStatus.mode !== this.status.mode
    );
  }

  public getStatus(): VehicleStatus {
    return { ...this.status };
  }

  public setMode(mode: 'D' | 'P' | 'R' | 'N' | 'AUTO'): void {
    this.status.mode = mode;
    this.emit('mode-changed', mode);
  }

  public setCharging(isCharging: boolean): void {
    this.status.isCharging = isCharging;
    if (isCharging) {
      this.simulateCharging();
    }
  }

  private simulateCharging(): void {
    const chargingInterval = setInterval(() => {
      if (this.status.isCharging && this.status.battery < 100) {
        this.status.battery += 0.5;
        this.status.range = (this.status.battery / 100) * 500; // Simulate range
      } else if (this.status.battery >= 100) {
        clearInterval(chargingInterval);
      }
    }, 100);
  }

  public findNearbyChargingStations(): number {
    // Simulate finding charging stations
    this.status.chargingStations = Math.floor(Math.random() * 5) + 1;
    return this.status.chargingStations;
  }

  public getDetailedTelemetry(): any {
    return {
      drivetrain: {
        speed: this.status.speed,
        speedLimit: this.status.speedLimit,
        mode: this.status.mode,
        acceleration: 0,
        brakeForce: 0,
      },
      electrical: {
        battery: this.status.battery,
        range: this.status.range,
        isCharging: this.status.isCharging,
      },
      thermal: {
        engineTemp: this.status.temperature,
        cabinTemp: 21.5,
        batteryTemp: 35,
      },
      safety: {
        tirePressure: this.status.tirePressure,
        absActive: false,
        espActive: false,
      },
    };
  }
}
