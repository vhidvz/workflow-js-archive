import { FlowNode } from '../flow-node';

export enum TaskType {
  Send = 'send',
  User = 'user',
  Manual = 'manual',
  Script = 'script',
  Receive = 'receive',
  Service = 'service',
  Business = 'business',
}

export enum ActivityType {
  Sub = 'sub',
  Task = 'task',
  Call = 'call',
  Event = 'event',
  Transaction = 'transaction',
}

export class ActivityNode extends FlowNode {
  type: ActivityType = ActivityType.Task;

  taskType?: TaskType;

  constructor(data?: Partial<ActivityNode>) {
    super(data);
  }
}
