import { FlowNode } from './flow-node';
import { Element } from './base';

export class Lane extends Element {
  name?: string;

  flowNodeRef: FlowNode[] = [];

  constructor(data?: Partial<Lane>) {
    super(data);
  }
}
