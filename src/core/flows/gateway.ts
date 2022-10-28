import { Element, Attribute } from '../../core/base';

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

export class GatewayNode extends Attribute implements GatewayInfo {
  $default?: () => Element;
  incoming!: () => Element[];
  outgoing!: () => Element[];

  type!: GatewayType;

  constructor(data?: Partial<GatewayNode>) {
    super(data);
  }

  static build(
    el: Element,
    info: GatewayInfo,
    incoming: () => Element[],
    outgoing: () => Element[],
    $default?: () => Element,
  ) {
    return Object.assign(el, { ...info, incoming, outgoing, $default });
  }
}
