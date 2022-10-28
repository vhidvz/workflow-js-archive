import { BPMNElement, BPMNLane, BPMNProcess, BPMNSequenceFlow } from '../type';
import { Element, Property, Sequence } from './base';
import { Lane } from './lane';

export type SequenceGroup = { [id: string]: Sequence };

export class Process extends Property {
  private lanes!: { [id: string]: Element };
  private elements!: { [id: string]: Element };
  private sequences!: { targets: SequenceGroup; sources: SequenceGroup };

  constructor(data?: Partial<Process>) {
    super(data);
  }

  public newLane(el: BPMNLane) {
    const refs = el['bpmn:flowNodeRef'].map((el) => this.elements[el]);
    const lane = Lane.build(el, refs);

    this.lanes[el.$.id] = lane;
    if (el.$.name) this.lanes[el.$.name] = lane;
  }

  public newElement(el: BPMNElement) {
    const element = Element.build(el);

    this.elements[el.$.id] = element;
    if (el.$.name) this.elements[el.$.name] = element;
  }

  public newSequence(el: BPMNSequenceFlow) {
    const sourceRef = this.elements[el.$.sourceRef];
    const targetRef = this.elements[el.$.targetRef];

    const sequence = Sequence.build(el, sourceRef, targetRef);

    this.sequences.sources[el.$.sourceRef] = sequence;
    this.sequences.targets[el.$.targetRef] = sequence;
  }

  static build(schema: BPMNProcess): Process {
    const process = new Process(schema);

    // add task elements
    schema['bpmn:task']?.forEach((el) => process.newElement(el));
    schema['bpmn:sendTask']?.forEach((el) => process.newElement(el));
    schema['bpmn:userTask']?.forEach((el) => process.newElement(el));
    schema['bpmn:manualTask']?.forEach((el) => process.newElement(el));
    schema['bpmn:scriptTask']?.forEach((el) => process.newElement(el));
    schema['bpmn:receiveTask']?.forEach((el) => process.newElement(el));
    schema['bpmn:serviceTask']?.forEach((el) => process.newElement(el));
    schema['bpmn:businessTask']?.forEach((el) => process.newElement(el));

    // add event elements
    schema['bpmn:endEvent']?.forEach((el) => process.newElement(el));
    schema['bpmn:startEvent']?.forEach((el) => process.newElement(el));
    schema['bpmn:boundaryEvent']?.forEach((el) => process.newElement(el));

    schema['bpmn:intermediateThrowEvent']?.forEach((el) => process.newElement(el));
    schema['bpmn:intermediateCatchEvent']?.forEach((el) => process.newElement(el));

    // add gateway elements
    schema['bpmn:complexGateway']?.forEach((el) => process.newElement(el));
    schema['bpmn:parallelGateway']?.forEach((el) => process.newElement(el));
    schema['bpmn:inclusiveGateway']?.forEach((el) => process.newElement(el));
    schema['bpmn:exclusiveGateway']?.forEach((el) => process.newElement(el));
    schema['bpmn:eventBasedGateway']?.forEach((el) => process.newElement(el));

    // add sequence elements
    schema['bpmn:sequenceFlow']?.forEach((el) => process.newSequence(el));

    // add lane elements
    schema['bpmn:laneSet']?.forEach((el) =>
      el['bpmn:lane'].map((_el) => process.newLane(_el)),
    );

    return process;
  }
}
