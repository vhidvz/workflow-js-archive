import { Property, Sequence } from './base';
import { BPMNActivity } from '../type';

export class NodeProperty extends Property {
  incoming?: Sequence[];
  outgoing?: Sequence[];
}

export class FlowNode extends NodeProperty {
  static #nodes: { [name: string]: FlowNode };

  constructor(data?: Partial<FlowNode>) {
    super(data);
    FlowNode.#nodes[data?.$?.name || data?.$?.id || 'Default'] = this;
  }

  static find(name: string): FlowNode {
    return FlowNode.#nodes[name];
  }

  static build(el: BPMNActivity): FlowNode {
    return new FlowNode({
      ...el,
      incoming: Sequence.targets(el.$.id),
      outgoing: Sequence.sources(el.$.id),
    });
  }
}
