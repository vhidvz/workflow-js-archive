import { Element, Sequence } from './base';

export class FlowNode extends Element {
  incoming?: Sequence[];
  outgoing?: Sequence[];

  constructor(data?: Partial<FlowNode>) {
    super(data);
  }
}
