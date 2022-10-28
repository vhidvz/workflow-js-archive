import { Element, Attribute } from '../../core/base';

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

export class ActivityNode extends Attribute implements ActivityInfo {
  incoming!: () => Element[];
  outgoing!: () => Element[];

  type!: ActivityType;
  taskType?: TaskType;

  constructor(data?: Partial<ActivityNode>) {
    super(data);
  }

  static build(
    el: Element,
    info: ActivityInfo,
    incoming: () => Element[],
    outgoing: () => Element[],
  ) {
    return Object.assign(el, { ...info, incoming, outgoing });
  }
}
