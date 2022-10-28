/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActivityInfo,
  ActivityNode,
  ActivityType,
  EventInfo,
  EventNode,
  EventType,
  GatewayInfo,
  GatewayNode,
  GatewayType,
  IntermediateType,
  TaskType,
} from './flows';
import { BPMNElement, BPMNLane, BPMNProcess, BPMNSequenceFlow } from '../type';
import { Element, Attribute, Sequence } from './base';
import { Option } from '../common';
import { Lane } from './lane';

export type InfoType =
  | { event: EventInfo }
  | { gateway: GatewayInfo }
  | { activity: ActivityInfo };

export type SequenceGroup = { [id: string | symbol]: Sequence };

export class Process extends Attribute {
  private lanes: { [id: string | symbol]: Element } = {};
  private elements: { [id: string | symbol]: Element } = {};

  private sequences: { targets: SequenceGroup; sources: SequenceGroup } = {
    targets: {},
    sources: {},
  };

  constructor(data?: Partial<Process>) {
    super(data);
  }

  public getNode(option: Option): Element {
    let node!: Element;
    if ('name' in option) node = this.elements[option.name];
    else if ('id' in option) node = this.elements[option.id];

    if (!node) throw new Error('Requested node not found');

    return node;
  }

  private newLane(el: BPMNLane) {
    const refs = el['bpmn:flowNodeRef'].map((el) => this.elements[el]);
    const lane = Lane.build(el, refs);

    this.lanes[el.$.id] = lane;
    if (el.$.name) this.lanes[el.$.name] = lane;
  }

  private newElement(el: BPMNElement, info: InfoType) {
    let element = Element.build(el);

    if ('activity' in info) {
      const incoming = () =>
        (el as any)['bpmn:incoming']?.map((el: string) => this.elements[el]);
      const outgoing = () =>
        (el as any)['bpmn:outgoing']?.map((el: string) => this.elements[el]);

      element = ActivityNode.build(element, info.activity, incoming, outgoing);
    } else if ('event' in info) {
      const incoming = () =>
        (el as any)['bpmn:incoming']?.map((el: string) => this.elements[el]);
      const outgoing = () =>
        (el as any)['bpmn:outgoing']?.map((el: string) => this.elements[el]);
      const attachedToRef = () => this.elements[(el as any)['bpmn:attachedToRef']];

      element = EventNode.build(element, info.event, incoming, outgoing, attachedToRef);
    } else if ('gateway' in info) {
      const $default = () => this.elements[(el as any)['bpmn:default']];
      const incoming = () =>
        (el as any)['bpmn:incoming']?.map((el: string) => this.elements[el]);
      const outgoing = () =>
        (el as any)['bpmn:outgoing']?.map((el: string) => this.elements[el]);

      element = GatewayNode.build(element, info.gateway, incoming, outgoing, $default);
    }

    this.elements[el.$.id] = element;
    if (el.$.name) this.elements[el.$.name] = element;
  }

  private newSequence(el: BPMNSequenceFlow) {
    const sourceRef = this.elements[el.$.sourceRef];
    const targetRef = this.elements[el.$.targetRef];

    const sequence = Sequence.build(el, sourceRef, targetRef);

    this.sequences.sources[el.$.sourceRef] = sequence;
    this.sequences.targets[el.$.targetRef] = sequence;
  }

  static build(schema: BPMNProcess): Process {
    const process = new Process(schema);

    // add task elements
    schema['bpmn:task']?.forEach((el) =>
      process.newElement(el, { activity: { type: ActivityType.Task } }),
    );
    schema['bpmn:sendTask']?.forEach((el) =>
      process.newElement(el, {
        activity: { type: ActivityType.Task, taskType: TaskType.Send },
      }),
    );
    schema['bpmn:userTask']?.forEach((el) =>
      process.newElement(el, {
        activity: { type: ActivityType.Task, taskType: TaskType.User },
      }),
    );
    schema['bpmn:manualTask']?.forEach((el) =>
      process.newElement(el, {
        activity: { type: ActivityType.Task, taskType: TaskType.Manual },
      }),
    );
    schema['bpmn:scriptTask']?.forEach((el) =>
      process.newElement(el, {
        activity: { type: ActivityType.Task, taskType: TaskType.Script },
      }),
    );
    schema['bpmn:receiveTask']?.forEach((el) =>
      process.newElement(el, {
        activity: { type: ActivityType.Task, taskType: TaskType.Receive },
      }),
    );
    schema['bpmn:serviceTask']?.forEach((el) =>
      process.newElement(el, {
        activity: { type: ActivityType.Task, taskType: TaskType.Service },
      }),
    );
    schema['bpmn:businessTask']?.forEach((el) =>
      process.newElement(el, {
        activity: { type: ActivityType.Task, taskType: TaskType.Business },
      }),
    );

    // add event elements
    schema['bpmn:endEvent']?.forEach((el) =>
      process.newElement(el, { event: { type: EventType.End } }),
    );
    schema['bpmn:startEvent']?.forEach((el) =>
      process.newElement(el, { event: { type: EventType.Start } }),
    );
    schema['bpmn:boundaryEvent']?.forEach((el) =>
      process.newElement(el, { event: { type: EventType.Boundary } }),
    );

    schema['bpmn:intermediateThrowEvent']?.forEach((el) =>
      process.newElement(el, {
        event: { type: EventType.Intermediate, intermediateType: IntermediateType.Throw },
      }),
    );
    schema['bpmn:intermediateCatchEvent']?.forEach((el) =>
      process.newElement(el, {
        event: { type: EventType.Intermediate, intermediateType: IntermediateType.Catch },
      }),
    );

    // add gateway elements
    schema['bpmn:complexGateway']?.forEach((el) =>
      process.newElement(el, { gateway: { type: GatewayType.Complex } }),
    );
    schema['bpmn:parallelGateway']?.forEach((el) =>
      process.newElement(el, { gateway: { type: GatewayType.Parallel } }),
    );
    schema['bpmn:inclusiveGateway']?.forEach((el) =>
      process.newElement(el, { gateway: { type: GatewayType.Inclusive } }),
    );
    schema['bpmn:exclusiveGateway']?.forEach((el) =>
      process.newElement(el, { gateway: { type: GatewayType.Exclusive } }),
    );
    schema['bpmn:eventBasedGateway']?.forEach((el) =>
      process.newElement(el, { gateway: { type: GatewayType.EventBased } }),
    );

    // add sequence elements
    schema['bpmn:sequenceFlow']?.forEach((el) => process.newSequence(el));

    // add lane elements
    schema['bpmn:laneSet']?.forEach((el) =>
      el['bpmn:lane'].map((_el) => process.newLane(_el)),
    );

    return process;
  }
}
