import { Property, Sequence } from './base';
import { BPMNActivity } from '../type';

export class NodeProperty extends Property {
  incoming!: Sequence[];
  outgoing!: Sequence[];
}

export class FlowNode extends NodeProperty {
  static $nodes: { [id: string]: FlowNode } = {};

  constructor(data?: Partial<FlowNode>) {
    super(data);
    FlowNode.$nodes[this.$.id] = this;
  }

  static find(id: string): FlowNode {
    return FlowNode.$nodes[id];
  }

  static build(el: BPMNActivity): FlowNode {
    return new FlowNode({
      ...el,
      incoming: Sequence.targets(el.$.id),
      outgoing: Sequence.sources(el.$.id),
    });
  }
}
