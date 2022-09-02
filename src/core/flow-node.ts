import { Element, Sequence } from './base';

export class FlowNode extends Element {
  name?: string;

  incoming: Sequence[] = [];
  outgoing: Sequence[] = [];

  constructor(data?: Partial<FlowNode>) {
    super(data);
  }
}
