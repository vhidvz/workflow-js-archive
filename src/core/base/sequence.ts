import { Element, Property } from './element';
import { BPMNSequenceFlow } from '../../type';

export class Sequence extends Property {
  sourceRef!: Element;
  targetRef!: Element;

  constructor(data?: Partial<Sequence>) {
    super(data);
  }

  static build(el: BPMNSequenceFlow, sourceRef: Element, targetRef: Element): Sequence {
    return new Sequence({ ...el, sourceRef, targetRef });
  }
}
