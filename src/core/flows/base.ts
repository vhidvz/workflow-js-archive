import { Attribute, Element, Sequence } from '../../core/base';

export class Flow extends Attribute {
  $default!: () => Element;
  incoming!: () => Sequence[];
  outgoing!: () => Sequence[];
  attachedToRef!: () => Element;
}
