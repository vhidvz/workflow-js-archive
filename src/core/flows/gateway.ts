import { FlowNode, NodeProperty } from '../flow-node';
import { BPMNGateway } from '../../type';

export enum GatewayType {
  Complex = 'complex',
  Parallel = 'parallel',
  Inclusive = 'inclusive',
  Exclusive = 'exclusive',
  EventBased = 'eventBased',
}

export interface GatewayInfo {
  type: GatewayType;
}

export class GatewayNode extends NodeProperty implements GatewayInfo {
  type!: GatewayType;

  constructor(data?: Partial<GatewayNode>) {
    super(data);
  }

  static build(el: BPMNGateway, info: GatewayInfo) {
    return new GatewayNode({
      ...FlowNode.build(el),
      ...info,
    });
  }
}
