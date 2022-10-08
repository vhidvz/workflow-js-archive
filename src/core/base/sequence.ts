import { Element, Property } from './element';
import { BPMNSequenceFlow } from '../../type';

export class Sequence extends Property {
  static $sequences: { [id: string]: Sequence } = {};

  sourceRef!: Element;
  targetRef!: Element;

  constructor(data?: Partial<Sequence>) {
    super(data);
    Sequence.$sequences[this.$.id] = this;
  }

  static build(el: BPMNSequenceFlow): Sequence {
    return (
      Sequence.$sequences[el.$.id] ??
      new Sequence({
        ...el,
        sourceRef: Element.find(el.$.sourceRef),
        targetRef: Element.find(el.$.targetRef),
      })
    );
  }

  static sources(id: string): Sequence[] {
    return Object.values(Sequence.$sequences).filter(
      (el: Sequence) => el.sourceRef.$.id === id,
    );
  }

  static targets(id: string): Sequence[] {
    return Object.values(Sequence.$sequences).filter(
      (el: Sequence) => el.targetRef.$.id === id,
    );
  }
}
