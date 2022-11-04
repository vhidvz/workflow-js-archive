import { Element, Sequence } from '../../core/base';
import { Flow } from './base';

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
  intermediateType?: IntermediateType;
}

export class EventNode extends Flow implements EventInfo {
  type!: EventType;
  intermediateType?: IntermediateType;

  get eventDefinitionType(): EventDefinitionType | undefined {
    if ('bpmn:linkEventDefinition' in this) return EventDefinitionType.Link;
    if ('bpmn:timerEventDefinition' in this) return EventDefinitionType.Timer;
    if ('bpmn:errorEventDefinition' in this) return EventDefinitionType.Error;
    if ('bpmn:signalEventDefinition' in this) return EventDefinitionType.Signal;
    if ('bpmn:messageEventDefinition' in this) return EventDefinitionType.Message;
    if ('bpmn:escalationEventDefinition' in this) return EventDefinitionType.Escalation;
    if ('bpmn:conditionalEventDefinition' in this) return EventDefinitionType.Conditional;
    if ('bpmn:compensationEventDefinition' in this)
      return EventDefinitionType.Compensation;
  }

  constructor(data?: Partial<EventNode>) {
    super(data);
  }

  static build(
    el: Element,
    info: EventInfo,
    incoming: () => Sequence[],
    outgoing: () => Sequence[],
    attachedToRef?: () => Element,
  ) {
    return Object.assign(el, { ...info, incoming, outgoing, attachedToRef });
  }
}
