import { Attribute, Element, Sequence } from '../../core/base';
import { Option } from '../../common';

export class Flow extends Attribute {
  $default!: () => Element;
  incoming!: () => Sequence[];
  outgoing!: () => Sequence[];
  attachedToRef!: () => Element;

  takeOutgoing(option?: Option): Element | Element[] | undefined {
    if (option && 'name' in option)
      return this.outgoing().find((el) => el.$.name === option.name)?.targetRef;
    else if (option && 'id' in option)
      return this.outgoing().find((el) => el.$.id === option.id)?.targetRef;
    else return this.outgoing()?.map((el) => el?.targetRef);
  }
}
