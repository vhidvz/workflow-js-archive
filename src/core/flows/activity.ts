import { Property, Sequence } from '../../core/base';
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

export class ActivityNode extends Property {
  default?: Element;
  incoming?: Sequence[];
  outgoing?: Sequence[];
  attachedToRef?: Element;

  type!: ActivityType;
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
