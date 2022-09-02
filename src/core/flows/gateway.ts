import { FlowNode } from '../flow-node';

export enum GatewayType {
  Event = 'event',
  Complex = 'complex',
  Parallel = 'parallel',
  Inclusive = 'inclusive',
  Exclusive = 'exclusive',
}

export class GatewayNode extends FlowNode {
  type: GatewayType = GatewayType.Complex;

  constructor(data?: GatewayNode) {
    super(data);
  }
}
