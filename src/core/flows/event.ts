import { ActivityNode } from './activity';
import { FlowNode } from '../flow-node';

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
  None = 'none',
  Link = 'link',
  Timer = 'timer',
  Error = 'error',
  Signal = 'signal',
  Message = 'message',
  Escalation = 'escalation',
  Conditional = 'conditional',
  Compensation = 'compensation',
}

export class EventNode extends FlowNode {
  type: EventType = EventType.Start;

  attachedToRef?: ActivityNode;

  intermediateType?: IntermediateType;
  eventDefinitionType?: EventDefinitionType;

  constructor(data?: Partial<EventNode>) {
    super(data);
  }
}
