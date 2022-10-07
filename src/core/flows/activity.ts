import { FlowNode, NodeProperty } from '../flow-node';
import { BPMNActivity } from '../../type';

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
  Task = 'task',
  SubProcess = 'subProcess',
  Transaction = 'transaction',
  CallActivity = 'callActivity',
}

export interface ActivityInfo {
  type: ActivityType;
  taskType?: TaskType;
}

export class ActivityNode extends NodeProperty implements ActivityInfo {
  type: ActivityType = ActivityType.Task;

  taskType?: TaskType;

  constructor(data?: Partial<ActivityNode>) {
    super(data);
  }

  static build(el: BPMNActivity, info: ActivityInfo) {
    return new ActivityNode({
      ...FlowNode.build(el),
      ...info,
    });
  }
}
