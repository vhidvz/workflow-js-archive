import { Element, Property } from './element';
import { BPMNSequenceFlow } from '../../type';

export class Sequence extends Property {
  static #sequences: Sequence[];

  sourceRef: Element = new Element();
  targetRef: Element = new Element();

  constructor(data?: Partial<Sequence>) {
    super(data);
    Sequence.#sequences.push(this);
  }

  static build(el: BPMNSequenceFlow): Sequence {
    return new Sequence({
      ...el,
      sourceRef: Element.find(el['bpmn:sourceRef']),
      targetRef: Element.find(el['bpmn:targetRef']),
    });
  }

  static sources(id: string): Sequence[] {
    return Sequence.#sequences.filter((el: Sequence) => el.sourceRef.$.id === id);
  }

  static targets(id: string): Sequence[] {
    return Sequence.#sequences.filter((el: Sequence) => el.targetRef.$.id === id);
  }
}
