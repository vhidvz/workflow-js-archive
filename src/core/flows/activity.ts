import { Element, Sequence } from '../../core/base';
import { Flow } from './base';

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

export class ActivityNode extends Flow implements ActivityInfo {
  type!: ActivityType;
  taskType?: TaskType;

  constructor(data?: Partial<ActivityNode>) {
    super(data);
  }

  static build(
    el: Element,
    info: ActivityInfo,
    incoming: () => Sequence[],
    outgoing: () => Sequence[],
  ) {
    return Object.assign(el, { ...info, incoming, outgoing });
  }
}
