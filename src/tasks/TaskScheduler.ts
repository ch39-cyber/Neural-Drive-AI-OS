/**
 * Task Scheduler
 * Manages background tasks with priority queuing and resource allocation
 */

import EventEmitter from 'events';

export interface ScheduledTask {
  id: string;
  name: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'pending' | 'running' | 'completed' | 'paused' | 'failed';
  callback: () => Promise<void> | void;
  estimatedDuration: number; // ms
  lastRun?: number;
  nextRun?: number;
}

export class TaskScheduler extends EventEmitter {
  private taskQueue: ScheduledTask[] = [];
  private runningTasks: Map<string, NodeJS.Timeout> = new Map();
  private completedTasks: ScheduledTask[] = [];
  private maxConcurrentTasks: number = 5;

  constructor() {
    super();
    this.setupDefaultTasks();
  }

  private setupDefaultTasks(): void {
    this.addTask({
      id: 'collision-detection',
      name: 'Collision Detection',
      priority: 'CRITICAL',
      callback: () => this.collisionDetectionTask(),
      estimatedDuration: 50,
    });

    this.addTask({
      id: 'navigation-update',
      name: 'Navigation Update',
      priority: 'HIGH',
      callback: () => this.navigationUpdateTask(),
      estimatedDuration: 100,
    });

    this.addTask({
      id: 'telemetry-log',
      name: 'Telemetry Logging',
      priority: 'MEDIUM',
      callback: () => this.telemetryLoggingTask(),
      estimatedDuration: 50,
    });

    this.addTask({
      id: 'cloud-sync',
      name: 'Cloud Synchronization',
      priority: 'MEDIUM',
      callback: () => this.cloudSyncTask(),
      estimatedDuration: 200,
    });

    this.addTask({
      id: 'model-update',
      name: 'Model Update Check',
      priority: 'LOW',
      callback: () => this.modelUpdateTask(),
      estimatedDuration: 1000,
    });
  }

  public addTask(task: Omit<ScheduledTask, 'status'>): void {
    const newTask: ScheduledTask = {
      ...task,
      status: 'pending',
    };
    this.taskQueue.push(newTask);
    this.emit('task-added', newTask);
  }

  public process(): void {
    const runningCount = this.runningTasks.size;

    if (runningCount < this.maxConcurrentTasks) {
      const nextTask = this.selectNextTask();

      if (nextTask) {
        this.executeTask(nextTask);
      }
    }
  }

  private selectNextTask(): ScheduledTask | null {
    // Sort by priority: CRITICAL > HIGH > MEDIUM > LOW
    const priorityOrder = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
    const pendingTasks = this.taskQueue.filter((t) => t.status === 'pending');

    if (pendingTasks.length === 0) return null;

    pendingTasks.sort((a, b) => {
      return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    });

    return pendingTasks[0];
  }

  private executeTask(task: ScheduledTask): void {
    task.status = 'running';
    task.lastRun = Date.now();

    this.emit('task-started', task);

    const timeoutId = setTimeout(async () => {
      try {
        await Promise.resolve(task.callback());
        task.status = 'completed';
        this.completedTasks.push(task);
        this.emit('task-completed', task);
      } catch (error) {
        task.status = 'failed';
        this.emit('task-failed', { task, error });
      }

      this.runningTasks.delete(task.id);
      task.nextRun = Date.now() + 1000; // Reschedule after 1s
      task.status = 'pending';
    }, task.estimatedDuration);

    this.runningTasks.set(task.id, timeoutId);
  }

  private collisionDetectionTask(): void {
    // High-priority real-time collision detection
  }

  private navigationUpdateTask(): void {
    // Update navigation status
  }

  private telemetryLoggingTask(): void {
    // Log vehicle telemetry data
  }

  private cloudSyncTask(): void {
    // Sync data with cloud backend
  }

  private modelUpdateTask(): void {
    // Check for AI model updates
  }

  public getActiveTaskCount(): number {
    return this.runningTasks.size;
  }

  public getPendingTaskCount(): number {
    return this.taskQueue.filter((t) => t.status === 'pending').length;
  }

  public getAllTasks(): ScheduledTask[] {
    return [...this.taskQueue, ...this.completedTasks];
  }

  public getRunningTasks(): ScheduledTask[] {
    return this.taskQueue.filter((t) => t.status === 'running');
  }

  public pauseTask(taskId: string): void {
    const task = this.taskQueue.find((t) => t.id === taskId);
    if (task && task.status === 'running') {
      const timeoutId = this.runningTasks.get(taskId);
      if (timeoutId) clearTimeout(timeoutId);
      task.status = 'paused';
      this.emit('task-paused', task);
    }
  }

  public resumeTask(taskId: string): void {
    const task = this.taskQueue.find((t) => t.id === taskId);
    if (task && task.status === 'paused') {
      task.status = 'pending';
      this.emit('task-resumed', task);
    }
  }

  public setMaxConcurrentTasks(max: number): void {
    this.maxConcurrentTasks = max;
  }

  public getTaskStats(): {
    total: number;
    running: number;
    pending: number;
    completed: number;
    failed: number;
  } {
    const running = this.taskQueue.filter((t) => t.status === 'running').length;
    const pending = this.taskQueue.filter((t) => t.status === 'pending').length;
    const completed = this.completedTasks.length;
    const failed = this.taskQueue.filter((t) => t.status === 'failed').length;

    return {
      total: this.taskQueue.length,
      running,
      pending,
      completed,
      failed,
    };
  }
}
