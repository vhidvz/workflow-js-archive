import { Element, Attribute } from './base';
import { BPMNLane } from '../type';

export class Lane extends Attribute {
  flowNodeRef!: Element[];

  constructor(data?: Partial<Lane>) {
    super(data);
  }

  static build(el: BPMNLane, flowNodeRef: Element[]) {
    return new Lane({ ...el, flowNodeRef });
  }
}
