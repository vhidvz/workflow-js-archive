export type Gateways =
  | 'complexGateway'
  | 'parallelGateway'
  | 'inclusiveGateway'
  | 'exclusiveGateway'
  | 'eventBasedGateway';

export type Events =
  | 'endEvent'
  | 'startEvent'
  | 'boundaryEvent'
  | 'intermediateThrowEvent'
  | 'intermediateCatchEvent';

export type EventDefinitions =
  | 'linkEventDefinition'
  | 'timerEventDefinition'
  | 'errorEventDefinition'
  | 'signalEventDefinition'
  | 'messageEventDefinition'
  | 'escalationEventDefinition'
  | 'conditionalEventDefinition'
  | 'compensationEventDefinition';

export type Tasks =
  | 'sendTask'
  | 'userTask'
  | 'manualTask'
  | 'scriptTask'
  | 'receiveTask'
  | 'serviceTask'
  | 'businessTask';

export type Activities = 'task' | 'subProcess' | 'transaction' | 'callActivity';

export type Element = {
  $_id: string;
  $_name?: string;
};

export type Lane = Element & {
  flowNodeRef: string | string[];
};

export type LaneSet = Element & { lane: Lane | Lane[] };

export type SequenceFlow = Element & {
  sourceRef: string;
  targetRef: string;
};

export type NormalGateway = Element & {
  default?: string;
  incoming: string | string[];
  outgoing: string | string[];
};

export type StrictGateway = Element & {
  incoming: string | string[];
  outgoing: string | string[];
};

export type EventDefinition =
  | { linkEventDefinition?: Element }
  | { timerEventDefinition?: Element }
  | { errorEventDefinition?: Element }
  | { signalEventDefinition?: Element }
  | { messageEventDefinition?: Element }
  | { escalationEventDefinition?: Element }
  | { conditionalEventDefinition?: Element }
  | { compensationEventDefinition?: Element };

export type IntermediateEvent = Element & {
  incoming: string | string[];
  outgoing: string | string[];
} & EventDefinition;

export type StartEvent = Element & {
  outgoing: string | string[];
} & EventDefinition;

export type EndEvent = Element & {
  incoming: string | string[];
} & EventDefinition;

export type BoundaryEvent = Element & {
  outgoing: string | string[];
  attachedToRef: string;
} & EventDefinition;

export type Task = Element & {
  incoming: string | string[];
  outgoing: string | string[];
};

export type Process = Element & {
  isExecutable: boolean;
  laneSet?: LaneSet;
  task?: Task | Task[];
  endEvent?: EndEvent | EndEvent[];
  startEvent?: StartEvent | StartEvent[];
  sequenceFlow?: SequenceFlow | SequenceFlow[];
  boundaryEvent?: BoundaryEvent | BoundaryEvent[];
} & {
  [x in 'parallelGateway' | 'eventBasedGateway']?:
    | StrictGateway
    | StrictGateway[];
} & {
  [x in 'intermediateThrowEvent' | 'intermediateCatchEvent']?:
    | IntermediateEvent
    | IntermediateEvent[];
} & {
  [x in 'complexGateway' | 'inclusiveGateway' | 'exclusiveGateway']?:
    | NormalGateway
    | NormalGateway[];
} & {
  [x in 'subProcess' | 'transaction' | 'callActivity']?: ({
    id: string;
    name?: string;
    triggeredByEvent?: boolean;
  } & Omit<Process, 'isExecutable' | 'laneSet'>)[];
};
