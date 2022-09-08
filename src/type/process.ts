export type ProcessGateway = 'complexGateway' | 'parallelGateway' | 'inclusiveGateway' | 'exclusiveGateway';

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

export type ProcessActivity = 'task' | ProcessTask | 'subProcess' | 'transaction' | 'callActivity';

export type Process = {
  id: string;
  name?: string;
  isExecutable: boolean;
  laneSet: {
    id: string;
    name?: string;
    lane: {
      id: string;
      name?: string;
      flowNodeRef: string[];
    }[];
  };
  sequenceFlow: {
    id: string;
    sourceRef: string;
    targetRef: string;
  }[];
} & {
  [x in ProcessGateway]: {
    id: string;
    name?: string;
    default?: string;
    incoming: string[];
    outgoing: string[];
  }[];
} & {
  [x in ProcessEvent]: {
    id: string;
    name?: string;
    incoming: string[];
    outgoing: string[];
    attachedToRef?: string;
  }[] & {
    [x in ProcessEventDefinition]: {
      id: string;
    };
  };
} & {
  [x in ProcessActivity]: {
    id: string;
    name?: string;
    triggeredByEvent: boolean;
  }[] & {
    [x in ProcessActivity]: {
      id: string;
      name?: string;
    };
  };
};
