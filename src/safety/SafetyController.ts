/**
 * Safety Controller
 * Monitors safety conditions and makes autonomous emergency decisions
 */

import EventEmitter from 'events';

export enum SafetyLevel {
  SAFE = 'Safe',
  CAUTION = 'Caution',
  WARNING = 'Warning',
  CRITICAL = 'Critical',
  EMERGENCY = 'Emergency',
}

export interface HazardDetection {
  type: string;
  level: SafetyLevel;
  distance: number;
  confidence: number;
  recommendedAction: string;
}

export interface SafetyMetrics {
  safetyLevel: SafetyLevel;
  collision_avoidance: number; // percentage
  emergency_braking: boolean;
  lane_keeping: boolean;
  obstacle_ahead: number; // distance in meters
  traffic_awareness: boolean;
}

export class SafetyController extends EventEmitter {
  private safetyLevel: SafetyLevel = SafetyLevel.SAFE;
  private detectedHazards: HazardDetection[] = [];
  private emergencyMode: boolean = false;
  private safetyMetrics: SafetyMetrics;

  constructor() {
    super();
    this.safetyMetrics = {
      safetyLevel: SafetyLevel.SAFE,
      collision_avoidance: 95,
      emergency_braking: false,
      lane_keeping: true,
      obstacle_ahead: 150,
      traffic_awareness: true,
    };
  }

  public evaluate(): void {
    // Simulate hazard detection
    this.scanForHazards();
    this.updateSafetyLevel();
    this.checkEmergencyConditions();
  }

  private scanForHazards(): void {
    // Simulate LIDAR and camera-based hazard detection
    const hazardSimulation = Math.random();

    if (hazardSimulation > 0.85) {
      const hazard: HazardDetection = {
        type: 'Obstacle',
        level: SafetyLevel.WARNING,
        distance: Math.random() * 50 + 10,
        confidence: 0.92,
        recommendedAction: 'Slow down and change lanes if safe',
      };
      this.detectedHazards.push(hazard);
      this.emit('hazard-detected', hazard);
    } else if (hazardSimulation > 0.95) {
      const hazard: HazardDetection = {
        type: 'Emergency Vehicle',
        level: SafetyLevel.CRITICAL,
        distance: Math.random() * 100,
        confidence: 0.98,
        recommendedAction: 'Make way for emergency vehicle',
      };
      this.detectedHazards.push(hazard);
      this.emit('hazard-detected', hazard);
    }
  }

  private updateSafetyLevel(): void {
    if (this.detectedHazards.length === 0) {
      this.safetyLevel = SafetyLevel.SAFE;
    } else {
      const maxHazardLevel = this.detectedHazards.reduce(
        (max, hazard) => {
          const levels = [
            SafetyLevel.SAFE,
            SafetyLevel.CAUTION,
            SafetyLevel.WARNING,
            SafetyLevel.CRITICAL,
            SafetyLevel.EMERGENCY,
          ];
          return Math.max(max, levels.indexOf(hazard.level));
        },
        0
      );

      const levelMap = [
        SafetyLevel.SAFE,
        SafetyLevel.CAUTION,
        SafetyLevel.WARNING,
        SafetyLevel.CRITICAL,
        SafetyLevel.EMERGENCY,
      ];
      this.safetyLevel = levelMap[maxHazardLevel];
    }

    this.safetyMetrics.safetyLevel = this.safetyLevel;
  }

  private checkEmergencyConditions(): void {
    const criticalHazards = this.detectedHazards.filter(
      (h) => h.level === SafetyLevel.CRITICAL || h.level === SafetyLevel.EMERGENCY
    );

    if (criticalHazards.length > 0) {
      this.activateEmergencyMode();
    } else if (this.emergencyMode) {
      this.deactivateEmergencyMode();
    }
  }

  private activateEmergencyMode(): void {
    if (!this.emergencyMode) {
      this.emergencyMode = true;
      this.safetyMetrics.emergency_braking = true;
      console.log('🚨 EMERGENCY MODE ACTIVATED');
      this.emit('emergency-activated');
    }
  }

  private deactivateEmergencyMode(): void {
    if (this.emergencyMode) {
      this.emergencyMode = false;
      this.safetyMetrics.emergency_braking = false;
      console.log('✅ Emergency mode deactivated');
      this.emit('emergency-deactivated');
    }

    // Clear old hazards
    this.detectedHazards = this.detectedHazards.filter(
      (h) => h.level === SafetyLevel.CRITICAL || h.level === SafetyLevel.EMERGENCY
    );
  }

  public getSafetyLevel(): SafetyLevel {
    return this.safetyLevel;
  }

  public getMetrics(): SafetyMetrics {
    return { ...this.safetyMetrics };
  }

  public getDetectedHazards(): HazardDetection[] {
    return [...this.detectedHazards];
  }

  public activateLaneKeeping(enabled: boolean): void {
    this.safetyMetrics.lane_keeping = enabled;
  }

  public activateCollisionAvoidance(): void {
    this.safetyMetrics.collision_avoidance = 98;
    this.emit('collision-avoidance-active');
  }

  public performEmergencyBrake(): void {
    console.log('🛑 Emergency brake applied!');
    this.safetyMetrics.emergency_braking = true;
    this.emit('emergency-brake-applied');
  }

  public isInEmergencyMode(): boolean {
    return this.emergencyMode;
  }
}
