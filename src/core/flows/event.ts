import { FlowNode, NodeProperty } from '../flow-node';
import { ActivityNode } from './activity';
import { BPMNEvent } from '../../type';

export enum EventType {
  End = 'end',
  Start = 'start',
  Boundary = 'boundary',
  Intermediate = 'intermediate',
}

export enum IntermediateType {
  Throw = 'throw',
  Catch = 'catch',
}

export enum EventDefinitionType {
  Link = 'link',
  Timer = 'timer',
  Error = 'error',
  Signal = 'signal',
  Message = 'message',
  Escalation = 'escalation',
  Conditional = 'conditional',
  Compensation = 'compensation',
}

export interface EventInfo {
  type: EventType;

  attachedToRef?: ActivityNode;
  intermediateType?: IntermediateType;
  eventDefinitionType?: EventDefinitionType;
}

export class EventNode extends NodeProperty implements EventInfo {
  type!: EventType;

  attachedToRef?: ActivityNode;
  intermediateType?: IntermediateType;
  eventDefinitionType?: EventDefinitionType;

  constructor(data?: Partial<EventNode>) {
    super(data);
  }

  static build(el: BPMNEvent, info: EventInfo) {
    return new EventNode({
      ...FlowNode.build(el),
      ...info,
    });
  }
}
