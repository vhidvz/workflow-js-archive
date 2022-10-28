import { Element, Attribute } from './element';
import { BPMNSequenceFlow } from '../../type';

export class Sequence extends Attribute {
  sourceRef!: Element;
  targetRef!: Element;

  constructor(data?: Partial<Sequence>) {
    super(data);
  }

  static build(el: BPMNSequenceFlow, sourceRef: Element, targetRef: Element): Sequence {
    return new Sequence({ ...el, sourceRef, targetRef });
  }
}
