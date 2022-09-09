export type ProcessGateway =
  | 'complexGateway'
  | 'parallelGateway'
  | 'inclusiveGateway'
  | 'exclusiveGateway'
  | 'eventBasedGateway';

export type ProcessEvent =
  | 'endEvent'
  | 'startEvent'
  | 'boundaryEvent'
  | 'intermediateThrowEvent'
  | 'intermediateCatchEvent';

export type ProcessEventDefinition =
  | 'linkEventDefinition'
  | 'timerEventDefinition'
  | 'errorEventDefinition'
  | 'signalEventDefinition'
  | 'messageEventDefinition'
  | 'escalationEventDefinition'
  | 'conditionalEventDefinition'
  | 'compensationEventDefinition';

export type ProcessTask =
  | 'sendTask'
  | 'userTask'
  | 'manualTask'
  | 'scriptTask'
  | 'receiveTask'
  | 'serviceTask'
  | 'businessTask';

export type ProcessActivity = 'task' | 'subProcess' | 'transaction' | 'callActivity';

export type ProcessType = {
  id: string;
  name?: string;
  isExecutable: boolean;
  laneSet?: {
    id: string;
    name?: string;
    lane: {
      id: string;
      name?: string;
      flowNodeRef: string[];
    }[];
  };
  sequenceFlow?: {
    id: string;
    sourceRef: string;
    targetRef: string;
  }[];
} & {
  [x in 'complexGateway' | 'inclusiveGateway' | 'exclusiveGateway']?: {
    id: string;
    name?: string;
    default?: string;
    incoming: string[];
    outgoing: string[];
  }[];
} & {
  [x in 'parallelGateway' | 'eventBasedGateway']?: {
    id: string;
    name?: string;
    incoming: string[];
    outgoing: string[];
  }[];
} & {
  [x in 'intermediateThrowEvent' | 'intermediateCatchEvent']?: ({
    id: string;
    name?: string;
    incoming: string[];
    outgoing: string[];
  } & {
    [x in ProcessEventDefinition]?: {
      id: string;
      name?: string;
    };
  })[];
} & {
  startEvent?: ({
    id: string;
    name?: string;
    outgoing: string[];
  } & {
    [x in ProcessEventDefinition]?: {
      id: string;
      name?: string;
    };
  })[];
  endEvent?: ({
    id: string;
    name?: string;
    incoming: string[];
  } & {
    [x in ProcessEventDefinition]?: {
      id: string;
      name?: string;
    };
  })[];
  boundaryEvent?: ({
    id: string;
    name?: string;
    outgoing: string[];
    attachedToRef: string;
  } & {
    [x in ProcessEventDefinition]?: {
      id: string;
      name?: string;
    };
  })[];
} & {
  task?: {
    id: string;
    name?: string;
    incoming: string[];
    outgoing: string[];
  }[];
} & {
  [x in 'subProcess' | 'transaction' | 'callActivity']?: ({
    id: string;
    name?: string;
    triggeredByEvent?: boolean;
  } & Omit<ProcessType, 'isExecutable' | 'laneSet'>)[];
};
