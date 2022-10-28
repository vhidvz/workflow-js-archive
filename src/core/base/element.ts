import { BPMNElement } from '../../type';

export class Property {
  $!: { id: string; name?: string };

  constructor(data?: Partial<Property>) {
    if (data) Object.assign(this, data);
  }
}

export class Element extends Property {
  constructor(data?: Partial<Element>) {
    super(data);
  }

  static build(el: BPMNElement): Element {
    return new Element(el);
  }
}
