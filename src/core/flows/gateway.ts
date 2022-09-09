import { FlowNode } from '../flow-node';

export enum GatewayType {
  Complex = 'complex',
  Parallel = 'parallel',
  Inclusive = 'inclusive',
  Exclusive = 'exclusive',
  EventBased = 'eventBased',
}

export class GatewayNode extends FlowNode {
  type: GatewayType = GatewayType.Complex;

  constructor(data?: GatewayNode) {
    super(data);
  }
}
