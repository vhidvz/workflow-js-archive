import { Property, Sequence } from './base';
import { BPMNActivity } from '../type';
import { Process } from './process';
import { Lane } from './lane';

export class NodeProperty extends Property {
  lane_id?: string;
  process_id!: string;

  incoming!: Sequence[];
  outgoing!: Sequence[];

  get process(): Process {
    return Process.find(this.process_id);
  }

  get lane(): Lane | undefined {
    if (this.lane_id) return Lane.find(this.lane_id);
  }
}

export class FlowNode extends NodeProperty {
  static $nodes: { [id: string]: FlowNode } = {};

  constructor(data?: Partial<FlowNode>) {
    super(data);
    FlowNode.$nodes[this.$.id] = this;
    if (this.$.name) FlowNode.$nodes[this.$.name] = this;
  }

  static find(id: string): FlowNode {
    return FlowNode.$nodes[id];
  }

  static build(el: BPMNActivity): FlowNode {
    return (
      FlowNode.$nodes[el.$.id] ??
      new FlowNode({
        ...el,
        incoming: Sequence.targets(el.$.id),
        outgoing: Sequence.sources(el.$.id),
      })
    );
  }
}
