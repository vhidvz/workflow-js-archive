import { FlowNode } from './flow-node';
import { BPMNLane } from '../type';
import { Property } from './base';

export class Lane extends Property {
  static $lanes: { [id: string]: Lane } = {};

  flowNodeRef!: FlowNode[];

  constructor(data?: Partial<Lane>) {
    super(data);
    Lane.$lanes[this.$.id] = this;
  }

  static build(el: BPMNLane) {
    return new Lane({
      ...el,
      flowNodeRef: el['bpmn:flowNodeRef'].map((ref) => FlowNode.find(ref)),
    });
  }
}
