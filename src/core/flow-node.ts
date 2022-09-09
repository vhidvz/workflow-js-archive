import { Element, Sequence } from './base';

export class FlowNode extends Element {
  incoming?: Sequence[];
  outgoing?: Sequence[];

  static build(): FlowNode {
    return new FlowNode();
  }

  constructor(data?: Partial<FlowNode>) {
    super(data);
  }
}
