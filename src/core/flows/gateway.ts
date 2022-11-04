import { Element, Sequence } from '../../core/base';
import { Flow } from './base';

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

export class GatewayNode extends Flow implements GatewayInfo {
  type!: GatewayType;

  constructor(data?: Partial<GatewayNode>) {
    super(data);
  }

  static build(
    el: Element,
    info: GatewayInfo,
    incoming: () => Sequence[],
    outgoing: () => Sequence[],
    $default?: () => Element,
  ) {
    return Object.assign(el, { ...info, incoming, outgoing, $default });
  }
}
